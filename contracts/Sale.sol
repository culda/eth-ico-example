// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "./access/Ownable.sol";
import "./crowdsale/CappedCrowdsale.sol";
import "./crowdsale/Crowdsale.sol";

contract Sale is CappedCrowdsale, Ownable {
    using SafeMath for uint256;

    mapping(address => bool) public whitelist;
    mapping(address => uint256) public tokenAllocations;

    constructor (uint256 rate, address payable wallet, IERC20 token, address tokenWallet, uint256 cap) public 
        Crowdsale(rate, wallet, token)
        CappedCrowdsale(cap) {}

    /**
    * @dev Reverts if beneficiary is not whitelisted. Can be used when extending this contract.
    */
    modifier isWhitelisted(address _beneficiary) {
        require(whitelist[_beneficiary], "Address is not whitelisted");
        _;
    }

    /**
    * @dev Adds single address to whitelist.
    * @param _beneficiary Address to be added to the whitelist
    */
    function addToWhitelist(address _beneficiary) external onlyOwner {
        whitelist[_beneficiary] = true;
    }

    /**
    * @dev Removes single address from whitelist.
    * @param _beneficiary Address to be removed to the whitelist
    */
    function removeFromWhitelist(address _beneficiary) external onlyOwner {
        whitelist[_beneficiary] = false;
    }

    /**
    * @dev Extend parent behavior requiring beneficiary to be in whitelist.
    * @param _beneficiary Token beneficiary
    * @param _weiAmount Amount of wei contributed
    */
    function _preValidatePurchase(
        address _beneficiary,
        uint256 _weiAmount
    )
        internal
        override
        view
        isWhitelisted(_beneficiary)
    {
        super._preValidatePurchase(_beneficiary, _weiAmount);
    }

    /**
     * @dev Add token allocation to sender
     * @param beneficiary Address performing the token purchase
     * @param tokenAmount Number of tokens to be emitted
     */
    function _processPurchase(address beneficiary, uint256 tokenAmount) internal override {
        tokenAllocations[beneficiary] = tokenAllocations[beneficiary].add(tokenAmount);
    }

    /**
     * @dev Returns the amount of token allocated to an address
     * @param holder Address whose allocation is being checked
     */
    function getAllocation(address holder) external view returns (uint256){
        return tokenAllocations[holder];
    }

}