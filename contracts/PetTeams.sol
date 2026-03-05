// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PetTeams
 * @dev ERC-721 contract for managing Axolotl teams (compositions of 1-3 pets)
 * Each team is an NFT that holds references to pet IDs and tracks team stats
 */
contract PetTeams is ERC721, Ownable {
    struct Team {
        address owner;
        uint256[] petIds; // Array of pet IDs in this team (max 3)
        uint256 totalPower; // Sum of pet powers
        uint256 wins;
        uint256 losses;
        string name;
        uint256 createdAt;
    }

    mapping(uint256 => Team) public teams;
    uint256 public teamCounter;

    event TeamCreated(uint256 indexed teamId, address indexed owner, string name);
    event PetAddedToTeam(uint256 indexed teamId, uint256 indexed petId);
    event PetRemovedFromTeam(uint256 indexed teamId, uint256 indexed petId);
    event TeamRenamed(uint256 indexed teamId, string newName);
    event BattleRecorded(uint256 indexed teamId, bool won);

    constructor() ERC721("Megaxolotls PetTeams", "MXTEAM") {}

    /**
     * @dev Create a new team
     * @param _name Team name
     * @param _initialPetIds Array of initial pet IDs (1-3 pets)
     */
    function createTeam(
        string memory _name,
        uint256[] calldata _initialPetIds
    ) external returns (uint256) {
        require(_initialPetIds.length > 0 && _initialPetIds.length <= 3, "Team must have 1-3 pets");
        require(bytes(_name).length > 0 && bytes(_name).length <= 50, "Invalid team name");

        uint256 teamId = teamCounter++;
        
        Team storage newTeam = teams[teamId];
        newTeam.owner = msg.sender;
        newTeam.name = _name;
        newTeam.createdAt = block.timestamp;

        for (uint256 i = 0; i < _initialPetIds.length; i++) {
            newTeam.petIds.push(_initialPetIds[i]);
        }

        _mint(msg.sender, teamId);
        emit TeamCreated(teamId, msg.sender, _name);

        return teamId;
    }

    /**
     * @dev Add a pet to an existing team
     * @param _teamId Team ID
     * @param _petId Pet ID to add
     */
    function addPetToTeam(uint256 _teamId, uint256 _petId) external {
        require(ownerOf(_teamId) == msg.sender, "Not team owner");
        require(teams[_teamId].petIds.length < 3, "Team is full");

        teams[_teamId].petIds.push(_petId);
        emit PetAddedToTeam(_teamId, _petId);
    }

    /**
     * @dev Remove a pet from a team
     * @param _teamId Team ID
     * @param _petIndex Index of pet in team array
     */
    function removePetFromTeam(uint256 _teamId, uint256 _petIndex) external {
        require(ownerOf(_teamId) == msg.sender, "Not team owner");
        require(_petIndex < teams[_teamId].petIds.length, "Invalid pet index");
        require(teams[_teamId].petIds.length > 1, "Team must have at least 1 pet");

        uint256[] storage petIds = teams[_teamId].petIds;
        uint256 removedPetId = petIds[_petIndex];

        // Move last element to removed position
        petIds[_petIndex] = petIds[petIds.length - 1];
        petIds.pop();

        emit PetRemovedFromTeam(_teamId, removedPetId);
    }

    /**
     * @dev Rename a team
     * @param _teamId Team ID
     * @param _newName New team name
     */
    function renameTeam(uint256 _teamId, string memory _newName) external {
        require(ownerOf(_teamId) == msg.sender, "Not team owner");
        require(bytes(_newName).length > 0 && bytes(_newName).length <= 50, "Invalid team name");

        teams[_teamId].name = _newName;
        emit TeamRenamed(_teamId, _newName);
    }

    /**
     * @dev Record battle result
     * @param _teamId Team ID
     * @param _won Whether the team won
     */
    function recordBattle(uint256 _teamId, bool _won) external onlyOwner {
        if (_won) {
            teams[_teamId].wins++;
        } else {
            teams[_teamId].losses++;
        }
        emit BattleRecorded(_teamId, _won);
    }

    /**
     * @dev Get team info
     * @param _teamId Team ID
     */
    function getTeam(uint256 _teamId)
        external
        view
        returns (
            address owner,
            uint256[] memory petIds,
            uint256 wins,
            uint256 losses,
            string memory name,
            uint256 createdAt
        )
    {
        Team storage team = teams[_teamId];
        return (team.owner, team.petIds, team.wins, team.losses, team.name, team.createdAt);
    }

    /**
     * @dev Get team pet count
     * @param _teamId Team ID
     */
    function getTeamPetCount(uint256 _teamId) external view returns (uint256) {
        return teams[_teamId].petIds.length;
    }

    /**
     * @dev Get team win rate
     * @param _teamId Team ID
     */
    function getTeamWinRate(uint256 _teamId) external view returns (uint256) {
        Team storage team = teams[_teamId];
        uint256 totalBattles = team.wins + team.losses;
        if (totalBattles == 0) return 0;
        return (team.wins * 100) / totalBattles;
    }
}
