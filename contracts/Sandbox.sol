// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

interface Vampire{
    function drinkBlood(int8) external returns(bool);
}

contract Dracula is Vampire{

    modifier onlyAfterDark (int8 hour){
        require(hour > 18);
        _;
    }

    function drinkBlood(int8 hour) public override onlyAfterDark(hour) returns(bool){
        return true;
    }
}