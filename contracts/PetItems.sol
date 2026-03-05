// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PetItemsDex.sol";

/**
 * @title PetItems
 * @dev ERC-1155 semi-fungible token for Megaxolotl items
 * Depends on PetItemsDex for item metadata and availability
 */
contract PetItems is ERC1155, Ownable {
    PetItemsDex public itemsDex;

    mapping(uint256 => uint256) public itemMintCount; // Track mints per item
    mapping(address => uint256) public userItemCount; // Track user's total items

    event ItemMinted(address indexed to, uint256 indexed itemId, uint256 amount);
    event ItemBurned(address indexed from, uint256 indexed itemId, uint256 amount);
    event ItemTraded(address indexed from, address indexed to, uint256 indexed itemId, uint256 amount);

    constructor(address _dexAddress) ERC1155("") {
        itemsDex = PetItemsDex(_dexAddress);
    }

    /**
     * @dev Mint new items (only owner/authorized minters)
     * @param _to Recipient address
     * @param _itemId Item ID from Dex
     * @param _amount Amount to mint
     */
    function mintItem(
        address _to,
        uint256 _itemId,
        uint256 _amount
    ) external onlyOwner {
        require(_to != address(0), "Invalid recipient");
        require(_amount > 0, "Amount must be > 0");

        // Check if item exists and is available in Dex
        PetItemsDex.ItemData memory itemData = itemsDex.getItem(_itemId);
        require(itemData.active, "Item not active");
        require(
            itemData.currentSupply + _amount <= itemData.maxSupply,
            "Exceeds max supply"
        );

        // Mint the items
        _mint(_to, _itemId, _amount, "");

        // Update counters
        itemMintCount[_itemId] += _amount;
        userItemCount[_to] += _amount;

        emit ItemMinted(_to, _itemId, _amount);
    }

    /**
     * @dev Burn items
     * @param _from Owner address
     * @param _itemId Item ID
     * @param _amount Amount to burn
     */
    function burnItem(
        address _from,
        uint256 _itemId,
        uint256 _amount
    ) external {
        require(msg.sender == _from || msg.sender == owner(), "Not authorized");
        require(balanceOf(_from, _itemId) >= _amount, "Insufficient balance");

        _burn(_from, _itemId, _amount);

        // Update counters
        itemMintCount[_itemId] -= _amount;
        userItemCount[_from] -= _amount;

        emit ItemBurned(_from, _itemId, _amount);
    }

    /**
     * @dev Trade items between users
     * @param _from Sender address
     * @param _to Recipient address
     * @param _itemId Item ID
     * @param _amount Amount to trade
     */
    function tradeItem(
        address _from,
        address _to,
        uint256 _itemId,
        uint256 _amount
    ) external {
        require(msg.sender == _from, "Not authorized");
        require(_to != address(0), "Invalid recipient");
        require(balanceOf(_from, _itemId) >= _amount, "Insufficient balance");

        safeTransferFrom(_from, _to, _itemId, _amount, "");

        // Update user counters
        userItemCount[_from] -= _amount;
        userItemCount[_to] += _amount;

        emit ItemTraded(_from, _to, _itemId, _amount);
    }

    /**
     * @dev Get user's total item count
     * @param _user User address
     */
    function getUserItemCount(address _user) external view returns (uint256) {
        return userItemCount[_user];
    }

    /**
     * @dev Get item balance for user
     * @param _user User address
     * @param _itemId Item ID
     */
    function getItemBalance(address _user, uint256 _itemId)
        external
        view
        returns (uint256)
    {
        return balanceOf(_user, _itemId);
    }

    /**
     * @dev Get total mints of an item
     * @param _itemId Item ID
     */
    function getTotalMints(uint256 _itemId) external view returns (uint256) {
        return itemMintCount[_itemId];
    }

    /**
     * @dev Set URI for items (can be overridden for custom metadata)
     * @param _newUri New base URI
     */
    function setURI(string memory _newUri) external onlyOwner {
        _setURI(_newUri);
    }
}
