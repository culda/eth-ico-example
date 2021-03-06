const Sale = artifacts.require("Sale");
const MyToken = artifacts.require("MyToken");

contract('Sale', function(accounts) {

    it('should have a cap of 100 ETH', function(done){
        Sale.deployed().then(async function(instance) {
            const cap = await instance.cap();
            assert.equal(cap, web3.utils.toWei('100', 'ether'), "The cap is not 100 ETH");
            done();
       });
    });
    
    it('should reject non-whitelisted transactions', function(done){
        Sale.deployed().then(async function(instance) {
            try {
                await instance.buyTokens(accounts[4], { from: accounts[4], value: web3.utils.toWei('1', "ether")});
            }
            catch (error){
                assert(true, error.message.includes("Address is not whitelisted"))
            }
            done();
       });
    });

    it('one ETH should allocate 1 token', function(done){
        Sale.deployed().then(async function(instance) {
            await instance.addToWhitelist(accounts[4]);
            await instance.buyTokens(accounts[4], { from: accounts[4], value: web3.utils.toWei('1', "ether")});
            const allocation = await instance.getAllocation(accounts[4]);
            assert.equal(allocation.toString(), web3.utils.toWei('1', 'ether'), 'The sender didn\'t receive the right amount of tokens');
            done();
       });
    });

    it('should revert if the cap is exceeded', function(done){
        Sale.deployed().then(async function(instance) {
            await instance.addToWhitelist(accounts[6]);
            await instance.addToWhitelist(accounts[7]);
            try {
                await instance.buyTokens(accounts[6], { from: accounts[6], value: web3.utils.toWei('80', "ether")});
                await instance.buyTokens(accounts[7], { from: accounts[7], value: web3.utils.toWei('80', "ether")});
            }
            catch (error){
                assert(true, error.message.includes("cap exceeded"))
            }            
            done();
       });
    });

    it('should not allow purchases if finalize is called', function(done){
        Sale.deployed().then(async function(instance) {
            await instance.finalize();
            try {
                await instance.buyTokens(accounts[4], { from: accounts[4], value: web3.utils.toWei('2', "ether")});
            }
            catch (error){
                assert(true, error.message.includes("Crowdsale is finished"))
            }            
            done();
       });
    });
    
    it('should allow users to claim tokens once finalized', function(done){
        Sale.deployed().then(async function(instance) {
            await instance.claimTokens({from: accounts[4]});
            const token = await MyToken.deployed();
            const newBalance = await token.balanceOf(accounts[4])
            assert(web3.utils.toWei('1', 'ether'), newBalance)
            done();
       });
    });      
});