import React, { useState, useEffect } from 'react';
import { Eye, Gift, Share2, MoreHorizontal, AlertTriangle, Plus, Send, Target, Backpack } from 'lucide-react';
import PKBar from './PKBar';
import Chat from './Chat';
import GiftOverlay from './GiftOverlay';
import HostProfileModal from '../Modals/HostProfileModal';
import { motion, AnimatePresence } from 'framer-motion';

let battleAnimationPlayedForCurrentBattle = false;
let battleAnimationStartTime = 0;

export default function ArenaScreen({
  userRole,
  onOpenGiftModal,
  onOpenYape,
  balance,
  timeLeft,
  isBattleActive,
  score1,
  score2,
  score3 = 0,
  score4 = 0,
  battleType = 2,
  isGiantGiftActive,
  smallGifts,
  hearts,
  tapCombo,
  onScreenTap,
  chatMessages,
  onSendMessage,
  onAddScore,
  battlePhase,
  communityGiftProgress = 0,
  communityGiftStatus = 'locked',
  onOpenCommunityGift,
  activePowerups = [],
  onOpenMissions,
  onOpenBackpack
}) {
  const isSnipeTime = timeLeft <= 60 && timeLeft > 0;
  const [selectedHost, setSelectedHost] = useState(null);
  const [showBattleStartAnim, setShowBattleStartAnim] = useState(false);

  useEffect(() => {
    if (isBattleActive) {
      const now = Date.now();
      if (!battleAnimationPlayedForCurrentBattle) {
        setShowBattleStartAnim(true);
        battleAnimationPlayedForCurrentBattle = true;
        battleAnimationStartTime = now;
        setTimeout(() => setShowBattleStartAnim(false), 2000);
      } else {
        // Si la animación se disparó hace menos de 2 segundos (por ejemplo, remount por StrictMode)
        if (now - battleAnimationStartTime < 2000) {
          setShowBattleStartAnim(true);
          setTimeout(() => setShowBattleStartAnim(false), 2000 - (now - battleAnimationStartTime));
        } else {
          setShowBattleStartAnim(false);
        }
      }
    } else {
      setShowBattleStartAnim(false);
      battleAnimationPlayedForCurrentBattle = false;
      battleAnimationStartTime = 0;
    }
  }, [isBattleActive]);

  const mockHost1 = {
    name: 'Anfitrión_Pro',
    handle: '@roberth_x',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Host_Pro&style=circle',
    followers: '2,262',
    following: '360',
    league: 'elite',
    leagueLevel: 3,
    mvpLevel: 25,
    communitySize: 144
  };

  const mockHost2 = {
    name: 'Host_Rival99',
    handle: '@rival_99',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rival&style=circle',
    followers: '1,500',
    following: '120',
    league: 'guerrera',
    leagueLevel: 1,
    mvpLevel: 18,
    communitySize: 85
  };
  let visualScore1 = score1;
  let visualScore2 = score2;
  const isSwordActive = activePowerups.some(p => p.type === 'sword');
  const isShieldActive = activePowerups.some(p => p.type === 'shield');
  
  if (isSwordActive) visualScore1 *= 2;
  if (isShieldActive) visualScore2 = Math.floor(visualScore2 * 0.8);

  return (
    <div className="relative flex flex-col h-full bg-black overflow-hidden select-none" onClick={(e) => {
      onScreenTap(e);
      if (isBattleActive) onAddScore(1);
    }}>

      {/* CAPA INVISIBLE EXCLUSIVA PARA CAPTURAR TAPS (Evita bloqueos) */}
      <div className="absolute inset-0 z-10 cursor-pointer pointer-events-auto"></div>

      {/* =========================================
          1. HEADER (Espacio Superior - ABSOLUTE)
          ========================================= */}
      <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-start px-4 pt-[max(env(safe-area-inset-top),1rem)] pb-2 pointer-events-none">
        <div className="flex items-center space-x-2">
          {/* Host Profile Píldora */}
          <div
            onClick={(e) => { e.stopPropagation(); setSelectedHost(mockHost1); }}
            className="flex items-center bg-black/40 backdrop-blur-md rounded-full pr-2 pl-1 py-1 border border-white/10 pointer-events-auto shadow-lg cursor-pointer hover:bg-black/60 transition"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 mr-2">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Host_Pro&style=circle" className="w-full h-full bg-gray-900 rounded-full" alt="host1" />
            </div>
            <div className="flex flex-col mr-3">
              <span className="text-white font-bold text-[10px] leading-tight">Anfitrión_Pro</span>
              <span className="text-gray-300 text-[8px]">1.2M Likes</span>
            </div>
            <button className="bg-pink-600 text-white rounded-full p-1 shadow-md hover:bg-pink-500 transition-colors">
              <Plus size={12} />
            </button>
          </div>
        </div>

        {/* Espectadores */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10 pointer-events-auto">
            <Eye size={12} className="text-gray-300 mr-1.5" />
            <span className="text-white font-bold text-[11px]">1.2K</span>
          </div>
        </div>
      </div>

      {/* POWERUPS ACTIVOS (Al estilo TikTok: Icono con temporizador abajo) */}
      <div className="absolute top-[55px] left-3 z-50 flex flex-row space-x-2 pointer-events-none">
        <AnimatePresence>
          {activePowerups.map(p => {
            const timeLeftSecs = Math.max(0, Math.ceil((p.expiresAt - Date.now()) / 1000));
            // Formatear a 0:XX
            const formattedTime = `0:${timeLeftSecs.toString().padStart(2, '0')}`;
            return (
              <motion.div 
                key={p.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/80 to-purple-600/80 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(168,85,247,0.4)] pointer-events-auto"
              >
                <span className="text-lg drop-shadow-md animate-pulse">{p.icon}</span>
                
                {/* Timer Pill at the bottom */}
                <div className="absolute -bottom-1.5 bg-black/80 backdrop-blur-md rounded-full px-1.5 py-0.5 border border-white/10 shadow-md">
                  <span className="text-white text-[8px] font-bold tracking-wider">{formattedTime}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {isBattleActive ? (
        <>
          <div className="absolute top-[75px] left-0 w-full z-40 pointer-events-none">
            <PKBar score1={visualScore1} score2={visualScore2} score3={score3} score4={score4} battleType={battleType} timeLeft={timeLeft} />
          </div>

          <div className="flex w-full h-[65%] shrink-0 pointer-events-none relative z-20 pt-[110px] flex-wrap">
            {(() => {
              const maxScore = Math.max(visualScore1, visualScore2, battleType >= 3 ? score3 : 0, battleType >= 4 ? score4 : 0);
              const renderVideoHost = (hostIndex, name, score, colorClass, gradient, pulseColor, containerClass) => {
                const isWinner = score >= maxScore && maxScore > 0;
                return (
                  <div key={hostIndex} className={`relative bg-gray-900 border-black flex flex-col items-center justify-center overflow-hidden ${containerClass}`}>
                    <div className={`absolute inset-0 bg-gradient-to-tr ${gradient} to-transparent`}></div>
                    {hostIndex > 1 && name && (
                      <div className="absolute top-2 right-2 z-20">
                        <span onClick={(e) => { e.stopPropagation(); setSelectedHost(mockHost2); }} className={`bg-black/60 backdrop-blur-md rounded-full px-2 py-0.5 text-white font-bold text-[10px] border ${colorClass} shadow-md cursor-pointer pointer-events-auto hover:bg-black/80 transition`}>
                          {name}
                        </span>
                      </div>
                    )}
                    <div className={`w-32 h-32 md:w-48 md:h-48 rounded-full ${pulseColor} blur-3xl absolute animate-[pulse_4s_ease-in-out_infinite]`}></div>
                    <span className={`text-white/50 font-bold text-xs md:text-sm z-10 drop-shadow-lg`}>VIDEO HOST {hostIndex}</span>
                    <AnimatePresence>
                      {battlePhase === 'results' && (
                        <motion.div initial={{ scale: 0, opacity: 0, rotate: hostIndex % 2 === 0 ? 20 : -20 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] z-30">
                          {isWinner ? (
                            <div className="flex flex-col items-center relative scale-75 md:scale-100">
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-yellow-500/40 blur-[40px] rounded-full animate-pulse z-0 pointer-events-none"></div>
                              <motion.div animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="text-5xl md:text-7xl drop-shadow-[0_0_30px_rgba(250,204,21,1)] mb-2 relative z-10">👑</motion.div>
                              <div className="relative z-10 bg-black/40 px-4 md:px-6 py-1 rounded-full border border-yellow-500/30 shadow-[0_0_20px_rgba(250,204,21,0.4)] backdrop-blur-sm mt-1">
                                <span className="font-black italic text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-widest">WIN</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center relative opacity-90 grayscale-[40%] scale-75 md:scale-100">
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-blue-900/30 blur-[40px] rounded-full animate-pulse z-0 pointer-events-none"></div>
                              <motion.div animate={{ opacity: [0.6, 1, 0.6], y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} className="text-5xl md:text-7xl drop-shadow-[0_0_20px_rgba(100,116,139,0.8)] mb-2 relative z-10">🌧️</motion.div>
                              <div className="relative z-10 bg-black/40 px-4 md:px-5 py-1 rounded-full border border-gray-500/30 shadow-[0_0_15px_rgba(0,0,0,0.8)] backdrop-blur-sm mt-1">
                                <span className="font-black italic text-xl md:text-3xl text-gray-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-widest">LOSE</span>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              };

              if (battleType === 2) {
                return (
                  <>
                    {renderVideoHost(1, null, score1, '', 'from-cyan-900/40', 'bg-cyan-500/20', 'w-1/2 h-full border-r')}
                    {renderVideoHost(2, 'Host_Rival99', score2, 'border-pink-500/30', 'from-pink-900/40', 'bg-pink-500/20', 'w-1/2 h-full border-l')}
                  </>
                );
              } else if (battleType === 3) {
                return (
                  <>
                    {renderVideoHost(1, null, score1, '', 'from-cyan-900/40', 'bg-cyan-500/20', 'w-1/2 h-full border-r')}
                    <div className="w-1/2 h-full flex flex-col border-l border-black pointer-events-auto">
                      {renderVideoHost(2, 'Host_Rival99', score2, 'border-pink-500/30', 'from-pink-900/40', 'bg-pink-500/20', 'h-1/2 border-b w-full')}
                      {renderVideoHost(3, 'TercerHost', score3, 'border-orange-500/30', 'from-orange-900/40', 'bg-orange-500/20', 'h-1/2 border-t w-full')}
                    </div>
                  </>
                );
              } else if (battleType === 4) {
                return (
                  <>
                    <div className="w-1/2 h-full flex flex-col border-r border-black pointer-events-auto">
                      {renderVideoHost(1, null, score1, '', 'from-cyan-900/40', 'bg-cyan-500/20', 'h-1/2 border-b w-full')}
                      {renderVideoHost(3, 'Host_Naranja', score3, 'border-orange-500/30', 'from-orange-900/40', 'bg-orange-500/20', 'h-1/2 border-t w-full')}
                    </div>
                    <div className="w-1/2 h-full flex flex-col border-l border-black pointer-events-auto">
                      {renderVideoHost(2, 'Host_Rival99', score2, 'border-pink-500/30', 'from-pink-900/40', 'bg-pink-500/20', 'h-1/2 border-b w-full')}
                      {renderVideoHost(4, 'Host_Morado', score4, 'border-purple-500/30', 'from-purple-900/40', 'bg-purple-500/20', 'h-1/2 border-t w-full')}
                    </div>
                  </>
                );
              }
            })()}
          </div>
        </>
      ) : (
        /* MODO SOLO (Video ocupa todo el fondo absoluto) */
        <div className="absolute inset-0 w-full h-full bg-gray-900 flex flex-col items-center justify-center pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-transparent"></div>
          <div className="w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl absolute animate-[pulse_4s_ease-in-out_infinite]"></div>
          <span className="text-white/50 font-bold text-lg z-10 drop-shadow-lg">PANTALLA COMPLETA</span>
        </div>
      )}

      {/* Battle Start Animation Overlay */}
      <AnimatePresence>
        {showBattleStartAnim && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none"
          >
            <div className="relative flex items-center justify-center">
              {/* Escudo central brillando */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="text-9xl drop-shadow-[0_0_50px_rgba(234,179,8,1)] z-10 relative"
              >
                🛡️
              </motion.div>

              {/* Espada Izquierda (Chocando) */}
              <motion.div
                initial={{ x: -200, y: -200, rotate: -45, opacity: 0 }}
                animate={{ x: -20, y: -20, rotate: 45, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3, type: "spring", stiffness: 300 }}
                className="text-8xl absolute z-20 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
              >
                🗡️
              </motion.div>

              {/* Espada Derecha (Chocando) */}
              <motion.div
                initial={{ x: 200, y: 200, rotate: 135, opacity: 0 }}
                animate={{ x: 20, y: 20, rotate: 45, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3, type: "spring", stiffness: 300 }}
                className="text-8xl absolute z-20 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] scale-x-[-1]"
              >
                🗡️
              </motion.div>

              {/* Destello de choque */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute z-30 w-48 h-48 bg-white/80 blur-2xl rounded-full"
              ></motion.div>
              
              <motion.div
                initial={{ scale: 0, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 100, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute z-40 text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 drop-shadow-[0_5px_5px_rgba(0,0,0,1)] tracking-widest uppercase"
              >
                ¡BATALLA!
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          4. ZONA INFERIOR: CHAT, ANIMACIONES Y BOTONES
          ========================================= */}
      <div className={`flex-1 min-h-0 w-full flex flex-col justify-end pointer-events-none z-30 pb-4 relative ${!isBattleActive ? 'bg-gradient-to-t from-black via-black/50 to-transparent' : ''}`}>

        {/* Lluvia de corazones (Tap Tap) */}
        <AnimatePresence>
          {hearts.map(heart => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 1, y: 0, x: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 0, y: -400, x: heart.driftX, scale: 1.8, rotate: heart.driftX }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute text-5xl pointer-events-none z-50 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]"
              style={{ left: heart.x - 25, bottom: 200 + heart.y }}
            >
              💖
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Combo Multiplier Flotante */}
        <AnimatePresence>
          {tapCombo > 5 && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -10 }}
              animate={{ scale: 1.2, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              key={tapCombo}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute bottom-1/3 left-4 z-50 pointer-events-none"
            >
              <div className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-[0_0_20px_rgba(250,204,21,1)]">
                {tapCombo}x
              </div>
              <div className="text-[12px] text-yellow-300 font-bold uppercase tracking-widest mt-[-5px] drop-shadow-lg">Combo</div>
            </motion.div>
          )}
        </AnimatePresence>

        <GiftOverlay isGiantGiftActive={isGiantGiftActive} smallGifts={smallGifts} />

        <AnimatePresence>
          {isSnipeTime && isBattleActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex justify-center mb-2 shrink-0 pointer-events-none z-50"
            >
              <div className="bg-gradient-to-r from-red-600 via-pink-600 to-yellow-500 text-white font-black italic px-4 py-1 rounded-full border border-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.6)] text-sm flex items-center animate-pulse">
                <AlertTriangle size={16} className="mr-1" /> ¡x2 PUNTOS!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Component (Ahora dinámico) */}
        <div className="w-full px-4 mb-2 flex-1 flex flex-col justify-end min-h-0 overflow-hidden relative">

          {/* WIDGET REGALO COMUNITARIO */}
          <div className="absolute right-4 bottom-4 flex flex-col items-center pointer-events-auto z-40">
            {communityGiftStatus === 'locked' ? (
              <div
                onClick={(e) => { e.stopPropagation(); onOpenCommunityGift(); }}
                className="w-12 h-36 bg-black/60 border border-white/20 rounded-full flex flex-col justify-end overflow-hidden shadow-lg backdrop-blur-md p-1 relative cursor-pointer hover:bg-black/80 transition"
              >
                <div
                  className="w-full bg-gradient-to-t from-pink-600 via-purple-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ height: `${communityGiftProgress}%` }}
                ></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[11px] font-black text-white drop-shadow-md">{communityGiftProgress}%</span>
                  <span className="text-[8px] font-bold text-white/70 uppercase">Reto</span>
                </div>
              </div>
            ) : communityGiftStatus === 'failed' ? (
              <motion.div
                initial={{ scale: 1, rotate: 0 }}
                animate={{ scale: [1, 1.1, 1], rotate: [0, -15, 15, -15, 0], opacity: [1, 1, 0.5] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-14 h-14 bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center border-2 border-gray-600 grayscale cursor-pointer hover:scale-105"
                onClick={(e) => { e.stopPropagation(); onOpenCommunityGift(); }}
              >
                <div className="text-3xl drop-shadow-lg opacity-50">🎁</div>
                <div className="absolute -top-3 -right-3 bg-gray-600 text-[9px] text-white font-black px-2 py-0.5 rounded-full shadow-md border border-gray-400">
                  FALLÓ
                </div>
              </motion.div>
            ) : communityGiftStatus === 'success' ? (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 bg-gradient-to-tr from-yellow-300 to-yellow-500 rounded-2xl shadow-[0_0_30px_rgba(250,204,21,1)] flex items-center justify-center border-2 border-white cursor-pointer hover:scale-105"
                onClick={(e) => { e.stopPropagation(); onOpenCommunityGift(); }}
              >
                <div className="text-3xl drop-shadow-lg animate-bounce">🏆</div>
                <div className="absolute -top-3 -right-3 bg-yellow-600 text-[9px] text-white font-black px-2 py-0.5 rounded-full shadow-md border border-white">
                  ÉXITO
                </div>
              </motion.div>
            ) : (communityGiftStatus === 'unlocked' || communityGiftStatus === 'voting' || communityGiftStatus === 'funding') ? (
              <motion.button
                onClick={(e) => { e.stopPropagation(); onOpenCommunityGift(); }}
                animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-14 h-14 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-2xl shadow-[0_0_20px_rgba(250,204,21,0.6)] flex items-center justify-center border-2 border-yellow-200 cursor-pointer hover:scale-105 active:scale-95"
              >
                <div className="text-3xl drop-shadow-lg">🎁</div>
                <div className="absolute -top-3 -right-3 bg-red-600 text-[9px] text-white font-black px-2 py-0.5 rounded-full shadow-md border border-white/20 animate-pulse">
                  ACTIVO
                </div>
              </motion.button>
            ) : null}
          </div>


          <Chat messages={chatMessages} userRole={userRole} isBattleActive={isBattleActive} />
        </div>

        {/* BOTONERA TIKTOK CLON EXACTO */}
        <div className="w-full px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] flex items-center justify-between pointer-events-auto space-x-2 shrink-0">

          {/* Input de Chat Estilo Píldora Minimalista */}
          <div className="flex-1">
            <div className="bg-white/10 backdrop-blur-md rounded-full border border-white/5 flex items-center pl-4 pr-1 py-1 w-full">
              <input
                id="chat-input-mobile"
                type="text"
                placeholder="Type..."
                className="bg-transparent text-white text-[13px] w-full outline-none placeholder-gray-400 font-medium py-1.5"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    onSendMessage(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const input = document.getElementById('chat-input-mobile');
                  if (input && input.value.trim()) {
                    onSendMessage(input.value);
                    input.value = '';
                  }
                }}
                className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center flex-shrink-0 hover:bg-pink-500 transition-colors active:scale-95 shadow-md"
              >
                <Send size={14} className="text-white ml-0.5" />
              </button>
            </div>
          </div>

          {/* Iconos de Acción Derecha */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={(e) => { e.stopPropagation(); onOpenMissions(); }}
              className="w-9 h-9 rounded-full bg-purple-600/80 backdrop-blur-md flex items-center justify-center text-white border border-purple-400/50 hover:bg-purple-600 transition active:scale-95 shadow-[0_0_10px_rgba(168,85,247,0.4)]"
            >
              <Target size={18} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); onOpenBackpack(); }}
              className="w-9 h-9 rounded-full bg-blue-600/80 backdrop-blur-md flex items-center justify-center text-white border border-blue-400/50 hover:bg-blue-600 transition active:scale-95 shadow-[0_0_10px_rgba(59,130,246,0.4)] relative"
            >
              <Backpack size={18} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); onOpenGiftModal(); }}
              className="w-9 h-9 rounded-full bg-[#ff2a5f] flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,42,95,0.4)] hover:scale-105 transition-all relative group"
            >
              <Gift size={18} className="fill-current text-white drop-shadow-md" />
              <span className="absolute -top-3 bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow border border-white/20">REGALO</span>
            </button>

            <button className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/5 hover:bg-black/60 transition active:scale-95">
              <Share2 size={16} />
            </button>
          </div>
        </div>

      </div>

      <HostProfileModal
        isOpen={!!selectedHost}
        onClose={() => setSelectedHost(null)}
        host={selectedHost}
      />
    </div>
  );
}
