// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract UserDetails {
    struct User {
        string name;
        uint age;
        string addressDetails;
    }
    
    mapping(address => User) users;

    function setDetails(string memory _name, uint _age, string memory _addressDetails) public {
        // Ensure that the address does not already exist in the mapping
        // require(users[msg.sender].age == 0, "Address already exists");
        
        // Create the user object and add it to the mapping
        User memory newUser = User(_name, _age, _addressDetails);
        users[msg.sender] = newUser;
    }

    function getDetails(address _address) public view returns(string memory, uint, string memory) {
        // Ensure that the address exists in the mapping
        require(users[_address].age > 0, "Address does not exist");
        
        // Return the user details
        return (users[_address].name, users[_address].age, users[_address].addressDetails);
    }
}