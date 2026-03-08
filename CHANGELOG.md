# Megaxolotls - Changelog

## [d8e4326] - 2026-03-08 - Elemental Types Display in Battle Arena

### Added
- **Elemental Type Display**
  - Type badges for each Axolotl in battle (💧 Water, 🔥 Fire)
  - Attack type display on move buttons
  - `elementalType` field added to Move interface
  - 6 elemental types with emoji and colors

### Modified
- `BattleArena.tsx`: Added type badges for player and enemy
- `shared/types.ts`: Added `elementalType` field to Move interface
- Move buttons now display attack type

---

## [bc174fa] - 2026-03-08 - Breeding Contract Integration

### Added
- **Breeding Smart Contract Functions**
  - `breedAxolotls()` function in AxolotlNFT contract
  - On-chain validation of breeding requirements
  - 24-hour cooldown enforcement
  - Offspring minting as new NFTs with inherited genes
  - `OffspringBred` event emission

- **Web3 Integration**
  - `useBreedingContract` hook for contract interaction
  - Mock transaction handling with loading states
  - Breeding feedback visual (⏳ → 🔗 → ✅)

- **Contract Functions**
  - `canBreed(tokenId)`: Check if pet can breed
  - `getBreedingCooldown(tokenId)`: Get cooldown remaining
  - `getBreedableAxolotls()`: List breedable pets

---

## [629aaef] - 2026-03-07 - Type Matching System & Changelog

### Added
- **Type Matching System**
  - 6 elemental types: Water, Fire, Grass, Electric, Ice, Normal
  - Type effectiveness matrix (2x/0.5x/1x damage)
  - STAB (Same Type Attack Bonus) system (1.5x multiplier)
  - Dynamic damage calculation in battle simulator

- **Changelog Page**
  - Git commit history display
  - Date and author information
  - Filtering and sorting capabilities

- **Documentation**
  - `CHANGELOG.md` created with feature history
  - `todo.md` updated with pending Solidity features

---

## [d6d300e] - 2026-03-07 - Breeding System with Mendelian Genetics

### Added
- **Breeding System**
  - `useBreedingLogic` hook with trait inheritance
  - Mendelian genetics (dominant/recessive traits)
  - Compatibility calculation (0-100%)
  - Offspring generation with inherited genes
  - 24-hour breeding cooldown
  - Offspring rarity calculation

- **Breed Screen** (`/breed`)
  - Parent selection UI
  - Real-time compatibility display
  - Trait visualization
  - Egg hatching animation
  - Offspring persistence in localStorage
  - 500 LIP token breeding cost

- **Tests**
  - 12 new breeding system tests
  - Trait inheritance validation
  - Compatibility tests
  - Cooldown system tests

---

## [3ac8675] - 2026-03-07 - Shop Screen & Item Store

### Added
- **Shop Screen** (`/shop`)
  - Grid of 10 purchasable items
  - 3 item categories: consumable, equipment, axolotl (future)
  - Rarity-based visual styling
  - LIP token balance validation
  - Item details panel
  - Purchase animations with sparkle emoji
  - Check marks for purchased items

- **Integration**
  - Shop button added to DemoHub
  - `/shop` route in App.tsx

---

## [89835a8] - 2026-03-07 - Teams, Bag & Smart Contracts

### Added
- **3 Smart Contracts**
  - `PetTeams.sol` (ERC-721): Team management and composition
  - `PetItemsDex.sol`: Registry of available items
  - `PetItems.sol` (ERC-1155): Semi-fungible item contract

- **Teams Screen** (`/teams`)
  - Team building UI with pet selection
  - Stats aggregation
  - Maximum 3 pets per team
  - Save to contract functionality

- **Bag Screen** (`/bag`)
  - LIP token badge with count
  - PetItems grid with rarities
  - Item details panel
  - Use Item functionality
  - Space for PetItems Dex expansion

- **Navigation**
  - Teams and Bag buttons added to DemoHub
  - Routes added to App.tsx

---

## [579f49d] - 2026-03-07 - Care Room Environments & Actions

### Added
- **Room Environments**
  - 6 unique room backgrounds with transitions
  - Hall (purple), Bedroom (blue), Cozy (orange), Medsroom (green), Playroom (pink), Breedroom (yellow)

- **Room-Specific Actions**
  - Explore (Hall): +20 happiness
  - Rest (Bedroom): +30 energy
  - Relax (Cozy): +25 happiness
  - Heal (Medsroom): +40 health
  - Play (Playroom): +35 happiness, +15 XP
  - Breed (Breedroom): Breeding preparation

- **Visual Feedback**
  - Neon-cyan/green action buttons
  - Emoji and bonus display
  - Disabled states based on stats

---

## [c9a7d71] - 2026-03-07 - Care Room Selector

### Added
- **Room Navigation**
  - 6 rooms with emoji and colors
  - Left/right arrow navigation
  - Circular navigation (loops around)
  - Room card display with smooth transitions
  - Header with room title and selector

---

## [a12f2f3] - 2026-03-05 - Nested Button Fix

