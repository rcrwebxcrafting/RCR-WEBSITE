import Image from 'next/image'
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Client from '@/models/Client'
import ClientsSectionHeader from '@/components/sections/ClientsSectionHeader'

const MOCK_CLIENTS = [
  { _id: 'mock1', name: 'Client 1', logo: '/logo_new.png', website: '#' },
  { _id: 'mock2', name: 'Client 2', logo: '/logo_new.png', website: '#' },
  { _id: 'mock3', name: 'Client 3', logo: '/logo_new.png', website: '#' },
]

async function getClients() {
  try {
    await connectDB()
    const clients = await Client.find({ isActive: true }).sort({ order: 1, createdAt: -1 })
    
    // If no clients in DB, fallback to mock
    if (!clients || clients.length === 0) {
      return [...MOCK_CLIENTS, ...MOCK_CLIENTS]
    }
    
    // If there are less than 6 clients, duplicate them to fill the marquee
    let displayClients = JSON.parse(JSON.stringify(clients))
    if (displayClients.length > 0 && displayClients.length < 6) {
      displayClients = [...displayClients, ...displayClients, ...displayClients]
    }
    return displayClients
  } catch (error) {
    // Return mock clients if DB connection fails (e.g., IP not whitelisted)
    console.warn('Database connection failed, falling back to mock clients.')
    return [...MOCK_CLIENTS, ...MOCK_CLIENTS]
  }
}

function getInitials(name: string) {
  const parts = name.replace(/\b(Pvt|Ltd|LLP|Co)\b\.?/gi, '').trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return parts[0].slice(0, 2).toUpperCase()
}

export default async function ClientsSection() {
  const clients = await getClients()

  if (!clients || clients.length === 0) {
    return null
  }

  return (
    <section className="py-8 md:py-10 bg-slate-50 border-y border-slate-200 overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#c01e2e_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />
      
      <div className="container-custom mb-2 text-center relative z-10">
        <ClientsSectionHeader />
      </div>

      <div className="relative w-full flex overflow-hidden z-10 pb-8 pt-4">
        {/* Left/Right fading gradients for smooth entering/exiting */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-slate-50 to-transparent z-10" />

        {/* The scrolling track */}
        <div className="flex animate-marquee min-w-max gap-4 md:gap-6 px-4 md:px-6">
          {/* We render the list twice to create the infinite loop effect seamlessly */}
          {[...clients, ...clients].map((client: any, i: number) => {
            const initials = getInitials(client.name)
            return (
              <div 
                key={`${client._id}-${i}`} 
                className="flex-shrink-0 flex items-center gap-3.5 bg-white rounded-2xl shadow-[0_4px_15px_-5px_rgba(0,0,0,0.06)] border border-slate-200/80 px-6 py-4 group hover:shadow-[0_15px_30px_-10px_rgba(192,30,46,0.2)] hover:border-brandRed transition-all duration-300 hover:-translate-y-1"
              >
                {client.logo ? (
                  <div className="h-10 w-24 flex items-center justify-center flex-shrink-0 p-1">
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="max-h-9 max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-display font-black text-sm flex items-center justify-center flex-shrink-0 group-hover:bg-brandRed transition-colors shadow-sm">
                    {initials}
                  </div>
                )}
                <div className="flex flex-col text-left">
                  <span className="font-display font-bold text-slate-900 text-sm md:text-base group-hover:text-brandRed transition-colors whitespace-nowrap">
                    {client.name}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Corporate Client
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="relative z-10 text-center pb-8 mt-2">
        <Link href="/clients" className="inline-flex items-center gap-2 text-sm font-bold text-brandRed hover:text-navy hover:gap-3 transition-all uppercase tracking-widest border-b-2 border-brandRed/30 hover:border-navy pb-1">
          View All Clients <span className="text-lg">→</span>
        </Link>
      </div>
    </section>
  )
}
