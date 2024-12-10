import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '@/services/supabaseClient'
import { PartnerModal } from '../modals/PartnerModal' // Zorg dat het pad klopt
import type { Partner } from './types' // Zorg dat dit type klopt met jouw definitie

const PartnerCarrousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [partners, setPartners] = useState<Partner[]>([])
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    const fetchPartners = async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')

      console.log('Fetched partners:', data)

      if (error) {
        console.error('Error fetching partners:', error)
      } else {
        setPartners(data || [])
      }
    }
    fetchPartners()
  }, [])

  useEffect(() => {
    if (!isSmallScreen || !scrollRef.current) return

    const scrollContainer = scrollRef.current
    let scrollInterval: ReturnType<typeof setInterval>

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0
        } else {
          scrollContainer.scrollLeft += 1
        }
      }, 30)
    }

    startAutoScroll()

    const stopScroll = () => clearInterval(scrollInterval)
    const resumeScroll = () => {
      stopScroll()
      startAutoScroll()
    }

    scrollContainer.addEventListener('mouseenter', stopScroll)
    scrollContainer.addEventListener('mouseleave', resumeScroll)
    scrollContainer.addEventListener('touchstart', stopScroll)
    scrollContainer.addEventListener('touchend', resumeScroll)

    return () => {
      clearInterval(scrollInterval)
      scrollContainer.removeEventListener('mouseenter', stopScroll)
      scrollContainer.removeEventListener('mouseleave', resumeScroll)
      scrollContainer.removeEventListener('touchstart', stopScroll)
      scrollContainer.removeEventListener('touchend', resumeScroll)
    }
  }, [isSmallScreen, partners])

  const displayPartners = isSmallScreen ? [...partners, ...partners] : partners

  const openModal = (partner: Partner) => {
    setSelectedPartner(partner)
  }

  const closeModal = () => {
    setSelectedPartner(null)
  }

  return (
    <div
      className="w-full px-2 xs:px-4 sm:px-5 py-4 bg-white mt-16"
      aria-label="Partners Overview"
    >
      <div
        ref={scrollRef}
        className="flex items-center gap-4 xs:gap-6 sm:gap-8 mx-auto max-w-6xl overflow-x-auto scrollbar-hide scroll-smooth"
        style={{
          justifyContent: isSmallScreen ? 'flex-start' : 'center',
        }}
      >
        {displayPartners.map((partner, index) => (
          <button
            key={`${partner.id}-${index}`}
            onClick={() => openModal(partner)}
            className="flex-none w-24 xs:w-32 sm:w-36 md:w-40 bg-transparent border-none p-1 xs:p-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
            aria-label={`Bekijk informatie over ${partner.name}`}
          >
            <img
              src={partner.logo}
              alt={`${partner.name} Logo`}
              loading="lazy"
              className="w-full h-auto transition-transform duration-300"
              width="160"
              height="80"
            />
          </button>
        ))}
      </div>

      {/* Modal Weergave */}
      {selectedPartner && (
        <PartnerModal
          isOpen={!!selectedPartner}
          onClose={closeModal}
          partner={selectedPartner}
        />
      )}
    </div>
  )
}

export default PartnerCarrousel
