const MyToken = artifacts.require("MyToken");
const Sale = artifacts.require("Sale");

module.exports = async function (deployer) {
  await deployer.deploy(MyToken, "MY", "MKT", web3.utils.toWei('1000000', 'ether'))
  await deployer.deploy(Sale, 1, "0x20c7f1dcd745b48e7890687a7715cc54cdcfb0aa", MyToken.address, web3.utils.toWei('100', 'ether'));  

  let tkn = await MyToken.deployed();
  let owner = await tkn.getOwner.call();

  await tkn.transfer(Sale.address, web3.utils.toWei('100', 'ether'), {from: owner}) //send 100 Tokens to the Sale contract (should be calculated in terms of the rate)
  const balance = await tkn.balanceOf(Sale.address)
  
  console.log(`Crowdsale has ${balance.toString()} TKNbits`)
};