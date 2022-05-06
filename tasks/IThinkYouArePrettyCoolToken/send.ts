
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HardhatUserConfig, task } from "hardhat/config";
import { string, int } from "hardhat/internal/core/params/argumentTypes";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("sendCoolToken", "Sends cool tokens to an address")
    .addOptionalParam("to", "Address to send cool tokens to", "", string)
    .addOptionalParam("amount", "Amount of cool tokens to send", 1, int)
    .setAction(async ({ to, amount }: {to: string, amount: number}, hre: HardhatRuntimeEnvironment) =>
    {
        const contractName = "IThinkYouArePrettyCoolToken";
        const tokenContract = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
        const owner = (await hre.ethers.getSigners())[0];

        if (to == "")
        {
            to = (await hre.ethers.getSigners())[1].address;
        }

        const contract = await hre.ethers.getContractAt(contractName, tokenContract, owner);
        await contract.transfer(to, amount);
    });

