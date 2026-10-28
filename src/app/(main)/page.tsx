import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import ProjectsSection from '@/components/sections/ProjectsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import GalleryPreview from '@/components/sections/GalleryPreview'
import ProcessSection from '@/components/sections/ProcessSection'
import CTASection from '@/components/sections/CTASection'
import ContactSection from '@/components/sections/ContactSection'
import ClientsSection from '@/components/sections/ClientsSection'
import DeveloperPartnerSection from '@/components/sections/DeveloperPartnerSection'

import { SITE_URL } from '@/constants'

export const metadata: Metadata = {
  title: 'Top RCC Work & Civil Construction Contractor in Mumbai & Palghar',
  description: 'Looking for the best RCC work contractor? RCR ENTERPRISES specializes in civil construction, slab casting, and turnkey building projects in Mumbai, Virar & Vasai.',
  alternates: {
    canonical: '/',
  },
}

export const dynamic = 'force-static'

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: 'RCR ENTERPRISES',
    image: `${SITE_URL}/og-image.jpg`,
    description: 'Top-rated RCC Work and Civil Construction Contractor in Mumbai, Virar, and Palghar. Experts in slab casting and turnkey projects.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Virar East',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN'
    },
    telephone: '+919619439243',
    email: 'rcrenterprises786@gmail.com',
    url: SITE_URL,
    priceRange: '₹₹',
    areaServed: [
      'Mumbai', 'Churchgate', 'Marine Lines', 'Charni Road', 'Grant Road', 'Mumbai Central', 'Mahalaxmi', 'Lower Parel', 'Prabhadevi', 'Dadar', 'Mahim', 'Bandra', 'Khar', 'Santacruz', 'Vile Parle', 'Andheri', 'Jogeshwari', 'Goregaon', 'Malad', 'Kandivali', 'Borivali', 'Dahisar', 'Mira Road', 'Bhayandar', 'Naigaon', 'Vasai', 'Nalasopara', 'Virar', 'Palghar', 'Boisar',
      'CSMT', 'Byculla', 'Parel', 'Matunga', 'Sion', 'Kurla', 'Vidyavihar', 'Ghatkopar', 'Vikhroli', 'Kanjurmarg', 'Bhandup', 'Nahur', 'Mulund', 'Thane', 'Kalwa', 'Mumbra', 'Diva', 'Dombivli', 'Thakurli', 'Kalyan', 'Ulhasnagar', 'Ambernath', 'Badlapur', 'Titwala',
      'Wadala', 'Chunabhatti', 'Chembur', 'Govandi', 'Mankhurd', 'Navi Mumbai', 'Vashi', 'Sanpada', 'Juinagar', 'Nerul', 'Seawoods', 'Belapur', 'Kharghar', 'Panvel',
      'South Mumbai', 'Worli', 'Powai'
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ClientsSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUs />
      <ProjectsSection />
      <DeveloperPartnerSection />
      <TestimonialsSection />
      <GalleryPreview />
      <ProcessSection />
      <CTASection />
      <ContactSection />
    </>
  )
}
