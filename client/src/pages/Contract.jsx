import React, { useEffect, useState, useMemo } from "react";
import { useReadContract, useReadContracts, useWriteContract } from "wagmi";
import ReadOnly from "../components/ReadOnly";
import ReadWrite from "../components/ReadWrite";

function Contract() {
  const [contractABI, setContractABI] = useState(() => {
    const saved = localStorage.getItem('contractABI');
    const timestamp = localStorage.getItem('lastActive');
    
    if (saved && timestamp && (Date.now() - parseInt(timestamp)) < 900000) {
      return JSON.parse(saved);
    }
    localStorage.clear();
    return [];
  });
  
  const [contractAddress, setContractAddress] = useState(() => {
    const timestamp = localStorage.getItem('lastActive');
    return timestamp && (Date.now() - parseInt(timestamp)) < 900000 
      ? localStorage.getItem('contractAddress') || ""
      : "";
  });

  const readOnlyFunctions = useMemo(() => 
    contractABI.filter(abi => 
      abi.type === "function" && abi.stateMutability === "view"
    ),
    [contractABI]
  );

  const readWriteFunctions = useMemo(() => 
    contractABI.filter(abi => 
      abi.type === "function" && abi.stateMutability === "nonpayable"
    ),
    [contractABI]
  );

  useEffect(() => {
    const updateLastActive = () => {
      localStorage.setItem('lastActive', Date.now().toString());
    };

    if (contractABI.length || contractAddress) {
      localStorage.setItem('contractABI', JSON.stringify(contractABI));
      localStorage.setItem('contractAddress', contractAddress);
      updateLastActive();
    }

    const events = ['mousemove', 'keypress'];
    events.forEach(event => window.addEventListener(event, updateLastActive));

    const cleanup = setInterval(() => {
      const lastActive = localStorage.getItem('lastActive');
      if (lastActive && Date.now() - parseInt(lastActive) > 900000) {
        localStorage.clear();
        setContractABI([]);
        setContractAddress("");
      }
    }, 60000);

    return () => {
      events.forEach(event => window.removeEventListener(event, updateLastActive));
      clearInterval(cleanup);
    };
  }, [contractABI, contractAddress]);

  const getContractABI = async () => {
    try {
      const response = await fetch(
        `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=XKWI5WQDPQUIJTZQGEJCXBFVIYD53B3VNU`
      );
      const data = await response.json();
      if (data.status === "1" && data.result !== "Contract source code not verified") {
        setContractABI(JSON.parse(data.result));
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch contract ABI");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8 min-h-screen flex flex-col gap-8 justify-center">
      <h1 className="text-3xl font-semibold text-blue-900 mb-4">Interact with Smart Contract</h1>
      
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter Contract Address"
          className="p-2 border border-blue-300 rounded-lg w-96"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
        <button 
          className="bg-blue-600 text-white py-2 px-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300"
          onClick={getContractABI}
        >
          Fetch Contract ABI
        </button>
      </div>
      
      <div className="border border-blue-300 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Contract ABI</h2>
        <pre className="text-sm text-blue-700 h-52 overflow-y-scroll">
          {contractABI.length > 0
            ? JSON.stringify(contractABI, null, 2)
            : "No Contract ABI available"}
        </pre>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Read-Only Functions</h2>
        {readOnlyFunctions.map((abi, index) => (
          <ReadOnly 
            key={`${contractAddress}-${index}`}
            index={index} 
            abi={abi} 
            contractABI={contractABI} 
            contractAddress={contractAddress} 
          />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Read-Write Functions</h2>
        {readWriteFunctions.map((abi, index) => (
          <ReadWrite 
            key={`${contractAddress}-${index}`}
            index={index} 
            abi={abi} 
            contractABI={contractABI} 
            contractAddress={contractAddress} 
          />
        ))}
      </div>
    </div>
  );
}

export default Contract;