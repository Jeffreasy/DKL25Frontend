import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import HeroSection from './components/hero'
import { 
  InschrijfModal,
  DonatieModal,
  ContactModal,
  PrivacyModal 
} from './components/modals'
import PartnerCarrousel from './components/partners'
import TitleSection from './components/title'
import CTACards from './components/cards/CTACards'
import { VideoGallery } from './components/video'
import { PhotoGallery } from './components/gallery'
import { DKLSocials } from './components/socials'
import { DKLSponsors } from './components/sponsors'
import { Footer } from './components/footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WatIsDeKoninklijkeLoop, OverOns, FAQPage, InschrijfPage } from './pages';
import { AdminProvider } from './contexts/AdminContext';
import { AdminRoutes } from './routes/AdminRoutes';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import TestSupabase from './pages/TestSupabase'

export const App: React.FC = () => {
  const [isInschrijfModalOpen, setIsInschrijfModalOpen] = useState(false)
  const [isDonatieModalOpen, setIsDonatieModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)

  const openInschrijfModal = () => setIsInschrijfModalOpen(true)
  const closeInschrijfModal = () => setIsInschrijfModalOpen(false)

  const openDonatieModal = () => setIsDonatieModalOpen(true)
  const closeDonatieModal = () => setIsDonatieModalOpen(false)

  const openContactModal = () => setIsContactModalOpen(true)
  const closeContactModal = () => setIsContactModalOpen(false)

  return (
    <ErrorBoundary onError={(error, errorInfo) => {
      // Log naar error tracking service
      console.error('Application Error:', error, errorInfo);
    }}>
      <Router>
        <AdminProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar onInschrijfClick={openInschrijfModal} />
            <Routes>
              <Route path="/" element={
                <main className="flex-grow">
                  <div className="bg-white">
                    <PartnerCarrousel />
                  </div>
                  <HeroSection 
                    onInschrijfClick={openInschrijfModal}
                    onDonatieClick={openDonatieModal}
                  />
                  <TitleSection />
                  <CTACards
                    onInschrijfClick={openInschrijfModal}
                    onDonatieClick={openDonatieModal}
                  />
                  <VideoGallery />
                  <PhotoGallery />
                  <DKLSocials />
                  <DKLSponsors />
                </main>
              } />
              <Route path="/wat-is-de-koninklijkeloop" element={<WatIsDeKoninklijkeLoop />} />
              <Route path="/over-ons" element={<OverOns />} />
              <Route path="/faq" element={
                <FAQPage 
                  onContactClick={openContactModal}
                />
              } />
              <Route path="/inschrijven" element={<InschrijfPage />} />
              <Route path="/test-supabase" element={<TestSupabase />} />
              
              {/* Admin routes */}
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
            <Footer onInschrijfClick={openInschrijfModal} />
            <InschrijfModal 
              isOpen={isInschrijfModalOpen} 
              onClose={closeInschrijfModal} 
            />
            <DonatieModal 
              isOpen={isDonatieModalOpen} 
              onClose={closeDonatieModal} 
            />
            <ContactModal
              isOpen={isContactModalOpen}
              onClose={closeContactModal}
              onPrivacyClick={() => setIsPrivacyModalOpen(true)}
            />
            <PrivacyModal
              isOpen={isPrivacyModalOpen}
              onClose={() => setIsPrivacyModalOpen(false)}
            />
          </div>
        </AdminProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App
