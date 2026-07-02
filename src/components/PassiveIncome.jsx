import { motion } from 'framer-motion';
import { FaWallet, FaChartLine, FaUsers, FaExchangeAlt, FaCoins, FaLock, FaPercentage } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import useStakingInfo from '../hooks/useStakingInfo.js';

/**
 * PassiveIncome - Sección de ingresos pasivos
 * Muestra cómo los holders ganan recompensas automáticamente
 * Incluye tarjetas tipo "dashboard" con métricas atractivas
 */

export default function PassiveIncome() {
  const { t } = useTranslation();
  const staking = useStakingInfo();

  const stats = [
    {
      icon: <FaWallet className="text-2xl" />,
      value: t('passiveIncome.stat1Value'),
      label: t('passiveIncome.stat1Label'),
      desc: t('passiveIncome.stat1Desc'),
      color: '#9EFF00',
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      value: t('passiveIncome.stat2Value'),
      label: t('passiveIncome.stat2Label'),
      desc: t('passiveIncome.stat2Desc'),
      color: '#F5C542',
    },
    {
      icon: <FaUsers className="text-2xl" />,
      value: t('passiveIncome.stat3Value'),
      label: t('passiveIncome.stat3Label'),
      desc: t('passiveIncome.stat3Desc'),
      color: '#9EFF00',
    },
    {
      icon: <FaExchangeAlt className="text-2xl" />,
      value: t('passiveIncome.stat4Value'),
      label: t('passiveIncome.stat4Label'),
      desc: t('passiveIncome.stat4Desc'),
      color: '#F5C542',
    },
  ];
  return (
    <section id="passive-income" className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden">
      {/* Fondos decorativos */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[700px] h-[700px] rounded-full bg-[#9EFF00]/3 blur-[180px]" />
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
            {t('passiveIncome.label')}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[Space_Grotesk] mt-4 mb-4">
            {t('passiveIncome.title1')}{' '}
            <span className="gradient-text">{t('passiveIncome.title2')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('passiveIncome.subtitle')}
            <br />
            {t('passiveIncome.subtitle2')}
          </p>
        </motion.div>

        {/* Grid de estadísticas estilo dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-2xl group cursor-default
                         hover:border-[#9EFF00]/25 transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div
                className="text-3xl font-black font-[Space_Grotesk] mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <p className="text-white font-semibold font-[Space_Grotesk] text-sm mb-1">
                {stat.label}
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Staking Live Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="glass-card p-6 sm:p-8 rounded-3xl max-w-3xl mx-auto
                         border-[#F5C542]/20 hover:border-[#F5C542]/40 transition-all duration-300
                         relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#F5C542]/5 blur-[60px]" />
            <div className="relative">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                     style={{ background: '#F5C54215', color: '#F5C542', border: '1px solid #F5C54230' }}>
                  <FaCoins className="text-xl" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-lg font-bold font-[Space_Grotesk] text-[#F5C542]">
                    {t('passiveIncome.stakingTitle')}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    {t('passiveIncome.stakingLiveDesc')}{' '}
                    <a href="https://bscscan.com/address/0x3eAea8Ec63B80e8F87dc2e97CEEAcB953047638C" target="_blank" rel="noopener noreferrer" className="text-[#9EFF00] hover:underline">BSCScan</a>
                  </p>
                </div>
                <a
                  href="https://swap.falcox.net/staking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-5 py-2.5 bg-[#F5C542] text-[#050505] font-bold rounded-full text-sm
                             hover:bg-[#9EFF00] transition-all duration-300 font-[Space_Grotesk]
                             shadow-lg shadow-[#F5C542]/20 whitespace-nowrap"
                >
                  {t('passiveIncome.stakingCta')}
                </a>
              </div>

              {/* Live Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-[#050505]/50 rounded-xl p-4 text-center border border-[#F5C542]/10">
                  <FaLock className="text-[#F5C542] text-lg mx-auto mb-1.5" />
                  <p className="text-xl font-black font-[Space_Grotesk] text-white">{staking.totalStaked}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t('passiveIncome.stakingTotalStaked')}</p>
                </div>
                <div className="bg-[#050505]/50 rounded-xl p-4 text-center border border-[#F5C542]/10">
                  <FaPercentage className="text-[#9EFF00] text-lg mx-auto mb-1.5" />
                  <p className="text-xl font-black font-[Space_Grotesk] text-[#9EFF00]">{staking.apr}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t('passiveIncome.stakingAPR')}</p>
                </div>
                <div className="bg-[#050505]/50 rounded-xl p-4 text-center border border-[#F5C542]/10 col-span-2 sm:col-span-1">
                  <FaChartLine className="text-[#F5C542] text-lg mx-auto mb-1.5" />
                  <p className="text-xl font-black font-[Space_Grotesk] text-white">{staking.totalRewards}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t('passiveIncome.stakingRewards')}</p>
                </div>
              </div>

              <p className="text-gray-600 text-xs text-center mt-4">
                {t('passiveIncome.stakingDesc')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA atractivo con el tiburón relax */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-block glass-card p-8 sm:p-10 rounded-3xl max-w-2xl relative overflow-hidden">
            
            {/* Tiburón relax: "yo en la playa mientras TUNG trabaja" */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-6"
            >
              <img
                src="https://photos.pinksale.finance/file/pinksale-logo-upload/1779934500077-685aab8a51bcc7ed0cd5cdd6ebbd993a.png"
                alt="Chill shark vibes"
                className="w-72 h-72 sm:w-[28rem] sm:h-[28rem] mx-auto object-contain drop-shadow-[0_0_25px_rgba(158,255,0,0.3)]"
              />
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-black font-[Space_Grotesk] mb-4">
              <span className="gradient-text">{t('passiveIncome.ctaTitle1')}</span>{' '}
              <span className="text-white">{t('passiveIncome.ctaTitle2')}</span>{' '}
              <span className="gradient-text">{t('passiveIncome.ctaTitle3')}</span>
            </h3>
            <p className="text-gray-400 mb-6">
              {t('passiveIncome.ctaDesc')}
            </p>
            <a
              href="https://swap.falcox.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#9EFF00] text-[#050505]
                         font-bold rounded-full hover:bg-[#F5C542] transition-all duration-300
                         font-[Space_Grotesk] shadow-lg shadow-[#9EFF00]/20"
            >
              {t('passiveIncome.ctaButton')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
