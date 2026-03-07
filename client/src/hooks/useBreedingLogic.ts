import { useState, useCallback } from 'react';

/**
 * Axolotl Traits - Herdáveis
 */
export interface AxolotlTraits {
  color: 'pink' | 'white' | 'gold' | 'black' | 'melanoid';
  pattern: 'solid' | 'spotted' | 'striped' | 'marble';
  size: 'small' | 'medium' | 'large';
  ability: 'regeneration' | 'poison' | 'speed' | 'strength';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

/**
 * Axolotl com genótipo (genes) e fenótipo (traits visíveis)
 */
export interface AxolotlGenotype {
  id: string;
  name: string;
  level: number;
  morphStage: number;
  traits: AxolotlTraits;
  genes: {
    color: [string, string]; // Alelos dominante e recessivo
    pattern: [string, string];
    size: [string, string];
    ability: [string, string];
  };
  breedingCooldown: number; // Timestamp quando poderá se reproduzir novamente
}

/**
 * Offspring gerado do cruzamento
 */
export interface OffspringResult {
  id: string;
  name: string;
  parentA: string;
  parentB: string;
  traits: AxolotlTraits;
  genes: AxolotlGenotype['genes'];
  level: number;
  morphStage: number;
  rarity: AxolotlTraits['rarity'];
}

// Tabela de dominância para cada trait
const DOMINANCE_TABLE = {
  color: {
    pink: { dominant: true, value: 'pink' },
    white: { dominant: true, value: 'white' },
    gold: { dominant: false, value: 'gold' },
    black: { dominant: false, value: 'black' },
    melanoid: { dominant: false, value: 'melanoid' },
  },
  pattern: {
    solid: { dominant: true, value: 'solid' },
    spotted: { dominant: true, value: 'spotted' },
    striped: { dominant: false, value: 'striped' },
    marble: { dominant: false, value: 'marble' },
  },
  size: {
    large: { dominant: true, value: 'large' },
    medium: { dominant: true, value: 'medium' },
    small: { dominant: false, value: 'small' },
  },
  ability: {
    regeneration: { dominant: true, value: 'regeneration' },
    poison: { dominant: true, value: 'poison' },
    speed: { dominant: false, value: 'speed' },
    strength: { dominant: false, value: 'strength' },
  },
};

/**
 * Calcula a raridade do offspring baseado nos pais
 */
function calculateOffspringRarity(
  parentARarity: AxolotlTraits['rarity'],
  parentBRarity: AxolotlTraits['rarity']
): AxolotlTraits['rarity'] {
  const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
  const aIndex = rarityOrder.indexOf(parentARarity);
  const bIndex = rarityOrder.indexOf(parentBRarity);

  // Offspring tem 50% de chance de ser mais raro que os pais
  const avgRarity = Math.floor((aIndex + bIndex) / 2);
  const boost = Math.random() > 0.5 ? 1 : 0;
  const finalIndex = Math.min(avgRarity + boost, rarityOrder.length - 1);

  return rarityOrder[finalIndex] as AxolotlTraits['rarity'];
}

/**
 * Seleciona um alelo aleatoriamente de um par
 */
function selectRandomAllele(alleles: [string, string]): string {
  return alleles[Math.random() > 0.5 ? 0 : 1];
}

/**
 * Determina o fenótipo (trait visível) baseado no genótipo
 */
function determinePhenotype(
  allele1: string,
  allele2: string,
  traitType: 'color' | 'pattern' | 'size' | 'ability'
): string {
  const table = DOMINANCE_TABLE[traitType] as Record<string, { dominant: boolean; value: string }>;

  // Se ambos alelos são iguais, é homozigoto
  if (allele1 === allele2) {
    return allele1;
  }

  // Se são diferentes, o dominante vence
  const a1 = table[allele1];
  const a2 = table[allele2];

  if (a1?.dominant) return allele1;
  if (a2?.dominant) return allele2;

  // Se nenhum é dominante, escolhe aleatoriamente
  return Math.random() > 0.5 ? allele1 : allele2;
}

/**
 * Hook para gerenciar lógica de breeding
 */
export function useBreedingLogic() {
  const [breedingInProgress, setBreedingInProgress] = useState(false);
  const [breedingCost] = useState(500); // LIP tokens

  /**
   * Verifica se dois Axolotls podem se reproduzir
   */
  const canBreed = useCallback(
    (parentA: AxolotlGenotype, parentB: AxolotlGenotype, currentTime: number): boolean => {
      // Ambos devem estar no mínimo nível 10
      if (parentA.level < 10 || parentB.level < 10) return false;

      // Ambos devem estar fora do cooldown
      if (parentA.breedingCooldown > currentTime || parentB.breedingCooldown > currentTime) {
        return false;
      }

      // Não podem ser o mesmo Axolotl
      if (parentA.id === parentB.id) return false;

      return true;
    },
    []
  );

  /**
   * Calcula compatibilidade entre dois pais (0-100%)
   */
  const calculateCompatibility = useCallback((parentA: AxolotlGenotype, parentB: AxolotlGenotype): number => {
    let compatibility = 100;

    // Diferença de nível reduz compatibilidade
    const levelDiff = Math.abs(parentA.level - parentB.level);
    compatibility -= levelDiff * 2;

    // Diferença de morph stage reduz compatibilidade
    const morphDiff = Math.abs(parentA.morphStage - parentB.morphStage);
    compatibility -= morphDiff * 5;

    // Traits similares aumentam compatibilidade
    if (parentA.traits.color === parentB.traits.color) compatibility += 5;
    if (parentA.traits.pattern === parentB.traits.pattern) compatibility += 5;
    if (parentA.traits.ability === parentB.traits.ability) compatibility += 5;

    return Math.max(0, Math.min(100, compatibility));
  }, []);

  /**
   * Gera um novo Axolotl offspring
   */
  const breedAxolotls = useCallback(
    (parentA: AxolotlGenotype, parentB: AxolotlGenotype): OffspringResult | null => {
      setBreedingInProgress(true);

      try {
        // Herança de genes (cada alelo tem 50% de chance de vir de cada pai)
        const offspringGenes = {
          color: [selectRandomAllele(parentA.genes.color), selectRandomAllele(parentB.genes.color)] as [
            string,
            string
          ],
          pattern: [selectRandomAllele(parentA.genes.pattern), selectRandomAllele(parentB.genes.pattern)] as [
            string,
            string
          ],
          size: [selectRandomAllele(parentA.genes.size), selectRandomAllele(parentB.genes.size)] as [
            string,
            string
          ],
          ability: [selectRandomAllele(parentA.genes.ability), selectRandomAllele(parentB.genes.ability)] as [
            string,
            string
          ],
        };

        // Determina fenótipo (traits visíveis)
        const offspringTraits: AxolotlTraits = {
          color: determinePhenotype(offspringGenes.color[0], offspringGenes.color[1], 'color') as AxolotlTraits['color'],
          pattern: determinePhenotype(offspringGenes.pattern[0], offspringGenes.pattern[1], 'pattern') as AxolotlTraits['pattern'],
          size: determinePhenotype(offspringGenes.size[0], offspringGenes.size[1], 'size') as AxolotlTraits['size'],
          ability: determinePhenotype(offspringGenes.ability[0], offspringGenes.ability[1], 'ability') as AxolotlTraits['ability'],
          rarity: calculateOffspringRarity(parentA.traits.rarity, parentB.traits.rarity),
        };

        // Offspring começa no nível 1
        const offspring: OffspringResult = {
          id: `axolotl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: `${parentA.name} Jr.`,
          parentA: parentA.id,
          parentB: parentB.id,
          traits: offspringTraits,
          genes: offspringGenes,
          level: 1,
          morphStage: 0, // Axolol
          rarity: offspringTraits.rarity,
        };

        return offspring;
      } finally {
        setBreedingInProgress(false);
      }
    },
    []
  );

  /**
   * Calcula cooldown de reprodução (em horas)
   */
  const calculateBreedingCooldown = useCallback((hours: number = 24): number => {
    return Date.now() + hours * 60 * 60 * 1000;
  }, []);

  return {
    breedingInProgress,
    breedingCost,
    canBreed,
    calculateCompatibility,
    breedAxolotls,
    calculateBreedingCooldown,
  };
}
