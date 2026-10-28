'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Building2, TrendingUp, Home, Award } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { STATS, SERVICES_LIST } from '@/constants'
import { useTranslation } from '@/hooks/useTranslation'

const SERVICES_PREVIEW = SERVICES_LIST.slice(0, 4)
const STAT_KEYS = ['stats.projectsCompleted', 'stats.happyClients', 'stats.skilledWorkforce', 'stats.yearsOfExperience']

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 })
  const { t } = useTranslation()

  return (
    <section className="pt-24 pb-6 lg:pt-32 lg:pb-10 bg-white overflow-hidden relative">
      {/* Massive Background Watermark */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[150%] flex justify-center pointer-events-none opacity-[0.03] z-0 select-none">
        <h2 className="text-[120px] md:text-[200px] lg:text-[280px] font-display font-black whitespace-nowrap text-slate-900 leading-none tracking-tighter">ABOUT RCR</h2>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Image column - Premium Dual Image Layout */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative pr-0 lg:pr-12 pb-24 lg:pb-0 h-full min-h-[450px] lg:min-h-[600px]"
          >
            {/* Main large image */}
            <div className="relative w-4/5 lg:w-[85%] h-[85%] lg:h-[90%] rounded-3xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(192,30,46,0.2)] group z-10">
              <Image
                src="/images/about_1.jpg"
                alt="RCR Construction Quality"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                sizes="(max-width: 768px) 80vw, 40vw"
              />
              <div className="absolute inset-0 bg-brandRed/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-700" />
            </div>

            {/* Overlapping smaller image */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute bottom-10 lg:bottom-0 right-0 lg:-right-4 w-[60%] h-[55%] rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] border-8 border-white z-20 group"
            >
              <Image
                src="/images/about_2.jpg"
                alt="RCR Concrete Work"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </motion.div>

            {/* Floating 10+ Years Badge */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[15%] -left-4 lg:-left-10 rounded-3xl p-6 md:p-8 border border-white/60 bg-white/95 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] flex flex-col items-center gap-2 z-30"
            >
              <div className="text-5xl md:text-6xl font-display font-black text-brandRed leading-none tracking-tighter">10<span className="text-3xl md:text-4xl text-slate-800">+</span></div>
              <div className="w-16 h-1.5 bg-brandRed/20 rounded-full my-1 md:my-2" />
              <div className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-widest text-center leading-tight">Years of<br/>Excellence</div>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-4 lg:-right-10 w-40 h-40 bg-[radial-gradient(#c01e2e_3px,transparent_3px)] [background-size:24px_24px] opacity-15 z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brandRed/5 rounded-full blur-[80px] -z-10" />
          </motion.div>

          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-10 lg:pt-0"
          >
            <span className="section-badge mb-6 inline-flex shadow-sm bg-red-50 text-brandRed border-brandRed/20">{t('about.badge')}</span>
            <h2 className="section-title mb-6 text-4xl lg:text-5xl leading-tight">
              {t('about.titleLine1')}<br/>
              <span className="text-gradient font-black">{t('about.titleHighlight')}</span>
            </h2>
            
            <div className="prose prose-slate max-w-none mb-10">
              <p className="text-lg text-slate-700 leading-relaxed font-semibold mb-4">
                {t('about.description1')} <strong className="text-brandRed">{t('about.proprietorName')}</strong>{t('about.description1End')}
              </p>
              <p className="text-base text-slate-600 leading-relaxed font-medium">
                {t('about.description2Start')} <strong className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{t('about.microEnterprise')}</strong> {t('about.description2End')}
              </p>
            </div>

            {/* Services list - Premium Grid */}
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-10">
              {SERVICES_PREVIEW.map((s) => (
                <div key={s.id} className="group flex items-center gap-3 p-3 md:p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-red-50/50 hover:border-brandRed/30 hover:shadow-[0_4px_15px_rgba(192,30,46,0.05)] transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-brandRed group-hover:border-brandRed transition-all duration-300">
                    <CheckCircle size={14} className="text-brandRed group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-brandRed transition-colors">
                    {t(`servicesList.${s.id}.title`)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about" className="btn-primary w-full sm:w-auto justify-center py-4 px-8 shadow-[0_8px_20px_rgba(192,30,46,0.25)] hover:-translate-y-1">
                {t('about.aboutUs')} <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn-outline w-full sm:w-auto justify-center py-4 px-8 hover:-translate-y-1 hover:shadow-lg bg-white">
                {t('about.contactUs')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Sleek Ultra-Premium Stats row */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5 mt-14 lg:mt-20">
          {STATS.map((stat, i) => {
            const icons = [Building2, TrendingUp, Home, Award]
            const Icon = icons[i] || Building2
            const accent = [
              { bg: 'bg-red-50 text-brandRed border-red-100', bar: 'from-brandRed to-red-500' },
              { bg: 'bg-amber-50 text-amber-600 border-amber-100', bar: 'from-amber-500 to-orange-500' },
              { bg: 'bg-emerald-50 text-emerald-600 border-emerald-100', bar: 'from-emerald-500 to-teal-500' },
              { bg: 'bg-blue-50 text-blue-600 border-blue-100', bar: 'from-blue-500 to-indigo-500' },
            ][i]

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative text-left p-5 sm:p-6 rounded-2xl border border-slate-200/80 bg-white hover:border-brandRed/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-8px_rgba(192,30,46,0.12)] group overflow-hidden"
              >
                {/* Top elegant gradient accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${accent.bar} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

                {/* Top Row: Micro Icon & Sequence */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${accent.bg} transition-transform duration-300 group-hover:scale-110 shadow-xs`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors uppercase">
                    0{i + 1}
                  </span>
                </div>

                {/* Number & Suffix */}
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight group-hover:text-brandRed transition-colors duration-300">
                    {inView ? <CountUp end={parseInt(stat.value)} duration={2.2 + i * 0.15} /> : '0'}
                  </span>
                  <span className="text-lg sm:text-xl font-display font-extrabold text-brandRed">
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <div className="text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight leading-snug group-hover:text-brandRed transition-colors">
                  {t(STAT_KEYS[i])}
                </div>

                {/* Subtext Context */}
                {stat.subtext && (
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-1 leading-tight line-clamp-1">
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
