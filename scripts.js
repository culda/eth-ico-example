const fs = require('fs');
const abi = JSON.parse(fs.readFileSync('/home/bigdab/web3/build/contracts/AaveFlash.json')).abi;
let MyContract = web3.eth.contract(abi);

// initiate contract for an address
var myContractInstance = MyToken.at(MyToken.address);

// call constant function (synchronous way)
var owner = myContractInstance.owner.call();

console.log("owner= "+owner);
