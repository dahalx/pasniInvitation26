import React, { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { OrnamentMessage, Language } from '../types';
import { playChime } from '../utils/audio';

interface HangOrnamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newMsg: OrnamentMessage) => void;
  language?: Language;
}

const COLOR_OPTIONS = [
  { value: '#d87ca0', label: 'Orchid Pink' },
  { value: '#d4af37', label: 'Festive Gold' },
  { value: '#701a41', label: 'Deep Wine' },
  { value: '#eab8cd', label: 'Blush Rose' }
];

export const HangOrnamentModal: React.FC<HangOrnamentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  language = 'en'
}) => {
  const [author, setAuthor] = useState('');
  const [note, setNote] = useState('');
  const [selectedColor, setSelectedColor] = useState('#d87ca0');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;
  const isNepali = language === 'ne';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !note.trim()) return;

    setIsSubmitting(true);

    const payload = {
      author: author.trim(),
      note: note.trim(),
      color: selectedColor,
      x: 170,
      y: 150
    };

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('API request failed');

      const data = await res.json();
      const createdMsg: OrnamentMessage = data.message || {
        id: Date.now(),
        ...payload,
        time: 'Just now'
      };

      playChime('hang');
      onSuccess(createdMsg);
      setAuthor('');
      setNote('');
      onClose();
    } catch {
      const localMsg: OrnamentMessage = {
        id: Date.now(),
        ...payload,
        time: 'Just now'
      };
      playChime('hang');
      onSuccess(localMsg);
      setAuthor('');
      setNote('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4f102d]/45 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-[460px] bg-[#fffcf8] rounded-[28px] p-8 md:p-9 border border-[#eab8cd] shadow-[0_24px_60px_rgba(112,26,65,0.24)] animate-modal-slide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="write-blessing-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-2xl text-[#755362] hover:text-[#701a41] transition-colors p-1 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h2
          id="write-blessing-title"
          className="font-serif-cormorant text-2xl md:text-[1.75rem] text-[#701a41] font-semibold text-center mb-1.5 leading-snug"
        >
          {isNepali
            ? 'हाम्री नानी श्रीवाको पास्नीको लागि शुभकामना'
            : "Write Your Wishing for Baby Shriva's Pasni"}
        </h2>
        <p className="text-center text-[#755362] text-xs md:text-sm mb-6">
          {isNepali
            ? 'तपाईंको आशिर्वाद पुस्तिकाको नयाँ पानामा थपिनेछ'
            : "Your blessing will be inscribed on a new page in Shriva's Wishing Album"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-[0.78rem] uppercase tracking-[1.5px] font-semibold text-[#701a41] mb-2">
              {isNepali ? 'तपाईंको नाम / साइनो' : 'Your Name / Relation'}
            </label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Mama Bikash & Maiju"
              className="w-full px-4 py-3 rounded-xl border border-[#eab8cd] bg-[#fdf2f6] text-sm text-[#3b202b] outline-none focus:border-[#701a41] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-[0.78rem] uppercase tracking-[1.5px] font-semibold text-[#701a41] mb-2">
              {isNepali ? 'श्रीवालाई आशिर्वाद (आशिर्वाद)' : 'Your Blessing for Shriva (आशिर्वाद)'}
            </label>
            <textarea
              required
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Subha Pasni Shriva! May you always be blessed with good health, intellect, kindness, and prosperity..."
              className="w-full px-4 py-3 rounded-xl border border-[#eab8cd] bg-[#fdf2f6] text-sm text-[#3b202b] outline-none focus:border-[#701a41] focus:bg-white transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-[0.78rem] uppercase tracking-[1.5px] font-semibold text-[#701a41] mb-2">
              {isNepali ? 'पानाको लाहा छाप रङ रोज्नुहोस्' : 'Choose Page Seal Color'}
            </label>
            <div className="flex items-center gap-3.5 mt-2">
              {COLOR_OPTIONS.map((c) => {
                const isSelected = selectedColor === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setSelectedColor(c.value)}
                    title={c.label}
                    className={`w-9 h-9 rounded-full transition-all duration-200 cursor-pointer shadow-sm relative flex items-center justify-center ${
                      isSelected
                        ? 'ring-3 ring-[#701a41] ring-offset-2 scale-110 shadow-md'
                        : 'hover:scale-105 opacity-85'
                    }`}
                    style={{ backgroundColor: c.value }}
                  >
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-3 bg-gradient-to-r from-[#701a41] to-[#4f102d] text-white py-3.5 px-6 rounded-full font-sans text-xs md:text-sm font-semibold tracking-[1.5px] uppercase hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isNepali ? 'पानामा थप्दै...' : 'Adding to Album...'}
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#f3d06b]" />
                {isNepali ? 'पुस्तिकामा थप्नुहोस्' : 'Add to Wishing Album'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
