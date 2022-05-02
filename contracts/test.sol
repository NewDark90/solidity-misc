// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Test {

    string private value;

    constructor() {
        value = "test";
    }

    function get() public view returns(string memory) {
        return value;
    }

    function set(string calldata _value) public {
        value = _value;
    }
}
