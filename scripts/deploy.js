const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const contractName = 'myVault';
  await hre.run("compile"); // compile everytime changes are made
  const smartContract = await hre.ethers.getContractFactory(contractName);
  const myVault = await smartContract.deploy();
  await myVault.deployed();
  console.log(`${contractName} deployed to: ${myVault.address}`);

  const contractArtifacts = await artifacts.readArtifactSync(contractName); 
  fs.writeFileSync('./artifacts/contractArtifacts.json', JSON.stringify(contractArtifacts, null, 2)); // write artifacts to external file
  
  // veirfy the contract was successfully created on Etherscan
  await hre.run("verify:verify", {
    address: myVault.address,
    //constructorArguments: [],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
