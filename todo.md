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

## Phase 2: Smart Contract Integration (IN PROGRESS)
- [x] Create example Solidity smart contract (ERC-721 Pet NFT with morph stages)
- [x] Support multiple pet species (Axolotl + 3 slots for future species)
- [x] Implement 3 morph stages for Axolotls (Axolol → Axolump → Axoloot)
- [x] Create contract ABI and types with morph stage enums
- [ ] Deploy contract to MegaETH testnet
- [ ] Implement contract interaction functions (mint, transfer, getBalance)
- [ ] Add contract read/write examples in tRPC procedures

## Phase 2.5: Network Selector (COMPLETED)
- [x] Create NetworkSelector component com dropdown de redes
- [x] Implementar validação de chain ID
- [x] Add mensagem de aviso se conectado à rede errada
- [x] Botão para trocar de rede automaticamente no MetaMask
- [x] Integrar ao WalletConnect menu

## Phase 2.6: Onboarding Page (COMPLETED)
- [x] Create página /onboarding com instruções
- [x] Implementar botão "Add MegaETH to MetaMask" (wallet_addEthereumChain)
- [x] Verificação automática de rede após conexão
- [x] Redirecionamento para dashboard após setup
- [x] Design neon temático

## Phase 2.7: NFT Integration (COMPLETED)
- [x] Ler balance de Axolotls do contrato ERC-721
- [x] Exibir lista de NFTs possuídos
- [x] Mostrar metadata de cada Axolotl
- [x] Link para visualizar no block explorer
- [x] Integrar ao WalletConnect dropdown

## Phase 3: Splash Screen (COMPLETED)
- [x] Create epic landing page with cyberpunk/neon design
- [x] Add animated background grid and glow orbs
- [x] Implement "Connect Wallet" button (Ethereum login)
- [x] Add "Try Demo" button linking to battle demo
- [x] Create floating particles animation
- [x] Add feature cards (Collect, Battle, Web3 Native)
- [x] Responsive design for mobile/desktop
- [x] Integrate Web3Provider to main.tsx

## Phase 3.5: First-Use Flow (COMPLETED)
- [x] Create FirstUseScreen component (separate from splash)
- [x] Detect first-use via localStorage (hasSeenFirstUse flag)
- [x] Create Tutorial Screen com contador de tempo (localStorage)
- [x] Implement time tracking (minutes/hours played) - PlaytimeTracker global
- [x] Create Home Screen (Dashboard) com:
  - [x] Display endereço da carteira conectada
  - [x] Display rede (MegaETH, Chain ID)
  - [x] 2 token buttons (LIP e MEGAX) com ícone, count, nome
  - [x] Estrutura para ler balances dos contratos (futuro)
  - [x] Menu grid com 9 botões: Pets, Teams, Bag, Stadium, Care, Breed, Shop, Ranking, Changelog
  - [x] Settings button
- [x] Create PlaytimeTracker component (global, persistent)
- [x] Auto-redirect flow: Home → FirstUse → Tutorial → Dashboard
- [x] Add rotas ao App.tsx

## Phase 4: Animation System
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

## Phase 8: Token Balance Integration (NEXT)
- [ ] Connect useAxolotlBalance hook ao Dashboard
- [ ] Read LIP token balance do contrato
- [ ] Read MEGAX token balance do contrato
- [ ] Display balances em tempo real nos token cards
- [ ] Add refresh button para atualizar balances
- [ ] Implementar error handling para falhas de RPC

## Phase 9: Pets Gallery Page (NEXT)
- [ ] Create Pets page com galeria visual
- [ ] Display Axolotls possuídos com imagens
- [ ] Show stats (level, experience, morph stage)
- [ ] Display rarity e tipo de espécie
- [ ] Add "Battle" button para cada pet
- [ ] Add "Evolve" button se elegível
- [ ] Implementar filtros (rarity, species, level)
- [ ] Add sorting options (level, rarity, newest)



## Phase 11: Battle System (IN PROGRESS)
- [x] Create battle system logic (turn-based, in-memory)
- [x] Implement battle UI and animations
- [x] Fix draw condition (both HP = 0)
- [x] Add Axolotl placeholder images in battle arena
- [x] Add Struggle move (5th move when no moves left)
- [ ] Create care panel (feeding, training, in-memory)
- [ ] Implement experience and leveling system

## Phase 12: Changelog Page (COMPLETED)
- [x] Create Changelog page component
- [x] Parse .git logs from repository (mock data)
- [x] Display commit history with date, author, message
- [x] Add filtering/sorting by date
- [x] Style com tema cyberpunk/neon
- [x] Add rota /changelog ao App.tsx
- [x] Add link no Dashboard

