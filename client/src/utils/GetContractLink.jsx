import { mainnet, sepolia } from "viem/chains";

const contractLink={
    sepolia:'https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=',
    ethereum:'https://api.etherscan.io/api?module=contract&action=getabi&address=',
}

const contractFetchLink = ({net,apiKey,contractAddress})=>{
    // console.log(contractLink[net]);
    // console.log(contractAddress);
    // console.log(apiKey);
    return `${contractLink[net]}${contractAddress}&apikey=${apiKey}`
}

export default contractFetchLink;