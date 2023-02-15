const hre = require("hardhat");

async function main() {
  await hre.run('compile');

  [account] = await ethers.getSigners();

  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
  const UniswapV2Router02Factory = await ethers.getContractFactory("UniswapV2Router02");

  UniswapV2 = await UniswapV2Factory.deploy(account.address);
  console.log("UniswapV2 feeToSetter:", account.address);
  await UniswapV2.deployed();
  console.log("UniswapV2 factory deployed to:", UniswapV2.address);

  const l2_weth_addr = process.env.WETH9_ADDRESS;
  console.log("l2_weth_addr", l2_weth_addr);
  UniswapV2Router02 = await UniswapV2Router02Factory.deploy(UniswapV2.address, l2_weth_addr);
  await UniswapV2Router02.deployed();
  console.log("UniswapV2Router02 deployed to:", UniswapV2Router02.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
