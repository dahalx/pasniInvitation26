import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { RSVPRecord, RsvpSummaryResponse } from '../types';

interface HostDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  localRsvps: RSVPRecord[];
}

export const HostDashboardModal: React.FC<HostDashboardModalProps> = ({
  isOpen,
  onClose,
  localRsvps
}) => {
  const [summary, setSummary] = useState<{
    totalResponses: number;
    totalAttendingGuests: number;
    attendingCount: number;
    declinedCount: number;
  }>({
    totalResponses: localRsvps.length,
    totalAttendingGuests: localRsvps
      .filter((r) => r.attending === 'yes')
      .reduce((s, r) => s + (r.guests || 1), 0),
    attendingCount: localRsvps.filter((r) => r.attending === 'yes').length,
    declinedCount: localRsvps.filter((r) => r.attending === 'no').length
  });

  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [verifiedPin, setVerifiedPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchSummaryOrFullList = useCallback(
    async (pinToUse?: string) => {
      setIsLoading(true);
      setPinError('');
      try {
        const headers: Record<string, string> = {};
        if (pinToUse) {
          headers['x-host-pin'] = pinToUse;
        }

        const res = await fetch('/api/rsvp', { headers });
        const data = (await res.json()) as RsvpSummaryResponse & { error?: string };

        if (!res.ok) {
          if (pinToUse) {
            setPinError(data.error || 'Incorrect host passcode. Please try again.');
            setIsAuthorized(false);
          }
          return;
        }

        setSummary({
          totalResponses: data.count ?? 0,
          totalAttendingGuests: data.totalAttending ?? 0,
          attendingCount: data.attendingCount ?? 0,
          declinedCount: data.declinedCount ?? 0
        });

        if (data.authorized && Array.isArray(data.rsvps)) {
          setRsvps(data.rsvps);
          setIsAuthorized(true);
          if (pinToUse) setVerifiedPin(pinToUse);
        } else {
          setIsAuthorized(false);
          setRsvps([]);
        }
      } catch {
        // Offline fallback summary only
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (isOpen) {
      fetchSummaryOrFullList(isAuthorized && verifiedPin ? verifiedPin : undefined);
    }
  }, [isOpen, isAuthorized, verifiedPin, fetchSummaryOrFullList]);

  if (!isOpen) return null;

  const handleUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setPinError('Please enter the host passcode.');
      return;
    }
    await fetchSummaryOrFullList(pinInput.trim());
  };

  const handleLock = () => {
    setIsAuthorized(false);
    setVerifiedPin('');
    setPinInput('');
    setRsvps([]);
    setPinError('');
  };

  const exportCSV = () => {
    if (!isAuthorized) return;
    const headers = ['Name', 'Attending', 'Guests', 'Dietary/Wishes', 'Submitted'];
    const rows = rsvps.map((r) => [
      `"${r.name.replace(/"/g, '""')}"`,
      r.attending === 'yes' ? 'Attending' : 'Declined',
      r.guests,
      `"${(r.dietaryNotes || '').replace(/"/g, '""')}"`,
      new Date(r.createdAt).toLocaleDateString()
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Shriva_Pasni_RSVPs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4f102d]/45 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-[620px] bg-[#fffcf8] rounded-[28px] p-6 md:p-8 border border-[#eab8cd] shadow-[0_24px_60px_rgba(112,26,65,0.24)] animate-modal-slide max-h-[88vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="host-modal-title"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#eab8cd]/70">
          <div>
            <h2
              id="host-modal-title"
              className="font-serif-cormorant text-2xl md:text-3xl text-[#701a41] font-semibold"
            >
              {isAuthorized ? 'Host Guest List & RSVPs' : 'Celebration Response Summary'}
            </h2>
            <p className="text-xs text-[#755362]">
              {isAuthorized
                ? 'Unlocked host view for Shriva’s Pasni in Fort Worth, TX'
                : 'Total responses recorded for Shriva’s Pasni'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-[#755362] hover:text-[#701a41] transition-colors p-1 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Summary Metric Cards — Visible to Everyone */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="bg-[#fdf2f6] p-3.5 rounded-2xl border border-[#eab8cd] text-center">
            <span className="text-[0.7rem] uppercase tracking-wider text-[#755362] font-medium block">
              Total Responses
            </span>
            <span className="font-serif-cormorant text-3xl font-bold text-[#701a41] tabular-nums">
              {summary.totalResponses}
            </span>
          </div>

          <div className="bg-emerald-50/75 p-3.5 rounded-2xl border border-emerald-200 text-center">
            <span className="text-[0.7rem] uppercase tracking-wider text-emerald-800 font-medium block">
              Attending Guests
            </span>
            <span className="font-serif-cormorant text-3xl font-bold text-emerald-900 tabular-nums">
              {summary.totalAttendingGuests}
            </span>
          </div>

          <div className="bg-rose-50/75 p-3.5 rounded-2xl border border-rose-200 text-center">
            <span className="text-[0.7rem] uppercase tracking-wider text-rose-800 font-medium block">
              Warm Regrets
            </span>
            <span className="font-serif-cormorant text-3xl font-bold text-rose-900 tabular-nums">
              {summary.declinedCount}
            </span>
          </div>
        </div>

        {/* Either Passcode Prompt OR Full Unlocked Guest List */}
        {!isAuthorized ? (
          <div className="mt-2 bg-[#fdf2f6] rounded-2xl p-5 md:p-6 border border-dashed border-[#d87ca0] text-center">
            <div className="w-11 h-11 rounded-full bg-white border border-[#eab8cd] flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Lock className="w-5 h-5 text-[#701a41]" />
            </div>
            <h3 className="font-serif-cormorant text-xl font-semibold text-[#701a41] mb-1">
              Host-Only Guest Details
            </h3>
            <p className="text-xs text-[#755362] max-w-sm mx-auto mb-4 leading-relaxed">
              Guest names, headcounts, and personal dietary notes are private to the host family. Enter the host passcode to unlock the full RSVP list.
            </p>

            <form onSubmit={handleUnlockSubmit} className="max-w-xs mx-auto space-y-3">
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#be5a83] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  inputMode="numeric"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError('');
                  }}
                  placeholder="Enter host passcode"
                  aria-label="Host passcode"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#eab8cd] bg-white text-sm text-[#3b202b] outline-none focus:border-[#701a41] tracking-widest"
                />
              </div>

              {pinError && (
                <p className="text-xs text-rose-700 font-medium bg-rose-50 py-1.5 px-3 rounded-lg border border-rose-200">
                  {pinError}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#701a41] to-[#4f102d] text-white py-2.5 px-5 rounded-full text-xs font-semibold tracking-[1.5px] uppercase hover:shadow-md transition-all cursor-pointer disabled:opacity-60"
              >
                <Unlock className="w-3.5 h-3.5 text-[#f2d06b]" />
                {isLoading ? 'Verifying...' : 'Unlock Full Guest List'}
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Host Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs my-2">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                  <ShieldCheck className="w-4 h-4" /> Host Verified
                </span>
                <button
                  onClick={() => fetchSummaryOrFullList(verifiedPin)}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 text-[#701a41] hover:text-[#4f102d] font-medium transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fdf2f6] hover:bg-[#f7dce8] rounded-lg text-[#701a41] border border-[#eab8cd] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </button>
                <button
                  onClick={handleLock}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#fdf2f6] rounded-lg text-[#755362] border border-[#eab8cd] transition-colors cursor-pointer"
                  title="Lock host view"
                >
                  <Lock className="w-3 h-3" />
                  Lock
                </button>
              </div>
            </div>

            {/* Scrollable guest list */}
            <div className="overflow-y-auto flex-1 pr-1 space-y-2 mt-2">
              {rsvps.length === 0 ? (
                <p className="text-center text-xs text-[#755362] py-8">
                  No RSVPs recorded yet.
                </p>
              ) : (
                rsvps.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-[#eab8cd]/70 bg-[#fbf4ed]/70 flex items-start justify-between gap-3 text-left"
                  >
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-serif-cormorant font-semibold text-base text-[#3b202b]">
                          {item.name}
                        </span>
                        {item.attending === 'yes' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.68rem] bg-emerald-100 text-emerald-800 font-medium">
                            <CheckCircle className="w-3 h-3" /> Attending ({item.guests})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.68rem] bg-rose-100 text-rose-800 font-medium">
                            <XCircle className="w-3 h-3" /> Declined
                          </span>
                        )}
                      </div>
                      {item.dietaryNotes && (
                        <p className="text-xs text-[#755362] mt-1 italic">
                          &ldquo;{item.dietaryNotes}&rdquo;
                        </p>
                      )}
                    </div>
                    <span className="text-[0.68rem] text-[#755362] whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
