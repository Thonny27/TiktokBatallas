import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, Coins, Sparkles, AlertTriangle } from 'lucide-react';

const COMMUNITY_GIFTS = [
  { id: 'dragon', name: 'Dragón Épico', emoji: '🐉', price: 5000, description: 'Lanza un dragón gigante de la comunidad.' },
  { id: 'castillo', name: 'Castillo Mágico', emoji: '🏰', price: 10000, description: 'Aparece un castillo de fuegos artificiales.' },
  { id: 'universo', name: 'Universo', emoji: '🌌', price: 20000, description: 'Convierte el fondo en una galaxia estrellada.' }
];

export default function CommunityGiftModal({
  isOpen,
  onClose,
  status,
  setStatus,
  fundingPool,
  setFundingPool,
  balance,
  setBalance,
  communityTasks,
  onSendGiantGift
}) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [votes, setVotes] = useState({ dragon: 45, castillo: 20, universo: 10 });
  const [selectedGift, setSelectedGift] = useState(null);
  const [userVoted, setUserVoted] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const userContributionRef = React.useRef(0);

  // Lógica de Fases y Temporizadores
  useEffect(() => {

    if (status === 'unlocked') {
      setStatus('voting');
      setTimeLeft(15);
    }

    let timer;
    if (status === 'voting' || status === 'funding') {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);

        // Simular votos de otros
        if (status === 'voting' && Math.random() > 0.5) {
          setVotes(v => ({
            ...v,
            dragon: v.dragon + (Math.random() > 0.5 ? 1 : 0),
            castillo: v.castillo + (Math.random() > 0.7 ? 1 : 0),
            universo: v.universo + (Math.random() > 0.8 ? 1 : 0),
          }));
        }

        // Simular aportes de otros
        if (status === 'funding' && Math.random() > 0.4) {
          setFundingPool(p => p + Math.floor(Math.random() * 50));
        }

      }, 1000);
    }

    return () => clearInterval(timer);
  }, [status]);

  // Manejar el fin del temporizador
  useEffect(() => {
    if (timeLeft <= 0) {
      if (status === 'voting') {
        // Determinar ganador
        let winnerId = 'dragon';
        let maxVotes = 0;
        Object.entries(votes).forEach(([id, count]) => {
          if (count > maxVotes) {
            maxVotes = count;
            winnerId = id;
          }
        });
        setSelectedGift(COMMUNITY_GIFTS.find(g => g.id === winnerId));
        setStatus('funding');
        setTimeLeft(30); // 30 segundos para fondear
        setFundingPool(0);
        userContributionRef.current = 0;
      } else if (status === 'funding') {
        setStatus('failed');
        if (userContributionRef.current > 0) {
          const amountToRefund = userContributionRef.current;
          setBalance(prev => prev + amountToRefund);
          userContributionRef.current = 0;
        }
      }
    }
  }, [timeLeft, status, votes]);

  // Verificar si se alcanzó la meta de fondeo
  useEffect(() => {
    if (status === 'funding' && selectedGift && fundingPool >= selectedGift.price) {
      setStatus('success');
      onSendGiantGift({ ...selectedGift, type: 'premium' }); // Lanza la animación gigante
    }
  }, [fundingPool, status, selectedGift]);



  const handleVote = (giftId) => {
    if (userVoted) return;
    setVotes(v => ({ ...v, [giftId]: v[giftId] + 1 }));
    setUserVoted(true);
  };

  const handleContribute = (amount) => {
    if (balance < amount) {
      alert("Saldo insuficiente");
      return;
    }
    setBalance(prev => prev - amount);
    setFundingPool(prev => prev + amount);
    userContributionRef.current += amount;
  };

  const handleCustomContribute = () => {
    const amount = parseInt(customAmount);
    if (!isNaN(amount) && amount > 0) {
      handleContribute(amount);
      setCustomAmount('');
    }
  };

  // Renders de cada fase
  const renderVoting = () => (
    <div className="flex flex-col h-full">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-black text-white tracking-tight mb-2">Vota por el Regalo Grupal</h3>
        <p className="text-gray-400 text-sm">El anfitrión ha elegido estas 3 opciones. ¡La que tenga más votos será el desafío de la comunidad!</p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 flex items-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <Clock size={16} className="text-yellow-400 mr-2" />
          <span className="text-white font-bold">{timeLeft}s restantes</span>
        </div>
      </div>

      <div className="space-y-3">
        {COMMUNITY_GIFTS.map(gift => (
          <button
            key={gift.id}
            onClick={() => handleVote(gift.id)}
            disabled={userVoted}
            className={`w-full relative overflow-hidden rounded-2xl p-4 flex items-center transition-all ${userVoted ? 'opacity-80' : 'hover:scale-[1.02] active:scale-95 cursor-pointer'} ${votes[gift.id] === Math.max(...Object.values(votes)) ? 'bg-gradient-to-r from-pink-600/40 to-purple-600/40 border-2 border-pink-500' : 'bg-white/5 border border-white/10'}`}
          >
            {/* Barra de progreso de votos de fondo */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-white/5 z-0 transition-all duration-500"
              style={{ width: `${(votes[gift.id] / Math.max(1, Object.values(votes).reduce((a,b)=>a+b,0))) * 100}%` }}
            ></div>
            
            <div className="text-4xl mr-4 z-10 drop-shadow-lg">{gift.emoji}</div>
            <div className="flex-1 text-left z-10">
              <h4 className="text-white font-bold text-lg leading-tight">{gift.name}</h4>
              <p className="text-gray-400 text-xs mt-0.5">{gift.price} monedas necesarias</p>
            </div>
            <div className="flex flex-col items-end z-10">
              <span className="text-white font-black text-xl">{votes[gift.id]}</span>
              <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">votos</span>
            </div>
          </button>
        ))}
      </div>
      
      {userVoted && (
        <div className="mt-6 text-center text-green-400 font-bold text-sm bg-green-400/10 py-2 rounded-lg border border-green-400/20">
          ¡Tu voto ha sido registrado! Esperando resultados...
        </div>
      )}
    </div>
  );

  const renderFunding = () => {
    if (!selectedGift) return null;
    const progress = Math.min(100, (fundingPool / selectedGift.price) * 100);
    
    return (
      <div className="flex flex-col h-full items-center">
        <div className="text-center mb-6">
          <div className="inline-flex items-center bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-pink-500/30">
            <Sparkles size={12} className="mr-1" /> Reto Grupal Activo
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight leading-tight">Misión: {selectedGift.name}</h3>
          <p className="text-gray-400 text-sm mt-1">{selectedGift.description}</p>
        </div>

        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-full blur-[30px] opacity-40 animate-pulse"></div>
          <div className="absolute inset-0 bg-black/50 rounded-full border border-white/10 flex flex-col items-center justify-center z-10 backdrop-blur-md">
            <span className="text-6xl drop-shadow-2xl hover:scale-110 transition-transform">{selectedGift.emoji}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-6">
          <div className="flex justify-between text-sm mb-2 font-bold">
            <span className="text-white flex items-center"><Coins size={14} className="text-yellow-400 mr-1"/> {fundingPool} / {selectedGift.price}</span>
            <span className="text-pink-400">Faltan {Math.max(0, selectedGift.price - fundingPool)}</span>
          </div>
          <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden shadow-inner border border-white/5 relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
            
            {/* Shimmer effect */}
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white/10 px-5 py-2.5 rounded-full border border-white/20 flex items-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <Clock size={18} className={`${timeLeft < 30 ? 'text-red-400 animate-pulse' : 'text-gray-300'} mr-2`} />
            <span className={`font-black text-lg ${timeLeft < 30 ? 'text-red-400' : 'text-white'}`}>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Aportes */}
        <div className="w-full space-y-3 mb-2">
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => handleContribute(100)} className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl py-3 flex flex-col items-center transition-colors active:scale-95">
              <Coins size={20} className="text-yellow-400 mb-1" />
              <span className="text-white font-bold text-sm">100</span>
            </button>
            <button onClick={() => handleContribute(500)} className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl py-3 flex flex-col items-center transition-colors active:scale-95">
              <Coins size={20} className="text-yellow-400 mb-1" />
              <span className="text-white font-bold text-sm">500</span>
            </button>
            <button onClick={() => handleContribute(1000)} className="bg-gradient-to-br from-pink-600 to-purple-700 hover:from-pink-500 hover:to-purple-600 border border-pink-400/50 rounded-xl py-3 flex flex-col items-center transition-all active:scale-95 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
              <Coins size={20} className="text-yellow-200 mb-1" />
              <span className="text-white font-bold text-sm">1000</span>
            </button>
          </div>
          
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="Otra cantidad..." 
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors"
            />
            <button onClick={handleCustomContribute} className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 rounded-xl border border-white/20 transition-colors active:scale-95">
              Aportar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSuccess = () => (
    <div className="flex flex-col h-full items-center justify-center py-8">
      <div className="w-32 h-32 mb-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="text-8xl drop-shadow-[0_0_40px_rgba(250,204,21,0.8)]"
        >
          {selectedGift?.emoji || '🏆'}
        </motion.div>
      </div>
      <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 tracking-tight mb-2 text-center">¡RETO COMPLETADO!</h3>
      <p className="text-gray-300 text-center mb-8">La comunidad ha logrado desbloquear el {selectedGift?.name}. ¡Prepárense para la sorpresa!</p>
      <button onClick={onClose} className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-gray-200 transition-colors">
        Continuar
      </button>
    </div>
  );

  const renderFailed = () => (
    <div className="flex flex-col h-full items-center justify-center py-8">
      <div className="text-6xl mb-6 grayscale opacity-70">
        {selectedGift?.emoji || '⏱️'}
      </div>
      <h3 className="text-2xl font-black text-white tracking-tight mb-2 text-center">¡El tiempo se agotó!</h3>
      <p className="text-gray-400 text-center mb-8">No logramos la meta de {selectedGift?.price} monedas a tiempo. Las monedas que aportaste han regresado a tu saldo.</p>
      <button onClick={onClose} className="w-full bg-white/10 text-white font-bold py-4 rounded-2xl hover:bg-white/20 transition-colors border border-white/20">
        Cerrar
      </button>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end pointer-events-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full bg-gray-900 border-t border-white/10 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] relative z-10 flex flex-col overflow-hidden min-h-[500px]"
          >
            {/* Grabber */}
            <div className="w-full flex justify-center py-4">
              <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
            </div>

            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>

            <div className="px-6 pb-8 pt-2 flex-1">
              {status === 'voting' && renderVoting()}
              {status === 'funding' && renderFunding()}
              {status === 'success' && renderSuccess()}
              {status === 'failed' && renderFailed()}
              {status === 'locked' && (
                <div className="flex flex-col h-full py-2">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-white tracking-tight mb-2">Desbloquea el Regalo Grupal</h3>
                    <p className="text-gray-400 text-sm">Completa estos retos entre todos para habilitar la votación.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center">
                      <div className="text-3xl mr-4">🎁</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="text-white font-bold text-sm">Enviar 10 Regalos</h4>
                          <span className="text-pink-400 text-xs font-bold">{communityTasks?.gifts || 0}/10</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full">
                          <div className="h-full bg-pink-500 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, ((communityTasks?.gifts || 0) / 10) * 100)}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center">
                      <div className="text-3xl mr-4">🔥</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="text-white font-bold text-sm">1,000 Puntos Totales</h4>
                          <span className="text-orange-400 text-xs font-bold">{communityTasks?.points || 0}/1000</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full">
                          <div className="h-full bg-orange-500 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, ((communityTasks?.points || 0) / 1000) * 100)}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center">
                      <div className="text-3xl mr-4">💖</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="text-white font-bold text-sm">10 Taps en Pantalla</h4>
                          <span className="text-pink-300 text-xs font-bold">{communityTasks?.taps || 0}/10</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full">
                          <div className="h-full bg-pink-400 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, ((communityTasks?.taps || 0) / 10) * 100)}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center">
                      <div className="text-3xl mr-4">💬</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="text-white font-bold text-sm">1 Comentario</h4>
                          <span className="text-cyan-400 text-xs font-bold">{communityTasks?.comments || 0}/1</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full">
                          <div className="h-full bg-cyan-400 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, ((communityTasks?.comments || 0) / 1) * 100)}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 text-center text-gray-500 text-xs">
                    El progreso global es un promedio de estas misiones.
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
