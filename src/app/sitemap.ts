import { MetadataRoute } from 'next'
import { SERVICES_LIST, TARGET_LOCATIONS, SITE_URL } from '@/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/clients`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/locations`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/sitemap`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICES_LIST.map(s => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const locationPages: MetadataRoute.Sitemap = TARGET_LOCATIONS.map(loc => ({
    url: `${baseUrl}/locations/${loc.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const locationServicePages: MetadataRoute.Sitemap = []
  TARGET_LOCATIONS.forEach(loc => {
    SERVICES_LIST.forEach(s => {
      locationServicePages.push({
        url: `${baseUrl}/locations/${loc.slug}/${s.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    })
  })

  // Fetch blogs for sitemap directly from DB to avoid build-time fetch errors
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const connectDB = (await import('@/lib/mongodb')).default
    const Blog = (await import('@/models/Blog')).default
    
    await connectDB()
    const blogs = await Blog.find({ isPublished: true }).select('slug updatedAt publishedAt')
    
    blogPages = blogs.map((blog: any) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: new Date(blog.updatedAt || blog.publishedAt || new Date()),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Failed to fetch blogs for sitemap:', error)
  }

  // Fetch projects for sitemap
  let projectPages: MetadataRoute.Sitemap = []
  try {
    const connectDB = (await import('@/lib/mongodb')).default
    const Project = (await import('@/models/Project')).default

    await connectDB()
    const projects = await Project.find({}).select('slug updatedAt createdAt')

    projectPages = projects.map((project: any) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt || project.createdAt || new Date()),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Failed to fetch projects for sitemap:', error)
  }

  return [...staticPages, ...servicePages, ...locationPages, ...locationServicePages, ...blogPages, ...projectPages]
}
