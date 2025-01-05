import hre from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  try {
    const contractName= "Greeting";
    const SimpleContract = await hre.ethers.getContractFactory(contractName);

    // Deploy the contract
    const contract = await SimpleContract.deploy("Hello, Minav!");

    console.log("Deploying contract...");
    await contract.waitForDeployment(); 
    console.log(`SimpleContract deployed to: ${contract.target}`);

     const contractAddress = [{
          address: contract.target
        }];
        const contractAddressPath = path.join(__dirname, "../../client/src/contract-address.json");
    
        fs.writeFileSync(contractAddressPath, JSON.stringify(contractAddress));
        console.log(`Contract address written to ${contractAddressPath}`);

        const abiPath=path.join(__dirname,`../artifacts/contracts/${contractName}.sol/${contractName}.json`)
        const abi=JSON.parse(fs.readFileSync(abiPath).toString()).abi;
        // console.log(JSON.stringify(abi));
        const abiAddressPath = path.join(__dirname, "../../client/src/abi.json");
        fs.writeFileSync(abiAddressPath, JSON.stringify(abi));
        console.log(`ABI written to ${abiAddressPath}`);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();