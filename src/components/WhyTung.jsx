import { motion } from 'framer-motion';
import { FaRocket, FaGift, FaProjectDiagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

/**
 * WhyTung - Sección "¿Por qué TUNG?"
 * Muestra 3 tarjetas con los beneficios clave del proyecto
 * Diseño limpio con iconos y animaciones sutiles al hacer hover
 */

export default function WhyTung() {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: <FaRocket className="text-3xl" />,
      title: t('whyTung.card1Title'),
      description: t('whyTung.card1Desc'),
      color: '#9EFF00',
    },
    {
      icon: <FaGift className="text-3xl" />,
      title: t('whyTung.card2Title'),
      description: t('whyTung.card2Desc'),
      color: '#F5C542',
    },
    {
      icon: <FaProjectDiagram className="text-3xl" />,
      title: t('whyTung.card3Title'),
      description: t('whyTung.card3Desc'),
      color: '#9EFF00',
    },
  ];
  return (
    <section id="why-tung" className="relative py-24 sm:py-32 bg-[#050505]">
      {/* Fondo decorativo */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#0D1B12]/30 blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#9EFF00] text-sm font-bold tracking-widest uppercase font-[Space_Grotesk]">
            {t('whyTung.label')}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[Space_Grotesk] mt-4 mb-4">
            {t('whyTung.title1')}{' '}
            <span className="gradient-text">{t('whyTung.title2')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('whyTung.subtitle')}
          </p>
        </motion.div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-8 rounded-2xl glass-card cursor-default
                         hover:border-[#9EFF00]/30 transition-all duration-500"
            >
              {/* Glow al hacer hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${reason.color}10, transparent 40%)`,
                }}
              />

              <div className="relative z-10">
                {/* Icono */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                  style={{
                    background: `${reason.color}15`,
                    color: reason.color,
                    border: `1px solid ${reason.color}30`,
                  }}
                >
                  {reason.icon}
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold font-[Space_Grotesk] mb-3 text-white">
                  {reason.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-400 leading-relaxed text-sm">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA: Swap on Falco-X */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://swap.falcox.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#9EFF00] text-[#050505] font-bold rounded-full text-lg
                       hover:bg-[#F5C542] hover:scale-105 transition-all duration-300 font-[Space_Grotesk]
                       shadow-lg shadow-[#9EFF00]/30"
          >
            {t('community.swapCta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
