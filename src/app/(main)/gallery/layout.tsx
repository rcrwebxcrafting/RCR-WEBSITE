import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery - Construction Site & Work Photos | RCR ENTERPRISES',
  description: 'View real project site photos of RCC construction, slab casting, shuttering, beam-column work, and civil engineering by RCR ENTERPRISES.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Gallery - Construction Site & Work Photos | RCR ENTERPRISES',
    description: 'View real project site photos of RCC construction, slab casting, shuttering, beam-column work by RCR ENTERPRISES.',
    url: '/gallery',
  },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
