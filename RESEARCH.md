# Megaxolotls - Pesquisa de Tecnologias

## Web3 Integration

### WalletConnect & Web3Modal
- **WalletConnect**: Protocolo de conectividade para 700+ wallets e 70K+ apps
- **Web3Modal**: Ferramenta padrão para integração de múltiplas carteiras (MetaMask, WalletConnect, Coinbase Wallet)
- **Suporte**: 54M+ unique active wallets, 380M+ connections
- **Vantagem**: One integration para 80K+ apps com 99% menos overhead técnico

### Bibliotecas Web3 para JavaScript/React

#### Viem vs Ethers.js
- **Viem**: 
  - Mais leve em bundle size
  - Type-safe com suporte TypeScript nativo
  - Melhor performance
  - Suporte a WalletConnect, Browser Extension, Private Key
  - Abstrações sobre JSON-RPC API
  - Recomendado para novos projetos em 2024+
  
- **Ethers.js**:
  - Mais popular historicamente
  - Maior comunidade e documentação
  - Mais pesado em bundle
  - Ainda viável mas Viem é preferível

**Decisão**: Usar **Viem** para melhor performance e type-safety

### Smart Contracts
- Usar Solidity para MegaETH (compatível com EVM)
- Implementar padrão ERC-721 para NFTs de Axolotls
- Exemplo: Contrato básico com funções de mint, transfer, battle history

## Animações e Sprites

### Framer Motion
- **Vantagens**:
  - Integrado com React
  - Suporte a SVG animations
  - Keyframes e variants para orquestração
  - Transforms independentes (x, y, scale, rotate)
  - Suporte a gestures (whileHover, whileTap)
  - Performance otimizada com hardware acceleration
  
- **Casos de uso**:
  - Animações idle de sprites
  - Movimentos de ataque/defesa
  - Transições entre estados
  - Efeitos de entrada/saída

### PixiJS + Spine
- **Spine**: Software de animação 2D com skeletal animation
- **PixiJS**: Renderizador WebGL para performance
- **Vantagem**: Skeletal animation para membros articulados
- **Desvantagem**: Mais complexo, requer assets de Spine

### Abordagem Híbrida (Recomendada)
- **Framer Motion** para UI e animações simples
- **SVG + Framer Motion** para sprites 2D com membros articulados
- **Alternativa**: Canvas com Framer Motion para performance em muitos sprites

## Arquitetura de Jogo Web3

### Estrutura de Dados (NFT Axolotls)
```
Axolotl {
  id: uint256 (NFT ID)
  owner: address
  name: string
  species: enum (6 tipos de axolotls)
  color: hex
  stats: {
    health: uint16
    attack: uint16
    defense: uint16
    speed: uint16
    level: uint8
  }
  experience: uint32
  lastBattle: uint256 (timestamp)
  createdAt: uint256 (timestamp)
}
```

### Sistema de Batalhas Turn-Based
- Cada turno: jogador escolhe ação (ataque, defesa, item)
- Cálculo de dano: attack - defesa_inimigo + random
- Sistema de velocidade: quem ataca primeiro
- Histórico de batalhas salvo off-chain no banco de dados

### Integração Banco de Dados
- **Users**: Manus OAuth + wallet address
- **Axolotls**: Referência ao NFT ID + stats locais
- **Battles**: Histórico de batalhas com resultado
- **Care Log**: Histórico de feeding/training

## Design Temático: Cyberpunk/Neon

### Paleta de Cores
- **Primária**: Neon Pink (#FF10F0), Neon Cyan (#00F0FF)
- **Secundária**: Neon Purple (#9D00FF), Neon Green (#39FF14)
- **Background**: Dark (RGB 10-20)
- **Accent**: Electric Blue (#0080FF)

### Tipografia
- Headings: Futura Bold, Orbitron, Space Mono
- Body: Courier New, IBM Plex Mono

### Efeitos Visuais
- Glow effects em elementos interativos
- Scanlines e distortion effects
- Gradientes neon
- Animações pulsantes

## Stack Técnico Recomendado

```
Frontend:
- React 19 + Vite
- Framer Motion para animações
- Viem para Web3
- Web3Modal para wallet connection
- Tailwind CSS 4 com tema neon
- SVG para sprites

Backend:
- Express.js (já incluído no template)
- tRPC para API
- Drizzle ORM para banco de dados

Blockchain:
- Viem para interações
- Solidity para smart contracts
- MegaETH como rede alvo

Database:
- MySQL/TiDB (já configurado)
- Tabelas: users, axolotls, battles, care_logs
```

## Próximos Passos
1. Configurar Web3Modal + Viem no projeto
2. Criar exemplo de smart contract
3. Integrar Framer Motion para animações
4. Desenhar schema de banco de dados
5. Implementar UI com tema cyberpunk/neon
