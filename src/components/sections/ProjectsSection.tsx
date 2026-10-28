'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, ArrowRight, Building2, Layers, TrendingUp, Home } from 'lucide-react'
import { cn, formatDateShort, getStatusColor, CONSTRUCTION_IMAGES } from '@/utils'
import { useTranslation } from '@/hooks/useTranslation'

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

const FILTERS = ['all', 'ongoing', 'completed']

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const params = filter !== 'all' ? `?status=${filter}&limit=6` : '?limit=6'
        const res = await fetch(`/api/projects${params}`)
        const data = await res.json()
        if (data.success && data.data && data.data.length > 0) {
          setProjects(data.data)
        } else {
          setProjects(getMockProjects())
        }
      } catch {
        setProjects(getMockProjects())
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [filter])

  const FILTER_LABELS: Record<string, string> = {
    'all': t('projects.allProjects'),
    'ongoing': t('projects.ongoing'),
    'completed': t('projects.completed'),
  }

  return (
    <section className="pt-6 lg:pt-10 pb-12 lg:pb-16 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-badge mb-4"
            >
              {t('projects.badge')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title"
            >
              {t('projects.titleLine1')} <span className="text-gradient">{t('projects.titleHighlight')}</span>
            </motion.h2>
          </div>
          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setLoading(true) }}
                className={cn(
                  'px-4 py-2 rounded-full text-xs font-semibold font-mono tracking-wider uppercase transition-all duration-300',
                  filter === f
                    ? 'bg-brandRed text-white shadow-[0_4px_15px_rgba(192,30,46,0.3)]'
                    : 'border border-slate-200 text-slate-600 hover:border-brandRed/40 hover:text-brandRed'
                )}
              >
                {FILTER_LABELS[f] || f}
              </button>
            ))}
          </div>
        </div>

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

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ProjectSkeleton key={i} />)
            : projects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          }
        </div>

        <div className="text-center mt-12">
          <Link href="/projects" className="btn-outline inline-flex">
            {t('projects.viewAll')} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block rounded-2xl overflow-hidden border border-slate-200 hover:border-brandRed/50 transition-all duration-400 bg-white shadow-sm hover:shadow-md hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.coverImage || CONSTRUCTION_IMAGES[0]}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
        <span className={cn('absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold border', getStatusColor(project.status))}>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono text-white bg-brandRed/90 border border-brandRed/30">
          {project.category}
        </span>
      </div>
      <div className="p-5">
        {project.clientName && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brandRed" />
            <span>{project.clientName}</span>
          </div>
        )}
        <h3 className="font-display font-bold text-slate-900 text-base mb-2 group-hover:text-brandRed transition-colors line-clamp-1">{project.title}</h3>
        <p className="text-sm font-medium text-slate-700 leading-relaxed mb-4 line-clamp-2">{project.shortDescription}</p>
        <div className="flex items-center justify-between text-xs font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-brandRed/80" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-brandRed/80" />
            <span>{formatDateShort(project.startDate)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ProjectSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200">
      <div className="aspect-[16/10] skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-4 skeleton rounded w-3/4" />
        <div className="h-3 skeleton rounded w-full" />
        <div className="h-3 skeleton rounded w-2/3" />
      </div>
    </div>
  )
}

function getMockProjects(): Project[] {
  return [
    { 
      _id: '1', 
      title: '50-Storey Mega High-Rise Tower - Mumbai', 
      slug: '50-storey-high-rise-tower', 
      shortDescription: 'Heavy-duty RCC column reinforcement, core wall casting, and fast-cycle slab shuttering up to 50 floors.', 
      coverImage: '/images/hero_construction_bg.png', 
      category: 'commercial', 
      status: 'completed', 
      location: 'Mumbai Suburban', 
      startDate: '2023-01-15', 
      workType: '50-Floor High-Rise RCC',
      clientName: 'CIDCO / Shapoorji Sub-Contract'
    },
    { 
      _id: '2', 
      title: '15-Storey Residential Towers - Panvel', 
      slug: '15-storey-residential-towers', 
      shortDescription: 'High-speed structural RCC execution and M30 grade concrete slab casting for multi-wing 15-floor towers.', 
      coverImage: '/images/commercial_building.png', 
      category: 'residential', 
      status: 'completed', 
      location: 'Panvel, Navi Mumbai', 
      startDate: '2023-08-01', 
      workType: '15-Floor Tower Casting',
      clientName: 'Kalpataru Partner'
    },
    { 
      _id: '3', 
      title: 'Luxury Private Bungalow Construction - Palghar', 
      slug: 'luxury-private-bungalow-construction', 
      shortDescription: 'Turnkey architectural bungalow development featuring custom RCC column framing, cantilever slabs, and luxury finishing.', 
      coverImage: '/images/residential_villa.png', 
      category: 'residential', 
      status: 'completed', 
      location: 'Palghar & Virar', 
      startDate: '2024-02-10', 
      workType: 'Turnkey Bungalow Build',
      clientName: 'Private Client'
    },
    { 
      _id: '4', 
      title: 'G+7 Commercial & Residential Hub - Virar East', 
      slug: 'g7-commercial-residential-virar', 
      shortDescription: 'Complete civil engineering, shuttering formwork, and brickwork masonry for G+7 commercial-cum-residential building.', 
      coverImage: '/images/about_1.jpg', 
      category: 'commercial', 
      status: 'completed', 
      location: 'Virar East', 
      startDate: '2024-01-01', 
      workType: 'G+7 Storey RCC Work',
      clientName: 'Local Developer'
    },
    { 
      _id: '5', 
      title: 'High-Rise Residential Tower - Thane', 
      slug: 'high-rise-tower-thane', 
      shortDescription: 'Structural framing and heavy shuttering execution for landmark multi-storey tower developments.', 
      coverImage: '/images/rcc_steel_work.png', 
      category: 'residential', 
      status: 'ongoing', 
      location: 'Thane West', 
      startDate: '2024-05-01', 
      workType: 'High-Rise Shuttering',
      clientName: 'Dosti Realty Sub-Contract'
    },
    { 
      _id: '6', 
      title: 'Custom Modern Villa & Bungalow - Vasai', 
      slug: 'custom-modern-villa-vasai', 
      shortDescription: 'Independent duplex bungalow with seismic-resistant RCC foundation, waterproofing, and terrace garden slab.', 
      coverImage: '/images/slab_casting_work.png', 
      category: 'residential', 
      status: 'completed', 
      location: 'Vasai West', 
      startDate: '2023-11-01', 
      workType: 'Villa Construction',
      clientName: 'Private Estate'
    },
  ]
}