## Phase 13: Settings Page (COMPLETED)
- [x] Create Settings page component
- [x] Add sound toggle (on/off)
- [x] Add music volume slider
- [x] Add SFX volume slider
- [x] Add dialog frame selector (4 estilos: classic, neon, cyberpunk, minimal)
- [x] Persist settings em localStorage
- [x] Add logout button
- [x] Add account info display
- [x] Add rota /settings ao App.tsx
- [x] Add link no Dashboard

## Phase 14: API & Data Integration (NEXT)
- [ ] Create /api/commits endpoint para ler histórico do .git
- [ ] Update Changelog page para usar API em vez de mock data
- [ ] Implement XP & Leveling system
- [ ] Add level-up automático e evolução para Axolump/Axoloot
- [ ] Implement experience tracking em localStorage

## Phase 15: Pets Gallery Page (COMPLETED)
- [x] Create Pets page component com modal de detalhes
- [x] Display Axolotls possuídos com imagens (mock data)
- [x] Add filtros (rarity, species)
- [x] Add sorting options (level, rarity, newest)
- [x] Add "Battle" button para cada pet
- [x] Add link no Dashboard
- [x] Add rota /pets ao App.tsx
- [x] Create 49 testes passando (8 novos testes de Pets)

## Phase 16: Teams Screen & Contract (NEXT)
- [ ] Create Teams page component
- [ ] Design Megaxolotl PetTeams smart contract (.sol)
- [ ] Implement team building UI
- [ ] Add team composition limits
- [ ] Add team stats display
- [ ] Add rota /teams ao App.tsx

## Phase 17: Bag Screen & Items System (NEXT)
- [ ] Create Bag page component
- [ ] Display LIP token com count badge
- [ ] Design Megaxolotl PetItems Dex smart contract (.sol)
- [ ] Design Megaxolotl PetItems semi-fungible contract (.sol)
- [ ] Create items inventory display
- [ ] Leave space para expandir item types
- [ ] Add rota /bag ao App.tsx

## Phase 18: Demo Hub Navigation (COMPLETED)
- [x] Create DemoHub page (/demo-hub) com navegação para Battle e Care
- [x] Update "Try Demo" button em Home.tsx para navegar a /demo-hub
- [x] Remove Battle e Care buttons do splash screen (Home.tsx)
- [x] Adicionar rota /demo-hub ao App.tsx
- [x] Implementar design neon temático com feature cards

## Phase 19: Care Rooms System (COMPLETED)
- [x] Create Care page com room selector
- [x] Implement 6 rooms: Hall, Bedroom, Cozy, Medsroom, Playroom, Breedroom
- [x] Design room UI com tema cyberpunk
- [x] Add care actions por room
- [x] Implement room effects em stats
- [x] Add rota /care ao App.tsx

## Phase 20: Testing & Polish
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

## Phase 21: Web3 Token Balance Integration (COMPLETED)
- [x] Criar hook useLIPBalance para ler saldo de LIP token
- [x] Criar hook useMAGAXBalance para ler saldo de MEGAX token
- [x] Integrar hooks no Dashboard para exibir balances em tempo real
- [x] Adicionar loading states durante fetch de balances
- [x] Implementar error handling para falhas de RPC
- [ ] Adicionar refresh button para atualizar balances (futuro)

## Phase 22: Teams Screen (COMPLETED)
- [x] Criar página /teams com interface de composição de times
- [x] Exibir Axolotls disponíveis para adicionar ao time
- [x] Mostrar stats agregados do time
- [x] Adicionar limite de composição (máximo 3 pets por time)
- [x] Botão para salvar/atualizar time
- [x] Add rota /teams ao App.tsx
- [ ] Implementar drag-and-drop para composição de time (futuro)
- [ ] Integrar com smart contract PetTeams (futuro)

## Phase 24: Care & Demo App Redesign (COMPLETED)
- [x] Redesenhar DemoHub como app menu screen (menos marketing, mais app)
- [x] Redesenhar Care Room com estilo Tamagotchi (pet animado, botões de ação)
- [x] Implementar mécanicas de pet care (feed, play, sleep, pet)
- [x] Sistema de mood/happiness do pet com feedback visual
- [x] Animações de feedback (emoji, bounces, scale)
- [x] Stats display com progress bars (hunger, happiness, energy)
- [x] Design mobile-first (top bar, centered content, action buttons)
- [x] Disabled states para botões (baseado em stats)

## Phase 25: XP System with Smart Contract Integration (COMPLETED)
- [x] Atualizar contrato AxolotlNFT com função addExperienceWithEvolution
- [x] Adicionar funções getter: getAxolotlMorphStage, getPetLevel, getPetExperience
- [x] Criar hook useXPSystem para gerenciar XP e evolução
- [x] Criar hook useContractXP para interagir com contrato (mock)
- [x] Implementar lógica de evolução: Axolol (lvl 1) → Axolump (lvl 20) → Axoloot (lvl 50)
- [x] Persistência de XP em localStorage
- [x] Função getBattleXPReward para cálculo de XP por batalha

