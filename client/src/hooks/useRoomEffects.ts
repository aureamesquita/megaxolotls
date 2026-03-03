import { useState, useCallback } from "react";

type Room = "Hall" | "Bedroom" | "Cozy" | "Medsroom" | "Playroom" | "Breedroom";

interface PetStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  spAtk: number;
  spDef: number;
}

interface RoomEffect {
  hp?: number;
  attack?: number;
  defense?: number;
  speed?: number;
  spAtk?: number;
  spDef?: number;
}

const ROOM_EFFECTS: Record<Room, RoomEffect> = {
  Hall: { hp: 5, attack: 3, defense: 3, speed: 2, spAtk: 3, spDef: 3 },
  Bedroom: { hp: 15, defense: 2 },
  Cozy: { defense: 10, spDef: 8 },
  Medsroom: { spAtk: 12, hp: 5 },
  Playroom: { speed: 10, attack: 8 },
  Breedroom: { attack: 6, spAtk: 6, defense: 4, spDef: 4 },
};

export function useRoomEffects() {
  const [appliedRooms, setAppliedRooms] = useState<Record<string, Room>>({});

  const applyRoomEffect = useCallback(
    (petId: string, room: Room, baseStats: PetStats): PetStats => {
      const effect = ROOM_EFFECTS[room];

      const boostedStats: PetStats = {
        hp: baseStats.hp + (effect.hp || 0),
        attack: baseStats.attack + (effect.attack || 0),
        defense: baseStats.defense + (effect.defense || 0),
        speed: baseStats.speed + (effect.speed || 0),
        spAtk: baseStats.spAtk + (effect.spAtk || 0),
        spDef: baseStats.spDef + (effect.spDef || 0),
      };

      // Save to localStorage
      const roomHistory = JSON.parse(
        localStorage.getItem(`pet_${petId}_rooms`) || "{}"
      );
      roomHistory[room] = new Date().toISOString();
      localStorage.setItem(`pet_${petId}_rooms`, JSON.stringify(roomHistory));

      // Update applied rooms state
      setAppliedRooms(prev => ({
        ...prev,
        [petId]: room,
      }));

      return boostedStats;
    },
    []
  );

  const getLastRoomVisit = useCallback((petId: string, room: Room): Date | null => {
    const roomHistory = JSON.parse(
      localStorage.getItem(`pet_${petId}_rooms`) || "{}"
    );
    const visitTime = roomHistory[room];
    return visitTime ? new Date(visitTime) : null;
  }, []);

  const canVisitRoom = useCallback((petId: string, room: Room): boolean => {
    const lastVisit = getLastRoomVisit(petId, room);
    if (!lastVisit) return true;

    // Can visit every 24 hours
    const now = new Date();
    const hoursElapsed = (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60);
    return hoursElapsed >= 24;
  }, [getLastRoomVisit]);

  const getHoursUntilNextVisit = useCallback(
    (petId: string, room: Room): number => {
      const lastVisit = getLastRoomVisit(petId, room);
      if (!lastVisit) return 0;

      const now = new Date();
      const hoursElapsed = (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60);
      const hoursRemaining = Math.max(0, 24 - hoursElapsed);
      return Math.ceil(hoursRemaining);
    },
    [getLastRoomVisit]
  );

  return {
    applyRoomEffect,
    getLastRoomVisit,
    canVisitRoom,
    getHoursUntilNextVisit,
    appliedRooms,
  };
}
