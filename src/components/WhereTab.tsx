import React from 'react';
import { MapPin, Navigation, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface WhereTabProps {
  hasRsvpd: boolean;
  onOpenRsvp: () => void;
  language?: Language;
}

export const WhereTab: React.FC<WhereTabProps> = ({
  hasRsvpd,
  onOpenRsvp,
  language = 'en'
}) => {
  const isNepali = language === 'ne';

  return (
    <div className="w-full bg-[#fffcf8]/95 backdrop-blur-xs rounded-[28px] p-8 md:p-10 text-center border border-[#eab8cd]/70 shadow-[0_16px_40px_rgba(112,26,65,0.10)] animate-fade-in">
      <span className="inline-block font-sans text-xs tracking-[3px] uppercase text-[#701a41] bg-[#fdf2f6] px-4 py-1.5 rounded-full border border-[#eab8cd] mb-3">
        {isNepali ? 'समारोह स्थान · Location' : 'Ceremony Location · स्थान'}
      </span>

      <h2 className="font-serif-cormorant text-3xl md:text-4xl text-[#701a41] font-semibold mt-1">
        {isNepali ? 'फोर्ट वर्थ, टेक्सस' : 'Fort Worth, Texas'}
      </h2>
      <p className="text-[#755362] text-base mb-6">
        {isNepali
          ? 'शुभ पास्नी समारोह स्थल · Fort Worth, TX'
          : 'Celebration Hall & Residence · Fort Worth, TX'}
      </p>

      {/* Map Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 my-6">
        <a
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-medium text-[#701a41] bg-[#fdf2f6] border border-[#eab8cd] hover:bg-white hover:shadow-md transition-all duration-200"
          href="https://www.google.com/maps/search/?api=1&query=Fort+Worth%2C+Texas"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Navigation className="w-4 h-4 text-[#be5a83]" />
          Google Maps
        </a>

        <a
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-medium text-[#701a41] bg-[#fdf2f6] border border-[#eab8cd] hover:bg-white hover:shadow-md transition-all duration-200"
          href="https://maps.apple.com/?q=Fort+Worth%2C+Texas"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPin className="w-4 h-4 text-[#be5a83]" />
          Apple Maps
        </a>
      </div>

      {/* Address State Box */}
      {hasRsvpd ? (
        <div className="bg-[#fdf2f6] rounded-2xl p-5 border border-dashed border-[#d87ca0] max-w-sm mx-auto text-left">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#701a41] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            {isNepali ? 'पूरा ठेगाना खुल्यो' : 'Unlocked Ceremony Address'}
          </div>
          <p className="font-serif-cormorant text-xl font-semibold text-[#3b202b]">
            4820 Heritage Trace Pkwy
          </p>
          <p className="text-sm text-[#755362]">Fort Worth, Texas 76177</p>
          <p className="text-xs text-[#701a41] mt-2 font-medium">
            {isNepali
              ? 'शनिबार, पुष १८, २०८३ (Jan 2, 2027) · बिहान ११:३० बजे (शुभ साइत)'
              : 'Saturday, January 2, 2027 at 11:30 AM CST (शुभ साइत)'}
          </p>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <p className="text-xs md:text-[0.88rem] text-[#755362] mt-3">
            {isNepali
              ? 'तपाईंले RSVP पठाउनुभएपछि समारोहको पूरा ठेगाना यहाँ स्वतः देखिनेछ।'
              : 'The full private ceremony and hall address is automatically unlocked on this page after submitting your RSVP.'}
          </p>
          <button
            onClick={onOpenRsvp}
            className="mt-4 text-xs font-semibold text-[#701a41] underline underline-offset-4 hover:text-[#4f102d] transition-colors cursor-pointer"
          >
            {isNepali ? 'ठेगाना हेर्न अहिले RSVP पठाउनुहोस् →' : 'Click here to submit your RSVP & unlock address →'}
          </button>
        </div>
      )}
    </div>
  );
};
