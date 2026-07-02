import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaBullhorn, FaExchangeAlt, FaGlobe, FaChess } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

/**
 * Roadmap - Hoja de ruta horizontal minimalista
 * Muestra las fases del proyecto en una línea de tiempo visual
 */

export default function Roadmap() {
  const { t } = useTranslation();

  const phases = [
    {
      icon: <FaRocket />,
      title: t('roadmap.phase1Title'),
      status: 'completed',
      desc: t('roadmap.phase1Desc'),
      date: 'Phase 1',
    },
    {
      icon: <FaUsers />,
      title: t('roadmap.phase2Title'),
      status: 'active',
      desc: t('roadmap.phase2Desc'),
      date: 'Phase 2',
    },
    {
      icon: <FaBullhorn />,
      title: t('roadmap.phase3Title'),
      status: 'upcoming',
      desc: t('roadmap.phase3Desc'),
      date: 'Phase 3',
    },
    {
      icon: <FaExchangeAlt />,
      title: t('roadmap.phase4Title'),
      status: 'upcoming',
      desc: t('roadmap.phase4Desc'),
      date: 'Phase 4',
    },
    {
      icon: <FaGlobe />,
      title: t('roadmap.phase5Title'),
      status: 'upcoming',
      desc: t('roadmap.phase5Desc'),
      date: 'Phase 5',
    },
    {
      icon: <FaChess />,
      title: t('roadmap.phase6Title'),
      status: 'upcoming',
      desc: t('roadmap.phase6Desc'),
      date: 'Phase 6',
    },
  ];
  return (
    <section id="roadmap" className="relative py-24 sm:py-32 bg-[#050505]">
      {/* Fondo */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#F5C542]/3 blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#9EFF00] text-sm font-bold tracking-widest uppercase font-[Space_Grotesk]">
            {t('roadmap.label')}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[Space_Grotesk] mt-4 mb-4">
            <span className="gradient-text">{t('roadmap.title')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('roadmap.subtitle')}
          </p>
        </motion.div>

        {/* Timeline horizontal (escritorio) */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Línea conectora */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-[#9EFF00]/10 via-[#F5C542]/30 to-[#9EFF00]/10" />

            <div className="grid grid-cols-6 gap-4">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Indicador en la línea */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 z-10 mb-4 transition-all duration-300 ${
                      phase.status === 'completed'
                        ? 'bg-[#9EFF00] border-[#9EFF00] shadow-lg shadow-[#9EFF00]/40'
                        : phase.status === 'active'
                          ? 'bg-[#F5C542] border-[#F5C542] shadow-lg shadow-[#F5C542]/40 animate-pulse'
                          : 'bg-[#0D1B12] border-gray-700'
                    }`}
                  />

                  {/* Contenido */}
                  <div className="glass-card p-5 rounded-xl w-full group-hover:border-[#9EFF00]/25 transition-all duration-300">
                    {/* Icono */}
                    <div
                      className={`text-2xl mb-3 ${
                        phase.status === 'completed'
                          ? 'text-[#9EFF00]'
                          : phase.status === 'active'
                            ? 'text-[#F5C542]'
                            : 'text-gray-600'
                      }`}
                    >
                      {phase.icon}
                    </div>
                    <h4 className="font-bold font-[Space_Grotesk] text-white text-sm mb-1">
                      {phase.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{phase.desc}</p>
                    <span
                      className={`inline-block mt-3 text-[10px] font-bold uppercase tracking-wider font-[Space_Grotesk] ${
                        phase.status === 'completed'
                          ? 'text-[#9EFF00]'
                          : phase.status === 'active'
                            ? 'text-[#F5C542]'
                            : 'text-gray-600'
                      }`}
                    >
                      {phase.status === 'completed' ? t('roadmap.done') : phase.status === 'active' ? t('roadmap.live') : t('roadmap.soon')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline vertical (móvil y tablet) */}
        <div className="lg:hidden space-y-4">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              {/* Indicador */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                    phase.status === 'completed'
                      ? 'bg-[#9EFF00] border-[#9EFF00] shadow-lg shadow-[#9EFF00]/40'
                      : phase.status === 'active'
                        ? 'bg-[#F5C542] border-[#F5C542] shadow-lg shadow-[#F5C542]/40'
                        : 'bg-[#0D1B12] border-gray-700'
                  }`}
                />
                {index < phases.length - 1 && (
                  <div className="w-0.5 h-12 bg-gradient-to-b from-[#9EFF00]/20 to-transparent mt-1" />
                )}
              </div>

              {/* Contenido */}
              <div className="glass-card p-4 rounded-xl flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-lg ${
                      phase.status === 'completed'
                        ? 'text-[#9EFF00]'
                        : phase.status === 'active'
                          ? 'text-[#F5C542]'
                          : 'text-gray-600'
                    }`}
                  >
                    {phase.icon}
                  </span>
                  <h4 className="font-bold font-[Space_Grotesk] text-white">{phase.title}</h4>
                  <span
                    className={`ml-auto text-[10px] font-bold uppercase font-[Space_Grotesk] ${
                      phase.status === 'completed'
                        ? 'text-[#9EFF00]'
                        : phase.status === 'active'
                          ? 'text-[#F5C542]'
                          : 'text-gray-600'
                    }`}
                  >
                    {phase.status === 'completed' ? t('roadmap.done') : phase.status === 'active' ? t('roadmap.live') : t('roadmap.soon')}
                  </span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{phase.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
