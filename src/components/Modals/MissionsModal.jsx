import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Gift, Zap, Shield, Flame, CheckCircle, Clock } from 'lucide-react';

const MISSIONS_CATALOG = [
  {
    id: 1,
    title: 'Top Donador Implacable',
    description: 'Sé el MVP en 3 batallas consecutivas.',
    rewardCoins: 5000,
    powerup: { type: 'sword', name: 'Espada x2', icon: '⚔️', effect: 'Multiplica tu puntaje visual x2 por 20s.' },
  },
  {
    id: 2,
    title: 'Defensor Leal',
    description: 'Participa en 10 batallas de este anfitrión en 3 días.',
    rewardCoins: 8000,
    powerup: { type: 'shield', name: 'Escudo -20%', icon: '🛡️', effect: 'Reduce el puntaje rival un 20% visualmente.' },
  },
  {
    id: 3,
    title: 'Tiempo Mágico',
    description: 'Logra que el anfitrión gane 5 batallas en una semana.',
    rewardCoins: 10000,
    powerup: { type: 'banner', name: 'Estandarte +10s', icon: '🚩', effect: 'Añade 10 segundos extra al reloj.' },
  },
  {
    id: 4,
    title: 'Bendición Épica',
    description: 'Envía un regalo León o superior.',
    rewardCoins: 15000,
    powerup: { type: 'orb', name: 'Orbe +10%', icon: '🔮', effect: 'Aumenta un 10% el puntaje total del equipo.' },
  }
];

export default function MissionsModal({ isOpen, onClose, hostId, activeMissions, setActiveMissions, setInventoryPowerups, setBalance }) {
  const handleAcceptMission = (mission) => {
    // Check if already active
    if (activeMissions.some(m => m.id === mission.id && m.hostId === hostId)) return;
    
    const newMission = { ...mission, hostId, status: 'active', progress: 0 };
    setActiveMissions(prev => [...prev, newMission]);
  };

  const handleSimulateComplete = (mission) => {
    // 1. Quitar de misiones activas
    setActiveMissions(prev => prev.filter(m => !(m.id === mission.id && m.hostId === hostId)));
    
    // 2. Dar recompensas
    setBalance(prev => prev + mission.rewardCoins);
    
    // 3. Añadir power-up a la mochila
    setInventoryPowerups(prev => {
      const existing = prev.find(p => p.type === mission.powerup.type && p.hostId === hostId);
      if (existing) {
        return prev.map(p => p === existing ? { ...p, amount: p.amount + 1 } : p);
      }
      return [...prev, { ...mission.powerup, hostId, amount: 1 }];
    });

    alert(`¡Misión Completada!\nGanaste ${mission.rewardCoins} monedas y un potenciador: ${mission.powerup.name}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end pointer-events-auto">
          {/* Fondo oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Contenedor Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full bg-slate-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] relative z-10 flex flex-col max-h-[85vh] overflow-hidden border-t border-slate-700"
          >
            {/* Grabber */}
            <div className="w-full flex justify-center py-3 bg-slate-900">
              <div className="w-12 h-1.5 bg-slate-600 rounded-full"></div>
            </div>

            <div className="px-6 pb-6 pt-2 overflow-y-auto overflow-x-hidden no-scrollbar">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight flex items-center">
                    <Target className="text-purple-500 mr-2" size={24} />
                    Misiones MVP
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">Exclusivo para {hostId}</p>
                </div>
              </div>

              <div className="space-y-4">
                {MISSIONS_CATALOG.map(mission => {
                  const isActive = activeMissions.some(m => m.id === mission.id && m.hostId === hostId);

                  return (
                    <div key={mission.id} className="bg-slate-800 rounded-2xl p-4 border border-slate-700 shadow-md relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                      
                      <div className="relative z-10">
                        <h3 className="text-lg font-bold text-white mb-1 flex items-center">
                          {mission.title}
                          {isActive && <span className="ml-2 bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full border border-green-500/30 uppercase">Activa</span>}
                        </h3>
                        <p className="text-sm text-slate-300 mb-4">{mission.description}</p>
                        
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="flex items-center bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/20">
                            <span className="text-yellow-400 font-bold text-sm mr-1">+{mission.rewardCoins}</span>
                            <span className="text-yellow-500 text-xs">Monedas</span>
                          </div>
                          <div className="flex items-center bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20">
                            <span className="text-xl mr-2">{mission.powerup.icon}</span>
                            <div className="flex flex-col">
                              <span className="text-white font-bold text-xs">{mission.powerup.name}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          {!isActive ? (
                            <button 
                              onClick={() => handleAcceptMission(mission)}
                              className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl transition-colors text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                            >
                              Aceptar Misión
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleSimulateComplete(mission)}
                              className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 rounded-xl transition-colors text-sm shadow-[0_0_15px_rgba(34,197,94,0.4)] flex items-center justify-center"
                            >
                              <CheckCircle size={16} className="mr-2" />
                              Simular Completar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
