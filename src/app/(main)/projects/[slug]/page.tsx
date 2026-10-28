import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CONSTRUCTION_IMAGES } from '@/utils'
import ProjectDetailClient from './ProjectDetailClient'

import connectDB from '@/lib/mongodb'
import Project from '@/models/Project'

interface Props { params: Promise<{ slug: string }> }

async function getProject(slug: string) {
  try {
    await connectDB()
    const project = await Project.findOne({ slug, isActive: true }).lean()
    if (project) {
      return JSON.parse(JSON.stringify(project))
    }
  } catch (err) {
    console.error('Failed to get project:', err)
  }
  return null
}
export const dynamic = 'force-static'
export const dynamicParams = true
export async function generateStaticParams() {
  try {
    await connectDB()
    const projects = await Project.find({ isActive: true }).select('slug').lean()
    return projects.map((p: any) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} | RCR ENTERPRISES`,
    description: project.shortDescription,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} | RCR ENTERPRISES`,
      description: project.shortDescription,
      url: `/projects/${slug}`,
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug)

  // Fallback mock for dev/preview
  const p = project || {
    title: 'Residential Building Project', slug,
    shortDescription: 'Complete RCC construction of a modern residential building.',
    description: 'This project involved complete RCC structural work including column casting, slab work, beam construction, and shuttering for a multi-storey residential building in Virar East. Our team completed the work within the agreed timeline using high-quality materials, ensuring absolute structural integrity and premium finish.',
    images: CONSTRUCTION_IMAGES.slice(0, 5),
    coverImage: CONSTRUCTION_IMAGES[0],
    workType: 'RCC Construction', category: 'residential', status: 'completed',
    location: 'Virar East, Maharashtra', startDate: '2024-01-01', endDate: '2024-06-01',
    budget: '₹25 Lakhs', materials: ['M25 Grade Concrete', 'TMT Steel Bars', 'Quality Shuttering', 'Waterproofing'],
    clientName: 'Private Client',
  }

  const images = p.images?.length ? p.images : CONSTRUCTION_IMAGES.slice(0, 4)

  return <ProjectDetailClient project={p} images={images} />
}
