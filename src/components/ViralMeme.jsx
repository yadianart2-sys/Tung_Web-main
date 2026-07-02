import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/**
 * ViralMeme - Sección de energía meme / comunidad
 * Muestra stickers animados, frases virales, y cultura Sahur
 * Estilo divertido pero elegante, no infantil
 */

export default function ViralMeme() {
  const { t } = useTranslation();

  const memePhrases = [
    t('viralMeme.phrase1'),
    t('viralMeme.phrase2'),
    t('viralMeme.phrase3'),
    t('viralMeme.phrase4'),
    t('viralMeme.phrase5'),
    t('viralMeme.phrase6'),
  ];
  return (
    <section id="viral-meme" className="relative py-24 sm:py-32 bg-[#0D1B12]/20 overflow-hidden">
      {/* Fondo con patrón sutil */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, #9EFF00 1px, transparent 1px)',
          backgroundSize: '40px 40px',
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
            {t('viralMeme.label')}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[Space_Grotesk] mt-4 mb-4">
            {t('viralMeme.title1')}{' '}
            <span className="gradient-text">{t('viralMeme.title2')}</span> 🌙
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('viralMeme.subtitle')}
          </p>
        </motion.div>

        {/* Grid de frases meme con animaciones */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto mb-16">
          {memePhrases.map((phrase, index) => (
            <motion.div
              key={phrase}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(158, 255, 0, 0.15)',
              }}
              className="glass-card p-5 rounded-xl text-center cursor-default
                         border-[#9EFF00]/10 hover:border-[#9EFF00]/30 transition-all duration-300"
            >
              {/* Tarjeta especial de Falco-X: muestra el logo real en lugar del emoji */}
              {index === 4 ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="https://photos.pinksale.finance/file/pinksale-logo-upload/1779925479567-7d493aae390e834e9654df6d97b11a99.jpg"
                    alt="Falco-X Logo"
                    className="w-10 h-10 object-contain rounded-full"
                  />
                  <p className="text-white font-semibold font-[Space_Grotesk] text-sm sm:text-base">
                    {t('viralMeme.phrase5')}
                  </p>
                </div>
              ) : (
                <p className="text-white font-semibold font-[Space_Grotesk] text-sm sm:text-base">
                  {phrase}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Sticker animado grande */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block"
          >
            <div className="relative flex items-center justify-center gap-2 sm:gap-6">
              {/* Copita */}
              <motion.img
                src="https://photos.pinksale.finance/file/pinksale-logo-upload/1779985865663-8631a1b10d51ff3b48e291c4d146fb48.png"
                alt="TUNG cup"
                className="w-44 h-44 sm:w-60 sm:h-60 object-contain drop-shadow-[0_0_30px_rgba(158,255,0,0.35)]"
                whileHover={{ scale: 1.1 }}
              />
              {/* Personaje playero (centro) */}
              <motion.img
                src="https://photos.pinksale.finance/file/pinksale-logo-upload/1779943570505-847576cd74aae3742e48a90ae625992a.png"
                alt="TUNG vibes"
                className="w-52 h-52 sm:w-72 sm:h-72 object-contain drop-shadow-[0_0_50px_rgba(158,255,0,0.5)]"
                whileHover={{ scale: 1.1 }}
              />
              {/* Cocodrilo */}
              <motion.img
                src="https://photos.pinksale.finance/file/pinksale-logo-upload/1779986812651-40aaef96437fc2752542c025483466ae.png"
                alt="TUNG croc"
                className="w-44 h-44 sm:w-60 sm:h-60 object-contain drop-shadow-[0_0_30px_rgba(158,255,0,0.35)]"
                whileHover={{ scale: 1.1 }}
              />
              {/* Anillo de glow */}
              <div className="absolute inset-0 rounded-full bg-[#F5C542]/10 blur-3xl -z-10 scale-150" />
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-2xl sm:text-3xl font-black font-[Space_Grotesk] gradient-text"
          >
            {t('viralMeme.communityNeverSleeps')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-2 text-gray-500 font-[Space_Grotesk]"
          >
            {t('viralMeme.neitherDoRewards')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="mt-3 text-[#9EFF00]/60 text-sm font-[Space_Grotesk] italic"
          >
            {t('viralMeme.tralaleroLine')}
          </motion.p>

          {/* CTA Masivo: Buy on Falco-X Swap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-12"
          >
            <a
              href="https://swap.falcox.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-col items-center gap-2 px-10 py-5 bg-gradient-to-r from-[#9EFF00] to-[#F5C542]
                         text-[#050505] font-black rounded-2xl text-xl sm:text-2xl
                         hover:scale-105 hover:shadow-[0_0_60px_rgba(158,255,0,0.4)]
                         transition-all duration-300 font-[Space_Grotesk]
                         shadow-[0_0_40px_rgba(158,255,0,0.2)]"
            >
              <span>{t('viralMeme.swapCta')}</span>
              <span className="text-sm font-normal opacity-80">{t('viralMeme.swapCtaSub')}</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
