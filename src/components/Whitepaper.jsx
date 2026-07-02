import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';

const CONTRACT = '0x09514EcF8270C12101D077B5e8B034B164F71C5f';
const DEAD_WALLET_URL = `https://bscscan.com/token/${CONTRACT}?a=0x000000000000000000000000000000000000dead#transactions`;

const tokenomicsData = [
  { pct: '48%', labelKey: 'lp', color: '#9EFF00' },
  { pct: '9.52%', labelKey: 'staking', color: '#F5C542' },
  { pct: '9.52%', labelKey: 'burn', color: '#FF4D4D' },
  { pct: '9.52%', labelKey: 'marketing', color: '#F7D96A' },
  { pct: '9.52%', labelKey: 'development', color: '#7ACC00' },
  { pct: '4%', labelKey: 'team', color: '#4DC9F6' },
];

export default function Whitepaper() {
  const { t } = useTranslation();

  // Secciones del whitepaper con contenido desde i18n
  return (
    <section id="whitepaper" className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden">
      {/* Fondos decorativos */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#9EFF00]/3 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#F5C542]/3 blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#9EFF00] text-sm font-bold tracking-widest uppercase font-[Space_Grotesk]">
            {t('whitepaper.label')}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[Space_Grotesk] mt-4 mb-4">
            <span className="text-white">{t('whitepaper.title1')}</span>{' '}
            <span className="gradient-text">{t('whitepaper.title2')}</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            {t('whitepaper.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold border border-[#9EFF00]/30 text-[#9EFF00] bg-[#9EFF00]/5 font-[Space_Grotesk]">BNB Chain</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold border border-[#F5C542]/30 text-[#F5C542] bg-[#F5C542]/5 font-[Space_Grotesk]">Falco-X</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold border border-[#FF4D4D]/30 text-[#FF4D4D] bg-[#FF4D4D]/5 font-[Space_Grotesk]">Deflationary</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold border border-[#9EFF00]/30 text-[#9EFF00] bg-[#9EFF00]/5 font-[Space_Grotesk]">Passive Income</span>
          </div>
          <p className="text-gray-600 text-xs mt-4 font-[Space_Grotesk]">{t('whitepaper.version')}</p>

          {/* Botones CTA */}
          <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
            <a
              href="https://swap.falcox.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#9EFF00] text-[#050505] font-bold rounded-full text-sm
                         hover:bg-[#F5C542] transition-all duration-300 font-[Space_Grotesk]
                         flex items-center gap-2"
            >
              {t('whitepaper.ctaBuy')}
            </a>
            <a
              href="/whitepaper/index.html"
              className="px-6 py-2.5 border border-[#9EFF00]/30 text-[#9EFF00] font-bold rounded-full text-sm
                         hover:bg-[#9EFF00]/10 hover:border-[#9EFF00] transition-all duration-300
                         font-[Space_Grotesk] flex items-center gap-2"
            >
              <FaFilePdf className="text-sm" />
              {t('whitepaper.downloadPDF')}
            </a>
          </div>
        </motion.div>

        {/* ─── Contenido ─── */}
        <div className="space-y-16">

          {/* Sección 1 — Abstract */}
          <Section num="1" title={t('whitepaper.section1Title')}>
            <p>{t('whitepaper.section1P1')}</p>
            <p>{t('whitepaper.section1P2')}</p>
            <InfoCard color="green" title="🌙 Sahur Philosophy">
              {t('whitepaper.section1Quote')}
            </InfoCard>
          </Section>

          {/* Sección 2 — Culture */}
          <Section num="2" title={t('whitepaper.section2Title')}>
            <p>{t('whitepaper.section2P1')}</p>
            <p>{t('whitepaper.section2P2')}</p>
          </Section>

          {/* Sección 3 — Tokenomics */}
          <Section num="3" title={t('whitepaper.section3Title')}>
            <p>{t('whitepaper.section3P1')}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
              {tokenomicsData.map((item) => (
                <div key={item.labelKey} className="glass-card rounded-xl p-4 text-center">
                  <p className="text-2xl font-black font-[Space_Grotesk]" style={{ color: item.color }}>
                    {item.pct}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{t(`tokenomics.${item.labelKey}`)}</p>
                </div>
              ))}
            </div>
            <InfoCard color="green" title="🔒 Transparency">
              {t('whitepaper.section3Transparency')}<br />
              <code className="text-[#9EFF00] text-xs break-all">{CONTRACT}</code>
            </InfoCard>
          </Section>

          {/* Sección 4 — Tax Structure */}
          <Section num="4" title={t('whitepaper.section4Title')}>
            <p>{t('whitepaper.section4P1')}</p>
            <h4 className="text-[#9EFF00] font-bold font-[Space_Grotesk] mt-6 mb-3">
              {t('whitepaper.section4Phase1')}
            </h4>
            <TaxTable rows={t('whitepaper.section4Phase1Rows', { returnObjects: true })} />
            <InfoCard color="gold" title={'📉 ' + t('whitepaper.section4ReductionTitle')}>
              {t('whitepaper.section4ReductionDesc')}
            </InfoCard>
            <h4 className="text-[#F5C542] font-bold font-[Space_Grotesk] mt-6 mb-3">
              {t('whitepaper.section4Phase2')}
            </h4>
            <TaxTable rows={t('whitepaper.section4Phase2Rows', { returnObjects: true })} />
            <p className="text-gray-400 text-sm mt-2">{t('whitepaper.section4Commitment')}</p>
          </Section>

          {/* Sección 5 — Passive Income */}
          <Section num="5" title={t('whitepaper.section5Title')}>
            <p>{t('whitepaper.section5P1')}</p>
            <BulletList items={t('whitepaper.section5Items', { returnObjects: true })} />
            <InfoCard color="green" title="💰 Example">
              {t('whitepaper.section5Example')}
            </InfoCard>
            <InfoCard color="gold" title={'🪙 ' + t('whitepaper.section5StakingTitle')}>
              {t('whitepaper.section5StakingDesc')}{' '}
              <a href="https://swap.falcox.net/staking" target="_blank" rel="noopener noreferrer"
                 className="text-[#F5C542] font-bold hover:underline inline-flex items-center gap-1">
                swap.falcox.net/staking <FaExternalLinkAlt className="text-xs" />
              </a>
            </InfoCard>
          </Section>

          {/* Sección 6 — Auto-Burn */}
          <Section num="6" title={t('whitepaper.section6Title')}>
            <p>{t('whitepaper.section6P1')}</p>
            <p>{t('whitepaper.section6P2')}</p>
            <InfoCard color="red" title="🔥 Verified Burn Transparency">
              {t('whitepaper.section6Verify')}{' '}
              <a href={DEAD_WALLET_URL} target="_blank" rel="noopener noreferrer"
                 className="text-[#FF4D4D] font-bold hover:underline inline-flex items-center gap-1">
                BSCScan <FaExternalLinkAlt className="text-xs" />
              </a>
            </InfoCard>
          </Section>

          {/* Sección 7 — Falco-X */}
          <Section num="7" title={t('whitepaper.section7Title')}>
            <p>{t('whitepaper.section7P1')}</p>
            <BulletList items={t('whitepaper.section7Items', { returnObjects: true })} />
            <InfoCard color="green" title="🛠️ Built to Last">
              Most meme coins fade because they have no foundation. TUNG's integration with Falco-X ensures it has the infrastructure to survive — and thrive.
            </InfoCard>
          </Section>

          {/* Sección 8 — Roadmap */}
          <Section num="8" title={t('whitepaper.section8Title')}>
            <RoadmapTimeline phases={t('whitepaper.section8Phases', { returnObjects: true })} />
          </Section>

          {/* Sección 9 — Security */}
          <Section num="9" title={t('whitepaper.section9Title')}>
            <BulletList items={t('whitepaper.section9Items', { returnObjects: true })} />
          </Section>

          {/* Sección 10 — How to Buy */}
          <Section num="10" title={t('whitepaper.section10Title')}>
            <NumberedList items={t('whitepaper.section10Steps', { returnObjects: true })} />
          </Section>

          {/* Sección 11 — Disclaimer */}
          <Section num="11" title={t('whitepaper.section11Title')}>
            <p className="text-gray-500 text-sm">{t('whitepaper.section11P1')}</p>
            <p className="text-gray-500 text-sm">{t('whitepaper.section11P2')}</p>
          </Section>

        </div>
      </div>
    </section>
  );
}

/* ─── Sub-componentes ─── */

function Section({ num, title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="flex items-center gap-3 mb-5 pb-3 border-b border-[#9EFF00]/10">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#9EFF00]/10 text-[#9EFF00] text-sm font-black font-[Space_Grotesk]">
          {num}
        </span>
        <span className="text-xl font-bold font-[Space_Grotesk] text-white">{title}</span>
      </h3>
      <div className="text-gray-400 leading-relaxed space-y-3">{children}</div>
    </motion.div>
  );
}

function InfoCard({ color, title, children }) {
  const colors = {
    green: { border: 'border-l-[#9EFF00]', text: 'text-[#9EFF00]' },
    gold: { border: 'border-l-[#F5C542]', text: 'text-[#F5C542]' },
    red: { border: 'border-l-[#FF4D4D]', text: 'text-[#FF4D4D]' },
  };
  const c = colors[color] || colors.green;
  return (
    <div className={`glass-card rounded-xl p-5 border-l-4 ${c.border} my-4`}>
      <p className={`font-bold font-[Space_Grotesk] text-sm mb-1 ${c.text}`}>{title}</p>
      <p className="text-gray-400 text-sm">{children}</p>
    </div>
  );
}

function TaxTable({ rows }) {
  if (!rows || !Array.isArray(rows)) return null;
  return (
    <div className="overflow-x-auto my-3">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#9EFF00]/10 text-[#9EFF00] font-[Space_Grotesk] text-xs uppercase tracking-wider">
            <th className="text-left py-3 px-3">Allocation</th>
            <th className="text-left py-3 px-3">%</th>
            <th className="text-left py-3 px-3 hidden sm:table-cell">Purpose</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5">
              <td className="py-2.5 px-3 text-gray-300">{row.alloc}</td>
              <td className="py-2.5 px-3 text-[#F5C542] font-bold font-[Space_Grotesk]">{row.pct}</td>
              <td className="py-2.5 px-3 text-gray-500 hidden sm:table-cell">{row.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BulletList({ items }) {
  if (!items || !Array.isArray(items)) return null;
  return (
    <ul className="space-y-2 my-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
          <span className="text-[#9EFF00] mt-0.5 flex-shrink-0">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }) {
  if (!items || !Array.isArray(items)) return null;
  return (
    <ol className="space-y-3 my-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#9EFF00]/10 text-[#9EFF00] text-xs font-bold font-[Space_Grotesk] flex-shrink-0 mt-0.5">
            {i + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function RoadmapTimeline({ phases }) {
  if (!phases || !Array.isArray(phases)) return null;
  return (
    <div className="relative pl-8 my-4">
      <div className="absolute left-[11px] top-0 bottom-0 w-px bg-[#9EFF00]/10" />
      {phases.map((phase, i) => (
        <div key={i} className="relative mb-6">
          <div
            className="absolute left-[-21px] top-1.5 w-3 h-3 rounded-full"
            style={{
              background: phase.status === 'live' ? '#9EFF00' : '#F5C542',
              boxShadow: `0 0 10px ${phase.status === 'live' ? 'rgba(158,255,0,0.5)' : 'rgba(245,197,66,0.4)'}`,
            }}
          />
          <span
            className={`text-xs font-bold uppercase tracking-wider font-[Space_Grotesk] ${
              phase.status === 'live' ? 'text-[#9EFF00]' : 'text-[#F5C542]'
            }`}
          >
            {phase.status === 'live' ? '● Live' : '○ Soon'}
          </span>
          <h5 className="text-white font-bold font-[Space_Grotesk] text-sm mt-1">{phase.title}</h5>
          <p className="text-gray-500 text-xs mt-0.5">{phase.desc}</p>
        </div>
      ))}
    </div>
  );
}
