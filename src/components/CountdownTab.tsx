import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface CountdownTabProps {
  language?: Language;
}

export const CountdownTab: React.FC<CountdownTabProps> = ({ language = 'en' }) => {
  // Target: Saturday, January 2, 2027 at 11:30 AM CST (Fort Worth, Texas)
  const targetDate = new Date('2027-01-02T11:30:00-06:00').getTime();
  const isNepali = language === 'ne';

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    function calc() {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    }

    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="w-full bg-[#fffcf8]/95 backdrop-blur-xs rounded-[28px] p-8 md:p-10 text-center border border-[#eab8cd]/70 shadow-[0_16px_40px_rgba(112,26,65,0.10)] animate-fade-in">
      <span className="inline-block font-sans text-xs tracking-[3px] uppercase text-[#701a41] bg-[#fdf2f6] px-4 py-1.5 rounded-full border border-[#eab8cd] mb-4">
        {isNepali ? 'शुभ घडी · पास्नी साइत' : 'शुभ पास्नी · Auspicious Milestone'}
      </span>

      <h3 className="font-serif-cormorant text-2xl md:text-[1.85rem] text-[#701a41] font-semibold mb-6">
        {isNepali ? 'श्रीवाको शुभ पास्नीको काउन्टडाउन' : "Countdown to Shriva's Rice Weaning Ceremony"}
      </h3>

      {/* Countdown Glowing Circle */}
      <div
        className="w-[155px] h-[155px] rounded-full mx-auto my-5 flex flex-col items-center justify-center border-4 border-[#fffcf8] transition-transform hover:scale-105 duration-300"
        style={{
          background: 'radial-gradient(circle, #fff8f2 0%, #f7dce8 65%, #e7a8c0 100%)',
          boxShadow: '0 10px 28px rgba(216, 124, 160, 0.45)'
        }}
      >
        <div className="font-serif-cormorant text-5xl font-bold text-[#701a41] leading-none tabular-nums">
          {timeLeft.days}
        </div>
        <div className="text-[0.78rem] tracking-[1.5px] uppercase text-[#755362] font-medium mt-1">
          {isNepali ? 'दिन बाँकी' : 'days to go'}
        </div>
      </div>

      <p className="text-sm md:text-[0.98rem] text-[#755362] tracking-wide mt-4 font-mono tabular-nums">
        <span className="font-semibold text-[#701a41]">{String(timeLeft.hours).padStart(2, '0')}</span> {isNepali ? 'घण्टा' : 'hrs'} ·{' '}
        <span className="font-semibold text-[#701a41]">{String(timeLeft.minutes).padStart(2, '0')}</span> {isNepali ? 'मिनेट' : 'min'} ·{' '}
        <span className="font-semibold text-[#701a41]">{String(timeLeft.seconds).padStart(2, '0')}</span> {isNepali ? 'सेकेन्ड' : 'sec'}
      </p>

      <p className="text-xs text-[#755362] mt-6 italic">
        {isNepali
          ? 'शनिबार, पुष १८, २०८३ (Jan 2, 2027) · बिहान ११:३० बजे · फोर्ट वर्थ, टेक्सस'
          : 'Saturday, January 2, 2027 (पुष १८, २०८३) · 11:30 AM CST · Fort Worth, Texas'}
      </p>
    </div>
  );
};
