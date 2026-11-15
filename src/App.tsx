import React, { useState, useEffect } from 'react';
import { GoldDustAndFlowers } from './components/GoldDustAndFlowers';
import { DeitiesBackdrop } from './components/DeitiesBackdrop';
import { IntroVideoStage } from './components/IntroVideoStage';
import { EnvelopeStage } from './components/EnvelopeStage';
import { InvitationCard } from './components/InvitationCard';
import { CountdownTab } from './components/CountdownTab';
import { WhereTab } from './components/WhereTab';
import { RegistryTab } from './components/RegistryTab';
import { WishingAlbumTab } from './components/WishingAlbumTab';
import { RSVPModal } from './components/RSVPModal';
import { ThankYouModal } from './components/ThankYouModal';
import { HangOrnamentModal } from './components/HangOrnamentModal';
import { HostDashboardModal } from './components/HostDashboardModal';
import { OrnamentMessage, RSVPRecord, TabKey, Language } from './types';
import { Users, Sparkles, Music, VolumeX, Heart } from 'lucide-react';
import { startBackgroundMusic, stopBackgroundMusic } from './utils/audio';

const INITIAL_MESSAGES: OrnamentMessage[] = [
  { id: 1, author: "Mama & Maiju", note: "Subha Pasni hamro pyari Shriva! May you always be blessed with good health, sweetness, and wisdom.", color: "#d87ca0", x: 180, y: 80, time: "Nov 4" },
  { id: 2, author: "Hajurba & Hajuraama", note: "शुभ पास्नी! May our little princess grow up to be bright, kind, and prosperous. Infinite ashirvad!", color: "#d4af37", x: 140, y: 155, time: "Nov 5" },
  { id: 3, author: "Fupu & Fupaju", note: "Counting down to feed you the first delicious bite of kheer in your silver bowl! Lots of love.", color: "#701a41", x: 220, y: 160, time: "Nov 5" },
  { id: 4, author: "Dahal Family", note: "Heartiest congratulations on Shriva's Rice Weaning Ceremony! So excited to celebrate in Fort Worth.", color: "#eab8cd", x: 125, y: 240, time: "Nov 6" },
  { id: 5, author: "Prashant & Soniya", note: "May your life be as sweet as the kheer today! Happy Pasni, baby Shriva! 💖", color: "#d4af37", x: 235, y: 245, time: "Nov 6" }
];

