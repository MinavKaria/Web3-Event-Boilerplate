import React from 'react';

function Landing() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-100 p-6 text-center">
       <div className="mt-12">
        <img src="/web3-1.svg" alt="Web3 Illustration" className="max-w-full h-auto max-h-52 object-contain" />
      </div>
      <div className="max-w-xl">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-6">
          Welcome to the World of Web3
        </h1>
        <p className="text-lg text-blue-700 mb-8">
          Explore the future of decentralized technology and start your journey into Web3 today!
        </p>
        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </div>
     
    </div>
  );
}

export default Landing;
