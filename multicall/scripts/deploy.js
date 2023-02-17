const hre = require("hardhat");

async function main() {
  await hre.run('compile');

  [deployer] = await ethers.getSigners();
  console.log(deployer.address);

  const MulticallFactory = await ethers.getContractFactory("Multicall", deployer);
  Multicall = await MulticallFactory.deploy();
  console.log("waiting...");
  await Multicall.deployed();
  console.log("Multicall deployed to:", Multicall.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });