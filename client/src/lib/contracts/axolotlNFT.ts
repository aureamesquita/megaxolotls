/**
 * Axolotl NFT Contract ABI and Configuration
 */

export const AXOLOTL_NFT_ABI = [
  // Enums
  {
    type: 'enum',
    name: 'PetSpecies',
    values: ['AXOLOTL', 'OTHER_SPECIES_1', 'OTHER_SPECIES_2', 'OTHER_SPECIES_3'],
  },
  {
    type: 'enum',
    name: 'AxolotlColor',
    values: ['LEUCISTIC', 'MELANOID', 'GOLDEN', 'COPPER', 'WILD', 'ALBINO'],
  },
  {
    type: 'enum',
    name: 'MorphStage',
    values: ['AXOLOL', 'AXOLUMP', 'AXOLOOT'],
  },
  {
    type: 'constructor',
    inputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'PetMinted',
    inputs: [
      { name: 'tokenId', type: 'uint256', indexed: true },
      { name: 'owner', type: 'address', indexed: true },
      { name: 'name', type: 'string', indexed: false },
      { name: 'species', type: 'uint8', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'PetLeveledUp',
    inputs: [
      { name: 'tokenId', type: 'uint256', indexed: true },
      { name: 'newLevel', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'AxolotlMorphed',
    inputs: [
      { name: 'tokenId', type: 'uint256', indexed: true },
      { name: 'oldStage', type: 'uint8', indexed: false },
      { name: 'newStage', type: 'uint8', indexed: false },
    ],
  },
  {
    type: 'function',
    name: 'mintPet',
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'species', type: 'uint8' },
      { name: 'axolotlColor', type: 'uint8' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'mintAxolotl',
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'color', type: 'uint8' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getPetMetadata',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        components: [
          { name: 'name', type: 'string' },
          { name: 'species', type: 'uint8' },
          { name: 'level', type: 'uint256' },
          { name: 'experience', type: 'uint256' },
          { name: 'createdAt', type: 'uint256' },
          { name: 'creator', type: 'address' },
          { name: 'axolotlColor', type: 'uint8' },
          { name: 'morphStage', type: 'uint8' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAxolotlMetadata',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        components: [
          { name: 'name', type: 'string' },
          { name: 'species', type: 'uint8' },
          { name: 'level', type: 'uint256' },
          { name: 'experience', type: 'uint256' },
          { name: 'createdAt', type: 'uint256' },
          { name: 'creator', type: 'address' },
          { name: 'axolotlColor', type: 'uint8' },
          { name: 'morphStage', type: 'uint8' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'addExperience',
    inputs: [
      { name: 'tokenId', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getTotalPets',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPetsByOwner',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTotalAxolotls',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAxolotlsByOwner',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getMorphStageName',
    inputs: [{ name: 'stage', type: 'uint8' }],
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ownerOf',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
] as const;

// Contract address (will be updated after deployment)
export const PET_NFT_ADDRESS = process.env.REACT_APP_PET_CONTRACT_ADDRESS || '';
export const AXOLOTL_NFT_ADDRESS = PET_NFT_ADDRESS; // Backward compatibility

// Pet species enum
export enum PetSpecies {
  AXOLOTL = 0,
  OTHER_SPECIES_1 = 1,
  OTHER_SPECIES_2 = 2,
  OTHER_SPECIES_3 = 3,
}

export const SPECIES_NAMES: Record<PetSpecies, string> = {
  [PetSpecies.AXOLOTL]: 'Axolotl',
  [PetSpecies.OTHER_SPECIES_1]: 'Species 1',
  [PetSpecies.OTHER_SPECIES_2]: 'Species 2',
  [PetSpecies.OTHER_SPECIES_3]: 'Species 3',
};

// Axolotl color enum
export enum AxolotlColor {
  LEUCISTIC = 0,
  MELANOID = 1,
  GOLDEN = 2,
  COPPER = 3,
  WILD = 4,
  ALBINO = 5,
}

export const COLOR_NAMES: Record<AxolotlColor, string> = {
  [AxolotlColor.LEUCISTIC]: 'Leucistic',
  [AxolotlColor.MELANOID]: 'Melanoid',
  [AxolotlColor.GOLDEN]: 'Golden',
  [AxolotlColor.COPPER]: 'Copper',
  [AxolotlColor.WILD]: 'Wild',
  [AxolotlColor.ALBINO]: 'Albino',
};

// Morph stage enum
export enum MorphStage {
  AXOLOL = 0,
  AXOLUMP = 1,
  AXOLOOT = 2,
}

export const MORPH_STAGE_NAMES: Record<MorphStage, string> = {
  [MorphStage.AXOLOL]: 'Axolol (Young)',
  [MorphStage.AXOLUMP]: 'Axolump (Adult)',
  [MorphStage.AXOLOOT]: 'Axoloot (Elder)',
};

export const MORPH_STAGE_LEVELS: Record<MorphStage, number> = {
  [MorphStage.AXOLOL]: 1,
  [MorphStage.AXOLUMP]: 20,
  [MorphStage.AXOLOOT]: 50,
};

export interface PetMetadata {
  name: string;
  species: PetSpecies;
  level: bigint;
  experience: bigint;
  createdAt: bigint;
  creator: string;
  axolotlColor: AxolotlColor;
  morphStage: MorphStage;
}

export interface PetNFT {
  tokenId: bigint;
  metadata: PetMetadata;
}
