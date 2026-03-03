import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Heart, Shield, Zap, Wind, Brain, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

type Room = "Hall" | "Bedroom" | "Cozy" | "Medsroom" | "Playroom" | "Breedroom";

interface RoomConfig {
  name: Room;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  effects: {
    hp?: number;
    attack?: number;
    defense?: number;
    speed?: number;
    spAtk?: number;
    spDef?: number;
  };
}

const ROOMS: RoomConfig[] = [
  {
    name: "Hall",
    description: "Central hub - balanced stats boost",
    icon: <Sparkles className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-900/20 to-pink-900/20",
    effects: { hp: 5, attack: 3, defense: 3, speed: 2, spAtk: 3, spDef: 3 },
  },
  {
    name: "Bedroom",
    description: "Rest and recovery - HP boost",
    icon: <Heart className="w-8 h-8" />,
    color: "from-red-500 to-orange-500",
    bgGradient: "from-red-900/20 to-orange-900/20",
    effects: { hp: 15, defense: 2 },
  },
  {
    name: "Cozy",
    description: "Comfort zone - special defense boost",
    icon: <Shield className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-900/20 to-cyan-900/20",
    effects: { defense: 10, spDef: 8 },
  },
  {
    name: "Medsroom",
    description: "Medical care - special attack boost",
    icon: <Zap className="w-8 h-8" />,
    color: "from-yellow-500 to-lime-500",
    bgGradient: "from-yellow-900/20 to-lime-900/20",
    effects: { spAtk: 12, hp: 5 },
  },
  {
    name: "Playroom",
    description: "Training ground - speed and attack boost",
    icon: <Wind className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-900/20 to-emerald-900/20",
    effects: { speed: 10, attack: 8 },
  },
  {
    name: "Breedroom",
    description: "Breeding chamber - balanced power boost",
    icon: <Brain className="w-8 h-8" />,
    color: "from-indigo-500 to-violet-500",
    bgGradient: "from-indigo-900/20 to-violet-900/20",
    effects: { attack: 6, spAtk: 6, defense: 4, spDef: 4 },
  },
];

export default function Care() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [, navigate] = useLocation();

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const selectedRoomConfig = ROOMS.find(r => r.name === selectedRoom);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Button
          onClick={handleBack}
          variant="ghost"
          className="mb-4 text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
          Care Rooms
        </h1>
        <p className="text-gray-400 mt-2">Select a room to boost your Axolotl's stats</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Room Selector */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">Available Rooms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ROOMS.map(room => (
              <motion.button
                key={room.name}
                onClick={() => handleRoomSelect(room.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRoom === room.name
                    ? `border-cyan-400 bg-gradient-to-br ${room.bgGradient} shadow-lg shadow-cyan-500/50`
                    : "border-gray-600 hover:border-cyan-400 bg-slate-900/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`text-${room.color.split("-")[1]}-400`}>
                    {room.icon}
                  </div>
                  <span className="font-bold text-sm">{room.name}</span>
                </div>
                <p className="text-xs text-gray-400">{room.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Room Details */}
        {selectedRoomConfig && (
          <motion.div
            key={selectedRoom}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              {selectedRoomConfig.name} Effects
            </h2>

            <Card className="bg-slate-900/80 border-cyan-500/30 p-6">
              <div className="space-y-4">
                {/* Room Icon and Name */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-4 rounded-lg bg-gradient-to-br ${selectedRoomConfig.color} text-white`}
                  >
                    {selectedRoomConfig.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedRoomConfig.name}</h3>
                    <p className="text-gray-400">{selectedRoomConfig.description}</p>
                  </div>
                </div>

                {/* Stats Effects */}
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-pink-400">Stat Boosts:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedRoomConfig.effects.hp && (
                      <div className="bg-red-900/30 border border-red-500/50 rounded p-3">
                        <div className="text-sm text-gray-400">HP</div>
                        <div className="text-xl font-bold text-red-400">
                          +{selectedRoomConfig.effects.hp}
                        </div>
                      </div>
                    )}
                    {selectedRoomConfig.effects.attack && (
                      <div className="bg-orange-900/30 border border-orange-500/50 rounded p-3">
                        <div className="text-sm text-gray-400">Attack</div>
                        <div className="text-xl font-bold text-orange-400">
                          +{selectedRoomConfig.effects.attack}
                        </div>
                      </div>
                    )}
                    {selectedRoomConfig.effects.defense && (
                      <div className="bg-blue-900/30 border border-blue-500/50 rounded p-3">
                        <div className="text-sm text-gray-400">Defense</div>
                        <div className="text-xl font-bold text-blue-400">
                          +{selectedRoomConfig.effects.defense}
                        </div>
                      </div>
                    )}
                    {selectedRoomConfig.effects.speed && (
                      <div className="bg-yellow-900/30 border border-yellow-500/50 rounded p-3">
                        <div className="text-sm text-gray-400">Speed</div>
                        <div className="text-xl font-bold text-yellow-400">
                          +{selectedRoomConfig.effects.speed}
                        </div>
                      </div>
                    )}
                    {selectedRoomConfig.effects.spAtk && (
                      <div className="bg-purple-900/30 border border-purple-500/50 rounded p-3">
                        <div className="text-sm text-gray-400">Sp. Atk</div>
                        <div className="text-xl font-bold text-purple-400">
                          +{selectedRoomConfig.effects.spAtk}
                        </div>
                      </div>
                    )}
                    {selectedRoomConfig.effects.spDef && (
                      <div className="bg-cyan-900/30 border border-cyan-500/50 rounded p-3">
                        <div className="text-sm text-gray-400">Sp. Def</div>
                        <div className="text-xl font-bold text-cyan-400">
                          +{selectedRoomConfig.effects.spDef}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => {
                    // TODO: Apply room effects to selected pet
                    console.log(`Applied ${selectedRoomConfig.name} effects`);
                  }}
                  className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg"
                >
                  Apply Room Effects
                </Button>
              </div>
            </Card>

            {/* Room Info */}
            <Card className="bg-slate-900/80 border-purple-500/30 p-4">
              <p className="text-sm text-gray-400">
                💡 <strong>Tip:</strong> Each room provides different stat boosts. Visit regularly to maximize your Axolotl's potential!
              </p>
            </Card>
          </motion.div>
        )}

        {/* Empty State */}
        {!selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center"
          >
            <Card className="bg-slate-900/80 border-gray-600 p-8 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-500" />
              <p className="text-gray-400">Select a room to see its effects</p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