## Phase 26: Pet State Persistence (COMPLETED)
- [x] Adicionar persistência de pet state no Care (hunger, happiness, energy)
- [x] Salvar estado em localStorage ao executar ações
- [x] Carregar estado ao abrir Care page
- [x] Manter estado entre sessões

## Phase 27: Bag Screen - Inventory System (COMPLETED)
- [x] Criar página /bag com inventário de itens
- [x] Exibir LIP token badge com saldo
- [x] Grid de itens com raridade (common, uncommon, rare, epic, legendary)
- [x] Sistema de cores por raridade
- [x] Painel de detalhes de item selecionado
- [x] Botão "Use Item" para consumir itens
- [x] Design app mobile-first (top bar, centered content)
- [x] Add rota /bag ao App.tsx
- [x] Mock data com 5 tipos de itens

## Phase 28: Smart Contracts - PetTeams, PetItemsDex, PetItems (COMPLETED)
- [x] Criar contrato PetTeams (ERC-721) para team building
- [x] Implementar funções: createTeam, addPetToTeam, removePetFromTeam, renameTeam, recordBattle
- [x] Adicionar getters: getTeam, getTeamPetCount, getTeamWinRate
- [x] Criar contrato PetItemsDex (registry de itens)
- [x] Implementar funções: addItem, updateItem, deactivateItem, incrementSupply
- [x] Criar contrato PetItems (ERC-1155 semi-fungível)
- [x] Implementar funções: mintItem, burnItem, tradeItem
- [x] Adicionar getters: getUserItemCount, getItemBalance, getTotalMints

## Phase 29: Teams Screen UI (COMPLETED)
- [x] Redesenhar Teams.tsx com novo design
- [x] Implementar seletor de raridade com cores
- [x] Adicionar grid de pets disponíveis
- [x] Mostrar stats agregados do time
- [x] Botão "Save Team to Contract" com loading state
- [x] Validação de limite de 3 pets
- [x] Animações Framer Motion

## Phase 30: Bag Screen with PetItems Integration (COMPLETED)
- [x] Redesenhar Bag.tsx com novo design
- [x] Adicionar LIP token badge destacado no topo
- [x] Mostrar PetItems com raridade e quantidade
- [x] Painel de detalhes de item selecionado
- [x] Botão "Use Item" funcional
- [x] Placeholder para PetItems Dex
- [x] Animações e feedback visual

## Phase 31: DemoHub Navigation Update (COMPLETED)
- [x] Adicionar botão "Teams" ao DemoHub
- [x] Adicionar botão "Bag" ao DemoHub
- [x] Atualizar cores e emojis
- [x] Manter navegação funcional

## Phase 32: Testing & Validation (COMPLETED)
- [x] 60 testes passando
- [x] Dev server rodando sem erros
- [x] TypeScript sem erros
- [x] Todas as páginas funcionando

## Phase 23: PetTeams Smart Contract (FUTURE)
- [ ] Deploy contrato PetTeams no MegaETH testnet
- [ ] Deploy contrato PetItemsDex no MegaETH testnet
- [ ] Deploy contrato PetItems no MegaETH testnet
- [ ] Integrar Web3 hooks para interagir com contratos

## Phase 33: Shop Screen - Item Store (COMPLETED)
- [x] Criar página /shop com grid de itens para compra
- [x] Exibir itens com preço em LIP tokens
- [x] Implementar sistema de compra com validação de saldo
- [x] Adicionar feedback visual (animações, check mark de compra)
- [x] Mostrar saldo de LIP tokens no header
- [x] Integrar ao DemoHub (botão Shop)
- [x] Mock data com 10 itens para compra (3 categorias: consumable, equipment, axolotl)
- [x] Preparar estrutura para compra de Axolotls (futuro)
- [x] Add rota /shop ao App.tsx
- [x] Item details panel com descrição completa
- [x] Animações de purchase com sparkle emoji

## Phase 34: Breeding System - Genetics & Inheritance (COMPLETED)
- [x] Criar sistema de genética com traits herdáveis (color, pattern, size, ability)
- [x] Implementar algoritmo de herança Mendeliana (dominant/recessive traits)
- [x] Criar hook useBreedingLogic para gerenciar cruzamento
- [x] Implementar cálculo de compatibilidade entre pais
- [x] Adicionar cooldown de reprodução (breeding cooldown)
- [x] Criar Breed Screen (/breed) com seletor de pais
- [x] Implementar UI para visualizar traits dos pais
- [x] Adicionar preview do offspring potencial
- [x] Implementar animações de breeding e eclosion (egg hatching)
- [x] Adicionar custo de breeding (500 LIP tokens)
- [x] Persistir offspring em localStorage
- [x] Add rota /breed ao App.tsx
- [x] Criar 12 testes para sistema de breeding
- [x] Adicionar botão Breed ao DemoHub
