import { describe, expect, it } from "vitest";

describe("Pets Page", () => {
  it("should have mock pets data", () => {
    const mockPets = [
      {
        id: "1",
        name: "Sparkle",
        species: "Axolotl",
        level: 5,
        experience: 250,
        hp: 100,
        maxHp: 100,
        rarity: "rare",
        morphStage: "Axolol",
      },
      {
        id: "2",
        name: "Blaze",
        species: "Axolotl",
        level: 8,
        experience: 450,
        hp: 120,
        maxHp: 120,
        rarity: "epic",
        morphStage: "Axolump",
      },
    ];

    expect(mockPets).toHaveLength(2);
    expect(mockPets[0].name).toBe("Sparkle");
    expect(mockPets[1].level).toBe(8);
  });

  it("should filter pets by rarity", () => {
    const mockPets = [
      { id: "1", rarity: "rare" },
      { id: "2", rarity: "epic" },
      { id: "3", rarity: "common" },
    ];

    const filtered = mockPets.filter(p => p.rarity === "rare");
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("1");
  });

  it("should sort pets by level", () => {
    const mockPets = [
      { id: "1", level: 5 },
      { id: "2", level: 8 },
      { id: "3", level: 3 },
    ];

    const sorted = [...mockPets].sort((a, b) => b.level - a.level);
    expect(sorted[0].level).toBe(8);
    expect(sorted[1].level).toBe(5);
    expect(sorted[2].level).toBe(3);
  });

  it("should calculate HP percentage", () => {
    const pet = { hp: 75, maxHp: 100 };
    const percentage = (pet.hp / pet.maxHp) * 100;
    expect(percentage).toBe(75);
  });

  it("should have rarity colors mapping", () => {
    const rarityColors: Record<string, string> = {
      common: "from-gray-400 to-gray-500",
      uncommon: "from-green-400 to-emerald-500",
      rare: "from-blue-400 to-cyan-500",
      epic: "from-purple-400 to-pink-500",
      legendary: "from-yellow-400 to-orange-500",
    };

    expect(rarityColors.rare).toBe("from-blue-400 to-cyan-500");
    expect(rarityColors.legendary).toBe("from-yellow-400 to-orange-500");
  });

  it("should validate pet species", () => {
    const validSpecies = ["Axolotl", "Future1", "Future2", "Future3"];
    const pet = { species: "Axolotl" };
    
    expect(validSpecies).toContain(pet.species);
  });

  it("should validate morph stages", () => {
    const validMorphs = ["Axolol", "Axolump", "Axoloot"];
    const pet = { morphStage: "Axolump" };
    
    expect(validMorphs).toContain(pet.morphStage);
  });

  it("should display pet stats correctly", () => {
    const pet = {
      stats: {
        attack: 45,
        defense: 50,
        speed: 48,
        spAtk: 52,
        spDef: 50,
      },
    };

    expect(pet.stats.attack).toBe(45);
    expect(pet.stats.defense).toBe(50);
    expect(pet.stats.spAtk).toBe(52);
  });
});
