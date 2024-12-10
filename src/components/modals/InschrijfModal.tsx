import React from 'react';
import { Dialog } from '@headlessui/react';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { InschrijfModalProps } from './types';

export const InschrijfModal: React.FC<InschrijfModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-1 xs:p-2 sm:p-4 overflow-hidden z-[100]" onClick={onClose}>
        <Dialog.Panel className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl w-full max-w-[calc(100%-0.5rem)] xs:max-w-[calc(100%-1rem)] sm:max-w-xl relative shadow-2xl overflow-hidden animate-slideIn mx-1 xs:mx-2 sm:mx-auto" onClick={(e) => e.stopPropagation()}>
          <div className="relative">
            <div className="bg-primary p-6 flex items-center justify-between">
              <Dialog.Title className="text-xl font-bold text-white">
                Inschrijving 2025
              </Dialog.Title>
              <button onClick={onClose} className="text-white hover:bg-white/10 p-2 rounded-full transition-colors" aria-label="Sluiten">
                <CloseIcon />
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-center mb-6">
                <InfoIcon className="text-primary" sx={{ fontSize: 64 }} />
              </div>
              <p className="text-gray-600 mb-4 text-center">
                De inschrijvingen voor De Koninklijke Loop 2025 starten vanaf 15 januari 2025.
              </p>
              <p className="text-gray-600 text-center">
                Wil je op de hoogte blijven? Volg ons dan op social media of neem contact met ons op.
              </p>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <Link 
                to="/faq"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span>Contact opnemen</span>
                <ArrowForwardIcon />
              </Link>
            </div>

            <div className="space-y-6">
              <Link 
                to="/wat-is-de-koninklijkeloop"
                className="block p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                <h3 className="text-lg font-semibold mb-2">Wat is De Koninklijke Loop?</h3>
                <p className="text-gray-600">Lees meer over het evenement en onze missie.</p>
              </Link>

              <Link 
                to="/over-ons"
                className="block p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                <h3 className="text-lg font-semibold mb-2">Over Ons</h3>
                <p className="text-gray-600">Leer meer over onze organisatie en team.</p>
              </Link>

              <Link 
                to="/faq"
                className="block p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                <h3 className="text-lg font-semibold mb-2">Contact & FAQ</h3>
                <p className="text-gray-600">Heb je vragen? Bekijk onze FAQ of neem contact op.</p>
              </Link>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}; 