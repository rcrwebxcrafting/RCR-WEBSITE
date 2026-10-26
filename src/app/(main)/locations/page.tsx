import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Building2 } from 'lucide-react'
import { TARGET_LOCATIONS } from '@/constants'
import PageHero from '@/components/shared/PageHero'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'RCC Work Contractors in Mumbai (All Locations) & Pune | RCR Enterprises',
  description: 'RCR Enterprises provides top-quality RCC Work and Civil Construction services across Mumbai (all locations), Pune, Navi Mumbai, Thane, Vasai-Virar, and Palghar districts.',
  alternates: {
    canonical: '/locations',
  },
}

export default function LocationsPage() {
  // Group locations by region for comprehensive browsability
  const topHubs = ['Mumbai', 'Pune', 'Thane', 'Navi Mumbai', 'Virar', 'Palghar']
  
  const puneRegion = [
    'Pune', 'PCMC (Pimpri-Chinchwad)', 'Hinjawadi', 'Wakad', 'Baner', 'Balewadi', 'Aundh', 'Pashan', 'Bavdhan',
    'Kothrud', 'Karve Nagar', 'Warje', 'Sinhagad Road', 'Dhayari', 'Narhe', 'Ambegaon', 'Katraj', 'Bibwewadi',
    'Sahakar Nagar', 'Swargate', 'Deccan Gymkhana', 'Shivajinagar', 'Camp (Pune Cantonment)', 'Koregaon Park',
    'Kalyani Nagar', 'Viman Nagar', 'Kharadi', 'Wagholi', 'Magarpatta City', 'Hadapsar', 'Fursungi', 'Handewadi',
    'Kondhwa', 'Undri', 'Pisoli', 'Wanowrie', 'Fatima Nagar', 'Yerawada', 'Vishrantwadi', 'Dhanori', 'Lohegaon',
    'Tingre Nagar', 'Alandi Road', 'Nagar Road', 'Mahalunge', 'Sus', 'Punawale', 'Ravet', 'Tathawade', 'Thergaon',
    'Kalewadi', 'Pimple Saudagar', 'Pimple Nilakh', 'Pimple Gurav', 'Rahatani', 'Pimpri', 'Chinchwad', 'Akurdi',
    'Nigdi', 'Pradhikaran', 'Bhosari (MIDC)', 'Moshi', 'Chakan (Industrial Hub)', 'Talawade (IT Park)', 'Dighi',
    'Charholi', 'Markal', 'Talegaon Dabhade', 'Somatane', 'Shirwal', 'Ranjangaon (MIDC)'
  ]

  const southMumbai = [
    'Nariman Point', 'Colaba', 'Cuffe Parade', 'Fort', 'Marine Drive', 'Churchgate', 'Marine Lines',
    'Charni Road', 'Grant Road', 'Mumbai Central', 'Malabar Hill', 'Breach Candy', 'Tardeo', 'Mahalaxmi',
    'Lower Parel', 'Worli', 'Prabhadevi', 'Byculla', 'Lalbaug', 'Parel', 'Sewri', 'Wadala', 'Dadar',
    'Matunga', 'Sion', 'Dharavi'
  ]

  const westernSuburbs = [
    'BKC (Bandra Kurla Complex)', 'Bandra', 'Bandra West', 'Bandra East', 'Khar Road', 'Santacruz', 'Kalina',
    'Vakola', 'Vile Parle', 'Juhu', 'Andheri', 'Andheri East', 'Andheri West', 'Chakala', 'Marol', 'Sakinaka',
    'Lokhandwala', 'Versova', 'Oshiwara', 'Jogeshwari', 'Ram Mandir', 'Goregaon', 'Dindoshi', 'Malad',
    'Malad East', 'Malad West', 'Mindspace', 'Kandivali', 'Kandivali East', 'Kandivali West', 'Thakur Village',
    'Charkop', 'Borivali', 'Borivali East', 'Borivali West', 'IC Colony', 'Gorai', 'Dahisar', 'Mira Road',
    'Bhayandar', 'Naigaon', 'Vasai Road', 'Nalasopara', 'Virar', 'Vaitarna', 'Saphale', 'Kelve Road',
    'Palghar', 'Umroli', 'Boisar', 'Vangaon', 'Dahanu Road'
  ]

  const centralSuburbs = [
    'CSMT', 'Masjid', 'Sandhurst Road', 'Chinchpokli', 'Currey Road', 'Kurla', 'Vidyavihar', 'Ghatkopar',
    'Powai', 'Chandivali', 'Vikhroli', 'Kanjurmarg', 'Bhandup', 'Nahur', 'Mulund', 'Thane', 'Ghodbunder Road',
    'Majiwada', 'Vartak Nagar', 'Pokhran Road', 'Hiranandani Estate', 'Kasarvadavali', 'Wagle Estate', 'Kalwa',
    'Mumbra', 'Diva', 'Kopar', 'Dombivli', 'Thakurli', 'Kalyan', 'Bhiwandi', 'Vithalwadi', 'Ulhasnagar',
    'Ambernath', 'Badlapur', 'Vangani', 'Shelu', 'Neral', 'Bhivpuri Road', 'Karjat', 'Palasdari', 'Kelavli',
    'Dolavli', 'Lowjee', 'Khopoli', 'Shahad', 'Ambivli', 'Titwala', 'Khadavli', 'Vasind', 'Asangaon',
    'Atgaon', 'Thansit', 'Khardi', 'Umbermali', 'Kasara'
  ]

  const harbourAndNaviMumbai = [
    'Navi Mumbai', 'Dockyard Road', 'Reay Road', 'Cotton Green', 'GTB Nagar', 'Chunabhatti', 'Tilak Nagar',
    'Chembur', 'Govandi', 'Mankhurd', 'Vashi', 'Sanpada', 'Juinagar', 'Nerul', 'Seawoods-Darave',
    'CBD Belapur', 'Kharghar', 'Kamothe', 'Mansarovar', 'Khandeshwar', 'Panvel', 'New Panvel', 'Taloja',
    'Digha Gaon', 'Airoli', 'Rabale', 'Ghansoli', 'Kopar Khairane', 'Turbhe', 'Mahape', 'Sagar Sangam',
    'Targhar', 'Ulwe', 'Bamandongri', 'Kharkopar', 'Gavhan', 'Ranjanpada', 'Nhava Sheva', 'Dronagiri', 'Uran'
  ]

  const getLocationsByNames = (names: string[]) => {
    return TARGET_LOCATIONS.filter(loc => names.includes(loc.name))
  }

  const regions = [
    { title: 'Top Priority Hubs: Mumbai & Pune', locations: getLocationsByNames(topHubs) },
    { title: 'Pune & PCMC Metropolitan Region', locations: getLocationsByNames(puneRegion) },
    { title: 'South Mumbai & Business Districts', locations: getLocationsByNames(southMumbai) },
    { title: 'Western Suburbs & Palghar District', locations: getLocationsByNames(westernSuburbs) },
    { title: 'Central Suburbs & Thane District', locations: getLocationsByNames(centralSuburbs) },
    { title: 'Harbour Line, Navi Mumbai & Industrial Nodes', locations: getLocationsByNames(harbourAndNaviMumbai) },
  ]

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        badge="Service Areas"
        title="Building Strong Foundations Across **Mumbai & Pune**"
        subtitle="From Mumbai (All Locations & Suburbs) to Pune, Thane, Navi Mumbai, and Palghar, our expert civil and RCC contractors are available across all regions for turnkey construction."
        backgroundImage="/images/hero_construction_bg.png"
      />

      <section className="py-24 relative overflow-hidden bg-white">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(#c01e2e_2px,transparent_2px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />
        <div className="absolute -left-64 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brandRed/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container-custom max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {regions.map((region) => (
              <div 
                key={region.title} 
                className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(192,30,46,0.15)] border border-slate-100 hover:border-brandRed/30 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Hover Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-brandRed scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-8 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-brandRed group-hover:bg-brandRed group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm border border-brandRed/10">
                    <Building2 size={28} className="group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <span className="group-hover:text-brandRed transition-colors duration-500 tracking-tight">{region.title}</span>
                </h2>
                
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
                  {region.locations.map(loc => (
                    <li key={loc.slug}>
                      <Link href={`/locations/${loc.slug}`} className="group/link flex items-center gap-3 text-sm md:text-base font-semibold text-slate-600 hover:text-brandRed transition-colors">
                        <span className="w-2 h-2 rounded-full bg-slate-200 group-hover/link:bg-brandRed group-hover/link:scale-[1.7] transition-all duration-300" />
                        {loc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
