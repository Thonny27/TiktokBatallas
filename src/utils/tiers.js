export const TIERS = [
  { id: 1, label: 'I', range: '100+ pts', unlockPoints: 100, name: 'Anillo de Bronce', icon: '💍', image: '/images/tiers/tier1.png', colors: 'from-amber-700 to-amber-900', border: 'border-amber-700/50',
    benefits: ['1 Emote exclusivo básico', 'Fondo simple de perfil'] },
  { id: 2, label: 'II', range: '500+ pts', unlockPoints: 500, name: 'Espada de Acero', icon: '⚔️', image: '/images/tiers/tier2.png', colors: 'from-zinc-400 to-zinc-600', border: 'border-zinc-400/50',
    benefits: ['Color de nombre especial en chat', 'Marco de Avatar de Acero'] },
  { id: 3, label: 'III', range: '1.5K+ pts', unlockPoints: 1500, name: 'Escudo de Plata', icon: '🔰', image: '/images/tiers/tier3.png', colors: 'from-slate-300 to-slate-500', border: 'border-slate-300/50',
    benefits: ['Acceso a Emojis Animados', 'Marco de Plata brillante'] },
  { id: 4, label: 'IV', range: '3K+ pts', unlockPoints: 3000, name: 'Armadura de Hierro', icon: '🛡️', image: '/images/tiers/tier4.png', colors: 'from-gray-400 to-gray-600', border: 'border-gray-400/50',
    benefits: ['Mensaje de entrada destacado', 'Votos x1.1 en encuestas del Host'] },
  { id: 5, label: 'V', range: '5K+ pts', unlockPoints: 5000, name: 'Estandarte del Clan', icon: '🎌', image: '/images/tiers/tier5.png', colors: 'from-red-500 to-orange-500', border: 'border-red-400/50',
    benefits: ['Inmunidad al Modo Lento', 'Saludo en vivo garantizado del Host'] },
  { id: 6, label: 'VI', range: '8K+ pts', unlockPoints: 8000, name: 'Casco de Oro', icon: '⚜️', image: '/images/tiers/tier6.png', colors: 'from-yellow-400 to-amber-600', border: 'border-yellow-400/50',
    benefits: ['Marco de Oro con animaciones', 'Acceso a Streams Privados/Q&A'] },
  { id: 7, label: 'VII', range: '12K+ pts', unlockPoints: 12000, name: 'Cetro de Cristal', icon: '🪄', image: '/images/tiers/tier7.png', colors: 'from-purple-400 to-indigo-500', border: 'border-purple-400/50',
    benefits: ['Burbuja de Chat 3D exclusiva', '15% Descuento en merch/servicios'] },
  { id: 8, label: 'VIII', range: '20K+ pts', unlockPoints: 20000, name: 'Corona de Diamante', icon: '💎', image: '/images/tiers/tier8.png', colors: 'from-cyan-300 to-blue-500', border: 'border-cyan-400/50',
    benefits: ['Fijado en Pantalla Principal (Top)', 'Prioridad para Jugar en vivo'] },
  { id: 9, label: 'IX', range: '30K+ pts', unlockPoints: 30000, name: 'Trono de Leyenda', icon: '👑', image: '/images/tiers/tier9.png', colors: 'from-fuchsia-500 to-rose-600', border: 'border-fuchsia-500/50',
    benefits: ['Regalo Exclusivo: CABALLERO CELESTIAL', 'Retrato en el Salón de Honor', 'Entrada Épica Pantalla Completa', 'Experiencia 1a1 Privada'] },
];

export const getCurrentTierIndex = (points) => {
  let index = -1;
  for (let i = 0; i < TIERS.length; i++) {
    if (points >= TIERS[i].unlockPoints) {
      index = i;
    }
  }
  return index;
};

export const getArtifactForPoints = (points) => {
  const index = getCurrentTierIndex(points);
  return index >= 0 ? TIERS[index] : { name: 'Iniciado', icon: '🌱', colors: 'from-stone-700 to-stone-900', textColor: 'text-stone-400', border: 'border-stone-700/50', unlockPoints: 0 };
};
