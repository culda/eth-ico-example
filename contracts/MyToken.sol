// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {

    address private owner;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) public ERC20(name, symbol) {
        owner = msg.sender;
        _mint(msg.sender, initialSupply);
    }

    function getOwner() external view returns (address) {
        return owner;
    }

}