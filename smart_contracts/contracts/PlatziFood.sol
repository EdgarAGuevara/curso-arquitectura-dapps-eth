// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract PlatziFood {
    constructor() {}

    struct PlatziFoodItem {
        address owner;
        string foodUrl;
        string foodName;
        string originCountry;
    }

    PlatziFoodItem[] private platziFoods;

    function addPlatziFood(
        string memory foodUrl,
        string memory foodName,
        string memory originCountry
    ) public {
        platziFoods.push(
            PlatziFoodItem(msg.sender, foodUrl, foodName, originCountry)
        );
    }

    function getAllPlatziFoods() public view returns (PlatziFoodItem[] memory) {
        return platziFoods;
    }

    function getPlatziFoodsByOwner()
        public
        view
        returns (PlatziFoodItem[] memory)
    {
        uint256 itemCount = 0;
        for (uint256 index = 0; index < platziFoods.length; index++) {
            if (platziFoods[index].owner == msg.sender) {
                itemCount += 1;
            }
        }

        PlatziFoodItem[] memory response = new PlatziFoodItem[](itemCount);

        uint256 responseItemCount = 0;
        for (uint256 index = 0; index < platziFoods.length; index++) {
            if (platziFoods[index].owner == msg.sender) {
                response[responseItemCount] = platziFoods[index];
                responseItemCount += 1;
            }
        }

        return response;
    }
}
