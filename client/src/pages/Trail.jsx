import React, { useEffect, useMemo } from "react";
import { useAccount, useReadContract } from "wagmi";
import contractABI from "../abi.json";
import address from "../contract-address.json";
import ReadOnly from "../components/ReadOnly";
import ReadWrite from "../components/ReadWrite";

function Trail() {
  const { address: userAddress, isConnected } = useAccount();
  const add=address[0].address;
  const contractAddress = add;

  // const { 
  //   data: contractData, 
  //   error: contractError, 
  //   isLoading: isFetching,
  //   refetch 
  // } = useReadContract({
  //   address: contractAddress,
  //   abi: abi,
  //   functionName: "greet",
  //   enabled: isConnected,
  // });

  const ReadOnlyFunctions=useMemo(
    () =>
      contractABI.filter(
        (contractABI) => contractABI.type === "function" && contractABI.stateMutability === "view"
      ),
    [contractABI]
  )

  console.log(ReadOnlyFunctions);

  const ReadWriteFunctions=useMemo(
    () =>
      contractABI.filter(
        (contractABI) => contractABI.type === "function" && contractABI.stateMutability === "nonpayable"
      ),
    [contractABI]
  )

  console.log(ReadWriteFunctions);


  useEffect(() => {
    if (!isConnected) {
      console.log("Please connect to the wallet!");
    }
  }, [isConnected]);

  const formatContractData = (data) => {
    if (data === null || data === undefined) return "";
    if (typeof data === "bigint") return data.toString();
    return data;
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8 min-h-screen flex flex-col gap-8 justify-center items-center">
      <h1 className="text-3xl font-semibold text-blue-900 mb-4 mt-20">
        Local Contract Interaction
      </h1>
      
      {!isConnected && (
        <p className="text-yellow-600 text-lg">
          Please connect your wallet to interact with the contract
        </p>
      )}

      {isConnected && (
        <>
          <p className="text-lg font-medium text-blue-800">
            Connected Address: {userAddress}
          </p>
          <p className="text-lg font-medium text-blue-800">
            Contract Address: {contractAddress}
          </p>
          
          <button
            onClick={() => refetch()}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Fetch Contract Data
          </button>

          <div className="w-full p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              Read-Only Functions
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {ReadOnlyFunctions.map((func, index) => (
                <ReadOnly
                  key={`${contractAddress}-${index}`}
                  index={index}
                  abi={func}
                  contractAddress={contractAddress}
                  contractABI={contractABI}
                />
              ))}
            </div>
          </div>

          <div className="w-full p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              Read-Write Functions
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {ReadWriteFunctions.map((func, index) => (
                <ReadWrite
                  key={`${contractAddress}-${index}`}
                  index={index}
                  abi={func}
                  contractAddress={contractAddress}
                  contractABI={contractABI}
                />
              ))}
            </div>
          </div>

        

          

         
        </>
      )}
    </div>
  );
}

export default Trail;