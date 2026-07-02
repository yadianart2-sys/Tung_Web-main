import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCopy, FaCheck } from 'react-icons/fa';
import useHolderCount from '../hooks/useHolderCount.js';
import useBurnedCount from '../hooks/useBurnedCount.js';

const CONTRACT_ADDRESS = '0x09514EcF8270C12101D077B5e8B034B164F71C5f';

/**
 * Hero - Sección principal de la landing page
 * Muestra el logo/mascot de TUNG, slogan principal, y CTAs
 * Incluye partículas flotantes y efectos de neón animados
 */
export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();
  const { count: holdersCount } = useHolderCount();
  const { count: burnedCount } = useBurnedCount();

  const handleCopyCA = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = CONTRACT_ADDRESS;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const shareOnX = () => {
    const text = encodeURIComponent(t('hero.shareText'));
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  // Efecto parallax sutil con el mouse
  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.02,
        y: (e.clientY - window.innerHeight / 2) * 0.02,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Partículas flotantes generadas estáticamente
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-24 sm:pt-28 lg:pt-20 pb-16"
    >
      {/* Fondo atmosférico: gradientes radiales */}
      <div className="absolute inset-0">
        {/* Glow verde neón central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#9EFF00]/5 blur-[120px]" />
        {/* Glow dorado secundario */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#F5C542]/5 blur-[100px]" />
        {/* Glow oscuro inferior */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[#0D1B12]/40 blur-[100px]" />
      </div>

      {/* Grid decorativo sutil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(158,255,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(158,255,0,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Partículas flotantes (monedas) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: Math.random() > 0.5 ? '#9EFF00' : '#F5C542',
            opacity: p.opacity,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Contenido principal - Layout de 2 columnas: texto izquierda, logo derecha */}
      <div className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* ===== COLUMNA IZQUIERDA: Texto y CTAs ===== */}
          <div className="flex-1 text-center lg:text-left">
            
            {/* Badge "Powered by Falco-X" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-block px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wider
                               border border-[#F5C542]/30 bg-[#F5C542]/5 text-[#F5C542]
                               font-[Space_Grotesk] uppercase max-w-full break-words">
                {t('hero.badge')}
              </span>
            </motion.div>

            {/* Slogan principal */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-[Space_Grotesk] mb-4 tracking-tight"
            >
              <span className="text-white">{t('hero.slogan1')}</span>
              <br />
              <span className="gradient-text neon-text">{t('hero.slogan2')}</span>
            </motion.h1>

            {/* Línea secundaria */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg sm:text-xl text-gray-400 mb-10 font-[Space_Grotesk] tracking-wide"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
          {/* Botón Comprar TUNG */}
          <a
            href="https://swap.falcox.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-[#9EFF00] text-[#050505] font-bold rounded-full text-lg
                       hover:bg-[#F5C542] transition-all duration-300 font-[Space_Grotesk]
                       shadow-lg shadow-[#9EFF00]/30 hover:shadow-[#F5C542]/40 hover:scale-105
                       flex items-center gap-2 overflow-hidden"
          >
            <span className="relative z-10">{t('hero.cta1')}</span>
            <motion.span
              className="relative z-10 text-xl"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>

          {/* Botón Unirse a la Comunidad */}
          <a
            href="#community"
            className="px-8 py-4 border-2 border-[#9EFF00]/50 text-[#9EFF00] font-bold rounded-full text-lg
                       hover:bg-[#9EFF00]/10 hover:border-[#9EFF00] transition-all duration-300
                       font-[Space_Grotesk] hover:scale-105"
          >
            {t('hero.cta2')}
          </a>
        </motion.div>

        {/* Botones virales: Copiar CA + Compartir en X */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mt-4"
        >
          {/* Copiar Contract Address */}
          <button
            onClick={handleCopyCA}
            className="px-5 py-2.5 rounded-full text-sm font-bold font-[Space_Grotesk]
                       border border-[#9EFF00]/30 bg-[#9EFF00]/5 text-[#9EFF00]
                       hover:bg-[#9EFF00]/15 hover:border-[#9EFF00]/60
                       transition-all duration-300 flex items-center gap-2"
          >
            {copied ? <FaCheck className="text-sm" /> : <FaCopy className="text-sm" />}
            {copied ? t('hero.copied') : t('hero.copyCA')}
          </button>

          {/* Compartir en X */}
          <button
            onClick={shareOnX}
            className="px-5 py-2.5 rounded-full text-sm font-bold font-[Space_Grotesk]
                       border border-[#1DA1F2]/30 bg-[#1DA1F2]/5 text-[#1DA1F2]
                       hover:bg-[#1DA1F2]/15 hover:border-[#1DA1F2]/60
                       transition-all duration-300 flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            {t('hero.shareX')}
          </button>
        </motion.div>

        {/* Contador / info rápida */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-10 text-sm text-gray-500"
        >
          <div className="text-center">
            <p className="text-[#9EFF00] font-bold font-[Space_Grotesk] text-lg">6%</p>
            <p className="text-gray-500 text-xs">{t('hero.totalFees')}</p>
          </div>
          <div className="w-px h-8 bg-gray-800 hidden sm:block" />
          <div className="text-center">
            <p className="text-[#F5C542] font-bold font-[Space_Grotesk] text-lg">3%</p>
            <p className="text-gray-500 text-xs">{t('hero.holderRewards')}</p>
          </div>
          <div className="w-px h-8 bg-gray-800 hidden sm:block" />
          <div className="text-center">
            <p className="text-[#FF4D4D] font-bold font-[Space_Grotesk] text-lg">🔥 {burnedCount}</p>
            <p className="text-gray-500 text-xs">{t('hero.burned')}</p>
          </div>
          <div className="w-px h-8 bg-gray-800 hidden sm:block" />
          <div className="text-center">
            <p className="text-[#9EFF00] font-bold font-[Space_Grotesk] text-lg">Falco-X</p>
            <p className="text-gray-500 text-xs">{t('hero.ecosystem')}</p>
          </div>
          <div className="w-px h-8 bg-gray-800 hidden sm:block" />
          <div className="text-center">
            <p className="text-[#F5C542] font-bold font-[Space_Grotesk] text-lg">{holdersCount}</p>
            <p className="text-gray-500 text-xs">{t('hero.holders')}</p>
          </div>
        </motion.div>

          </div>{/* Fin columna izquierda */}

          {/* ===== COLUMNA DERECHA: Logo / Mascot ===== */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            style={{
              transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
            }}
          >
            <motion.img
              src="https://photos.pinksale.finance/file/pinksale-logo-upload/1779894309304-a76860620da420652c14230ae807e126.png"
              alt="TUNG Coin Logo"
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[30rem] xl:h-[30rem] object-contain drop-shadow-[0_0_60px_rgba(158,255,0,0.5)]"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                duration: 1.2,
              }}
              whileHover={{
                scale: 1.08,
                filter: 'drop-shadow(0 0 80px rgba(158, 255, 0, 0.8))',
              }}
            />
          </motion.div>

        </div>{/* Fin flex row */}
      </div>{/* Fin contenedor principal */}

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-[Space_Grotesk] tracking-widest">{t('hero.scroll')}</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#9EFF00]/50 to-transparent" />
      </motion.div>
    </section>
  );
}
