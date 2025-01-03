import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

function ReadOnly({ abi, contractAddress, key, contractABI }) {
  const [clicked, setClicked] = useState(false);
  const [args, setArgs] = useState(new Array(abi.inputs.length).fill(""));
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const [yes, setYes] = useState(false);

  const allArgsEntered = args.every((arg) => arg !== "");
  const formattedArgs = args.map((arg) =>
    /^\d+$/.test(arg) ? BigInt(arg) : arg
  );
  const inputSize = abi.inputs.length;

  const { data, error, isFetching,refetch } = useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: abi.name,
    args: args,
  });

  const handleFetch = () => {
    if (allArgsEntered) {
      setFetchEnabled(true);
    } else {
      alert("Please enter all required arguments.");
    }
  };

  const formatResult = (data) => {
    if (data === null || data === undefined) return "No Data";
    if (typeof data === "bigint") return data.toString();
    if (Array.isArray(data)) return data.map(formatResult);
    if (typeof data === "object") {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, formatResult(value)])
      );
    }
    return data;
  };

  return (
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
      <p className="text-sm text-blue-700">Read-Only</p>
      {/* <p>{JSON.stringify(abi.inputs)}</p> */}

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
                console.log(data);
                refetch();
                handleFetch();
              }}
            >
              {inputSize > 0 ? "Fetch" : "Refresh"}
            </button>

            {isFetching && (
              <p className="text-blue-700 mt-2">Fetching data...</p>
            )}
            {data !== undefined && data !== null && (
              <p className="text-green-700 mt-2">
                Result:{" "}
                {typeof data === "bigint"
                  ? data.toString()
                  : JSON.stringify(formatResult(data))}
              </p>
            )}

            {error && (
              <p className="text-red-700 mt-2">Something went Wrong, Please Enter the correct data</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ReadOnly;
