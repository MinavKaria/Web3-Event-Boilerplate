
const contractLink={
    sepolia:'https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address='
}

const contractFetchLink = ({net,apiKey,contractAddress})=>{
    return `${contractLink[net]}${contractAddress}&apikey=${apiKey}`
}

export default contractFetchLink;