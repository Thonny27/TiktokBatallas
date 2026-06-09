import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Trophy, Coins, Star, Zap, Check, Target, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MvpPanel({ onLogout, onOpenYape, totalGiftsSent = 0, balance, setBalance }) {
  // Definición de Tramos (Tiers) por Puntos con Beneficios
  const TIERS = [
    { id: 1, label: 'I', range: '100+ pts', unlockPoints: 100, name: 'Anillo de Bronce', icon: '💍', colors: 'from-amber-700 to-amber-900', border: 'border-amber-700/50',
      benefits: ['1 Emote exclusivo básico', 'Fondo simple de perfil'] },
    { id: 2, label: 'II', range: '500+ pts', unlockPoints: 500, name: 'Espada de Acero', icon: '⚔️', colors: 'from-zinc-400 to-zinc-600', border: 'border-zinc-400/50',
      benefits: ['Color de nombre especial en chat', 'Marco de Avatar de Acero'] },
    { id: 3, label: 'III', range: '1.5K+ pts', unlockPoints: 1500, name: 'Escudo de Plata', icon: '🔰', colors: 'from-slate-300 to-slate-500', border: 'border-slate-300/50',
      benefits: ['Acceso a Emojis Animados', 'Marco de Plata brillante'] },
    { id: 4, label: 'IV', range: '3K+ pts', unlockPoints: 3000, name: 'Armadura de Hierro', icon: '🛡️', colors: 'from-gray-400 to-gray-600', border: 'border-gray-400/50',
      benefits: ['Mensaje de entrada destacado', 'Votos x1.1 en encuestas del Host'] },
    { id: 5, label: 'V', range: '5K+ pts', unlockPoints: 5000, name: 'Estandarte del Clan', icon: '🎌', colors: 'from-red-500 to-orange-500', border: 'border-red-400/50',
      benefits: ['Inmunidad al Modo Lento', 'Saludo en vivo garantizado del Host'] },
    { id: 6, label: 'VI', range: '8K+ pts', unlockPoints: 8000, name: 'Casco de Oro', icon: '⚜️', colors: 'from-yellow-400 to-amber-600', border: 'border-yellow-400/50',
      benefits: ['Marco de Oro con animaciones', 'Acceso a Streams Privados/Q&A'] },
    { id: 7, label: 'VII', range: '12K+ pts', unlockPoints: 12000, name: 'Cetro de Cristal', icon: '🪄', colors: 'from-purple-400 to-indigo-500', border: 'border-purple-400/50',
      benefits: ['Burbuja de Chat 3D exclusiva', '15% Descuento en merch/servicios'] },
    { id: 8, label: 'VIII', range: '20K+ pts', unlockPoints: 20000, name: 'Corona de Diamante', icon: '💎', colors: 'from-cyan-300 to-blue-500', border: 'border-cyan-400/50',
      benefits: ['Fijado en Pantalla Principal (Top)', 'Prioridad para Jugar en vivo'] },
    { id: 9, label: 'IX', range: '30K+ pts', unlockPoints: 30000, name: 'Trono de Leyenda', icon: '👑', colors: 'from-fuchsia-500 to-rose-600', border: 'border-fuchsia-500/50',
      benefits: ['Retrato en el Salón de Honor', 'Entrada Épica Pantalla Completa', 'Experiencia 1a1 Privada (Mensual)'] },
  ];

  const getCurrentTierIndex = (points) => {
    let index = -1;
    for (let i = 0; i < TIERS.length; i++) {
      if (points >= TIERS[i].unlockPoints) {
        index = i;
      }
    }
    return index;
  };

  // Mock data / States (ya no usamos currentLevel fijo, sino totalGiftsSent)
  const currentTierIndex = getCurrentTierIndex(totalGiftsSent);
  const artifact = currentTierIndex >= 0 ? TIERS[currentTierIndex] : { name: 'Iniciado', icon: '🌱', colors: 'from-stone-700 to-stone-900', textColor: 'text-stone-400', border: 'border-stone-700/50' };

  // Progreso hacia el SIGUIENTE nivel
  const nextTierIndex = currentTierIndex + 1 < TIERS.length ? currentTierIndex + 1 : -1;
  const nextTier = nextTierIndex !== -1 ? TIERS[nextTierIndex] : null;
  const maxExp = nextTier ? nextTier.unlockPoints : TIERS[TIERS.length - 1].unlockPoints;
  const progressPct = nextTier ? Math.min((totalGiftsSent / maxExp) * 100, 100) : 100;

  // Estado del Deslizador Visual
  const [selectedTierIndex, setSelectedTierIndex] = useState(Math.max(0, currentTierIndex));
  
  // Hacer que el slider salte automáticamente al nuevo nivel cuando el usuario lo alcance
  useEffect(() => {
    setSelectedTierIndex(Math.max(0, currentTierIndex));
  }, [currentTierIndex]);

  const selectedTier = TIERS[selectedTierIndex];
  const isReached = totalGiftsSent >= selectedTier.unlockPoints;

  // Lógica de Drag para el carrusel en PC
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragged(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    if (Math.abs(walk) > 5) setDragged(true);
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const [claimedMissions, setClaimedMissions] = useState({});
  const [floatingCoins, setFloatingCoins] = useState({ missionId: null, coins: [] });

  // Handler para el botón de reclamar
  const handleClaimReward = (missionId, amount) => {
    if (claimedMissions[missionId]) return;
    
    // 1. Marcar como reclamado
    setClaimedMissions(prev => ({ ...prev, [missionId]: true }));

    // 2. Generar datos para unas pocas monedas sutiles
    const newCoins = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      xOffset: (Math.random() - 0.5) * 80, // Dispersión horizontal corta
      yOffset: -(Math.random() * 40 + 40), // Subida vertical corta
      delay: Math.random() * 0.1
    }));
    setFloatingCoins({ missionId, coins: newCoins });

    // 3. Incrementar el saldo con un ligero retraso
    setTimeout(() => {
      setBalance(prev => prev + amount);
    }, 400);

    // 4. Limpiar los elementos del DOM después de la animación
    setTimeout(() => {
      setFloatingCoins({ missionId: null, coins: [] });
    }, 1000);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full w-full bg-[#050505] flex flex-col text-white font-sans overflow-y-auto no-scrollbar pb-24 relative"
    >
      {/* Fondos luminosos (Cyan / Fucsia) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-64 -right-32 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 flex flex-col p-5 space-y-6">
        
        {/* HEADER & PERFIL GLASSMORPHISM */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl mt-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${artifact.colors} p-0.5 shadow-lg relative`}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Thonny" alt="Thonny" className="w-full h-full rounded-xl bg-gray-900 object-cover" />
                <div className={`absolute -bottom-2 -right-2 bg-gray-900 border ${artifact.border} rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-xl`}>
                  {artifact.icon}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight">Thonny ⚔️</h2>
                <div className="flex flex-col mt-1 space-y-1">
                  <div className="flex items-center space-x-1 bg-black/40 rounded-full px-2 py-0.5 w-max">
                    <span className="text-xs">{artifact.icon}</span>
                    <span className={`text-xs font-bold ${artifact.textColor || 'text-white'}`}>{artifact.name}</span>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={onLogout} className="text-gray-400 hover:text-white transition p-2 bg-black/20 rounded-full border border-white/5">
              <HelpCircle size={18} />
            </button>
          </div>

          {/* Progreso del Artefacto */}
          <div className="mb-6">
            <div className="flex justify-between text-xs font-bold text-gray-400 mb-1.5">
              <span>{nextTier ? `Próximo: ${nextTier.name}` : 'Máximo Rango Alcanzado'}</span>
              <span className="text-cyan-400">{totalGiftsSent.toLocaleString()} / {maxExp.toLocaleString()} pts</span>
            </div>
            <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                className={`h-full bg-gradient-to-r ${artifact.colors} rounded-full relative shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
              >
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 rounded-full blur-sm"></div>
              </motion.div>
            </div>
          </div>

          {/* Panel de Recarga (Yape visible) */}
          <div className="bg-black/40 rounded-2xl p-4 flex items-center justify-between border border-white/5 shadow-inner relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Saldo Actual</p>
              <div className="flex items-center space-x-1.5">
                <Coins size={18} className="text-yellow-400" />
                {/* Saldo animado al cambiar */}
                <motion.span 
                  key={balance}
                  initial={{ scale: 1.5, color: '#fcd34d' }} // Brillo amarillo inicial al sumar
                  animate={{ scale: 1, color: '#ffffff' }} // Vuelve a blanco
                  transition={{ duration: 0.4 }}
                  className="text-2xl font-black"
                >
                  {balance.toLocaleString()}
                </motion.span>
              </div>
            </div>
            <button 
              onClick={onOpenYape}
              className="relative z-10 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-sm font-bold py-2.5 px-4 rounded-xl shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all active:scale-95 flex items-center space-x-2"
            >
              <Zap size={16} className="fill-current" />
              <span>Recargar</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            NUEVO: DESLIZADOR VISUAL DE NIVELES (ESTILO TIKTOK)
            ======================================================== */}
        <div className="mb-2">
          {/* Timeline Icons Scroll */}
          <div 
            ref={sliderRef}
            className={`flex items-center overflow-x-auto no-scrollbar py-4 px-1 space-x-3 mb-2 ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {TIERS.map((tier, idx) => (
              <React.Fragment key={tier.id}>
                <button
                  onClick={() => { if (!dragged) setSelectedTierIndex(idx); }}
                  className={`relative flex-shrink-0 transition-all duration-300 ${
                    selectedTierIndex === idx ? 'scale-110 opacity-100 z-10' : 'scale-90 opacity-40 hover:opacity-80'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${tier.colors} flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(255,255,255,0.1)] border-2 ${selectedTierIndex === idx ? tier.border : 'border-transparent'}`}>
                    {tier.icon}
                  </div>
                </button>
                {idx < TIERS.length - 1 && (
                  <div className="h-[2px] w-6 bg-white/10 flex-shrink-0 rounded-full"></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Big Card del Nivel Seleccionado */}
          <div className={`w-full rounded-3xl p-6 relative overflow-hidden bg-gradient-to-br ${selectedTier.colors} transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] border ${selectedTier.border}`}>
            {/* Gradiente más oscuro para contrastar fondo */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <h3 className="text-5xl font-black italic tracking-tighter drop-shadow-md text-white">{selectedTier.label}</h3>
                <p className="text-sm font-bold text-white/70 tracking-wide mt-1">{selectedTier.range}</p>
              </div>
              
              <div className="w-24 h-24 flex items-center justify-center text-7xl drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]">
                {selectedTier.icon}
              </div>
            </div>
            
            <div className="relative z-10 mt-6 pt-6 border-t border-white/20">
              <p className="font-bold text-sm text-white/90">
                {isReached ? '¡Felicitaciones por alcanzar este nivel!' : 'Aún no alcanzaste este nivel de donador.'}
              </p>
            </div>
          </div>

          {/* Recompensas y Beneficios Section (Bajo el card) */}
          <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center">
                <Gift size={14} className="mr-1.5 text-cyan-400" />
                Beneficios del Nivel
              </p>
              <div className="bg-white/10 px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center shadow-inner">
                <Target size={12} className="mr-1 opacity-50" />
                {selectedTier.unlockPoints.toLocaleString()} pts
              </div>
            </div>

            <div className="space-y-2.5">
              {/* Insignia Base (Siempre presente) */}
              <div className="flex items-center space-x-3 bg-black/20 p-2.5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <div className={`w-10 h-10 shrink-0 rounded-lg bg-gradient-to-tr ${selectedTier.colors} flex items-center justify-center text-xl shadow-inner`}>
                  {selectedTier.icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-white">Insignia: {selectedTier.name}</span>
                  <span className="text-[11px] text-gray-500 leading-tight mt-0.5">Aparecerá en el chat junto a tu nombre</span>
                </div>
              </div>

              {/* Beneficios Exclusivos Dinámicos */}
              {selectedTier.benefits && selectedTier.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center space-x-3 bg-black/20 p-2.5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400 shadow-inner">
                    <Star size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-gray-200 leading-snug">{benefit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ======================================================== */}

        {/* MISIONES SECTION */}
        <div>
          <h3 className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-5 flex items-center">
            <Target className="text-cyan-400 mr-2" size={24} />
            MISIONES
          </h3>

          <div className="space-y-4">
            
            {[
              { id: 'gift_5k', target: 5000, reward: 500, title: 'Completa 5k en regalos' },
              { id: 'gift_10k', target: 10000, reward: 1000, title: 'Completa 10k en regalos' },
              { id: 'gift_20k', target: 20000, reward: 2000, title: 'Completa 20k en regalos' },
            ].map((mission) => {
              const isComplete = totalGiftsSent >= mission.target;
              const isClaimed = claimedMissions[mission.id];
              const remaining = Math.max(0, mission.target - totalGiftsSent);
              
              return (
                <div key={mission.id} className={`bg-[#111111] border-2 ${isClaimed ? 'border-green-500/30' : isComplete ? 'border-cyan-500/40' : 'border-[#222]'} rounded-2xl p-5 relative overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.05)] transition-colors duration-500 group hover:border-gray-700`}>
                  {/* Resplandor de completado */}
                  {(isComplete || isClaimed) && (
                    <div className={`absolute top-0 right-0 w-32 h-32 ${isClaimed ? 'bg-green-500/10' : 'bg-cyan-500/10'} blur-2xl rounded-full transition-colors duration-500`}></div>
                  )}
                  
                  <div className="text-center mb-6 mt-2 relative z-10">
                    <h4 className="text-lg font-black text-white">{mission.title}</h4>
                    <div className="text-xs text-gray-400 mt-1 font-bold">Progreso: {totalGiftsSent.toLocaleString()} / {mission.target.toLocaleString()}</div>
                  </div>
                  <div className="flex justify-between items-end relative z-10">
                    <div className="flex items-center space-x-2 text-yellow-400 bg-yellow-400/10 px-3 py-1.5 rounded-lg border border-yellow-400/20">
                      <Coins size={16} />
                      <span className="font-bold text-sm">Recompensa {mission.reward}</span>
                    </div>
                    
                    <div className="relative">
                      {isClaimed ? (
                        <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl font-bold text-sm border border-green-500/30 flex items-center space-x-1 shadow-inner relative z-20">
                          <Check size={16} className="mr-1" />
                          Reclamado
                        </div>
                      ) : isComplete ? (
                        <button 
                          onClick={() => handleClaimReward(mission.id, mission.reward)}
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all active:scale-95 flex items-center space-x-1 relative z-20"
                        >
                          Reclamar recompensa
                        </button>
                      ) : (
                        <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-xl font-bold text-sm border border-gray-700 shadow-inner">
                          faltan {remaining.toLocaleString()}
                        </div>
                      )}

                      {/* Renderizado condicional de Monedas Sutiles */}
                      <AnimatePresence>
                        {floatingCoins.missionId === mission.id && floatingCoins.coins.map(coin => (
                          <motion.div
                            key={coin.id}
                            initial={{ opacity: 1, scale: 0.2, y: 0, x: 0 }}
                            animate={{ 
                              opacity: 0, 
                              y: coin.yOffset, 
                              x: coin.xOffset, 
                              scale: 1 
                            }}
                            transition={{ 
                              duration: 0.6, 
                              delay: coin.delay,
                              ease: "easeOut" 
                            }}
                            className="absolute top-0 left-1/2 pointer-events-none z-50"
                            style={{ marginLeft: '-10px' }}
                          >
                            <span className="text-xl drop-shadow-md">🪙</span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Mission Card: Conéctate 7 días seguidos (Restaurada) */}
            <div className="bg-[#111111] border-2 border-[#222] rounded-2xl p-5 relative overflow-hidden shadow-lg hover:border-gray-700 transition-colors">
              <div className="text-center mb-6 mt-2">
                <h4 className="text-lg font-black text-gray-200">Conéctate 7 días seguidos</h4>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center space-x-2 text-purple-400 bg-purple-400/10 px-3 py-1.5 rounded-lg border border-purple-400/20">
                  <Gift size={16} />
                  <span className="font-bold text-sm">Cofre Sorpresa MVP</span>
                </div>
                <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-xl font-bold text-sm border border-gray-700 shadow-inner">
                  día 2/7
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

