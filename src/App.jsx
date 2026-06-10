import React, { useState, useEffect } from 'react';
import { getArtifactForPoints, TIERS } from './utils/tiers';
import { Flame, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import RoleSelector from './components/Auth/RoleSelector';
import ArenaScreen from './components/Arena/ArenaScreen';
import AdminPanel from './components/Dashboards/AdminPanel';
import HostPanel from './components/Dashboards/HostPanel';
import MvpPanel from './components/Dashboards/MvpPanel';
import GiftCatalogModal from './components/Modals/GiftCatalogModal';
import YapeModal from './components/Modals/YapeModal';
import CommunityGiftModal from './components/Modals/CommunityGiftModal';

export default function App() {
  // ==========================================
  // ESTADO GLOBAL DE SESIÓN
  // ==========================================
  const [userRole, setUserRole] = useState(null); // 'admin', 'host', 'mvp', null = login
  const [activeTab, setActiveTab] = useState('arena'); // 'arena', 'panel'

  // ==========================================
  // ESTADO DE LA BATALLA (ARENA)
  // ==========================================
  const [battlePhase, setBattlePhase] = useState('active'); // 'active', 'results', 'solo'
  const [timeLeft, setTimeLeft] = useState(240); // 30 segundos para probar
  const [score1, setScore1] = useState(12400);
  const [score2, setScore2] = useState(8900);
  const [balance, setBalance] = useState(500000); // Monedas ilimitadas para pruebas
  const [totalGiftsSent, setTotalGiftsSent] = useState(0); // Seguimiento de regalos enviados

  // Community Gift State
  const [communityGiftsCount, setCommunityGiftsCount] = useState(0);
  const [communityPoints, setCommunityPoints] = useState(0);
  const [communityTaps, setCommunityTaps] = useState(0);
  const [communityComments, setCommunityComments] = useState(0);

  const [communityGiftStatus, setCommunityGiftStatus] = useState('locked'); // 'locked', 'unlocked', 'voting', 'funding', 'success', 'failed'
  const [isCommunityGiftModalOpen, setIsCommunityGiftModalOpen] = useState(false);
  const [communityFundingPool, setCommunityFundingPool] = useState(0);

  const communityGiftProgress = Math.floor(
    (Math.min(communityGiftsCount, 10) / 10) * 25 +
    (Math.min(communityPoints, 1000) / 1000) * 25 +
    (Math.min(communityTaps, 10) / 10) * 25 +
    (Math.min(communityComments, 1) / 1) * 25
  );

  // UI States
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [isYapeModalOpen, setIsYapeModalOpen] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [smallGifts, setSmallGifts] = useState([]);
  const [isGiantGiftActive, setIsGiantGiftActive] = useState(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Sistema', text: '¡Bienvenidos a la Batalla Oficial TEGANO!', type: 'system' },
    { id: 2, user: 'Maria_99', text: '¡Vamos con todo host1!', type: 'normal' },
    { id: 3, user: 'El_Patron_Lima', text: 'Tiren regalos ahora, preparen el x2 🔥', type: 'vip' }
  ]);

  // Tap Combo State
  const [tapCombo, setTapCombo] = useState(0);
  const comboTimeoutRef = React.useRef(null);

  // Efecto del reloj de batalla y simuladores
  useEffect(() => {
    if (!userRole || activeTab !== 'arena' || battlePhase !== 'active') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setBattlePhase('results');
          setTimeout(() => {
            setBattlePhase('solo');
          }, 6000); // Muestra los resultados (animaciones Win/Lose) por 6 segundos
          return 0;
        }
        return prev - 1;
      });
      // Simulador orgánico de puntos
      setScore1(s => s + (Math.random() > 0.6 ? Math.floor(Math.random() * 50) : 0));
      setScore2(s => s + (Math.random() > 0.6 ? Math.floor(Math.random() * 50) : 0));
      
      // We need another way to unlock it when progress reaches 100. Let's do it in a separate useEffect.

      // Simulador orgánico de chat
      if (Math.random() > 0.8) {
        const fakeUsers = ['JuanP', 'AnaBanana', 'King23', 'Sonia_L', 'User_8819'];
        const fakeMsgs = ['¡Vamos!', 'Toca la pantalla', '🚀🚀🚀', 'Cuidado que nos ganan', 'x2 activo pronto'];
        const isVip = Math.random() > 0.7;
        const fakeArtifact = isVip ? TIERS[Math.floor(Math.random() * (TIERS.length - 3))] : null; // Rangos variados para los bots

        setChatMessages(prev => {
          const newMsgs = [...prev, {
            id: Date.now(),
            user: fakeUsers[Math.floor(Math.random() * fakeUsers.length)],
            text: fakeMsgs[Math.floor(Math.random() * fakeMsgs.length)],
            type: isVip ? 'vip' : 'normal',
            artifact: fakeArtifact
          }];
          return newMsgs.slice(-15); // Mantener solo los últimos 15
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [userRole, activeTab]);

  // Unlock community gift
  useEffect(() => {
    if (communityGiftProgress >= 100 && communityGiftStatus === 'locked') {
      setCommunityGiftStatus('unlocked');
    }
  }, [communityGiftProgress, communityGiftStatus]);

  // Auto-reset community gift after failure or success
  useEffect(() => {
    if ((communityGiftStatus === 'failed' || communityGiftStatus === 'success') && !isCommunityGiftModalOpen) {
      const t = setTimeout(() => {
        setCommunityGiftStatus('ended');
      }, 4000); // 4 seconds of displaying the result before hiding
      return () => clearTimeout(t);
    }
  }, [communityGiftStatus, isCommunityGiftModalOpen]);

  // Handlers
  const handleScreenTap = (e) => {
    if (activeTab !== 'arena' || isGiftModalOpen || isYapeModalOpen) return;

    // Add heart with some physics offsets
    const driftX = (Math.random() - 0.5) * 100;
    const newHeart = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY, driftX };
    setHearts(prev => [...prev, newHeart]);

    // Combo Logic
    setTapCombo(prev => prev + 1);
    if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
    comboTimeoutRef.current = setTimeout(() => {
      setTapCombo(0);
    }, 2000); // Reset combo after 2 seconds of inactivity

    // Añadir al progreso del regalo comunitario
    if (communityGiftStatus === 'locked') {
      setCommunityTaps(prev => Math.min(10, prev + 1));
    }

    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1000);
  };

  const handleSendMessage = (text) => {
    const artifact = userRole === 'mvp' ? getArtifactForPoints(totalGiftsSent) : null;
    if (communityGiftStatus === 'locked') {
      setCommunityComments(prev => Math.min(1, prev + 1));
    }

    setChatMessages(prev => [...prev, {
      id: Date.now(),
      user: 'Tú',
      text,
      type: userRole === 'mvp' ? 'vip' : 'normal',
      artifact
    }].slice(-15));
  };

  const handleAddScore = (amount) => {
    setScore1(prev => prev + amount);
  };

  const handleSendGift = (gift) => {
    if (balance < gift.price) {
      alert("Saldo insuficiente");
      return;
    }
    setBalance(prev => prev - gift.price);
    setTotalGiftsSent(prev => prev + gift.price);

    if (communityGiftStatus === 'locked') {
      setCommunityGiftsCount(prev => Math.min(10, prev + 1));
      setCommunityPoints(prev => Math.min(1000, prev + gift.price));
    }

    if (gift.id === 'caballero') {
      setIsGiantGiftActive(gift);
      setTimeout(() => setIsGiantGiftActive(null), 8500); // Epic 8.5s animation
    } else if (gift.type === 'premium') {
      setIsGiantGiftActive(gift);
      setTimeout(() => setIsGiantGiftActive(null), 4000);
    } else {
      const newSmallGift = { id: Date.now(), emoji: gift.emoji, name: gift.name };
      setSmallGifts(prev => [...prev, newSmallGift]);
      setTimeout(() => setSmallGifts(prev => prev.filter(g => g.id !== newSmallGift.id)), 3000);
    }
    setScore1(prev => prev + gift.price);
  };

  // ==========================================
  // RENDERIZADO
  // ==========================================
  if (!userRole) {
    return <RoleSelector onSelectRole={(role) => { setUserRole(role); setActiveTab('arena'); }} />;
  }

  const renderDashboard = () => {
    if (userRole === 'admin') return <AdminPanel onLogout={() => setUserRole(null)} />;
    if (userRole === 'host') return <HostPanel onLogout={() => setUserRole(null)} />;
    if (userRole === 'mvp') return (
      <MvpPanel
        onLogout={() => setUserRole(null)}
        onOpenYape={() => setIsYapeModalOpen(true)}
        totalGiftsSent={totalGiftsSent}
        balance={balance}
        setBalance={setBalance}
      />
    );
  };

  return (
    <div className="bg-black min-h-[100dvh] flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md h-[100dvh] md:h-[850px] bg-gray-900 relative overflow-hidden md:rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.15)] md:border-4 border-gray-800 flex flex-col">

        {/* Vistas Dinámicas */}
        <div className="flex-1 w-full h-full overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === 'arena' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === 'arena' ? 20 : -20 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full absolute inset-0"
            >
              {activeTab === 'arena' ? (
                <ArenaScreen
                  userRole={userRole}
                  balance={balance}
                  timeLeft={timeLeft}
                  battlePhase={battlePhase}
                  isBattleActive={battlePhase === 'active' || battlePhase === 'results'}
                  score1={score1}
                  score2={score2}
                  hearts={hearts}
                  smallGifts={smallGifts}
                  isGiantGiftActive={isGiantGiftActive}
                  chatMessages={chatMessages}
                  tapCombo={tapCombo}
                  onOpenGiftModal={() => setIsGiftModalOpen(true)}
                  onOpenYape={() => setIsYapeModalOpen(true)}
                  onScreenTap={handleScreenTap}
                  onAddScore={handleAddScore}
                  onSendMessage={handleSendMessage}
                  communityGiftProgress={communityGiftProgress}
                  communityGiftStatus={communityGiftStatus}
                  onOpenCommunityGift={() => setIsCommunityGiftModalOpen(true)}
                />
              ) : (
                renderDashboard()
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* NAVEGACIÓN INFERIOR (TAB BAR FIXED) */}
        <div className="shrink-0 h-16 bg-gray-900 border-t border-gray-800 flex justify-around items-center px-4 relative z-50">
          <button
            onClick={() => setActiveTab('arena')}
            className={`flex flex-col items-center justify-center w-20 transition-colors ${activeTab === 'arena' ? 'text-pink-500' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Flame size={24} className={activeTab === 'arena' ? 'drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]' : ''} />
            <span className="text-[10px] font-bold mt-1">Arena en Vivo</span>
          </button>

          <button
            onClick={() => setActiveTab('panel')}
            className={`flex flex-col items-center justify-center w-20 transition-colors ${activeTab === 'panel' ? 'text-cyan-500' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Users size={24} className={activeTab === 'panel' ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''} />
            <span className="text-[10px] font-bold mt-1">
              {userRole === 'admin' ? 'Panel Admin' : userRole === 'host' ? 'Mi Panel' : 'Perfil MVP'}
            </span>
          </button>
        </div>

        {/* Modales Globales */}
        <YapeModal isOpen={isYapeModalOpen} onClose={() => setIsYapeModalOpen(false)} />
        <GiftCatalogModal
          isOpen={isGiftModalOpen}
          onClose={() => setIsGiftModalOpen(false)}
          onSendGift={handleSendGift}
          onOpenYape={() => setIsYapeModalOpen(true)}
          balance={balance}
          totalGiftsSent={totalGiftsSent}
        />
        <CommunityGiftModal
          isOpen={isCommunityGiftModalOpen}
          onClose={() => setIsCommunityGiftModalOpen(false)}
          status={communityGiftStatus}
          setStatus={setCommunityGiftStatus}
          fundingPool={communityFundingPool}
          setFundingPool={setCommunityFundingPool}
          balance={balance}
          setBalance={setBalance}
          communityTasks={{
            gifts: communityGiftsCount,
            points: communityPoints,
            taps: communityTaps,
            comments: communityComments
          }}
          onSendGiantGift={(gift) => {
            setIsGiantGiftActive(gift);
            setTimeout(() => setIsGiantGiftActive(null), 8500);
          }}
        />

      </div>
    </div>
  );
}
