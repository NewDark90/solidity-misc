import { expect } from "chai"
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const contractName = "IThinkYouArePrettyCoolToken";

describe(contractName, () =>
{
    const getSigners = async () => {
        const signers = await ethers.getSigners();
        return {
            all: signers,
            owner: signers[0],
            notOwners: signers.slice(1),
        }
    }

    const deployContract = async (owner: SignerWithAddress) => {
        const Greeter = await ethers.getContractFactory(contractName, owner);
        const greeter = await Greeter.deploy(owner.address);
        return greeter.deployed();
    }

    const totalSupply = 100000000000;

    describe("initialization", () => {
        it("should set the owner on deploy", async () =>
        {
            const signers = await getSigners();
            const contract = await deployContract(signers.owner);
            const anotherContract = await deployContract(signers.notOwners[0]);

            expect(await contract.getMainOwner()).to.equal(signers.owner.address);
            expect(await anotherContract.getMainOwner()).to.equal(signers.notOwners[0].address);
        });

        it("should have a total supply of " + totalSupply, async () =>
        {
            const signers = await getSigners();
            const contract = await deployContract(signers.owner);

            expect(await contract.totalSupply()).to.equal(totalSupply);
        });

        it("should have no decimals", async () =>
        {
            const signers = await getSigners();
            const contract = await deployContract(signers.owner);

            expect(await contract.decimals()).to.equal(0);
        });
    });

    it("should only allow transactions involving the owner", async () =>
    {
        const signers = await getSigners();
        const contract = await deployContract(signers.owner);

        await expect(() => contract.transfer(signers.notOwners[0].address, 500))
            .to.changeTokenBalances(contract, [signers.owner, signers.notOwners[0]], [-500, 500]);

        const notOwnerContract = contract.connect(signers.notOwners[0]);

        await expect(() => notOwnerContract.transfer(signers.owner.address, 10))
            .to.changeTokenBalances(notOwnerContract, [signers.notOwners[0], signers.owner], [-10, 10]);

        await expect(notOwnerContract.transfer(signers.notOwners[1].address, 50))
            .to.be.reverted;
    });

    it("should not allow allowances", async () =>
    {
        const signers = await getSigners();
        const contract = await deployContract(signers.owner);

        expect(await contract.approve(signers.notOwners[0].address, 1))
            .to.be.false;

        expect(await contract.transferFrom(signers.notOwners[0].address, signers.notOwners[1].address, 1))
            .to.be.false;

        expect(await contract.allowance(signers.notOwners[0].address, signers.notOwners[1].address))
            .to.equal(0);
    });
});