export default function App() {
  const [showIntroVideo, setShowIntroVideo] = useState(true);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<TabKey>('countdown');
  const [messages, setMessages] = useState<OrnamentMessage[]>(INITIAL_MESSAGES);

  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [isHangModalOpen, setIsHangModalOpen] = useState(false);
  const [isHostDashboardOpen, setIsHostDashboardOpen] = useState(false);
  const [petalsEnabled, setPetalsEnabled] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const [hasRsvpd, setHasRsvpd] = useState(() => {
    try {
      return localStorage.getItem('shriva_has_rsvpd') === 'true';
    } catch {
      return false;
    }
  });

  const [localRsvps, setLocalRsvps] = useState<RSVPRecord[]>([]);

  // Fetch initial messages from backend endpoint
  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch('/api/messages');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setMessages(data);
          }
        }
      } catch (err) {
        console.warn('Using client initial messages:', err);
      }
    }
    fetchMessages();
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      stopBackgroundMusic();
      setIsMusicPlaying(false);
    } else {
      void startBackgroundMusic().then(setIsMusicPlaying);
    }
  };

  const handleStartMusic = () => {
    if (!isMusicPlaying) {
      void startBackgroundMusic().then(setIsMusicPlaying);
    }
  };

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
  };

  const handleRsvpSuccess = (record: RSVPRecord) => {
    setHasRsvpd(true);
    setLocalRsvps((prev) => [record, ...prev]);
    try {
      localStorage.setItem('shriva_has_rsvpd', 'true');
    } catch {
      // ignore
    }
    setIsThankYouOpen(true);
  };

  const handleHangSuccess = (newMsg: OrnamentMessage) => {
    setMessages((prev) => [...prev, newMsg]);
    setActiveTab('tree');
  };

  const isNepali = language === 'ne';

  return (
    <div className="relative min-h-screen text-[#3b202b] selection:bg-[#eab8cd] selection:text-[#701a41]">
      {/* Lord Ganesha & Goddess Lakshmi Sacred Lotus Backdrop */}
      <DeitiesBackdrop />

      {/* Falling Gold Dust & Flower Petals Backdrop */}
      <GoldDustAndFlowers enabled={petalsEnabled} />

      {/* Top Header Bar */}
      <header className="relative z-20 w-full max-w-[700px] mx-auto px-4 sm:px-6 pt-5 pb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-script-pinyon text-2xl sm:text-3xl text-[#701a41] whitespace-nowrap">
            Shriva&apos;s Pasni
          </span>
          <span className="hidden sm:inline-block text-[0.66rem] tracking-[1.5px] uppercase text-[#755362] font-semibold">
            · शुभ पास्नी · Fort Worth, TX
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Background Music Toggle — available once past intro video (only starts on envelope click) */}
          {!showIntroVideo && (
            <button
              onClick={toggleMusic}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                isMusicPlaying
                  ? 'bg-gradient-to-r from-[#f7dce8] to-[#fbf4ed] border-[#d87ca0] text-[#701a41] shadow-sm'
                  : 'bg-[#fffcf8]/85 hover:bg-white border-[#eab8cd] text-[#755362]'
              }`}
              title={
                isMusicPlaying
                  ? 'Pause "Lullaby Harp Twinkle" by SergeQuadrado'
                  : 'Play "Lullaby Harp Twinkle" by SergeQuadrado (Freesound)'
              }
            >
              {isMusicPlaying ? (
                <>
                  <Music className="w-3.5 h-3.5 text-[#701a41] animate-bounce" />
                  <span className="hidden xs:inline text-[0.72rem] font-semibold">Music On ♫</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#755362]" />
                  <span className="hidden xs:inline text-[0.72rem]">Play Music</span>
                </>
              )}
            </button>
          )}

          {/* Gold Dust & Flowers Toggle */}
          <button
            onClick={() => setPetalsEnabled((prev) => !prev)}
            className={`p-2 rounded-full border transition-all text-xs flex items-center justify-center cursor-pointer ${
              petalsEnabled
                ? 'bg-[#fffcf8]/85 border-[#eab8cd] text-[#d4af37] shadow-2xs'
                : 'bg-white/40 border-transparent text-[#755362]'
            }`}
            title={petalsEnabled ? 'Pause falling gold dust & flowers' : 'Enable falling gold dust & flowers'}
          >
            <Sparkles className={`w-3.5 h-3.5 ${petalsEnabled ? 'text-[#d4af37]' : 'text-gray-400'}`} />
          </button>

          {/* Responses / Host Guest List Modal Button */}
          <button
            onClick={() => setIsHostDashboardOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffcf8]/85 hover:bg-white text-xs font-medium text-[#701a41] border border-[#eab8cd] shadow-2xs transition-all cursor-pointer whitespace-nowrap"
            title="View total responses or unlock host guest list"
          >
            <Users className="w-3.5 h-3.5 text-[#be5a83]" />
            <span className="hidden sm:inline">Responses</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-[700px] mx-auto px-4 sm:px-6 pt-3 pb-24 flex flex-col items-center">
        {/* Stage 0: Ganesha & Lakshmi Sacred Intro Video (loops with sound until Continue clicked) */}
        {!isEnvelopeOpen ? (
          showIntroVideo ? (
            <IntroVideoStage
              onContinue={() => setShowIntroVideo(false)}
              onStartMusic={handleStartMusic}
            />
          ) : (
            <EnvelopeStage
              onOpen={handleOpenEnvelope}
              onStartOpening={handleStartMusic}
              onReplayIntro={() => {
                stopBackgroundMusic();
                setIsMusicPlaying(false);
                setShowIntroVideo(true);
              }}
            />
          )
        ) : (
          /* Stage 2: Bilingual Invitation Card & Interactive Tabs */
          <div className="w-full space-y-6">
            <InvitationCard
              language={language}
              onChangeLanguage={setLanguage}
              onOpenRsvp={() => setIsRsvpOpen(true)}
              hasRsvpd={hasRsvpd}
              onOpenThankYou={() => setIsThankYouOpen(true)}
              onReWrap={() => setIsEnvelopeOpen(false)}
            />

            {/* Tab Navigation Pill Bar */}
            <nav
              className="flex items-center justify-center gap-1 sm:gap-2 p-1.5 bg-[#fffcf8]/90 backdrop-blur-xs rounded-full border border-[#eab8cd] shadow-[0_8px_20px_rgba(112,26,65,0.08)] max-w-fit mx-auto"
              role="tablist"
              aria-label="Ceremony details"
            >
              {(
                [
                  { key: 'countdown', en: 'Countdown', ne: 'काउन्टडाउन' },
                  { key: 'where', en: 'Where', ne: 'स्थान' },
                  { key: 'registry', en: 'Blessings', ne: 'शुभेच्छा' },
                  { key: 'tree', en: 'Wishing Album', ne: 'आशिर्वाद पुस्तिका' }
                ] as const
              ).map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#fdf2f6] text-[#701a41] font-semibold shadow-xs border border-[#eab8cd]/70'
                        : 'text-[#755362] hover:text-[#701a41]'
                    }`}
                  >
                    {isNepali ? tab.ne : tab.en}
                  </button>
                );
              })}
            </nav>

            {/* Tab Content Panels */}
            {activeTab === 'countdown' && <CountdownTab language={language} />}
            {activeTab === 'where' && (
              <WhereTab
                hasRsvpd={hasRsvpd}
                onOpenRsvp={() => setIsRsvpOpen(true)}
                language={language}
              />
            )}
            {activeTab === 'registry' && <RegistryTab language={language} />}
            {activeTab === 'tree' && (
              <WishingAlbumTab
                messages={messages}
                onOpenAddModal={() => setIsHangModalOpen(true)}
                language={language}
              />
            )}
          </div>
        )}

        {/* Footer info */}
        <footer className="mt-12 text-center text-xs text-[#755362]/85 space-y-1">
          <p className="flex items-center justify-center gap-1.5 font-medium">
            <span>
              {isNepali
                ? 'नानी श्रीवाको लागि मंगलमय आशिर्वाद · शुभ पास्नी'
                : 'With heartfelt blessings for baby Shriva · शुभ पास्नी'}
            </span>
            <Heart className="w-3.5 h-3.5 text-[#d87ca0] fill-[#d87ca0]" />
          </p>
          <p className="text-[0.7rem] text-[#755362]/65">
            Fort Worth, Texas · Saturday, January 2, 2027 (पुष १८, २०८३) · First Taste of Rice Celebration
          </p>
          <p className="text-[0.65rem] text-[#755362]/55">
            Music: &ldquo;Lullaby Harp Twinkle&rdquo; by SergeQuadrado (Freesound, CC BY-NC 4.0)
          </p>
        </footer>
      </main>

      {/* Modals */}
      <RSVPModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        onSuccess={handleRsvpSuccess}
      />

      <ThankYouModal
        isOpen={isThankYouOpen}
        onClose={() => setIsThankYouOpen(false)}
      />

      <HangOrnamentModal
        isOpen={isHangModalOpen}
        onClose={() => setIsHangModalOpen(false)}
        onSuccess={handleHangSuccess}
        language={language}
      />

      <HostDashboardModal
        isOpen={isHostDashboardOpen}
        onClose={() => setIsHostDashboardOpen(false)}
        localRsvps={localRsvps}
      />
    </div>
  );
}
