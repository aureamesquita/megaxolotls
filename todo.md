# Megaxolotls - Project TODO

## Phase 1: Web3 Infrastructure (COMPLETED)
- [x] Install and configure Web3Modal + Viem
- [x] Implement wallet connection (MetaMask, WalletConnect)
- [x] Create wallet context provider
- [x] Add wallet connection UI component
- [x] Add MegaETH network configuration (chainID 4326)
- [x] Create chains.ts com MegaETH chain definition
- [x] Create megaeth.ts com constantes e helpers
- [x] Update Web3Context com MegaETH como rede principal
- [x] Update WalletConnect para mostrar MegaETH (4326)

## Phase 2: Smart Contract Integration (CURRENT)
- [x] Create example Solidity smart contract (ERC-721 Pet NFT with morph stages)
- [x] Support multiple pet species (Axolotl + 3 slots for future species)
- [x] Implement 3 morph stages for Axolotls (Axolol → Axolump → Axoloot)
- [x] Create contract ABI and types with morph stage enums
- [ ] Deploy contract to MegaETH testnet
- [ ] Implement contract interaction functions (mint, transfer, getBalance)
- [ ] Add contract read/write examples in tRPC procedures

## Phase 3: Animation System
- [x] Install Framer Motion
- [ ] Create SVG sprite components for Axolotls
- [ ] Implement idle animation example
- [ ] Implement movement animation example
- [ ] Implement attack animation example
- [ ] Create animation state machine
- [ ] Add gesture animations (hover, click)



## Phase 6: UI/UX Design (FUTURE)
- [ ] Implement cyberpunk/neon theme
- [ ] Create color palette and design tokens
- [ ] Style main layout with sidebar navigation
- [ ] Add glow effects and neon styling
- [ ] Implement responsive design

## Phase 7: Database Integration (FUTURE)
- [ ] Design Axolotl data model
- [ ] Create users table with wallet integration
- [ ] Create axolotls table
- [ ] Create battles table
- [ ] Create care_logs table
- [ ] Create migrations and apply to database
- [ ] Create tRPC procedures for pet management
- [ ] Create tRPC procedures for battle system
- [ ] Create tRPC procedures for care actions
- [ ] Implement battle history logging
- [ ] Add wallet address verification

## Phase 4.5: Move Cards System (COMPLETED)
- [x] Create MoveCard component with design inspirado em card game
- [x] Implement 4-card grid layout para mock de batalhas
- [x] Add zoom animation ao passar dedo (mobile) ou hover (desktop)
- [x] Implementar fullscreen preview de card selecionado
- [x] Add move data structure (name, type, damage, cost, effects)
- [x] Create mock moves data para Axolotls
- [x] Create BattleDemo page com 4 cards de movimentos
- [x] Add rota /battle-demo no App.tsx

## Phase 7: Pet Display & Animations (FUTURE)
- [ ] Create Axolotl display component with animations
- [ ] Implement pet stats display
- [ ] Implement idle animation
- [ ] Implement movement animation
- [ ] Implement attack animation
- [ ] Create animation state machine
- [ ] Add gesture animations (hover, click)

## Phase 8: Battle System (FUTURE)
- [ ] Create battle system logic (turn-based, in-memory)
- [ ] Implement battle UI and animations
- [ ] Create care panel (feeding, training, in-memory)
- [ ] Implement experience and leveling system

## Phase 9: Testing & Polish
- [ ] Write unit tests for battle logic
- [ ] Write integration tests for wallet connection
- [ ] Test animations performance
- [ ] Test responsive design
- [ ] Performance optimization
- [ ] Bug fixes and refinements

## Phase 9: Documentation & Deployment
- [ ] Create README with setup instructions
- [ ] Document smart contract functions
- [ ] Document API endpoints
- [ ] Create deployment guide
- [ ] Final testing on MegaETH
