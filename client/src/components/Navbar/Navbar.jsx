import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSendTransaction,useWaitForTransactionReceipt } from 'wagmi'
import { useAccount } from "wagmi";
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

function Navbar() {
  const notify = () => toast("Sending you ETH....");
  const succ = () => toast("1 ETH Sent Successfully");
  const { address, isConnected, connector,chain } = useAccount();
  const navigate = useNavigate()

  const HARDHAT_PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

      const sendEther = async () => {
        try {
          const provider = new ethers.JsonRpcProvider(
            "http://localhost:8545"
          );

          const signer = new ethers.Wallet(HARDHAT_PRIVATE_KEY, provider);

          const tx = await signer.sendTransaction({
            to: address,
            value: ethers.parseEther("1.0"),
          });

          console.log("Transaction sent:", tx);
          notify()
          await tx.wait(); 
          console.log("Transaction confirmed:", tx.hash);
          succ()
          
        } catch (error) {
          console.error("Error sending ETH:", error);
          alert("Failed to send ETH. Check the console for details.");
        }
      };

  

  return (
    <> 
        <div className="flex gap-3 bg-blue-200 justify-between p-3 shadow-2xl fixed w-screen px-4">
        <div className="flex gap-6 justify-center items-center">
          <img src="https://cdn3.emoji.gg/emojis/7903-ethereum.png" className=' cursor-pointer' width="40px" height="40px" alt="Ethereum" onClick={()=>{
            navigate('/')
          }}/>
          <div className='hidden lg:flex '>
          <button className="text-md font-bold text-blue-800 hover:text-blue-900 p-2 cursor-pointer rounded-full hover:bg-blue-100 hover:shadow-2xl">IPFS Upload</button>
          <button className="text-md font-bold text-blue-800 hover:text-blue-900 p-2 rounded-full cursor-pointer hover:bg-blue-100 hover:shadow-2xl transition-all duration-500">Mint NFT</button>
          <button className="text-md font-bold text-blue-800 hover:text-blue-900 p-2 rounded-full cursor-pointer hover:bg-blue-100 hover:shadow-2xl transition-all duration-500" onClick={()=>{
            navigate('/contract')
          }}>Interact with Contract</button>
          </div>
        </div>
        <div className='flex gap-3'>
        <ConnectButton/>
        {(chain && chain.name==="Hardhat") && (
          <>
            <button className="shadow-md p-2 rounded-lg bg-white flex justify-center items-center" onClick={sendEther}>Get 1<img src="https://cdn3.emoji.gg/emojis/7903-ethereum.png" width="20px" height="20px" alt="Ethereum"/></button>
        
          </>
        )}
        </div>
        </div>
        <ToastContainer />
    </>
  )
}

export default Navbar