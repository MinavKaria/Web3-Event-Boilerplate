import React, { useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import abi from "../abi.json";

function Trail() {
  const { address: userAddress, isConnected } = useAccount();
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const { 
    data: contractData, 
    error: contractError, 
    isLoading: isFetching,
    refetch 
  } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "greet",
    enabled: isConnected,
  });

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
        Trail Page
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
          
          <button
            onClick={() => refetch()}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Fetch Contract Data
          </button>

          {isFetching && (
            <p className="text-blue-700 text-lg font-semibold">
              Fetching data...
            </p>
          )}

          {contractData && (
            <div className="text-lg font-semibold text-blue-900">
              <p>Contract Name: {formatContractData(contractData)}</p>
            </div>
          )}

          {contractError && (
            <p className="text-red-600 text-lg font-semibold">
              Error: {contractError.message || "Failed to fetch contract data"}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default Trail;