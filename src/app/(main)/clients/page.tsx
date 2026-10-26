import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/shared/PageHero'
import CTASection from '@/components/sections/CTASection'
import connectDB from '@/lib/mongodb'
import Client from '@/models/Client'

export const metadata: Metadata = {
  title: 'Our Trusted Clients - RCR ENTERPRISES',
  description: 'A list of leading companies and clients who trust RCR ENTERPRISES for their RCC and civil construction needs.',
  alternates: {
    canonical: '/clients',
  },
}

function getInitials(name: string) {
  const parts = name.replace(/\b(Pvt|Ltd|LLP|Co)\b\.?/gi, '').trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return parts[0].slice(0, 2).toUpperCase()
}

export default async function ClientsPage() {
  await connectDB()
  const clients = await Client.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean()

  return (
    <>
      <PageHero 
        badge="Our Clients" 
        title="Trusted By **Leading Companies**" 
        subtitle="We have had the privilege of working with some of the best companies and organizations." 
        backgroundImage="/images/commercial_building.png" 
      />
      
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(#c01e2e_2px,transparent_2px)] [background-size:20px_20px] opacity-5 pointer-events-none" />
        
        <div className="container-custom relative z-10">
          {clients.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {clients.map((client: any) => {
                const initials = getInitials(client.name)
                return (
                  <div 
                    key={client._id} 
                    className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col items-center justify-between min-h-[220px] shadow-sm hover:shadow-xl hover:border-brandRed/40 transition-all duration-300 group hover:-translate-y-1.5"
                  >
                    <div className="relative w-full h-24 flex items-center justify-center p-2">
                      {client.logo ? (
                        client.website ? (
                          <a href={client.website} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative flex items-center justify-center" title={client.name}>
                            <img 
                              src={client.logo} 
                              alt={client.name} 
                              className="max-h-20 max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm" 
                            />
                          </a>
                        ) : (
                          <img 
                            src={client.logo} 
                            alt={client.name} 
                            className="max-h-20 max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm" 
                          />
                        )
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white font-display font-black text-xl flex items-center justify-center shadow-md group-hover:from-brandRed group-hover:to-red-700 transition-all duration-300">
                          {initials}
                        </div>
                      )}
                    </div>
                    <div className="text-center w-full mt-4 border-t border-slate-100 pt-3">
                      <h3 className="font-display font-bold text-slate-900 text-sm md:text-base group-hover:text-brandRed transition-colors leading-snug">
                        {client.name}
                      </h3>
                      <span className="inline-block mt-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        Corporate Client
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center text-slate-500 py-12">
              No clients found.
            </div>
          )}
        </div>
      </section>
      
      <CTASection />
    </>
  )
}
