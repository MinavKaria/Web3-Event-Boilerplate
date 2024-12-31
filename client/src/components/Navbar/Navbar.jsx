import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSendTransaction,useWaitForTransactionReceipt } from 'wagmi'
import { useAccount } from "wagmi";
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';

function Navbar() {
  const notify = () => toast("Sending you ETH....");
  const succ = () => toast("1 ETH Sent Successfully");
  const { address, isConnected, connector,chain } = useAccount();

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
        <div className="flex gap-3 bg-blue-100 justify-end p-3">
        <ConnectButton/>
        {(chain && chain.name==="Localhost") && (
          <>
            <button className="shadow-md p-2 rounded-lg bg-white flex justify-center items-center" onClick={sendEther}>Get 1<img src="https://cdn3.emoji.gg/emojis/7903-ethereum.png" width="20px" height="20px" alt="Ethereum"/></button>
        
          </>
        )}
        </div>
        <ToastContainer />
    </>
  )
}

export default Navbar