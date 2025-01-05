import React, { useState } from 'react'
import axios from 'axios'

function IPFSupload(){
  
    const API_KEY = import.meta.env.VITE_API_KEY;
    const SECRET_API_KEY = import.meta.env.VITE_SECRET_API_KEY;

    const [hash, setHash] = useState(null);
    const [count, setCount] = useState(0);
    const [file, setFile] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', file);
            const responseData = await axios({
                method: 'post',
                url: `https://api.pinata.cloud/pinning/pinFileToIPFS`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'pinata_api_key': API_KEY,
                    'pinata_secret_api_key': SECRET_API_KEY
                }
            })
            const fileUrl = `https://gateway.pinata.cloud/ipfs/${responseData.data.IpfsHash}`
            setHash(fileUrl)
        }
         
        catch (error){
            console.error(error)
        }
            
    }

    return (
        <div className='min-h-screen pt-24'>
            <h1 className='text-4xl font-bold text-center text-indigo-950'>
                Upload MetaData to IPFS
            </h1>
            <form className='flex flex-col gap-4 p-4 items-center justify-center' onChange={(e) => {setFile(e.target.files[0])}}>
                <input type="file" className='p-2 border-2 border-indigo-950 rounded-md w-2/3' />
                <button type="submit" className='p-2 bg-indigo-950 text-white rounded-md w-2/3' onClick={handleSubmit}>Upload</button>
            </form>
            {
                hash && (
                    <div className='flex flex-col gap-4 p-4 items-center justify-center'>
                        <h2 className='text-2xl font-bold text-center text-indigo-950'>File Uploaded Successfully</h2>
                        <a href={hash} target='_blank' className='text-indigo-950 underline'>{hash}</a>
                    </div>
                )
            }
        </div>
    )
}

export default IPFSupload