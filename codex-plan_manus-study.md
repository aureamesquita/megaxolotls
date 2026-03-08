# Estudo de shortcomings do Manus AI (análise estática)

## 1) “Sistema de 18 tipos” implementa apenas 16 tipos
O arquivo `client/src/lib/elementalTypes18.ts` declara “18 Elemental Types System”, mas o union `ElementalType18` contém 16 valores (5 químicos + 5 físicos + 6 adicionais). Isso quebra a promessa funcional e torna a tabela de matchups um “16x16” disfarçado de “18x18”.

:::task-stub{title="Completar o sistema para 18 tipos reais e alinhar nomenclatura/documentação"}
No módulo `client/src/lib/elementalTypes18.ts`, adicione os 2 tipos faltantes no union `ElementalType18` e em `ELEMENTAL_TYPES_18`.
Atualize `TYPE_MATCHUPS_18` para incluir linhas e colunas dos novos tipos, garantindo cobertura total e simetria intencional das relações.
Revise comentários e strings (“18x18”) para refletir o estado real após a expansão.
Adicione um teste de sanidade (ex.: verificar cardinalidade de tipos e presença de chave para cada tipo) para impedir regressão.
:::

## 2) O sistema de batalha ainda usa o modelo antigo de 6 tipos (não o novo)
`useBattleLogic` importa `ElementalType` de `client/src/lib/elementalTypes.ts` (Water/Fire/Grass/Electric/Psychic/Dark), enquanto o novo sistema de 16/18 tipos está em `elementalTypes18.ts` e não é usado no cálculo de dano.

:::task-stub{title="Migrar a lógica de batalha para o sistema expandido de tipos"}
Em `client/src/hooks/useBattleLogic.ts`, substitua dependências de `client/src/lib/elementalTypes.ts` por utilitários equivalentes baseados em `client/src/lib/elementalTypes18.ts`.
Padronize o tipo de `playerType` e `enemyType` para o novo domínio (`ElementalType18`) e ajuste estados iniciais.
Garanta que o cálculo de dano e o texto de efetividade usem a nova tabela de matchups.
Atualize componentes consumidores (como `BattleArena`) para renderizar labels/cores compatíveis com o novo conjunto de tipos.
:::

## 3) O cálculo de dano ignora o tipo elemental do golpe
Em `useBattleLogic.ts`, `calculateFinalDamage` sempre recebe `prev.playerType`/`prev.enemyType` como tipo do ataque, ignorando `move.elementalType`. Isso invalida STAB e efetividade por golpe.

:::task-stub{title="Usar tipo do movimento no cálculo de STAB e efetividade"}
No fluxo de `selectMove` em `client/src/hooks/useBattleLogic.ts`, derive o tipo do ataque a partir de `move.elementalType` e `aiMove.elementalType`.
Crie um mapeamento explícito entre os valores armazenados em `Move.elementalType` (`shared/types.ts`) e o tipo do motor de batalha.
Aplique fallback seguro para movimentos sem tipo (por exemplo `normal`/neutro).
Ajuste logs de batalha para exibir a efetividade baseada no tipo real do golpe, não apenas no tipo do pet.
:::

## 4) Contrato de tipos inconsistente em todo o código (case, domínio e cobertura)
Há mistura entre tipos em `PascalCase` (`Water`) no motor antigo e `lowercase` (`water`) em `Move.elementalType` (`shared/types.ts`), além de cobertura parcial na UI (`BattleArena` só mostra 6 labels). Isso causa desalinhamento estrutural.

:::task-stub{title="Unificar contrato de tipos elementais entre dados, engine e UI"}
Defina uma única fonte de verdade para tipos elementais (idealmente em `shared/`), incluindo formato de string e conjunto permitido.
Atualize `shared/types.ts` (`Move.elementalType`) para o domínio completo suportado pela batalha.
Refatore `client/src/components/BattleArena.tsx` para renderização dinâmica (ex.: via mapa de metadados) em vez de ifs hardcoded para 6 tipos.
Adapte qualquer parser/mapeamento para evitar divergências de case (`Water` vs `water`).
:::

