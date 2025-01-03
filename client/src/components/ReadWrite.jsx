import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import { useAccount } from "wagmi";

function ReadWrite({ abi, contractABI, key, contractAddress }) {
  const { writeContract, data, error, failureReason } = useWriteContract();
  const [clicked, setClicked] = useState(false);
  const [args, setArgs] = useState(new Array(abi.inputs.length).fill(""));
  const account = useAccount();

  return (
    <>
      <div
        key={key}
        className="border border-blue-300 p-4 rounded-lg transition-all duration-500"
      >
        <h3
          className="text-lg font-semibold text-blue-900 mb-2 hover:underline cursor-pointer"
          onClick={() => setClicked(!clicked)}
        >
          {abi.name}
        </h3>
        <p className="text-sm text-blue-700">Read-Write</p>
  
        <div
          className={`overflow-hidden transition-all duration-500 ${
            clicked ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          {clicked && (
            <>
              {abi.inputs.map((input, index) => (
                <div
                  key={index}
                  className="flex gap-4 mt-4 transition-all duration-500"
                >
                  <input
                    type="text"
                    placeholder={`${input.name} (${input.type})`}
                    className="p-2 border border-blue-300 rounded-lg w-96 transition duration-300"
                    value={args[index]}
                    onChange={(e) => {
                      const newArgs = [...args];
                      newArgs[index] = e.target.value;
                      setArgs(newArgs);
                      console.log(newArgs);
                    }}
                  />
                </div>
              ))}

              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm mt-4 font-medium hover:bg-blue-700 transition duration-500"
                onClick={() => {
                  console.log(args);
                  console.log(abi.name);
                  console.log(account.address);
                  console.log(contractABI);
                  writeContract({
                    abi: contractABI,
                    address: contractAddress,
                    functionName: abi.name,
                    args,
                  });

                  setArgs(new Array(abi.inputs.length).fill(""));
                }}
              >
                Query
              </button>

              {data !== undefined && data !== null && (
                <>
                  <p className="text-green-700 mt-2">
                    Transaction hash:{" "}
                    {typeof data === "bigint"
                      ? data.toString()
                      : JSON.stringify(data)}
                  </p>
                  <a href={`https://sepolia.etherscan.io/tx/${data}`} className="text-blue-700 mt-2 hover:underline" target="_blank" rel="noreferrer">
                    View on Etherscan
                  </a>
                </>
              )}
              {error && (
                <p className="text-red-700 mt-2">
                  Something went Wrong, Please Try Again
                </p>
              )}
              {failureReason && (
                <p className="text-red-700 mt-2">
                  Transaction failed:{" "}
                  {JSON.stringify(failureReason.cause.cause.shortMessage)}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ReadWrite;
