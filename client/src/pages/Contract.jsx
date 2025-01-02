import React, { useEffect, useState } from "react";
import { useReadContract, useReadContracts, useWriteContract } from "wagmi";
import ReadOnly from "../components/ReadOnly";

function Contract() {
  const [contractABI, setContractABI] = useState([]);
  const [contractAddress, setContractAddress] = useState("");

  useEffect(() => {
    const getContractABI = async () => {
      try {
        const response = await fetch(
          `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=XKWI5WQDPQUIJTZQGEJCXBFVIYD53B3VNU`
        );
        const contentType = response.headers.get("Content-Type");

        if (!contentType.includes("application/json")) {
          throw new Error(
            "The response is not JSON. Please check the contract address."
          );
        }
        const data = await response.json();
        console.log("API Response:", data);

        if (
          data.status === "1" &&
          data.result !== "Contract source code not verified"
        ) {
          const abi = JSON.parse(data.result);
          setContractABI(abi);
          console.log("Contract ABI:", abi);
        } else {
          throw new Error(
            "Contract ABI not available. Check if the contract is verified."
          );
        }
      } catch (error) {
        console.error("Error fetching contract ABI:", error);
        alert("Failed to fetch contract ABI. Check the console for details.");
      }
    };

    if (contractAddress.length > 0) {
      getContractABI();
    }
  },[contractAddress]);

  return (
    <>
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
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300">
                Fetch Contract ABI
                </button>
            </div>
            <div className="border border-blue-300 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-900 mb-2">Contract ABI</h2>
                <pre className="text-sm text-blue-700 h-52 overflow-y-scroll">
                {contractABI.length > 0
                    ? JSON.stringify(contractABI, null, 2)
                    : "No Contract ABI available. Please enter a valid contract address and click the button above."}
                </pre>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold">Read-Only (View) Function</h2>
                {contractABI.map((abi,index) => {
                    if (abi.type === "function" && abi.stateMutability === "view") {
                        return (
                            <ReadOnly index={index} abi={abi} contractABI={contractABI} contractAddress={contractAddress} />
                        );
                    }   
                }
                )}
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold">Read-Write Function</h2>
                {contractABI.map((abi) => {
                    if (abi.type === "function" && abi.stateMutability === "nonpayable") {
                        return (
                            <div key={abi.name} className="border border-blue-300 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-blue-900 mb-2">{abi.name}</h3>
                                <p className="text-sm text-blue-700">{abi.constant ? "Read-Only" : "Read-Write"}</p>
                            </div>
                        );
                    }   
                }
                )}
                </div>


        </div>
    </>
  );
}

export default Contract;
