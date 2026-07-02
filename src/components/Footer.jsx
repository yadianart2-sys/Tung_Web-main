import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const blogUrl = i18n.language === 'es' ? '/blog/es/index.html' : '/blog/index.html';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] border-t border-[#9EFF00]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo y descripción */}
          <div className="text-center md:text-left">
            <a href="#" className="flex items-center justify-center md:justify-start gap-3 group">
              <img
                src="https://photos.pinksale.finance/file/pinksale-logo-upload/1779894309304-a76860620da420652c14230ae807e126.png"
                alt="TUNG Logo"
                className="w-14 h-14 object-contain"
              />
              <span className="text-2xl font-bold font-[Space_Grotesk] gradient-text">
                TUNG
              </span>
            </a>
            <p className="text-gray-500 text-sm mt-2 max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          {/* Enlaces + Swap CTA */}
          <div className="flex flex-col items-center md:items-end gap-4">
            {/* Swap CTA button */}
            <a
              href="https://swap.falcox.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#9EFF00] text-[#050505] font-bold rounded-full text-sm
                         hover:bg-[#F5C542] hover:scale-105 transition-all duration-300 font-[Space_Grotesk]
                         shadow-lg shadow-[#9EFF00]/20"
            >
              {t('community.swapCta')}
            </a>

            {/* Enlaces rápidos */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <a href="#why-tung" className="hover:text-[#9EFF00] transition-colors font-[Space_Grotesk]">
                {t('footer.whyTung')}
              </a>
              <a href="#tokenomics" className="hover:text-[#9EFF00] transition-colors font-[Space_Grotesk]">
                {t('footer.tokenomics')}
              </a>
              <a href="#roadmap" className="hover:text-[#9EFF00] transition-colors font-[Space_Grotesk]">
                {t('footer.roadmap')}
              </a>
              <a href={blogUrl} className="hover:text-[#9EFF00] transition-colors font-[Space_Grotesk]">
                Blog
              </a>
              <a href={i18n.language === 'es' ? '/whitepaper/es/index.html' : '/whitepaper/index.html'} className="hover:text-[#9EFF00] transition-colors font-[Space_Grotesk]">
                Whitepaper
              </a>
              <a
                href="https://x.com/TungeTungSahur"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="X (Twitter)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://t.me/TrungTungMeme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Telegram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.41-.88.03-.24.37-.49 1.02-.74 3.98-1.73 6.63-2.87 7.96-3.43 3.79-1.58 4.58-1.85 5.09-1.86.11 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-600 text-xs leading-relaxed max-w-2xl mx-auto">
            {t('footer.disclaimer')}
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-xs flex items-center justify-center gap-1 font-[Space_Grotesk]">
            {t('footer.copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
