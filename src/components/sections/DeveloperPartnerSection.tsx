'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HardHat, Building2, Users2, ShieldCheck, CheckCircle2, ArrowRight, Phone, MessageSquare } from 'lucide-react'

export default function DeveloperPartnerSection() {
  const highlights = [
    {
      icon: Users2,
      title: '100+ Skilled Manpower Gang',
      desc: 'Dedicated teams of seasoned bar benders, shuttering carpenters, and concrete casting specialists ready for rapid site deployment.',
    },
    {
      icon: Building2,
      title: '100+ Buildings (7 to 50 Floors)',
      desc: 'Proven delivery on 100+ multi-storey towers from 7 floors up to 50-storey high-rises including Shapoorji Pallonji (CIDCO 7 Towers), Kalpataru & Marathon.',
    },
    {
      icon: ShieldCheck,
      title: '100% Legal & Labour Compliant',
      desc: 'Registered GST (27CIMPR8276H1ZF), Udyog Aadhaar, Labour License compliance, and zero-compromise safety protocols on site.',
    },
    {
      icon: HardHat,
      title: 'Fast Slab Casting Cycles',
      desc: 'Mechanized execution ensuring strict adherence to structural blueprints, rapid floor cycles, and premium honeycombing-free finish.',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden border-y border-white/10">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brandRed/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-[0.2em] uppercase bg-brandRed/20 border border-brandRed/40 text-red-300 mb-4 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brandRed animate-pulse" />
            For Developers, EPCs &amp; Main Contractors
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-[1.15] mb-5"
          >
            Looking For A Reliable <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-200">RCC Structural Partner</span> For Your Next Phase?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-medium"
          >
            Whether you need turnkey structural execution or labour-basis reinforcement &amp; shuttering contracts for high-rise towers, commercial hubs, or residential townships across Mumbai, Thane, Navi Mumbai &amp; Palghar — RCR Enterprises delivers quality with commitment.
          </motion.p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {highlights.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 hover:border-brandRed/40 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/[0.08] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brandRed/20 border border-brandRed/30 flex items-center justify-center text-brandRed mb-5 group-hover:scale-110 group-hover:bg-brandRed group-hover:text-white transition-all">
                  <Icon size={24} />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2.5">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-slate-900 to-slate-950 rounded-3xl border border-white/15 p-8 md:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <CheckCircle2 size={16} /> Immediate Manpower Mobilization Available
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
              Invite Us For Tender Quotation or Site Assessment
            </h3>
            <p className="text-slate-400 text-sm md:text-base">
              Share your architectural blueprints or structural BOQ for an itemized, highly competitive quotation. We respond within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-brandRed text-white hover:bg-red-700 transition-all shadow-[0_10px_30px_rgba(192,30,46,0.4)] hover:-translate-y-0.5 whitespace-nowrap"
            >
              Request Tender Quote <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/919619439243?text=Hello%20RCR%20Enterprises,%20we%20have%20an%20upcoming%20project%20and%20need%20a%20quotation%20for%20RCC%20structural%20work."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md hover:-translate-y-0.5 whitespace-nowrap"
            >
              <MessageSquare size={16} /> WhatsApp Inquiry
            </a>
            <a
              href="tel:9619439243"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/10 text-white transition-all whitespace-nowrap"
            >
              <Phone size={16} /> 9619439243
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
