import * as dotenv from "dotenv";

import "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "./tasks";

dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
    solidity: "0.8.4",
    defaultNetwork: "localhost",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545"
        },
        ropsten: {
            url: process.env.ROPSTEN_URL || "",
            chainId: 3,
            accounts: process.env.PRIVATE_KEY_TESTNET !== undefined ? [process.env.PRIVATE_KEY_TESTNET] : [],
        },
        sepolia: {
            url: process.env.SEPOLIA_URL || "",
            chainId: 11155111,
            accounts: process.env.PRIVATE_KEY_TESTNET !== undefined ? [process.env.PRIVATE_KEY_TESTNET] : [],
        },
        "arbitrum-rinkeby": {
            url: process.env.ARBITRUM_RINKEBY_URL || "",
            chainId: 421611,
            accounts: process.env.PRIVATE_KEY_TESTNET !== undefined ? [process.env.PRIVATE_KEY_TESTNET] : [],
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    mocha: {

    }
};

export default config;
