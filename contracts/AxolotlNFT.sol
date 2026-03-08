// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title AxolotlNFT
 * @dev ERC-721 NFT contract for Megaxolotls game
 * Each Axolotl is a unique NFT with metadata stored on-chain
 */
contract AxolotlNFT is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // Pet species enum
    enum PetSpecies {
        AXOLOTL,
        OTHER_SPECIES_1,
        OTHER_SPECIES_2,
        OTHER_SPECIES_3
    }

    // Axolotl color variations
    enum AxolotlColor {
        LEUCISTIC,
        MELANOID,
        GOLDEN,
        COPPER,
        WILD,
        ALBINO
    }

    // Morph stages for axolotls
    enum MorphStage {
        AXOLOL,      // Young stage (level 1)
        AXOLUMP,     // Adult stage (level 20)
        AXOLOOT      // Elder stage (level 50)
    }

    // Pet metadata structure
    struct PetMetadata {
        string name;
        PetSpecies species;
        uint256 level;
        uint256 experience;
        uint256 createdAt;
        address creator;
        // Axolotl-specific fields
        AxolotlColor axolotlColor;  // Only used for axolotls
        MorphStage morphStage;      // Only used for axolotls
    }

    // Mapping from tokenId to metadata
    mapping(uint256 => PetMetadata) public petMetadata;

    // Mapping for breeding cooldown (tokenId => last breeding timestamp)
    mapping(uint256 => uint256) public lastBreedingTime;
    
    // Breeding cooldown duration (24 hours)
    uint256 public constant BREEDING_COOLDOWN = 24 hours;

    // Events
    event PetMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string name,
        PetSpecies species
    );

    event PetLeveledUp(uint256 indexed tokenId, uint256 newLevel);

    event AxolotlMorphed(
        uint256 indexed tokenId,
        MorphStage oldStage,
        MorphStage newStage
    );

    event OffspringBred(
        uint256 indexed parentId1,
        uint256 indexed parentId2,
        uint256 indexed offspringId,
        address breeder
    );

    constructor() ERC721("MegaxolotlsNFT", "AXOLOTL") {}

    /**
     * @dev Mint a new Pet NFT
     * @param name The name of the Pet
     * @param species The species of the Pet
     * @param axolotlColor The color code (only for axolotls)
     */
    function mintPet(
        string memory name,
        PetSpecies species,
        AxolotlColor axolotlColor
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(msg.sender, tokenId);

        petMetadata[tokenId] = PetMetadata({
            name: name,
            species: species,
            level: 1,
            experience: 0,
            createdAt: block.timestamp,
            creator: msg.sender,
            axolotlColor: axolotlColor,
            morphStage: MorphStage.AXOLOL  // Start at young stage for axolotls
        });

        emit PetMinted(tokenId, msg.sender, name, species);

        return tokenId;
    }

    /**
     * @dev Mint a new Axolotl NFT (convenience function)
     */
    function mintAxolotl(
        string memory name,
        AxolotlColor color
    ) public returns (uint256) {
        return mintPet(name, PetSpecies.AXOLOTL, color);
    }

    /**
     * @dev Get Pet metadata
     */
    function getPetMetadata(uint256 tokenId)
        public
        view
        returns (PetMetadata memory)
    {
        require(_exists(tokenId), "Token does not exist");
        return petMetadata[tokenId];
    }

    /**
     * @dev Get Axolotl metadata (backward compatibility)
     */
    function getAxolotlMetadata(uint256 tokenId)
        public
        view
        returns (PetMetadata memory)
    {
        require(_exists(tokenId), "Token does not exist");
        return petMetadata[tokenId];
    }

    /**
     * @dev Update Pet experience (called by game contract)
     */
    function addExperience(uint256 tokenId, uint256 amount) public {
        require(_exists(tokenId), "Token does not exist");
        petMetadata[tokenId].experience += amount;

        // Level up every 100 experience (adjusted for better progression)
        uint256 newLevel = (petMetadata[tokenId].experience / 100) + 1;
        if (newLevel > petMetadata[tokenId].level) {
            petMetadata[tokenId].level = newLevel;
            emit PetLeveledUp(tokenId, newLevel);
            
            // Check for morph stage evolution (axolotls only)
            if (petMetadata[tokenId].species == PetSpecies.AXOLOTL) {
                _checkAndEvolveAxolotl(tokenId, newLevel);
            }
        }
    }

    /**
     * @dev Add experience and automatically evolve (convenience function for game logic)
     * Returns the new level and morph stage
     */
    function addExperienceWithEvolution(uint256 tokenId, uint256 amount)
        public
        returns (uint256 newLevel, MorphStage newMorphStage, bool evolved)
    {
        require(_exists(tokenId), "Token does not exist");
        
        uint256 oldLevel = petMetadata[tokenId].level;
        MorphStage oldMorphStage = petMetadata[tokenId].morphStage;
        
        // Add experience
        petMetadata[tokenId].experience += amount;
        
        // Calculate new level
        newLevel = (petMetadata[tokenId].experience / 100) + 1;
        
        // Update level and check for evolution
        if (newLevel > oldLevel) {
            petMetadata[tokenId].level = newLevel;
            emit PetLeveledUp(tokenId, newLevel);
            
            // Check for morph stage evolution (axolotls only)
            if (petMetadata[tokenId].species == PetSpecies.AXOLOTL) {
                _checkAndEvolveAxolotl(tokenId, newLevel);
            }
        }
        
        newMorphStage = petMetadata[tokenId].morphStage;
        evolved = (newMorphStage != oldMorphStage);
        
        return (newLevel, newMorphStage, evolved);
    }

    /**
     * @dev Check if axolotl should evolve to next morph stage
     */
    function _checkAndEvolveAxolotl(uint256 tokenId, uint256 newLevel) internal {
        MorphStage currentStage = petMetadata[tokenId].morphStage;
        MorphStage newStage = currentStage;

        if (newLevel >= 50 && currentStage != MorphStage.AXOLOOT) {
            newStage = MorphStage.AXOLOOT;
        } else if (newLevel >= 20 && currentStage == MorphStage.AXOLOL) {
            newStage = MorphStage.AXOLUMP;
        }

        if (newStage != currentStage) {
            petMetadata[tokenId].morphStage = newStage;
            emit AxolotlMorphed(tokenId, currentStage, newStage);
        }
    }

    /**
     * @dev Get current morph stage of an axolotl
     */
    function getAxolotlMorphStage(uint256 tokenId)
        public
        view
        returns (MorphStage)
    {
        require(_exists(tokenId), "Token does not exist");
        return petMetadata[tokenId].morphStage;
    }

    /**
     * @dev Get current level of a pet
     */
    function getPetLevel(uint256 tokenId)
        public
        view
        returns (uint256)
    {
        require(_exists(tokenId), "Token does not exist");
        return petMetadata[tokenId].level;
    }

    /**
     * @dev Get current experience of a pet
     */
    function getPetExperience(uint256 tokenId)
        public
        view
        returns (uint256)
    {
        require(_exists(tokenId), "Token does not exist");
        return petMetadata[tokenId].experience;
    }

    /**
     * @dev Get total Pets minted
     */
    function getTotalPets() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    /**
     * @dev Get all Pets owned by an address
     */
    function getPetsByOwner(address owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](balance);

        for (uint256 i = 0; i < balance; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }

        return tokenIds;
    }

    /**
     * @dev Get all Axolotls owned by an address (backward compatibility)
     */
    function getAxolotlsByOwner(address owner)
        public
        view
        returns (uint256[] memory)
    {
        return getPetsByOwner(owner);
    }

    // Required overrides
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Breed two Axolotls to create offspring
     * @param parentId1 Token ID of first parent
     * @param parentId2 Token ID of second parent
     * @param offspringName Name for the offspring
     * @param offspringColor Color for the offspring
     * @return offspringId Token ID of the new offspring
     */
    function breedAxolotls(
        uint256 parentId1,
        uint256 parentId2,
        string memory offspringName,
        AxolotlColor offspringColor
    ) public returns (uint256 offspringId) {
        // Validate parents exist
        require(_exists(parentId1), "Parent 1 does not exist");
        require(_exists(parentId2), "Parent 2 does not exist");
        
        // Validate parents are axolotls
        require(
            petMetadata[parentId1].species == PetSpecies.AXOLOTL,
            "Parent 1 must be an Axolotl"
        );
        require(
            petMetadata[parentId2].species == PetSpecies.AXOLOTL,
            "Parent 2 must be an Axolotl"
        );
        
        // Validate caller owns both parents
        require(
            ownerOf(parentId1) == msg.sender,
            "You must own Parent 1"
        );
        require(
            ownerOf(parentId2) == msg.sender,
            "You must own Parent 2"
        );
        
        // Check breeding cooldown
        require(
            block.timestamp >= lastBreedingTime[parentId1] + BREEDING_COOLDOWN,
            "Parent 1 is on breeding cooldown"
        );
        require(
            block.timestamp >= lastBreedingTime[parentId2] + BREEDING_COOLDOWN,
            "Parent 2 is on breeding cooldown"
        );
        
        // Mint offspring
        offspringId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(msg.sender, offspringId);
        
        // Set offspring metadata (inherits from parents)
        petMetadata[offspringId] = PetMetadata({
            name: offspringName,
            species: PetSpecies.AXOLOTL,
            level: 1,
            experience: 0,
            createdAt: block.timestamp,
            creator: msg.sender,
            axolotlColor: offspringColor,
            morphStage: MorphStage.AXOLOL
        });
        
        // Set breeding cooldown for parents
        lastBreedingTime[parentId1] = block.timestamp;
        lastBreedingTime[parentId2] = block.timestamp;
        
        // Emit breeding event
        emit OffspringBred(parentId1, parentId2, offspringId, msg.sender);
        
        return offspringId;
    }

    /**
     * @dev Check if an Axolotl can breed (not on cooldown)
     */
    function canBreed(uint256 tokenId) public view returns (bool) {
        require(_exists(tokenId), "Token does not exist");
        return block.timestamp >= lastBreedingTime[tokenId] + BREEDING_COOLDOWN;
    }

    /**
     * @dev Get remaining breeding cooldown time in seconds
     */
    function getBreedingCooldown(uint256 tokenId)
        public
        view
        returns (uint256)
    {
        require(_exists(tokenId), "Token does not exist");
        uint256 cooldownEnd = lastBreedingTime[tokenId] + BREEDING_COOLDOWN;
        if (block.timestamp >= cooldownEnd) {
            return 0;
        }
        return cooldownEnd - block.timestamp;
    }

    /**
     * @dev Get morph stage name for display
     */
    function getMorphStageName(MorphStage stage)
        public
        pure
        returns (string memory)
    {
        if (stage == MorphStage.AXOLOL) return "Axolol";
        if (stage == MorphStage.AXOLUMP) return "Axolump";
        if (stage == MorphStage.AXOLOOT) return "Axoloot";
        return "Unknown";
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        try this.ownerOf(tokenId) returns (address owner) {
            return owner != address(0);
        } catch {
            return false;
        }
    }
}
