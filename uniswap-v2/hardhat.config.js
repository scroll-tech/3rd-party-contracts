require("@nomiclabs/hardhat-waffle");

require('dotenv').config();

const SCROLL_L2_RPC = process.env.RPC_URL || "1".repeat(32);

const L2_DEPLOYER_PRIVATE_KEY = process.env.PRIVATE_KEY || "1".repeat(64);

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "l2geth",
  networks: {
    l2geth: {
      url: SCROLL_L2_RPC,
      gasPrice: 20000000000,
      gasMultiplier: 1.1,
      accounts: [L2_DEPLOYER_PRIVATE_KEY],
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.5.16",
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
    ],
  },
  paths: {
    sources: "./v2-contracts",
  }
};
