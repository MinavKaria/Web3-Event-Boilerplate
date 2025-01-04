import path from 'path';
import fs from 'fs';

function getFiles() {
    const __dirname = path.resolve();
    const contractPath = path.resolve(__dirname, './hardhat/artifacts/contracts/Greeting.sol/Greeting.json');
    const destinationPath = path.resolve(__dirname, './client/src/abi.json');
    console.log(contractPath, destinationPath);

    fs.readFile(contractPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the contract file:', err);
            return;
        }

        const contractJson = JSON.parse(data);
        const abi = JSON.stringify(contractJson.abi);

        fs.writeFile(destinationPath, abi, 'utf8', (err) => {
            if (err) {
                console.error('Error writing the ABI file:', err);
                return;
            }

            console.log('ABI has been copied to the client public folder.');
        });
    });
}

getFiles();
