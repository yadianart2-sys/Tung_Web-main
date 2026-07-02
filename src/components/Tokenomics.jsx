import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLock, FaShieldAlt, FaCheckCircle, FaExternalLinkAlt, FaChartLine, FaFire, FaVoteYea, FaCoins, FaBurn, FaRocket, FaCog, FaUsers, FaMousePointer } from 'react-icons/fa';

function DonutChart({ data, size = 300 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tiltAngle, setTiltAngle] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.37;
  const innerRadius = size * 0.22;
  const depth = 8;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const total = data.reduce((s, d) => s + d.pct, 0);
  let cumulative = 0;
  const slices = data.map((item) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += item.pct;
    const endAngle = (cumulative / total) * 360;
    return { ...item, startAngle, endAngle };
  });

  function polarToCartesian(angle, r) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function describeArc(sAngle, eAngle, rOuter, rInner) {
    const start = polarToCartesian(sAngle, rOuter);
    const end = polarToCartesian(eAngle, rOuter);
    const innerStart = polarToCartesian(sAngle, rInner);
    const innerEnd = polarToCartesian(eAngle, rInner);
    const largeArc = eAngle - sAngle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${end.x} ${end.y} L ${innerEnd.x} ${innerEnd.y} A ${rInner} ${rInner} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y} Z`;
  }

  function describeExtrusion(sAngle, eAngle) {
    const start2D = polarToCartesian(sAngle, radius);
    const end2D = polarToCartesian(eAngle, radius);
    const start3D = polarToCartesian(sAngle, radius + depth);
    const end3D = polarToCartesian(eAngle, radius + depth);
    const largeArc = eAngle - sAngle > 180 ? 1 : 0;
    return `M ${start2D.x} ${start2D.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end2D.x} ${end2D.y} L ${end3D.x} ${end3D.y} A ${radius + depth} ${radius + depth} 0 ${largeArc} 0 ${start3D.x} ${start3D.y} Z`;
  }

  return (
    <div
      ref={ref}
      className="relative group cursor-pointer select-none"
      style={{ width: size, height: size }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTiltAngle({ x: -y * 12, y: x * 12 });
      }}
      onMouseLeave={() => { setTiltAngle({ x: 0, y: 0 }); setHoveredIndex(null); }}
    >
      <motion.div
        className="w-full h-full"
        animate={{ rotateX: tiltAngle.x, rotateY: tiltAngle.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        <svg width={size} height={size} className="drop-shadow-[0_0_40px_rgba(158,255,0,0.12)] overflow-visible">
          <defs>
            {slices.map((slice, i) => (
              <filter key={`glow-${i}`} id={`glow-${i}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            ))}
          </defs>
          {/* 3D extrusions (depth faces) */}
          {slices.map((slice, i) => (
            <motion.path
              key={`extrude-${i}`}
              d={describeExtrusion(slice.startAngle, slice.endAngle)}
              fill={slice.color}
              opacity={0.25}
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: hoveredIndex === i ? 0.5 : 0.25 } : {}}
              transition={{ duration: 0.4 }}
            />
          ))}
          {/* Top faces */}
          {slices.map((slice, i) => {
            const isHovered = hoveredIndex === i;
            const midAngle = (slice.startAngle + slice.endAngle) / 2;
            const midRad = ((midAngle - 90) * Math.PI) / 180;
            const labelR = (radius + innerRadius) / 2;
            const labelPos = polarToCartesian(midAngle, labelR);

            return (
              <g key={`slice-${i}`}>
                <motion.path
                  d={describeArc(slice.startAngle, slice.endAngle, radius, innerRadius)}
                  fill={slice.color}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{
                    opacity: isVisible ? (isHovered ? 1 : 0.9) : 0,
                    scale: isVisible ? (isHovered ? 1.04 : 1) : 0.85,
                    filter: isHovered ? `url(#glow-${i})` : 'none',
                  }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="transition-all duration-300"
                  style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: 'fill-box' }}
                />
                {/* Segment label (pct) on hover */}
                <motion.g
                  animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <circle cx={labelPos.x} cy={labelPos.y} r="14" fill="#050505" opacity={0.8} />
                  <text
                    x={labelPos.x} y={labelPos.y + 1}
                    textAnchor="middle" dominantBaseline="central"
                    fill="white" fontSize="11" fontWeight="800"
                    fontFamily="Space Grotesk, sans-serif"
                  >
                    {slice.pct}%
                  </text>
                </motion.g>
              </g>
            );
          })}
          {/* Center hole */}
          <circle cx={cx} cy={cy} r={innerRadius - 2} fill="#050505" />
          <circle cx={cx} cy={cy} r={innerRadius - 2} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Center info - changes on hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {hoveredIndex !== null ? (
          <motion.div
            key={hoveredIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            <div className="text-[10px] font-bold font-[Space_Grotesk] tracking-wider uppercase"
                 style={{ color: slices[hoveredIndex].color }}>
              {slices[hoveredIndex].label}
            </div>
            <div className="text-2xl font-black font-[Space_Grotesk] mt-1"
                 style={{ color: slices[hoveredIndex].color }}>
              {slices[hoveredIndex].pct}%
            </div>
            <div className="text-[10px] text-gray-500 font-mono mt-0.5">
              {slices[hoveredIndex].amount} TUNG
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <span className="text-3xl font-black font-[Space_Grotesk] text-[#9EFF00]">100%</span>
            <div className="text-[9px] text-gray-500 font-[Space_Grotesk] mt-0.5">21,000,000 TUNG</div>
            <div className="text-[8px] text-gray-600 font-[Space_Grotesk] mt-1 flex items-center gap-1">
              <FaMousePointer className="text-[8px]" /> Hover segments
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function LockCard({ href, title, desc, icon, color, badge }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl border border-white/5 bg-[#0a0a0a] p-5 hover:border-[#4DC9F6]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(77,201,246,0.08)]"
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
             style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-bold font-[Space_Grotesk] text-sm">{title}</h4>
            {badge && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#9EFF00]/10 text-[#9EFF00] font-bold font-[Space_Grotesk]">
                {badge}
              </span>
            )}
          </div>
          <p className="text-gray-500 text-xs leading-relaxed mb-2">{desc}</p>
          <span className="inline-flex items-center gap-1.5 text-[#4DC9F6] text-xs font-bold font-[Space_Grotesk] group-hover:underline">
            <FaLock className="text-[0.6rem]" />
            Verify on PinkSale <FaExternalLinkAlt className="text-[0.55rem]" />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function Tokenomics() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  const supplyData = [
    { label: t('tokenomics.lp'), pct: 48, color: '#9EFF00', amount: '10,080,000', icon: <FaCoins className="text-lg" /> },
    { label: t('tokenomics.staking'), pct: 9.52, color: '#F5C542', amount: '2,000,000', icon: <FaRocket className="text-lg" /> },
    { label: t('tokenomics.burn'), pct: 9.52, color: '#FF4D4D', amount: '2,000,000', icon: <FaBurn className="text-lg" /> },
    { label: t('tokenomics.marketing'), pct: 9.52, color: '#F7D96A', amount: '2,000,000', icon: <FaChartLine className="text-lg" /> },
    { label: t('tokenomics.development'), pct: 9.52, color: '#7ACC00', amount: '2,000,000', icon: <FaCog className="text-lg" /> },
    { label: t('tokenomics.team'), pct: 4, color: '#4DC9F6', amount: '900,000', icon: <FaUsers className="text-lg" /> },
  ];

  return (
    <section ref={sectionRef} id="tokenomics" className="relative py-24 sm:py-32 bg-[#0D1B12]/30 overflow-hidden">
      {/* Parallax background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#9EFF00]/4 blur-[150px] animate-pulse" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#F5C542]/4 blur-[120px]" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with staggered reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[#F5C542] text-sm font-bold tracking-widest uppercase font-[Space_Grotesk] inline-block"
          >
            {t('tokenomics.label')}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-[Space_Grotesk] mt-4 mb-4">
            <span className="gradient-text">{t('tokenomics.title')}</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            {t('tokenomics.subtitle')}
          </motion.p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-6xl mx-auto"
        >
          <div className="glass-card p-8 sm:p-12 rounded-3xl border border-[#9EFF00]/5 hover:border-[#9EFF00]/10 transition-all duration-500">
            {/* Donut + Legend */}
            <div className="flex flex-col lg:flex-row items-center gap-10 mb-10">
              <motion.div
                initial={{ scale: 0.85, opacity: 0, rotateY: -10 }}
                whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="flex-shrink-0"
              >
                <DonutChart data={supplyData} size={300} />
              </motion.div>

              {/* Legend */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {supplyData.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.10] transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                         style={{ background: `${item.color}15`, color: item.color }}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-white text-sm font-bold font-[Space_Grotesk]">{item.label}</span>
                        <motion.span
                          className="text-xs font-bold font-[Space_Grotesk]"
                          style={{ color: item.color }}
                          whileHover={{ scale: 1.2 }}
                        >
                          {item.pct}%
                        </motion.span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="h-1.5 flex-1 rounded-full bg-white/[0.06] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: item.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono flex-shrink-0">{item.amount}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Total supply */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#9EFF00]/20 bg-[#9EFF00]/5 hover:bg-[#9EFF00]/10 hover:border-[#9EFF00]/30 hover:shadow-[0_0_30px_rgba(158,255,0,0.1)] transition-all duration-300">
                <FaCoins className="text-[#9EFF00] text-lg" />
                <span className="text-gray-400 font-[Space_Grotesk] text-sm">{t('tokenomics.totalSupply')}</span>
                <span className="text-xl font-black font-[Space_Grotesk] text-[#9EFF00]">21,000,000 TUNG</span>
              </div>
              <p className="text-gray-600 text-xs mt-3 font-[Space_Grotesk]">{t('tokenomics.supplyNote')}</p>
            </motion.div>

            {/* Tax Structure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 p-6 rounded-2xl border border-[#F5C542]/10 bg-gradient-to-r from-[#F5C542]/5 to-transparent hover:border-[#F5C542]/20 hover:shadow-[0_0_30px_rgba(245,197,66,0.06)] transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                     style={{ background: '#F5C54215', color: '#F5C542', border: '1px solid #F5C54230' }}>
                  <FaVoteYea className="text-xl" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold font-[Space_Grotesk] text-base mb-1">Transaction Tax: <span className="text-[#FF4D4D]">6%</span> → <span className="text-[#9EFF00]">3%</span></h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {t('tokenomics.securityDesc')}
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                  <div className="text-center px-3 py-2 rounded-xl bg-[#9EFF00]/5 border border-[#9EFF00]/10 hover:bg-[#9EFF00]/10 transition-all">
                    <div className="text-lg font-black font-[Space_Grotesk] text-[#9EFF00]">3%</div>
                    <div className="text-[9px] text-gray-500 font-[Space_Grotesk]">Holders</div>
                  </div>
                  <div className="text-gray-600 text-lg font-thin">+</div>
                  <div className="text-center px-3 py-2 rounded-xl bg-[#F5C542]/5 border border-[#F5C542]/10 hover:bg-[#F5C542]/10 transition-all">
                    <div className="text-lg font-black font-[Space_Grotesk] text-[#F5C542]">1.5%</div>
                    <div className="text-[9px] text-gray-500 font-[Space_Grotesk]">Marketing</div>
                  </div>
                  <div className="text-gray-600 text-lg font-thin">+</div>
                  <div className="text-center px-3 py-2 rounded-xl bg-[#FF4D4D]/5 border border-[#FF4D4D]/10 hover:bg-[#FF4D4D]/10 transition-all">
                    <div className="text-lg font-black font-[Space_Grotesk] text-[#FF4D4D]">1.5%</div>
                    <div className="text-[9px] text-gray-500 font-[Space_Grotesk]">Auto-Burn</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="mt-12"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4DC9F6]/30 bg-[#4DC9F6]/5 mb-4 hover:bg-[#4DC9F6]/10 hover:border-[#4DC9F6]/50 transition-all duration-300"
              >
                <FaShieldAlt className="text-[#4DC9F6] text-sm" />
                <span className="text-[#4DC9F6] text-xs font-bold tracking-widest uppercase font-[Space_Grotesk]">
                  {t('tokenomics.securityTitle')}
                </span>
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-black font-[Space_Grotesk] text-white mb-3">
                {t('tokenomics.securityHeadline')}
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm">
                {t('tokenomics.securityDesc')}
              </p>
            </div>

            {/* LP Lock */}
            <motion.a
              href="https://www.pinksale.finance/pinklock/bsc/record/1629532"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.005 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="group block mb-6 overflow-hidden rounded-[28px] border border-[#9EFF00]/20 bg-[linear-gradient(135deg,rgba(158,255,0,0.16),rgba(245,197,66,0.12),rgba(77,201,246,0.08))] p-[1px] transition-all duration-300 hover:border-[#9EFF00]/40 hover:shadow-[0_0_50px_rgba(158,255,0,0.14)]"
            >
              <div className="rounded-[27px] bg-[#081009]/95 px-6 py-6 sm:px-8 sm:py-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-2xl">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#9EFF00]/25 bg-[#9EFF00]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-[#9EFF00] font-[Space_Grotesk]">
                      <FaLock className="text-[0.7rem]" />
                      {t('tokenomics.lpLockBadge')}
                    </div>
                    <h4 className="mb-2 text-xl font-black text-white font-[Space_Grotesk] sm:text-2xl">
                      {t('tokenomics.lpLockTitle')}
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-300 sm:text-[0.95rem]">
                      {t('tokenomics.lpLockDesc')}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <div className="rounded-2xl border border-[#F5C542]/20 bg-[#F5C542]/10 px-4 py-3 text-left sm:text-right hover:bg-[#F5C542]/15 transition-all">
                      <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5C542] font-[Space_Grotesk]">
                        {t('tokenomics.lpLockDurationLabel')}
                      </div>
                      <div className="mt-1 text-lg font-black text-white font-[Space_Grotesk]">
                        {t('tokenomics.lpLockDurationValue')}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#9EFF00]/30 bg-[#9EFF00]/12 px-5 py-3 text-sm font-bold text-[#9EFF00] font-[Space_Grotesk] transition-all duration-300 group-hover:border-[#9EFF00]/50 group-hover:bg-[#9EFF00]/18 group-hover:shadow-[0_0_20px_rgba(158,255,0,0.15)]">
                      {t('tokenomics.lpLockCta')}
                      <FaExternalLinkAlt className="text-[0.72rem]" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>

            {/* LP + Dev Locks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <LockCard
                href="https://www.pinksale.finance/pinklock/bsc/record/1644813"
                title={t('tokenomics.lpLockCardTitle')}
                desc={t('tokenomics.lpLockCardDesc')}
                icon={<FaShieldAlt className="text-lg" />}
                color="#9EFF00"
                badge="Live"
              />
              <LockCard
                href="https://www.pinksale.finance/pinklock/bsc/record/1626870"
                title={t('tokenomics.lock1Title')}
                desc={t('tokenomics.lock1Desc')}
                icon={<FaLock className="text-lg" />}
                color="#4DC9F6"
                badge="Verified"
              />
              <LockCard
                href="https://www.pinksale.finance/pinklock/bsc/record/1626872"
                title={t('tokenomics.lock2Title')}
                desc={t('tokenomics.lock2Desc')}
                icon={<FaLock className="text-lg" />}
                color="#4DC9F6"
                badge="Verified"
              />
            </div>

            {/* Community Commitment */}
            <motion.div
              whileHover={{ scale: 1.002 }}
              className="glass-card p-6 rounded-2xl border-[#9EFF00]/10 bg-gradient-to-b from-[#9EFF00]/3 to-transparent hover:border-[#9EFF00]/20 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                     style={{ background: '#9EFF0015', color: '#9EFF00', border: '1px solid #9EFF0030' }}>
                  <FaChartLine className="text-xl" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold font-[Space_Grotesk] text-base mb-2">
                    {t('tokenomics.commitmentTitle')}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {t('tokenomics.commitmentDesc')}
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-[#FF4D4D] text-xs font-bold font-[Space_Grotesk] bg-[#FF4D4D]/5 px-3 py-1.5 rounded-lg hover:bg-[#FF4D4D]/10 transition-all">
                    <FaFire className="text-sm" />
                    {t('tokenomics.burnLabel')}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#F5C542] text-xs font-bold font-[Space_Grotesk] bg-[#F5C542]/5 px-3 py-1.5 rounded-lg hover:bg-[#F5C542]/10 transition-all">
                    <FaChartLine className="text-sm" />
                    {t('tokenomics.aprLabel')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Contract Address */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 text-xs font-mono mb-2">{t('tokenomics.contractLabel')}</p>
          <div className="relative inline-block group">
            <code className="text-[#9EFF00]/60 text-xs sm:text-sm font-mono break-all bg-[#0D1B12]/50 px-4 py-2 rounded-lg border border-[#9EFF00]/10 group-hover:border-[#9EFF00]/30 group-hover:bg-[#9EFF00]/5 transition-all duration-300">
              0x09514EcF8270C12101D077B5e8B034B164F71C5f
            </code>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
