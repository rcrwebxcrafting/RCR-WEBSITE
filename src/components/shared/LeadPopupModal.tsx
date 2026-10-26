'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Send, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  HardHat, 
  ShieldCheck, 
  Clock, 
  MessageSquare,
  Building2,
  Sparkles,
  ArrowRight,
  Instagram,
  Facebook
} from 'lucide-react'
import { COMPANY_INFO } from '@/constants'
import { useTranslation } from '@/hooks/useTranslation'

const SERVICES_OPTIONS = [
  'RCC Work & Structural Construction',
  'Slab Casting Work',
  'Shuttering & Formwork',
  'Column & Beam Framing',
  'Residential Building Construction',
  'Commercial / Office Building',
  'Industrial & Warehouse Work',
  'Labour Contract / Turnkey Project'
]

const LOCATION_OPTIONS = [
  'Mumbai (All Suburbs)',
  'Pune & PCMC Region',
  'Thane District',
  'Navi Mumbai',
  'Virar / Vasai / Palghar',
  'Kalyan / Dombivli',
  'Other Maharashtra Location'
]

export default function LeadPopupModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const { language } = useTranslation()

  // Form State
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [serviceRequired, setServiceRequired] = useState(SERVICES_OPTIONS[0])
  const [location, setLocation] = useState(LOCATION_OPTIONS[0])
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Listen for custom trigger event (e.g. from Get Free Quote buttons)
    const handleOpen = () => {
      setSubmitted(false)
      setIsOpen(true)
    }
    window.addEventListener('open-lead-popup', handleOpen)

    // Auto-open after delay of 5 seconds on website visit
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('rcr_lead_popup_dismissed')
      if (!dismissed) {
        setIsOpen(true)
      }
    }, 5000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('open-lead-popup', handleOpen)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem('rcr_lead_popup_dismissed', 'true')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your Name and Mobile Number.')
      return
    }

    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          serviceRequired,
          location,
          message: message.trim() || `Quote inquiry for ${serviceRequired} in ${location}`
        })
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
        localStorage.setItem('rcr_lead_submitted', 'true')
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setErrorMsg('Network error. Please call directly at 9619439243.')
    } finally {
      setLoading(false)
    }
  }

  // Pre-formatted WhatsApp text for submitted lead
  const whatsappText = encodeURIComponent(
    `Hello RCR Enterprises! I just requested an instant quote on your website for ${serviceRequired} at ${location}. My name is ${fullName} (${phone}). Please share project details & estimation.`
  )

  return (
    <>
      {/* Floating Quick Action Beacon Button (visible when modal is closed) */}
      {!isOpen && (
        <motion.button
          onClick={() => { setSubmitted(false); setIsOpen(true) }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-slate-900 via-slate-800 to-brandRed text-white px-4 py-2.5 rounded-full shadow-2xl border border-white/20 flex items-center gap-2.5 text-xs sm:text-sm font-bold group cursor-pointer"
          title="Click to request an instant quote"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandRed opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
          <HardHat size={16} className="text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Get Free RCC Quote</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      )}

      {/* Main Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] overflow-y-auto bg-slate-950/80 backdrop-blur-md"
            onClick={handleClose}
          >
            {/* Scrollable centering wrapper - avoids flexbox negative scroll clipping */}
            <div className="min-h-full w-full flex items-center justify-center p-3 sm:p-6 py-6 sm:py-8">
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                className="relative w-full max-w-md sm:max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shadow-sm backdrop-blur-sm cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>

                {/* Conditional Rendering: Form vs Success / Reply Screen */}
                {!submitted ? (
                  <div>
                    {/* Modal Header */}
                    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-4 py-3 sm:px-6 sm:py-4.5 pr-11 sm:pr-14 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-brandRed/20 rounded-full blur-3xl pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

                      <div className="relative z-10">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase bg-brandRed/30 border border-brandRed/40 text-red-200 mb-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                          Free Consultation & Estimation
                        </div>

                        <h3 className="text-base sm:text-xl md:text-2xl font-display font-bold text-white leading-tight">
                          Get An Instant Quote For Your <span className="text-brandRed">RCC & Construction Work</span>
                        </h3>

                        <p className="text-slate-300 text-[10px] sm:text-xs mt-1 flex items-center gap-1.5">
                          <MapPin size={11} className="text-brandRed flex-shrink-0" />
                          <span>Available across <strong>Mumbai (All Locations)</strong> & <strong>Pune</strong></span>
                        </p>
                      </div>
                    </div>

                    {/* Modal Body / Form */}
                    <form onSubmit={handleSubmit} className="p-3.5 sm:p-5 space-y-2.5 sm:space-y-3">
                      {errorMsg && (
                        <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                          {errorMsg}
                        </div>
                      )}

                      {/* Full Name & Phone in 2-cols */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <div>
                          <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-0.5 sm:mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Rajesh Kumar"
                            className="w-full px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-slate-200 focus:border-brandRed focus:ring-2 focus:ring-brandRed/20 text-slate-900 text-xs sm:text-sm outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-0.5 sm:mb-1">
                            Mobile / WhatsApp *
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 select-none">
                              +91
                            </span>
                            <input
                              type="tel"
                              required
                              maxLength={10}
                              value={phone}
                              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                              placeholder="9876543210"
                              className="w-full pl-12 pr-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-slate-200 focus:border-brandRed focus:ring-2 focus:ring-brandRed/20 text-slate-900 text-xs sm:text-sm outline-none transition-all tracking-wide"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Service Required */}
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-0.5 sm:mb-1">
                          Service Required *
                        </label>
                        <select
                          value={serviceRequired}
                          onChange={(e) => setServiceRequired(e.target.value)}
                          className="w-full px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-slate-200 focus:border-brandRed focus:ring-2 focus:ring-brandRed/20 text-slate-900 text-xs sm:text-sm outline-none transition-all bg-white"
                        >
                          {SERVICES_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Project Location */}
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-0.5 sm:mb-1">
                          Project Location *
                        </label>
                        <select
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-slate-200 focus:border-brandRed focus:ring-2 focus:ring-brandRed/20 text-slate-900 text-xs sm:text-sm outline-none transition-all bg-white"
                        >
                          {LOCATION_OPTIONS.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Area / Message */}
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-0.5 sm:mb-1">
                          Project Details / Approx Area (Optional)
                        </label>
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="e.g. 2,500 sq ft slab or G+3 building"
                          className="w-full px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-slate-200 focus:border-brandRed focus:ring-2 focus:ring-brandRed/20 text-slate-900 text-xs sm:text-sm outline-none transition-all"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 sm:py-3 px-5 rounded-lg sm:rounded-xl bg-gradient-to-r from-brandRed to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-brandRed/25 hover:shadow-brandRed/45 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer mt-1"
                      >
                        {loading ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Submitting Request...</span>
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            <span>Get Free Estimate & Site Visit</span>
                          </>
                        )}
                      </button>

                      {/* Trust Footnotes */}
                      <div className="pt-0.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-[9.5px] sm:text-[10.5px] text-slate-500 font-medium text-center">
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="text-emerald-500" />
                          Reply in 15-30 Mins
                        </span>
                        <span className="flex items-center gap-1">
                          <ShieldCheck size={11} className="text-sky-500" />
                          100% Free Site Visit
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 size={11} className="text-brandRed" />
                          Direct Engineer Call
                        </span>
                      </div>
                    </form>
                  </div>
                ) : (
                  /* ===================================================
                     EXQUISITE CUSTOMER CARE RESPONSE / REPLY SCREEN
                     =================================================== */
                  <div className="p-5 sm:p-7 text-center bg-gradient-to-b from-emerald-50/50 via-white to-white">
                    {/* Animated Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                      className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-3 sm:mb-4"
                    >
                      <CheckCircle2 size={34} className="stroke-[2.5]" />
                    </motion.div>

                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 tracking-tight">
                      Thank You, <span className="text-emerald-600">{fullName}</span>!
                    </h3>

                    <div className="mt-2.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-1.5 sm:space-y-2">
                      <p className="text-xs sm:text-sm font-semibold text-emerald-950 leading-relaxed">
                        ✅ <strong>Your consultation request has been successfully submitted to RCR Enterprises!</strong>
                      </p>
                      <p className="text-[11px] sm:text-xs text-emerald-800 leading-relaxed">
                        Our dedicated <strong>RCR Team will connect with you as soon as possible</strong> to review your project specifications, provide an accurate estimate, and schedule a complimentary on-site visit.
                      </p>
                    </div>

                    {/* Summary of what they submitted */}
                    <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] sm:text-xs text-left text-slate-600 space-y-1">
                      <div><strong>Requested Service:</strong> <span className="text-slate-900 font-semibold">{serviceRequired}</span></div>
                      <div><strong>Project Location:</strong> <span className="text-slate-900 font-semibold">{location}</span></div>
                      <div><strong>Contact Mobile:</strong> <span className="text-slate-900 font-semibold">+91 {phone}</span></div>
                    </div>

                    {/* Action 1: Instant WhatsApp Connect */}
                    <div className="mt-4 space-y-2">
                      <a
                        href={`https://wa.me/919619439243?text=${whatsappText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all group"
                      >
                        <MessageSquare size={16} className="group-hover:scale-110 transition-transform" />
                        <span>Connect Instantly on WhatsApp</span>
                      </a>

                      <a
                        href="tel:9619439243"
                        className="w-full py-2 sm:py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                      >
                        <Phone size={13} className="text-brandRed" />
                        <span>Need Urgent Assistance? Call: +91 9619439243</span>
                      </a>
                    </div>

                    {/* Follow On Instagram & Facebook */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-2.5">
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">Follow On:</span>
                      <a
                        href={COMPANY_INFO.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 text-[11px] font-semibold transition-colors"
                      >
                        <Instagram size={12} />
                        <span>Instagram</span>
                      </a>
                      <a
                        href={COMPANY_INFO.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold transition-colors"
                      >
                        <Facebook size={12} />
                        <span>Facebook</span>
                      </a>
                    </div>

                    <button
                      onClick={handleClose}
                      className="mt-3.5 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      Continue Browsing Website →
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