## 5) Particle effects foram criados, mas não conectados ao BattleArena
`client/src/components/ParticleEffect.tsx` existe com `ParticleEffect`, `DamagePopup` e `ImpactEffect`, porém `BattleArena.tsx` não importa nem renderiza esses componentes. A entrega ficou incompleta frente ao objetivo citado.

:::task-stub{title="Integrar ParticleEffect/DamagePopup no fluxo real de ataques"}
Em `client/src/components/BattleArena.tsx`, adicione estado para eventos de ataque (posição, tipo, dano, critical etc.).
Importe e renderize `ParticleEffect`, `DamagePopup` e `ImpactEffect` no momento da resolução dos turnos.
Passe o tipo elemental do ataque para colorização correta do efeito.
Limpe efeitos após animação para não acumular elementos no DOM.
:::

## 6) Sistema de LIP rewards está isolado e sem integração com resultado da batalha
O hook `client/src/hooks/useLIPRewards.ts` está implementado, mas não há uso dele em páginas/componentes de batalha. Resultado: feature “pronta” no código porém inoperante para usuário final.

:::task-stub{title="Conectar recompensa LIP ao encerramento das batalhas"}
No fluxo onde a batalha termina (`BattleArena`/`useBattleLogic`), use `useLIPRewards` para calcular elegibilidade com base em nível e vitória.
Em caso elegível, invoque `claimReward` e apresente feedback claro ao usuário (toast/modal/log).
Exiba estado de cooldown e próximo tempo de recompensa em UI para evitar ambiguidade.
Persistir e carregar dados no ciclo de vida da tela para refletir histórico real de recompensas.
:::

## 7) `onBattleEnd` é aceito por prop mas nunca disparado
`BattleArenaProps` define `onBattleEnd`, mas o componente não chama essa callback quando `state.battleEnded` muda. Isso impede integrações externas (XP, rewards, analytics, navegação).

:::task-stub{title="Disparar callback onBattleEnd ao término da luta"}
Em `client/src/components/BattleArena.tsx`, adicione `useEffect` observando `state.battleEnded` e `state.winner`.
Quando `battleEnded` virar `true`, invoque `onBattleEnd?.(state.winner ?? 'draw')` respeitando a assinatura existente.
Proteja contra disparos duplicados no mesmo encerramento (flag local/ref).
Inclua teste de componente para validar que a callback é chamada exatamente uma vez por batalha encerrada.
:::

## 8) IA usa golpes sem validar energia disponível
`useBattleLogic` escolhe movimento inimigo aleatório de `availableMoves` sem filtrar por `prev.enemyEnergy`. Na prática, o inimigo pode usar ataque caro mesmo sem energia suficiente, quebrando regras do próprio sistema.

:::task-stub{title="Restringir escolha de golpe da IA por energia disponível"}
No método `selectMove` de `client/src/hooks/useBattleLogic.ts`, filtre `availableMoves` para a IA considerando `move.energyCost <= prev.enemyEnergy`.
Se nenhum golpe estiver disponível, aplique fallback explícito (ex.: `Struggle`) ou passe o turno.
Alinhe os logs para indicar quando a IA ficou sem energia e qual fallback foi aplicado.
Adicione teste unitário cobrindo cenário de energia insuficiente da IA.
:::

## 9) PP dos golpes não é consumido durante o combate
Mesmo com `pp/currentPp` no tipo `Move` e função `getAvailableBattleMoves`, `BattleArena/useBattleLogic` não decrementam PP a cada uso. Consequência: limitação de recurso inexistente em runtime e `Struggle` nunca entra por esgotamento real.

:::task-stub{title="Implementar consumo de PP no ciclo de turnos"}
No estado de batalha (hook ou componente), mantenha cópia mutável dos movimentos com `currentPp` atualizado por turno.
Ao executar movimento, reduza `currentPp` do golpe usado (jogador e IA), bloqueando uso quando `currentPp === 0`.
Passe `availableMoves` calculados por `getAvailableBattleMoves` com base no estado atual da luta.
Garanta fallback para `STRUGGLE_MOVE` quando todos os golpes válidos estiverem sem PP.
:::
