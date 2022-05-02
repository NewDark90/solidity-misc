
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HardhatUserConfig, task } from "hardhat/config";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts, in a really cool way.", async (taskArgs, hre: HardhatRuntimeEnvironment) =>
{
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts)
    {
        console.log(account.address);
    }
});
