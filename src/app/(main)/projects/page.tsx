'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, Search, ArrowRight, Building2, Layers, TrendingUp, Home } from 'lucide-react'
import { cn, formatDateShort, getStatusColor, CONSTRUCTION_IMAGES } from '@/utils'
import { PROJECT_CATEGORIES } from '@/constants'
import PageHero from '@/components/shared/PageHero'

interface Project {
  _id: string
  title: string
  slug: string
  shortDescription: string
  coverImage: string
  category: string
  status: string
  location: string
  startDate: string
  workType: string
  clientName?: string
}

const STATUS_FILTERS = ['all', 'ongoing', 'completed', 'upcoming']

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: '9', page: String(page) })
      if (category !== 'all') params.set('category', category)
      if (status !== 'all') params.set('status', status)
      if (search) params.set('search', search)
      const res = await fetch(`/api/projects?${params}`)
      const data = await res.json()
      if (data.success && data.data && data.data.length > 0) {
        setProjects(data.data)
        setTotalPages(data.pagination?.pages || 1)
      } else setProjects(getMock())
    } catch { setProjects(getMock()) }
    finally { setLoading(false) }
  }, [category, status, search, page])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  return (
    <>
      <PageHero
        badge="Our Portfolio"
        title="Projects We've **Built**"
        subtitle="Explore our portfolio of residential, commercial, and infrastructure projects across Maharashtra."
        backgroundImage="/images/hero_construction_bg.png"
      />

      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          {/* Sleek Compact Execution Scale Ribbon */}
          <div className="mb-10 rounded-2xl bg-slate-950 border border-slate-800/80 p-4 sm:p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-32 bg-brandRed/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              {/* Left title & badge */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brandRed/15 border border-brandRed/30 flex items-center justify-center text-brandRed flex-shrink-0">
                  <Building2 size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandRed animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                      Proven Execution Scale
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-extrabold text-white tracking-tight">
                    100+ Multi-Storey Buildings Executed
                    <span className="text-slate-400 font-normal text-xs sm:text-sm ml-2 hidden sm:inline">
                      (7 to 50 Floors &amp; Luxury Bungalows)
                    </span>
                  </h3>
                </div>
              </div>

              {/* Right 4 Compact Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto">
                {/* Metric 1 */}
                <div className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-center flex flex-col justify-center">
                  <div className="text-base sm:text-lg font-display font-black text-white leading-none">
                    100<span className="text-brandRed text-sm">+</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Buildings Done</div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-center flex flex-col justify-center">
                  <div className="text-base sm:text-lg font-display font-black text-amber-400 leading-none">
                    7 – 15 <span className="text-xs font-mono">Fl</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Mid-Rise Towers</div>
                </div>

                {/* Metric 3 */}
                <div className="bg-brandRed/15 border border-brandRed/40 rounded-xl px-3.5 py-2 text-center flex flex-col justify-center">
                  <div className="text-base sm:text-lg font-display font-black text-white leading-none">
                    Up to 50 <span className="text-brandRed text-xs font-mono">Fl</span>
                  </div>
                  <div className="text-[10px] font-bold text-red-300 mt-1 uppercase tracking-wider">High-Rise Towers</div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-center flex flex-col justify-center">
                  <div className="text-base sm:text-lg font-display font-black text-emerald-400 leading-none">
                    50<span className="text-brandRed text-sm">+</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Luxury Bungalows</div>
                </div>
              </div>

            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            {/* Search */}
            <div className="relative flex-1 group">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brandRed transition-colors" />
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                placeholder="Search projects..."
                className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium text-slate-700 focus:outline-none focus:border-brandRed/50 focus:ring-4 focus:ring-brandRed/5 transition-all shadow-sm"
              />
            </div>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {PROJECT_CATEGORIES.map(c => (
                <button key={c.value} onClick={() => { setCategory(c.value); setPage(1) }}
                  className={cn('px-5 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all',
                    category === c.value ? 'bg-brandRed text-white shadow-[0_8px_20px_-5px_rgba(192,30,46,0.3)]' : 'bg-white border border-slate-200 text-slate-500 hover:border-brandRed/30 hover:text-brandRed shadow-sm')}>
                  {c.label}
                </button>
              ))}
            </div>
            {/* Status filter */}
            <div className="flex flex-wrap gap-2">
              {STATUS_FILTERS.map(s => (
                <button key={s} onClick={() => { setStatus(s); setPage(1) }}
                  className={cn('px-4 py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all',
                    status === s ? 'bg-slate-900 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-900 shadow-sm')}>
                  {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-slate-200">
                    <div className="aspect-[16/10] skeleton" />
                    <div className="p-5 space-y-3"><div className="h-4 skeleton rounded w-3/4" /><div className="h-3 skeleton rounded w-full" /><div className="h-3 skeleton rounded w-2/3" /></div>
                  </div>
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p className="text-lg">No projects found.</p>
              </div>
            ) : (
              <motion.div key={`${category}-${status}-${page}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((p, i) => (
                  <motion.div key={p._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                    <Link href={`/projects/${p.slug}`} className="group block rounded-3xl overflow-hidden border border-slate-200 hover:border-brandRed/30 transition-all duration-500 bg-white hover:shadow-[0_20px_40px_-15px_rgba(192,30,46,0.15)] hover:-translate-y-2 relative">
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-brandRed scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
                      
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        <Image src={p.coverImage || CONSTRUCTION_IMAGES[i % CONSTRUCTION_IMAGES.length]} alt={p.title} fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                        <div className="absolute inset-0 bg-brandRed/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <span className={cn('absolute top-4 right-4 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase border bg-white/90 backdrop-blur shadow-sm text-slate-900 border-slate-200 group-hover:border-brandRed/30 transition-colors')}>
                          {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                        </span>
                      </div>
                      <div className="p-6 lg:p-8">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-bold text-brandRed uppercase tracking-widest">{p.workType}</span>
                          {p.clientName && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white line-clamp-1 max-w-[180px]">
                              {p.clientName}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display font-black text-slate-900 text-xl lg:text-2xl mb-3 group-hover:text-brandRed transition-colors leading-tight line-clamp-2">{p.title}</h3>
                        <p className="text-sm font-medium text-slate-500 mb-6 line-clamp-2 leading-relaxed group-hover:text-slate-600 transition-colors">{p.shortDescription}</p>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                          <span className="flex items-center gap-2 group-hover:text-slate-900 transition-colors"><MapPin size={14} className="text-brandRed" />{p.location}</span>
                          <span className="flex items-center gap-2 group-hover:text-slate-900 transition-colors"><Calendar size={14} className="text-brandRed" />{formatDateShort(p.startDate)}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-16">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={cn('w-12 h-12 rounded-xl text-sm font-bold transition-all shadow-sm', page === i + 1 ? 'bg-brandRed text-white shadow-[0_4px_15px_rgba(192,30,46,0.3)]' : 'bg-white border border-slate-200 text-slate-500 hover:border-brandRed/30 hover:text-brandRed')}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function getMock(): Project[] {
  return Array.from({ length: 6 }, (_, i) => ({
    _id: String(i), title: `Construction Project ${i + 1}`, slug: `project-${i + 1}`,
    shortDescription: 'Professional RCC construction with quality materials and expert workforce.',
    coverImage: CONSTRUCTION_IMAGES[i % CONSTRUCTION_IMAGES.length],
    category: ['residential', 'commercial'][i % 2], status: ['ongoing', 'completed'][i % 2],
    location: 'Virar East', startDate: '2024-01-01', workType: 'RCC Construction',
  }))
}
