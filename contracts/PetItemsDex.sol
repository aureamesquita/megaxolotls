// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PetItemsDex
 * @dev Registry of all available Megaxolotl items with metadata
 * Acts as a reference book that PetItems contract depends on
 */
contract PetItemsDex is Ownable {
    enum ItemRarity {
        COMMON,
        UNCOMMON,
        RARE,
        EPIC,
        LEGENDARY
    }

    struct ItemData {
        uint256 itemId;
        string name;
        string description;
        ItemRarity rarity;
        uint256 maxSupply;
        uint256 currentSupply;
        string ipfsHash; // IPFS hash for item image/metadata
        bool active;
        uint256 createdAt;
    }

    mapping(uint256 => ItemData) public items;
    uint256 public itemCounter;

    event ItemAdded(uint256 indexed itemId, string name, ItemRarity rarity);
    event ItemUpdated(uint256 indexed itemId, string name);
    event ItemDeactivated(uint256 indexed itemId);
    event SupplyIncremented(uint256 indexed itemId, uint256 newSupply);

    /**
     * @dev Add a new item to the Dex
     * @param _name Item name
     * @param _description Item description
     * @param _rarity Item rarity level
     * @param _maxSupply Maximum supply of this item
     * @param _ipfsHash IPFS hash for item metadata
     */
    function addItem(
        string memory _name,
        string memory _description,
        ItemRarity _rarity,
        uint256 _maxSupply,
        string memory _ipfsHash
    ) external onlyOwner returns (uint256) {
        require(bytes(_name).length > 0, "Name required");
        require(_maxSupply > 0, "Max supply must be > 0");

        uint256 itemId = itemCounter++;

        items[itemId] = ItemData({
            itemId: itemId,
            name: _name,
            description: _description,
            rarity: _rarity,
            maxSupply: _maxSupply,
            currentSupply: 0,
            ipfsHash: _ipfsHash,
            active: true,
            createdAt: block.timestamp
        });

        emit ItemAdded(itemId, _name, _rarity);
        return itemId;
    }

    /**
     * @dev Update item metadata
     * @param _itemId Item ID
     * @param _name New name
     * @param _description New description
     * @param _ipfsHash New IPFS hash
     */
    function updateItem(
        uint256 _itemId,
        string memory _name,
        string memory _description,
        string memory _ipfsHash
    ) external onlyOwner {
        require(items[_itemId].active, "Item not active");
        require(bytes(_name).length > 0, "Name required");

        items[_itemId].name = _name;
        items[_itemId].description = _description;
        items[_itemId].ipfsHash = _ipfsHash;

        emit ItemUpdated(_itemId, _name);
    }

    /**
     * @dev Deactivate an item (cannot be created anymore)
     * @param _itemId Item ID
     */
    function deactivateItem(uint256 _itemId) external onlyOwner {
        require(items[_itemId].active, "Item already inactive");
        items[_itemId].active = false;
        emit ItemDeactivated(_itemId);
    }

    /**
     * @dev Increment supply counter (called by PetItems contract)
     * @param _itemId Item ID
     */
    function incrementSupply(uint256 _itemId) external onlyOwner {
        require(items[_itemId].active, "Item not active");
        require(items[_itemId].currentSupply < items[_itemId].maxSupply, "Max supply reached");

        items[_itemId].currentSupply++;
        emit SupplyIncremented(_itemId, items[_itemId].currentSupply);
    }

    /**
     * @dev Get item data
     * @param _itemId Item ID
     */
    function getItem(uint256 _itemId)
        external
        view
        returns (ItemData memory)
    {
        return items[_itemId];
    }

    /**
     * @dev Get item rarity
     * @param _itemId Item ID
     */
    function getItemRarity(uint256 _itemId) external view returns (ItemRarity) {
        return items[_itemId].rarity;
    }

    /**
     * @dev Check if item is available for creation
     * @param _itemId Item ID
     */
    function isItemAvailable(uint256 _itemId) external view returns (bool) {
        ItemData storage item = items[_itemId];
        return item.active && item.currentSupply < item.maxSupply;
    }

    /**
     * @dev Get rarity name
     * @param _rarity Rarity enum
     */
    function getRarityName(ItemRarity _rarity) external pure returns (string memory) {
        if (_rarity == ItemRarity.COMMON) return "Common";
        if (_rarity == ItemRarity.UNCOMMON) return "Uncommon";
        if (_rarity == ItemRarity.RARE) return "Rare";
        if (_rarity == ItemRarity.EPIC) return "Epic";
        return "Legendary";
    }
}
