import React from 'react';
import { Sparkles, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { DeitiesCardCrest } from './DeitiesBackdrop';

interface InvitationCardProps {
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  onOpenRsvp: () => void;
  hasRsvpd: boolean;
  onOpenThankYou?: () => void;
  onReWrap?: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  language,
  onChangeLanguage,
  onOpenRsvp,
  hasRsvpd,
  onOpenThankYou,
  onReWrap
}) => {
  const isNepali = language === 'ne';

  return (
    <article
      className="w-full bg-[#fffcf8] rounded-[28px] px-6 py-9 md:px-10 md:py-11 text-center relative border border-[#eab8cd]/80 overflow-hidden transition-all duration-500 animate-fade-in"
      style={{
        boxShadow: '0 24px 60px rgba(112, 26, 65, 0.16)'
      }}
    >
      {/* Subtle Pasni Celebration Dishes Watermark Background */}
      <img
        src="/assets/aistudio/Daughter_s_Pasni_celebration_dishes_175c2188_2K_471c719b.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.15] pointer-events-none select-none z-0"
        style={{ filter: 'saturate(0.88) contrast(0.95)' }}
      />
      {/* Soft Ivory Radial Veil so watermark frames gently and never conflicts with letters */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255, 252, 248, 0.16) 0%, rgba(255, 252, 248, 0.36) 62%, rgba(255, 252, 248, 0.72) 100%)'
        }}
      />

      {/* Subtle Top Nepali Dhaka Accent Ribbon */}
      <div
        className="absolute top-0 left-0 right-0 h-2 z-20"
        style={{
          background:
            'repeating-linear-gradient(135deg, #701a41 0px, #701a41 10px, #d87ca0 10px, #d87ca0 20px, #d4af37 20px, #d4af37 26px)'
        }}
      />

      <div className="relative z-10">
      {/* Top Row: Language Tabs (English | नेपाली) & Re-wrap */}
      <div className="flex items-center justify-between gap-2 mb-6 mt-1">
        {/* Language Toggle Tabs */}
        <div
          className="inline-flex items-center p-1 rounded-full bg-[#fdf2f6] border border-[#eab8cd]/70"
          role="tablist"
          aria-label="Invitation language"
        >
          <button
            role="tab"
            aria-selected={!isNepali}
            onClick={() => onChangeLanguage('en')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              !isNepali
                ? 'bg-[#701a41] text-white shadow-xs'
                : 'text-[#755362] hover:text-[#701a41]'
            }`}
          >
            English
          </button>
          <button
            role="tab"
            aria-selected={isNepali}
            onClick={() => onChangeLanguage('ne')}
            className={`px-3.5 py-1 rounded-full text-xs font-nepali font-semibold transition-all cursor-pointer whitespace-nowrap ${
              isNepali
                ? 'bg-[#701a41] text-white shadow-xs'
                : 'text-[#755362] hover:text-[#701a41]'
            }`}
          >
            नेपाली
          </button>
        </div>

        {onReWrap && (
          <button
            onClick={onReWrap}
            className="text-xs tracking-wider uppercase text-[#755362] hover:text-[#701a41] transition-colors flex items-center gap-1 py-1 px-3 rounded-full hover:bg-[#fdf2f6] cursor-pointer whitespace-nowrap"
            title={isNepali ? 'खाम पुनः बन्द गर्नुहोस्' : 'Re-wrap Dhaka envelope'}
          >
            <span>🎁 {isNepali ? 'खाम बन्द' : 'Re-wrap'}</span>
          </button>
        )}
      </div>

      {/* Lord Ganesha & Goddess Lakshmi Sacred Crest */}
      <DeitiesCardCrest />

      {/* Cultural Ornament Tag */}
      <span className="inline-block font-sans text-xs tracking-[2.5px] uppercase text-[#701a41] bg-[#fdf2f6] px-4 py-1.5 rounded-full border border-[#eab8cd] mb-4">
        {isNepali ? 'शुभ पास्नी निमन्त्रणा · अन्नप्राशन' : 'Rice Weaning Ceremony · शुभ पास्नी'}
      </span>

      {/* Title */}
      {isNepali ? (
        <h1 className="font-nepali text-4xl md:text-[2.8rem] font-bold text-[#701a41] leading-tight mb-1.5 drop-shadow-2xs">
          श्रीवाको शुभ पास्नी
        </h1>
      ) : (
        <h1 className="font-script-pinyon text-5xl md:text-[3.9rem] text-[#701a41] leading-none mb-1 drop-shadow-2xs">
          Shriva&apos;s Pasni
        </h1>
      )}

      {/* Subtitle */}
      <p className="font-serif-cormorant text-xl md:text-[1.75rem] italic text-[#be5a83] mb-4">
        {isNepali ? 'अन्नप्राशन तथा शुभ भात खुवाई समारोह' : 'Rice Weaning Celebration (भात खुवाई)'}
      </p>

      {/* Intro paragraph */}
      {isNepali ? (
        <p className="font-nepali text-[0.95rem] leading-relaxed text-[#5c3d49] max-w-[500px] mx-auto mb-8">
          श्री गणेश र श्री महालक्ष्मीको असीम कृपाले हाम्री प्यारी सुपुत्री{' '}
          <strong className="text-[#701a41] font-bold">श्रीवा (Shriva)</strong> को पावन{' '}
          <strong className="text-[#701a41]">शुभ पास्नी (अन्नप्राशन / भात खुवाई)</strong> समारोहमा
          तपाईंको गरिमामय उपस्थिति तथा स्नेहपूर्ण आशिर्वादका लागि हार्दिक निमन्त्रणा गर्दछौं।
        </p>
      ) : (
        <p className="text-[0.95rem] leading-relaxed text-[#755362] max-w-[490px] mx-auto mb-8">
          With the divine grace of <strong className="text-[#701a41] font-medium">Lord Ganesha &amp; Goddess Lakshmi</strong>, our family warmly invites you to celebrate our sweet daughter{' '}
          <strong className="text-[#701a41] font-semibold">Shriva</strong> tasting her first auspicious grains of rice (<span className="italic">kheer</span>) and receiving your sacred blessings (<span className="italic">आशिर्वाद</span>).
        </p>
      )}

      {/* Coordinates Triad */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 py-6 border-y border-dashed border-[#eab8cd] mb-7">
        <div className="flex flex-col items-center">
          <span className="text-[0.72rem] tracking-[2px] uppercase text-[#701a41] font-semibold mb-1.5 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#d4af37]" />
            {isNepali ? 'मिति र समय' : 'When'}
          </span>
          {isNepali ? (
            <div className="font-nepali text-sm md:text-base font-semibold text-[#3b202b] leading-snug">
              पुष १८, २०८३
              <br />
              <span className="font-normal text-xs md:text-sm text-[#755362]">शनिबार (Jan 2) · ११:३० AM</span>
            </div>
          ) : (
            <div className="font-serif-cormorant text-base md:text-[1.15rem] font-semibold text-[#3b202b] leading-snug">
              Sat, Jan 2
              <br />
              <span className="font-normal text-sm md:text-base">11:30 AM CST</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center border-x border-[#eab8cd]/70 px-1">
          <span className="text-[0.72rem] tracking-[2px] uppercase text-[#701a41] font-semibold mb-1.5 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#d4af37]" />
            {isNepali ? 'स्थान' : 'Where'}
          </span>
          {isNepali ? (
            <div className="font-nepali text-sm md:text-base font-semibold text-[#3b202b] leading-snug">
              फोर्ट वर्थ
              <br />
              <span className="font-normal text-xs md:text-sm text-[#755362]">टेक्सस (Fort Worth, TX)</span>
            </div>
          ) : (
            <div className="font-serif-cormorant text-base md:text-[1.15rem] font-semibold text-[#3b202b] leading-snug">
              Fort Worth
              <br />
              <span className="font-normal text-sm md:text-base">Texas</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[0.72rem] tracking-[2px] uppercase text-[#701a41] font-semibold mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            {isNepali ? 'उपस्थिति' : 'RSVP'}
          </span>
          <div className="font-serif-cormorant text-base md:text-[1.15rem] font-semibold text-[#701a41] leading-snug">
            {hasRsvpd ? (
              <span className="text-emerald-700 flex items-center justify-center gap-1 text-sm md:text-base">
                <CheckCircle className="w-3.5 h-3.5" /> {isNepali ? 'सुनिश्चित' : 'Confirmed'}
              </span>
            ) : isNepali ? (
              <span className="font-nepali text-sm md:text-base">
                अनलाइन जानकारी
                <br />
                <span className="text-xs font-normal text-[#755362]">डिसेम्बर २० भित्र</span>
              </span>
            ) : (
              <>
                Reply Online
                <br />
                <span className="text-xs font-normal text-[#755362]">by Dec 20</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* RSVP Hint */}
      {hasRsvpd ? (
        <div className="bg-[#fdf2f6] rounded-xl p-3 border border-[#eab8cd] max-w-md mx-auto mb-6 text-sm text-[#701a41]">
          <span className="font-medium">📍 {isNepali ? 'पूरा ठेगाना:' : 'Address unlocked:'}</span> 4820 Heritage Trace Pkwy, Fort Worth, TX 76177
        </div>
      ) : (
        <p className="text-xs md:text-sm text-[#755362] mb-6">
          {isNepali
            ? 'RSVP पठाउनुभएपछि समारोहको पूरा ठेगाना यहाँ स्वतः देखिनेछ।'
            : 'The full ceremony hall and residence address is shared once you RSVP.'}
        </p>
      )}

      {/* Primary Action Button */}
      {hasRsvpd ? (
        <button
          onClick={onOpenThankYou}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#701a41] to-[#4f102d] text-white px-9 py-3.5 rounded-full font-sans text-xs md:text-sm font-semibold tracking-[2px] uppercase hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer shadow-md"
        >
          <CheckCircle className="w-4 h-4 text-[#f2d06b]" />
          {isNepali ? 'पुष्टि विवरण हेर्नुहोस्' : 'View Confirmed Ceremony Details'}
        </button>
      ) : (
        <button
          onClick={onOpenRsvp}
          className="inline-block bg-gradient-to-r from-[#701a41] to-[#4f102d] text-white px-9 py-3.5 rounded-full font-sans text-xs md:text-sm font-semibold tracking-[2px] uppercase hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer shadow-md"
        >
          {isNepali ? 'पास्नीको लागि RSVP पठाउनुहोस्' : "RSVP for Shriva's Pasni"}
        </button>
      )}
      </div>
    </article>
  );
};
