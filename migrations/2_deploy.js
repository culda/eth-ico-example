const MyToken = artifacts.require("MyToken");
const Sale = artifacts.require("Sale");

module.exports = async function (deployer) {
  await deployer.deploy(MyToken, "MY", "MKT", 1000000)
  let tkn = await MyToken.deployed();
  let owner = await tkn.getOwner.call();

  await deployer.deploy(Sale, 1, "0x20c7f1dcd745b48e7890687a7715cc54cdcfb0aa", MyToken.address, owner, web3.utils.toWei('100', 'ether'));
};