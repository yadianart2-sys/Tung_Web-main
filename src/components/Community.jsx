import { motion } from 'framer-motion';
import { FaTelegram, FaTwitter, FaDiscord } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

/**
 * Community - Sección de comunidad con botones sociales grandes
 * Incluye texto hype y enlaces a redes sociales
 */
export default function Community() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: t('community.telegram'),
      icon: <FaTelegram className="text-3xl" />,
      href: '#',
      color: '#0088cc',
      desc: t('community.telegramDesc'),
    },
    {
      name: t('community.twitter'),
      icon: <FaTwitter className="text-3xl" />,
      href: '#',
      color: '#1DA1F2',
      desc: t('community.twitterDesc'),
    },
    {
      name: t('community.discord'),
      icon: <FaDiscord className="text-3xl" />,
      href: '#',
      color: '#5865F2',
      desc: t('community.discordDesc'),
    },
  ];

  return (
    <section id="community" className="relative py-24 sm:py-32 bg-[#0D1B12]/30 overflow-hidden">
      {/* Fondos */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[800px] h-[800px] rounded-full bg-[#9EFF00]/3 blur-[200px]" />
      </div>

      {/* Patrón de estrellas sutil */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #F5C542 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#F5C542] text-sm font-bold tracking-widest uppercase font-[Space_Grotesk]">
            {t('community.label')}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[Space_Grotesk] mt-4 mb-4">
            <span className="gradient-text">{t('community.title')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('community.subtitle')}
          </p>
        </motion.div>

        {/* Botones sociales */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-3xl mx-auto mb-12">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center gap-3
                         group cursor-pointer hover:border-[#9EFF00]/30 transition-all duration-300"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
                           group-hover:scale-110"
                style={{
                  background: `${social.color}15`,
                  color: social.color,
                }}
              >
                {social.icon}
              </div>
              <h4 className="font-bold font-[Space_Grotesk] text-white text-lg">
                {social.name}
              </h4>
              <p className="text-gray-500 text-xs">{social.desc}</p>
              <span
                className="text-xs font-bold font-[Space_Grotesk] mt-1 opacity-0 group-hover:opacity-100
                           transition-opacity duration-300"
                style={{ color: social.color }}
              >
                {t('community.joinNow')}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Hype text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-2xl sm:text-3xl lg:text-4xl font-black font-[Space_Grotesk] gradient-text mb-4">
            {t('community.quote')}
          </p>
          <p className="text-gray-500 font-[Space_Grotesk]">
            {t('community.tagline')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
