import hre from "hardhat";

async function changeGreeting() {
    const contract = await hre.ethers.getContractAt("Greeter", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
    contract.setGreeting("lol")
}

changeGreeting().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
