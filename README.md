# ICO example on Ethereum

MyToken properties
- initial supply 1mil
- ERC20 token
- owner of contract will own the entire supply

Crowdsale properties
- has a rate of 1 token / 1 ETH
- capped at 100 eth (non-zero value transactions will be reverted if cap is exceeded)
- only accepts whitelisted addresses (must invoke addToWhitelist)
- the funds are stored in a separate wallet and allocations are stored in a mapping
- the owner can manually invoke finalize() and finish the sale when the cap is nearly reached
- [not done] token distribution is done using an off-chain script that will call the transfer method for each member of the allocation mapping

Some tests are included in SaleTests.js
