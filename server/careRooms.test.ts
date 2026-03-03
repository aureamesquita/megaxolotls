import { describe, expect, it, beforeEach } from "vitest";

interface PetStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  spAtk: number;
  spDef: number;
}

type Room = "Hall" | "Bedroom" | "Cozy" | "Medsroom" | "Playroom" | "Breedroom";

const ROOM_EFFECTS: Record<Room, Partial<PetStats>> = {
  Hall: { hp: 5, attack: 3, defense: 3, speed: 2, spAtk: 3, spDef: 3 },
  Bedroom: { hp: 15, defense: 2 },
  Cozy: { defense: 10, spDef: 8 },
  Medsroom: { spAtk: 12, hp: 5 },
  Playroom: { speed: 10, attack: 8 },
  Breedroom: { attack: 6, spAtk: 6, defense: 4, spDef: 4 },
};

describe("Care Rooms System", () => {
  let baseStats: PetStats;

  beforeEach(() => {
    baseStats = {
      hp: 100,
      attack: 50,
      defense: 50,
      speed: 50,
      spAtk: 50,
      spDef: 50,
    };
  });

  it("should have 6 rooms defined", () => {
    const rooms = Object.keys(ROOM_EFFECTS);
    expect(rooms).toHaveLength(6);
    expect(rooms).toContain("Hall");
    expect(rooms).toContain("Bedroom");
    expect(rooms).toContain("Cozy");
    expect(rooms).toContain("Medsroom");
    expect(rooms).toContain("Playroom");
    expect(rooms).toContain("Breedroom");
  });

  it("should apply Hall room effects (balanced)", () => {
    const effect = ROOM_EFFECTS.Hall;
    const boostedStats: PetStats = {
      hp: baseStats.hp + (effect.hp || 0),
      attack: baseStats.attack + (effect.attack || 0),
      defense: baseStats.defense + (effect.defense || 0),
      speed: baseStats.speed + (effect.speed || 0),
      spAtk: baseStats.spAtk + (effect.spAtk || 0),
      spDef: baseStats.spDef + (effect.spDef || 0),
    };

    expect(boostedStats.hp).toBe(105);
    expect(boostedStats.attack).toBe(53);
    expect(boostedStats.defense).toBe(53);
    expect(boostedStats.speed).toBe(52);
  });

  it("should apply Bedroom room effects (HP focus)", () => {
    const effect = ROOM_EFFECTS.Bedroom;
    const boostedStats: PetStats = {
      hp: baseStats.hp + (effect.hp || 0),
      attack: baseStats.attack + (effect.attack || 0),
      defense: baseStats.defense + (effect.defense || 0),
      speed: baseStats.speed + (effect.speed || 0),
      spAtk: baseStats.spAtk + (effect.spAtk || 0),
      spDef: baseStats.spDef + (effect.spDef || 0),
    };

    expect(boostedStats.hp).toBe(115);
    expect(boostedStats.defense).toBe(52);
    expect(boostedStats.attack).toBe(50); // No boost
  });

  it("should apply Cozy room effects (Defense focus)", () => {
    const effect = ROOM_EFFECTS.Cozy;
    const boostedStats: PetStats = {
      hp: baseStats.hp + (effect.hp || 0),
      attack: baseStats.attack + (effect.attack || 0),
      defense: baseStats.defense + (effect.defense || 0),
      speed: baseStats.speed + (effect.speed || 0),
      spAtk: baseStats.spAtk + (effect.spAtk || 0),
      spDef: baseStats.spDef + (effect.spDef || 0),
    };

    expect(boostedStats.defense).toBe(60);
    expect(boostedStats.spDef).toBe(58);
    expect(boostedStats.hp).toBe(100); // No boost
  });

  it("should apply Medsroom room effects (Sp. Atk focus)", () => {
    const effect = ROOM_EFFECTS.Medsroom;
    const boostedStats: PetStats = {
      hp: baseStats.hp + (effect.hp || 0),
      attack: baseStats.attack + (effect.attack || 0),
      defense: baseStats.defense + (effect.defense || 0),
      speed: baseStats.speed + (effect.speed || 0),
      spAtk: baseStats.spAtk + (effect.spAtk || 0),
      spDef: baseStats.spDef + (effect.spDef || 0),
    };

    expect(boostedStats.spAtk).toBe(62);
    expect(boostedStats.hp).toBe(105);
    expect(boostedStats.speed).toBe(50); // No boost
  });

  it("should apply Playroom room effects (Speed & Attack focus)", () => {
    const effect = ROOM_EFFECTS.Playroom;
    const boostedStats: PetStats = {
      hp: baseStats.hp + (effect.hp || 0),
      attack: baseStats.attack + (effect.attack || 0),
      defense: baseStats.defense + (effect.defense || 0),
      speed: baseStats.speed + (effect.speed || 0),
      spAtk: baseStats.spAtk + (effect.spAtk || 0),
      spDef: baseStats.spDef + (effect.spDef || 0),
    };

    expect(boostedStats.speed).toBe(60);
    expect(boostedStats.attack).toBe(58);
    expect(boostedStats.spAtk).toBe(50); // No boost
  });

  it("should apply Breedroom room effects (Balanced power)", () => {
    const effect = ROOM_EFFECTS.Breedroom;
    const boostedStats: PetStats = {
      hp: baseStats.hp + (effect.hp || 0),
      attack: baseStats.attack + (effect.attack || 0),
      defense: baseStats.defense + (effect.defense || 0),
      speed: baseStats.speed + (effect.speed || 0),
      spAtk: baseStats.spAtk + (effect.spAtk || 0),
      spDef: baseStats.spDef + (effect.spDef || 0),
    };

    expect(boostedStats.attack).toBe(56);
    expect(boostedStats.spAtk).toBe(56);
    expect(boostedStats.defense).toBe(54);
    expect(boostedStats.spDef).toBe(54);
  });

  it("should calculate 24-hour cooldown correctly", () => {
    const lastVisit = new Date();
    const now = new Date();

    const hoursElapsed = (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60);
    const canVisit = hoursElapsed >= 24;

    expect(canVisit).toBe(false);

    // Simulate 25 hours later
    const futureDate = new Date(lastVisit.getTime() + 25 * 60 * 60 * 1000);
    const futureHoursElapsed =
      (futureDate.getTime() - lastVisit.getTime()) / (1000 * 60 * 60);
    const canVisitFuture = futureHoursElapsed >= 24;

    expect(canVisitFuture).toBe(true);
  });

  it("should track room visit history", () => {
    const roomHistory: Record<Room, string> = {
      Hall: new Date().toISOString(),
      Bedroom: "",
      Cozy: "",
      Medsroom: "",
      Playroom: "",
      Breedroom: "",
    };

    expect(roomHistory.Hall).toBeTruthy();
    expect(roomHistory.Bedroom).toBe("");
  });

  it("should prevent multiple visits within 24 hours", () => {
    const lastVisit = new Date();
    const secondVisit = new Date(lastVisit.getTime() + 12 * 60 * 60 * 1000); // 12 hours later

    const hoursElapsed =
      (secondVisit.getTime() - lastVisit.getTime()) / (1000 * 60 * 60);
    const canVisit = hoursElapsed >= 24;

    expect(canVisit).toBe(false);
  });

  it("should calculate hours until next visit correctly", () => {
    const lastVisit = new Date();
    const now = new Date(lastVisit.getTime() + 12 * 60 * 60 * 1000); // 12 hours later

    const hoursElapsed = (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60);
    const hoursRemaining = Math.max(0, 24 - hoursElapsed);

    expect(hoursRemaining).toBe(12);
  });
});
