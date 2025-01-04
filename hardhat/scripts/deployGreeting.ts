import hre from "hardhat";


async function main() {
  try {
    // Get the ContractFactory of your SimpleContract
    const SimpleContract = await hre.ethers.getContractFactory("Greeting");

    // Deploy the contract
    const contract = await SimpleContract.deploy("Hello, Minav!");

    console.log("Deploying contract...");
    await contract.waitForDeployment(); 
    console.log(`SimpleContract deployed to: ${contract.target}`);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();