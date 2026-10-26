import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppWidget from '@/components/shared/WhatsAppWidget'
import LanguagePopup from '@/components/shared/LanguagePopup'
import LeadPopupModal from '@/components/shared/LeadPopupModal'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-950">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppWidget />
      <LanguagePopup />
      <LeadPopupModal />
    </div>
  )
}
