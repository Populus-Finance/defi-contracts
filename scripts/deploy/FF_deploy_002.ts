import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const FF = await ethers.getContractFactory("FlagshipERC20Token");
  const ff = await FF.deploy();

  await ff.deployed();

  console.log("FF deployed to:", ff.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});