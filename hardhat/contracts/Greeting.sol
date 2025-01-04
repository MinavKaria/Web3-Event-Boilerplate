// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Greeting {
    string private name;
    bool public unlocked = true;

    event NameChanged(string oldName, string newName);
    event ContractLocked();
    event ContractUnlocked();

    constructor(string memory _name) {
        require(bytes(_name).length > 0, "Initial name cannot be empty");
        name = _name;
    }

    function setName(string memory _name) public {
        // Prevent empty name
        if (keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(""))) {
            unlocked = false;
            emit ContractLocked();
            return;  
        }
        
        require(unlocked, "Contract is locked");
        
        string memory oldName = name;
        name = _name;

        emit NameChanged(oldName, name); 
    }

    function greet() public view returns (string memory) {
        return name;
    }

    function unlock() public {
        unlocked = !unlocked;

        if (unlocked) {
            emit ContractUnlocked();
        } else {
            emit ContractLocked();
        }
    }
}
