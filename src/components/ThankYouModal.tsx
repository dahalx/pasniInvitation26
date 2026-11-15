import React from 'react';
import { X, Calendar, Navigation, CheckCircle2 } from 'lucide-react';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownloadCalendar = () => {
    // Generate valid RFC 5545 iCalendar content for Saturday, January 2, 2027
    // 11:30 AM CST is 17:30 UTC
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Shriva Pasni//Rice Weaning Ceremony//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:shriva-pasni-jan2-2027@fortworth.event',
      'SUMMARY:Shriva\'s Rice Weaning Ceremony (Pasni)',
      'DESCRIPTION:Celebrate baby Shriva\'s traditional Nepali Pasni (Rice Weaning Ceremony) in Fort Worth, Texas! Auspicious feeding of kheer, blessings, and feast.',
      'LOCATION:4820 Heritage Trace Pkwy, Fort Worth, TX 76177',
      'DTSTART:20270102T173000Z',
      'DTEND:20270102T220000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Shriva-Pasni-Ceremony.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#581223]/40 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-[460px] bg-white rounded-[28px] p-8 md:p-9 text-center border border-[#f8ccd5] shadow-[0_24px_60px_rgba(126,29,53,0.22)] animate-modal-slide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="thankyou-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-2xl text-[#7a5c65] hover:text-[#7e1d35] transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="inline-flex items-center gap-1.5 font-sans text-xs tracking-[3px] uppercase text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 mb-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          RSVP Confirmed · धन्यवाद
        </span>

        <h2
          id="thankyou-title"
          className="font-script-pinyon text-5xl md:text-6xl text-[#7e1d35] my-2 drop-shadow-sm"
        >
          Thank You!
        </h2>

        <p className="text-xs md:text-sm text-[#7a5c65] mb-6">
          We can&apos;t wait to celebrate Shriva&apos;s special milestone with you!
        </p>

        {/* Private address card */}
        <div className="bg-[#fdf2f4] rounded-2xl p-5 border border-dashed border-[#e88d9f] mb-6 text-left shadow-inner">
          <h4 className="font-serif-cormorant text-lg text-[#7e1d35] font-semibold mb-1">
            Pasni Ceremony &amp; Feast Location
          </h4>
          <p className="font-semibold text-[#3d272d] text-base">
            4820 Heritage Trace Pkwy
          </p>
          <p className="text-xs md:text-sm text-[#7a5c65]">
            Fort Worth, Texas 76177
          </p>
          <p className="mt-2 text-xs font-semibold text-[#7e1d35]">
            Saturday, January 2, 2027 at 11:30 AM CST (शुभ साइत)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleDownloadCalendar}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#7e1d35] to-[#581223] text-white py-3 px-6 rounded-full font-sans text-xs font-semibold tracking-[1.5px] uppercase hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#fad2db]" />
            Add to My Calendar (.ics)
          </button>

          <a
            href="https://maps.apple.com/?q=Fort+Worth%2C+Texas"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-full text-xs font-medium text-[#7e1d35] bg-[#fdf2f4] border border-[#f8ccd5] hover:bg-white hover:shadow-sm transition-all"
          >
            <Navigation className="w-4 h-4 text-[#c98a7d]" />
            Open Fort Worth in Maps
          </a>
        </div>
      </div>
    </div>
  );
};