### Fixed
- Removed nested `<button>` elements in Pets.tsx
- Changed `motion.button` to `motion.div` for pet cards
- Maintained interactivity with onClick handlers

---

## [2387da0] - 2026-03-05 - XP System & Pet Persistence

### Added
- **XP System**
  - `useXPSystem` hook for XP and level management
  - `useContractXP` hook for Web3 interaction (mock)
  - Automatic evolution: Axolol (lvl 1) → Axolump (lvl 20) → Axoloot (lvl 50)
  - XP persistence in localStorage

- **Pet State Persistence**
  - Hunger, happiness, energy saved to localStorage
  - State loaded on Care page open
  - Maintains state between sessions

- **Bag Screen**
  - Inventory of items with rarities
  - LIP token badge
  - Item use functionality
  - 5 mock item types

---

## [7f9d422] - 2026-03-05 - App-Style Redesign

### Added
- **DemoHub Redesign**
  - App menu screen style (less marketing, more app)
  - 3 feature cards: Battle Arena, Care Rooms, Pet Gallery
  - Mobile-first design

- **Care Room Redesign**
  - Tamagotchi-style interface
  - Animated pet with mood system
  - 4 action buttons: Feed, Play, Sleep, Pet
  - Stats display with progress bars
  - Feedback animations with emojis

---

## [a59bb05] - 2026-03-05 - Web3 Token Balance Integration

### Added
- **Web3 Hooks**
  - `useTokenBalance`: Generic token balance hook
  - `useLIPBalance`: LIP token balance
  - `useMAGAXBalance`: MEGAX token balance
  - `useGameTokenBalances`: Combined hook for both tokens

- **Dashboard Integration**
  - Real-time token balance display
  - Loading states during fetch
  - Error handling for RPC failures

---

## [48a9713] - 2026-03-04 - setState During Render Fix

### Fixed
- Moved redirect logic from render to useEffect in Dashboard
- Resolved "Cannot update a component (Route) while rendering a different component (Dashboard)" error
- Added proper dependency array to useEffect

---

## [292022d] - 2026-03-04 - DemoHub Navigation

### Added
- **DemoHub Page** (`/demo-hub`)
  - Navigation hub for demo features
  - Battle Arena, Care Rooms, Pet Gallery buttons
  - Neon-themed design with Framer Motion animations
  - Back button to Home

- **Home.tsx Update**
  - "Try Demo" button now navigates to `/demo-hub`
  - Battle and Care buttons removed from splash screen

---

## [c4471bf] - 2026-03-04 - Battle & Care Buttons

### Added
- Battle and Care buttons added to Home landing page
- Animated buttons with Framer Motion
- Neon color scheme integration

---

## [810e58a] - 2026-03-04 - Care Rooms System

### Added
- **Care Rooms** (`/care`)
  - 6 rooms: Hall, Bedroom, Cozy, Medsroom, Playroom, Breedroom
  - Room selector with navigation
  - Care actions: Feed, Play, Sleep, Pet
  - Room-specific effects on stats
  - 24-hour cooldown per action
  - Mock data with Axolotl stats

- **Tests**
  - 11 new Care Rooms tests
  - Action validation tests
  - Cooldown system tests

---

## [fe8e557] - 2026-03-04 - Pets Gallery Page

### Added
- **Pets Gallery** (`/pets`)
  - Display of owned Axolotls
  - Filters: rarity, species
  - Sorting: level, rarity, newest
  - Pet details modal
  - Battle button for each pet
  - Mock data with 4 Axolotls

- **Tests**
  - 8 new Pets page tests

---

## [58ed72c] - 2026-03-03 - Changelog & Settings

### Added
- **Changelog Page** (`/changelog`)
  - Git commit history display
  - Mock data with 20 commits
  - Date and author information

- **Settings Page** (`/settings`)
  - Sound toggle (on/off)
  - Music volume slider
  - SFX volume slider
  - Dialog frame selector (4 styles)
  - Logout button
  - Account info display
  - localStorage persistence

---

## [ec5b3b8] - 2026-03-03 - Draw Condition & Pet Images

### Fixed
- Draw condition now shows 🤝 DRAW when both HP reach 0
- Added Axolotl images in battle arena
- Player and enemy pet images from CDN

---

## [461de19] - 2026-03-03 - Battle System

### Added
- **Battle Arena** (`/battle-demo`)
  - Turn-based combat system
  - HP and Energy bars with animations
  - AI opponent logic
  - 4 move selection buttons
  - Battle log with action history
  - Victory/Defeat/Draw conditions
  - New Battle button to restart

- **Tests**
  - 41 battle system tests

---

## Project Start - 2026-03-01

### Initial Setup
- Web3 infrastructure with Viem and Web3Modal
- MegaETH network configuration (chainID 4326)
- Wallet connection with MetaMask and WalletConnect
- Onboarding page with network setup
- NFT integration for Axolotl display
- Splash screen with cyberpunk/neon design
- First-use flow with tutorial
- Dashboard with token balance display
- Framer Motion animations throughout
