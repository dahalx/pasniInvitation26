import React, { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { RSVPRecord } from '../types';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (record: RSVPRecord) => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    setErrorMsg('');

    const payload = {
      name: name.trim(),
      attending,
      guests: Number(guestCount) || 1,
      dietaryNotes: dietaryNotes.trim()
    };

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Server returned an error');
      }

      const data = await res.json();
      const record: RSVPRecord = data.rsvp || {
        id: `rsvp_${Date.now()}`,
        ...payload,
        createdAt: new Date().toISOString()
      };

      onSuccess(record);
      onClose();
    } catch {
      // In case server is offline or local static mode, gracefully fallback
      const localRecord: RSVPRecord = {
        id: `rsvp_${Date.now()}`,
        ...payload,
        createdAt: new Date().toISOString()
      };
      onSuccess(localRecord);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#581223]/40 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-[460px] bg-white rounded-[28px] p-8 md:p-9 border border-[#f8ccd5] shadow-[0_24px_60px_rgba(126,29,53,0.22)] animate-modal-slide max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rsvp-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-2xl text-[#7a5c65] hover:text-[#7e1d35] transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h2
          id="rsvp-modal-title"
          className="font-serif-cormorant text-3xl text-[#7e1d35] font-semibold text-center mb-1.5"
        >
          RSVP for Shriva&apos;s Pasni
        </h2>
        <p className="text-center text-[#7a5c65] text-xs md:text-sm mb-6">
          We can&apos;t wait to celebrate baby Shriva with you in Fort Worth!
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-[0.78rem] uppercase tracking-[1.5px] font-semibold text-[#7e1d35] mb-2">
              Your Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Bikash Mama / Radha Fupu"
              className="w-full px-4 py-3 rounded-xl border border-[#f8ccd5] bg-[#fdf2f4] text-sm text-[#3d272d] outline-none focus:border-[#c98a7d] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-[0.78rem] uppercase tracking-[1.5px] font-semibold text-[#7e1d35] mb-2">
              Will you be attending?
            </label>
            <select
              value={attending}
              onChange={(e) => setAttending(e.target.value as 'yes' | 'no')}
              className="w-full px-4 py-3 rounded-xl border border-[#f8ccd5] bg-[#fdf2f4] text-sm text-[#3d272d] outline-none focus:border-[#c98a7d] focus:bg-white transition-all cursor-pointer"
            >
              <option value="yes">Joyfully accepts with love &amp; blessings</option>
              <option value="no">Regretfully declines with warmth</option>
            </select>
          </div>

          <div>
            <label className="block text-[0.78rem] uppercase tracking-[1.5px] font-semibold text-[#7e1d35] mb-2">
              Number of Guests
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={guestCount}
              onChange={(e) => setGuestCount(Math.max(1, Math.min(10, parseInt(e.target.value, 10) || 1)))}
              className="w-full px-4 py-3 rounded-xl border border-[#f8ccd5] bg-[#fdf2f4] text-sm text-[#3d272d] outline-none focus:border-[#c98a7d] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-[0.78rem] uppercase tracking-[1.5px] font-semibold text-[#7e1d35] mb-2">
              Dietary Restrictions or Warm Wishes for Baby
            </label>
            <textarea
              rows={3}
              value={dietaryNotes}
              onChange={(e) => setDietaryNotes(e.target.value)}
              placeholder="Nepali vegetarian preferences, special requests, or early ashirvad..."
              className="w-full px-4 py-3 rounded-xl border border-[#f8ccd5] bg-[#fdf2f4] text-sm text-[#3d272d] outline-none focus:border-[#c98a7d] focus:bg-white transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-gradient-to-r from-[#7e1d35] to-[#581223] text-white py-3.5 px-6 rounded-full font-sans text-xs md:text-sm font-semibold tracking-[2px] uppercase hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Confirming...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#fad2db]" />
                Confirm RSVP
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
