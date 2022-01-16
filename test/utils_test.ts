import { expect } from "chai";
import { ethers } from "hardhat";

describe("AddressToString", function () {
  it("Should return the string type for the address", async function () {
    const AddressToString = await ethers.getContractFactory("AddressToString");
    const addressToString = await AddressToString.deploy();
    await addressToString.deployed();
    console.log("Deployed to", addressToString.address);

    var address_str =  await addressToString.addressToString();
    expect(address_str);
    console.log(address_str);

    await addressToString.kill();
  });
});
