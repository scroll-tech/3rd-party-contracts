require("@nomiclabs/hardhat-waffle");

const SCROLL_L2_RPC = process.env.RPC_URL || "1".repeat(32);

const L2_DEPLOYER_PRIVATE_KEY = process.env.PRIVATE_KEY || "1".repeat(64);

const {subtask} = require("hardhat/config");
const {TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS} = require("hardhat/builtin-tasks/task-names")

subtask(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS)
  .setAction(async (_, __, runSuper) => {
    const paths = await runSuper();

    return paths.filter(p => p.endsWith("Multicall.sol"));
  });

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
        version: "0.8.10",
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
    sources: "./multicall",
  }
};