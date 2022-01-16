import { expect } from "chai";
import { ethers } from "hardhat";

import "@nomiclabs/hardhat-ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { BigNumber } from "ethers"
import { doesNotReject } from "assert";
import { any } from "hardhat/internal/core/params/argumentTypes";

import{ FlagshipERC20Token } from '../typechain/FlagshipERC20Token';

describe("Test FFERC20", function () {
    let deployer: SignerWithAddress;
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;

    let deployer_addr: string;
    let alice_addr: string;
    let bob_addr: string;

    let FexP_addr: string;

    // let ff = FlagshipERC20Token;

    beforeEach(async () => {
        [deployer, alice, bob] = await ethers.getSigners();
        deployer_addr = await deployer.getAddress();
        alice_addr = await alice.getAddress();
        bob_addr = await deployer.getAddress();

        const FexP = await ethers.getContractFactory("FuelExchangePermitERC721");
        const fexp = await FexP.deploy();
        await fexp.deployed();

        FexP_addr = fexp.address;

        // const FF = await ethers.getContractFactory("FlagshipERC20Token");
        // const ff = await FF.deploy();
        // await ff.deployed();
        // console.log("Deployed to", ff.address);
    
        // const authority = await (new OlympusAuthority__factory(deployer)).deploy(deployer.address, deployer.address, deployer.address, vault.address);
        // await authority.deployed();
    
        // ohm = await (new OlympusERC20Token__factory(deployer)).deploy(authority.address);
    });

    it("Should tax the hell out of gamers", async function () {
        const FF = await ethers.getContractFactory("FlagshipERC20Token");
        const ff = await FF.deploy(FexP_addr);
        await ff.deployed();

        console.log("Deployed to", ff.address);

        await ff.mint(deployer_addr, 10**6 * 10**9);
        console.log("mint outcome: ", await ff.balanceOf(deployer_addr));

        // check the _checkTransferRecords
        for (let i = 0; i < 10; ++i) {
            let one_hundred = 100 * 10**9;
            await ff.connect(deployer).transfer(alice_addr, one_hundred);
        }

        // check _checkPortion
        await ff.connect(deployer).transfer(alice_addr, (10**4 * 10**9) + (10**4 * 10**9) + (10**4 * 10**9));

        console.log(await ff.totalSupply());
    
        await ff.kill();
        return;
    });
});