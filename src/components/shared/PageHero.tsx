'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { Building2, TrendingUp, Home, Award } from 'lucide-react'
import { STATS } from '@/constants'
import { useTranslation } from '@/hooks/useTranslation'

const STAT_KEYS = ['stats.projectsCompleted', 'stats.happyClients', 'stats.skilledWorkforce', 'stats.yearsOfExperience']

// ============================================================
// PAGE HERO
// ============================================================
interface PageHeroProps {
  badge?: string
  title: string
  subtitle?: string
  backgroundImage?: string
}

export default function PageHero({ badge, title, subtitle, backgroundImage }: PageHeroProps) {
  const renderTitle = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) => 
      i % 2 === 1 ? <span key={i} className="text-brandRed">{part}</span> : part
    );
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '45vh' }}>
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt={title.replace(/\*\*/g, '')}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        </>
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-white to-slate-50" />
      )}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="relative z-10 container-custom text-center py-20 pt-36 md:pt-40">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            {backgroundImage ? (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brandRed animate-pulse shadow-[0_0_8px_rgba(192,30,46,0.8)]" />
                {badge}
              </span>
            ) : (
              <span className="section-badge">{badge}</span>
            )}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5 leading-tight max-w-4xl mx-auto ${backgroundImage ? 'text-white drop-shadow-sm' : 'text-slate-900'}`}
        >
          {renderTitle(title)}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${backgroundImage ? 'text-slate-200' : 'text-slate-500'}`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}

// ============================================================
// STATS SECTION (exported separately)
// ============================================================
export function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const { t } = useTranslation()

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden" ref={ref}>
      {/* Background dark glowing elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brandRed/10 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brandRed/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brandRed/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
          {STATS.map((stat, i) => {
            const icons = [Building2, TrendingUp, Home, Award]
            const Icon = icons[i] || Building2

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative text-left p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md hover:border-brandRed/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-10px_rgba(192,30,46,0.3)] group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brandRed via-red-500 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-red-400 group-hover:scale-110 group-hover:bg-brandRed group-hover:text-white transition-all">
                    <Icon size={16} />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                    0{i + 1}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight group-hover:text-red-400 transition-colors duration-300">
                    {inView ? <CountUp end={parseInt(stat.value)} duration={2.2 + i * 0.15} separator="," /> : '0'}
                  </span>
                  <span className="text-lg sm:text-xl font-display font-extrabold text-brandRed">
                    {stat.suffix}
                  </span>
                </div>

                <div className="text-xs sm:text-[13px] font-bold text-white tracking-tight leading-snug">
                  {t(STAT_KEYS[i])}
                </div>

                {stat.subtext && (
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-1 leading-tight line-clamp-1">
                    {stat.subtext}
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
