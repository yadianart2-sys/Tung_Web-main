import { motion } from 'framer-motion';
import { FaWallet, FaMoneyBillWave, FaExchangeAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

/**
 * HowToBuy - Sección de 3 pasos simples para comprar TUNG
 * Guía visual para nuevos inversores sin fricción
 */
export default function HowToBuy() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <FaWallet className="text-3xl" />,
      title: t('howToBuy.step1Title'),
      desc: t('howToBuy.step1Desc'),
      color: '#9EFF00',
    },
    {
      icon: <FaMoneyBillWave className="text-3xl" />,
      title: t('howToBuy.step2Title'),
      desc: t('howToBuy.step2Desc'),
      color: '#F5C542',
    },
    {
      icon: <FaExchangeAlt className="text-3xl" />,
      title: t('howToBuy.step3Title'),
      desc: t('howToBuy.step3Desc'),
      color: '#9EFF00',
    },
  ];

  return (
    <section id="how-to-buy" className="relative py-20 sm:py-28 bg-[#050505] overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#9EFF00]/3 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[#9EFF00] text-sm font-bold tracking-widest uppercase font-[Space_Grotesk]">
            {t('howToBuy.label')}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[Space_Grotesk] mt-4 mb-4">
            <span className="text-white">{t('howToBuy.title1')}</span>{' '}
            <span className="gradient-text">{t('howToBuy.title2')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('howToBuy.subtitle')}
          </p>
        </motion.div>

        {/* Pasos numerados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-card p-8 rounded-2xl text-center relative group
                         hover:border-[#9EFF00]/30 transition-all duration-300"
            >
              {/* Número de paso */}
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center
                           text-sm font-black font-[Space_Grotesk] text-[#050505]"
                style={{ background: step.color }}
              >
                {index + 1}
              </div>

              {/* Icono */}
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-5 mt-2
                           transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${step.color}15`,
                  color: step.color,
                  border: `1px solid ${step.color}30`,
                }}
              >
                {step.icon}
              </div>

              {/* Título */}
              <h3 className="text-lg font-bold font-[Space_Grotesk] mb-3 text-white">
                {step.title}
              </h3>

              {/* Descripción */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.desc}
              </p>

              {/* Flecha conectora (excepto último) */}
              {index < 2 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-[#9EFF00]/30 text-2xl">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://swap.falcox.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#9EFF00] text-[#050505]
                       font-bold rounded-full text-lg hover:bg-[#F5C542] transition-all duration-300
                       font-[Space_Grotesk] shadow-lg shadow-[#9EFF00]/20 hover:scale-105"
          >
            {t('howToBuy.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
