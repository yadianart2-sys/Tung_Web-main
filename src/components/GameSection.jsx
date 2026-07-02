import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaRocket, FaGlobeAmericas, FaIndustry, FaFlask, FaSpaceShuttle, FaHandshake, FaSkull, FaUsers, FaTrophy, FaCoins, FaGamepad, FaMapMarkedAlt, FaFighterJet, FaCrosshairs } from 'react-icons/fa';

const gameFeatures = [
  { key: 'homePlanet', icon: <FaGlobeAmericas className="text-2xl" />, color: '#9EFF00' },
  { key: 'colonize', icon: <FaSpaceShuttle className="text-2xl" />, color: '#4DC9F6' },
  { key: 'build', icon: <FaIndustry className="text-2xl" />, color: '#F5C542' },
  { key: 'explore', icon: <FaCrosshairs className="text-2xl" />, color: '#FF6B6B' },
  { key: 'alliances', icon: <FaUsers className="text-2xl" />, color: '#A78BFA' },
  { key: 'economy', icon: <FaCoins className="text-2xl" />, color: '#9EFF00' },
  { key: 'rewards', icon: <FaTrophy className="text-2xl" />, color: '#F5C542' },
];

export default function GameSection() {
  const { t } = useTranslation();

  return (
    <section id="nova-game" className="relative py-24 sm:py-32 bg-[#0B0F1A]/40 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#4DC9F6]/3 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#9EFF00]/4 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #4DC9F6 1.5px, transparent 0)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4DC9F6]/30 bg-[#4DC9F6]/5 mb-4"
          >
            <FaGamepad className="text-[#4DC9F6] text-sm" />
            <span className="text-[#4DC9F6] text-xs font-bold tracking-widest uppercase font-[Space_Grotesk]">
              {t('novaGame.label')}
            </span>
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[Space_Grotesk] mt-4 mb-4">
            <span className="gradient-text">{t('novaGame.title1')}</span>{' '}
            <span className="text-white">{t('novaGame.title2')}</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-base sm:text-lg">
            {t('novaGame.subtitle')}
          </p>
        </motion.div>

        {/* Hero card with game image and CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-16 overflow-hidden rounded-[32px] border border-[#4DC9F6]/15 bg-[linear-gradient(135deg,rgba(77,201,246,0.12),rgba(158,255,0,0.08),rgba(167,139,250,0.06))] p-[1px] group hover:border-[#4DC9F6]/35 transition-all duration-500 hover:shadow-[0_0_60px_rgba(77,201,246,0.12)]"
        >
          <div className="rounded-[31px] bg-[#070B14]/95 px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex-shrink-0"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  <img
                    src="https://photos.pinksale.finance/file/pinksale-logo-upload/1782176282363-31e656c333398b759f995c601c1e102e.png"
                    alt="NOVA Strategy Game"
                    className="w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60 object-contain drop-shadow-[0_0_50px_rgba(77,201,246,0.25)] group-hover:drop-shadow-[0_0_70px_rgba(77,201,246,0.4)] transition-all duration-500"
                  />
                  <div className="absolute inset-0 rounded-full bg-[#4DC9F6]/10 blur-3xl -z-10 scale-150" />
                </motion.div>
              </motion.div>

              {/* Text + CTA */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9EFF00]/10 border border-[#9EFF00]/20 text-[10px] font-bold text-[#9EFF00] uppercase tracking-wider font-[Space_Grotesk] mb-4">
                  <FaRocket className="text-[0.6rem]" />
                  {t('novaGame.badge')}
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-[Space_Grotesk] text-white mb-3">
                  {t('novaGame.heroTitle')}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                  {t('novaGame.heroDesc')}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <a
                    href="https://tung.xnova.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#4DC9F6] to-[#9EFF00] text-[#050505] font-black rounded-2xl text-base sm:text-lg hover:scale-105 hover:shadow-[0_0_50px_rgba(77,201,246,0.35)] transition-all duration-300 font-[Space_Grotesk] shadow-[0_0_30px_rgba(77,201,246,0.15)]"
                  >
                    <FaGamepad className="text-lg group-hover/btn:rotate-12 transition-transform" />
                    {t('novaGame.playCta')}
                  </a>
                  <span className="text-gray-600 text-xs font-[Space_Grotesk]">
                    {t('novaGame.ctaHint')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Game mechanics grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl sm:text-3xl font-black font-[Space_Grotesk] text-white">
              {t('novaGame.mechanicsTitle')}
            </h3>
            <p className="text-gray-500 text-sm mt-2">{t('novaGame.mechanicsSub')}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gameFeatures.map((feature, i) => {
              const feat = t(`novaGame.features.${feature.key}`, { returnObjects: true });
              const title = feat?.title || '';
              const desc = feat?.desc || '';
              return (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="group/card rounded-2xl border border-white/[0.06] bg-[#0A0E18]/80 p-5 hover:border-[#4DC9F6]/25 hover:bg-[#0D1322]/90 hover:shadow-[0_0_30px_rgba(77,201,246,0.06)] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/card:scale-110 group-hover/card:shadow-[0_0_20px_rgba(77,201,246,0.15)]"
                         style={{ background: `${feature.color}15`, color: feature.color, border: `1px solid ${feature.color}30` }}>
                      {feature.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold font-[Space_Grotesk] text-sm mb-1">{title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 rounded-2xl border border-[#9EFF00]/10 bg-[#9EFF00]/3 hover:border-[#9EFF00]/20 hover:bg-[#9EFF00]/5 transition-all duration-300">
            <p className="text-gray-400 text-sm max-w-lg">
              {t('novaGame.ctaFooter')}
            </p>
            <a
              href="https://tung.xnova.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4DC9F6]/10 border border-[#4DC9F6]/20 text-[#4DC9F6] font-bold font-[Space_Grotesk] text-sm hover:bg-[#4DC9F6]/20 hover:border-[#4DC9F6]/40 hover:shadow-[0_0_30px_rgba(77,201,246,0.15)] transition-all duration-300"
            >
              <FaFighterJet />
              {t('novaGame.playCta2')}
              <FaExternalLinkIn />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FaExternalLinkIn() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
