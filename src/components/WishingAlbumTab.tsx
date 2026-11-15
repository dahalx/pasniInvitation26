import React, { useState, useEffect, useRef, useCallback } from 'react';
import { OrnamentMessage, Language } from '../types';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Feather,
  Sparkles,
  Heart
} from 'lucide-react';
import { playPageTurnSound } from '../utils/audio';

interface WishingAlbumTabProps {
  messages: OrnamentMessage[];
  onOpenAddModal: () => void;
  language?: Language;
}

interface TurnState {
  fromIndex: number;
  toIndex: number;
  direction: 'next' | 'prev';
  turnKey: number;
}

const TURN_DURATION_MS = 1350;

interface LeftPageProps {
  entry: OrnamentMessage;
  pageIndex: number;
  isNepali: boolean;
}

const AlbumLeftPage: React.FC<LeftPageProps> = ({ entry, pageIndex, isNepali }) => (
  <div className="relative h-full p-6 sm:p-7 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#eab8cd]/60 bg-gradient-to-br from-[#fffdf8] to-[#fdf4ee]">
    {/* Subtle stationery double border */}
    <div className="absolute inset-3 rounded-lg border border-[#d4af37]/30 pointer-events-none" />

    {/* Guest's Chosen Wax/Ribbon Seal */}
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center shadow-md border-2 border-white mb-3 relative"
      style={{ backgroundColor: entry.color || '#d87ca0' }}
    >
      <Heart className="w-6 h-6 text-white fill-white/85" />
      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#fffcf8] border border-[#d4af37] flex items-center justify-center text-[0.6rem] font-bold text-[#701a41]">
        {pageIndex + 1}
      </span>
    </div>

    <span className="text-[0.68rem] uppercase tracking-[2px] text-[#be5a83] font-semibold mb-1">
      {isNepali ? 'आशिर्वाद दाता' : 'With Love From'}
    </span>

    <h3 className="font-serif-cormorant text-2xl font-bold text-[#701a41] leading-snug">
      {entry.author}
    </h3>

    <div className="w-10 h-[1px] bg-[#d4af37]/60 my-2.5" />

    <span className="text-xs text-[#755362] font-medium">
      {isNepali ? `लेखिएको मिति: ${entry.time}` : `Signed · ${entry.time}`}
    </span>
  </div>
);

interface RightPageProps {
  entry: OrnamentMessage;
  pageIndex: number;
  totalPages: number;
  isNepali: boolean;
  onTapNext?: () => void;
  interactive?: boolean;
}

const AlbumRightPage: React.FC<RightPageProps> = ({
  entry,
  pageIndex,
  totalPages,
  isNepali,
  onTapNext,
  interactive = true
}) => (
  <div
    onClick={interactive ? onTapNext : undefined}
    title={
      interactive
        ? isNepali
          ? 'अर्को पाना पल्टाउन थिच्नुहोस्'
          : 'Tap page to turn to next blessing'
        : undefined
    }
    className={`relative h-full p-6 sm:p-7 flex flex-col justify-between text-left bg-[#fffdf7] ${
      interactive ? 'cursor-pointer group' : ''
    }`}
    style={{
      backgroundImage:
        'repeating-linear-gradient(transparent, transparent 27px, rgba(234, 184, 205, 0.28) 28px)',
      backgroundPositionY: '18px'
    }}
  >
    {/* Top corner lotus mark */}
    <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[2px] text-[#755362]/75 mb-3">
      <span className="flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-[#d4af37]" />
        {isNepali ? 'शुभ पास्नी सन्देश' : 'Pasni Blessing'}
      </span>
      <span className="font-mono tabular-nums">
        {pageIndex + 1} / {totalPages}
      </span>
    </div>

    {/* Blessing Prose */}
    <div className="my-auto py-2">
      <p className="font-serif-cormorant italic text-xl sm:text-[1.32rem] text-[#3b202b] leading-[1.65]">
        &ldquo;{entry.note}&rdquo;
      </p>
    </div>

    {/* Subtle Bottom Page Curl Cue */}
    <div className="mt-4 pt-2 flex items-center justify-between text-[0.7rem] text-[#be5a83] font-medium">
      <span className="font-nepali text-[#701a41]/70">ॐ श्रीवा (Shriva)</span>
      <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
        {isNepali ? 'पाना पल्टाउनुहोस् →' : 'Turn page →'}
      </span>
    </div>
  </div>
);

export const WishingAlbumTab: React.FC<WishingAlbumTabProps> = ({
  messages,
  onOpenAddModal,
  language = 'en'
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [turnState, setTurnState] = useState<TurnState | null>(null);
  const prevLengthRef = useRef(messages.length);
  const turnTimerRef = useRef<number | null>(null);
  const turnCounterRef = useRef(0);
  const isNepali = language === 'ne';

  const safeIndex = Math.min(Math.max(0, currentPage), Math.max(0, messages.length - 1));

  const clearPendingTurn = useCallback(() => {
    if (turnTimerRef.current !== null) {
      window.clearTimeout(turnTimerRef.current);
      turnTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearPendingTurn();
  }, [clearPendingTurn]);

  const startSlowPageTurn = useCallback(
    (targetIndex: number, direction: 'next' | 'prev') => {
      if (messages.length <= 1) return;
      const fromIdx = turnState ? turnState.toIndex : safeIndex;
      if (fromIdx === targetIndex) return;

      clearPendingTurn();
      turnCounterRef.current += 1;

      setCurrentPage(targetIndex);
      setTurnState({
        fromIndex: fromIdx,
        toIndex: targetIndex,
        direction,
        turnKey: turnCounterRef.current
      });

      playPageTurnSound();

      turnTimerRef.current = window.setTimeout(() => {
        setTurnState(null);
        turnTimerRef.current = null;
      }, TURN_DURATION_MS);
    },
    [clearPendingTurn, messages.length, safeIndex, turnState]
  );

  // Auto-turn slowly to the newly written blessing page whenever a guest adds a wish
  useEffect(() => {
    if (messages.length > prevLengthRef.current) {
      const target = messages.length - 1;
      if (messages.length > 1) {
        startSlowPageTurn(target, 'next');
      } else {
        setCurrentPage(0);
      }
    }
    prevLengthRef.current = messages.length;
  }, [messages.length, startSlowPageTurn]);

  const goToNextPage = () => {
    if (messages.length <= 1 || turnState) return;
    const nextIdx = (safeIndex + 1) % messages.length;
    startSlowPageTurn(nextIdx, 'next');
  };

  const goToPrevPage = () => {
    if (messages.length <= 1 || turnState) return;
    const prevIdx = (safeIndex - 1 + messages.length) % messages.length;
    startSlowPageTurn(prevIdx, 'prev');
  };

  const jumpToPage = (index: number) => {
    if (index === safeIndex || turnState) return;
    startSlowPageTurn(index, index > safeIndex ? 'next' : 'prev');
  };

  // Determine which entries sit on the underlying open spread during a physical turn
  const activeToIndex = turnState ? turnState.toIndex : safeIndex;
  const baseLeftIndex = turnState
    ? turnState.direction === 'next'
      ? turnState.fromIndex
      : turnState.toIndex
    : safeIndex;
  const baseRightIndex = turnState
    ? turnState.direction === 'next'
      ? turnState.toIndex
      : turnState.fromIndex
    : safeIndex;

  const baseLeftEntry = messages[baseLeftIndex];
  const baseRightEntry = messages[baseRightIndex];
  const mobileDestEntry = messages[activeToIndex];
  const fromEntry = turnState ? messages[turnState.fromIndex] : null;
  const toEntry = turnState ? messages[turnState.toIndex] : null;

  return (
    <div className="w-full bg-[#fffcf8]/95 backdrop-blur-xs rounded-[28px] p-5 sm:p-8 md:p-10 text-center border border-[#eab8cd]/70 shadow-[0_16px_40px_rgba(112,26,65,0.10)] animate-fade-in relative overflow-hidden">
      {/* Header Badge */}
      <span className="inline-flex items-center gap-1.5 font-sans text-xs tracking-[2.5px] uppercase text-[#701a41] bg-[#fdf2f6] px-4 py-1.5 rounded-full border border-[#eab8cd] mb-2">
        <BookOpen className="w-3.5 h-3.5 text-[#be5a83]" />
        {isNepali ? 'आशिर्वाद पुस्तिका · Wishing Album' : 'Wishing Album · आशिर्वाद पुस्तिका'}
      </span>

      <h2 className="font-serif-cormorant text-2xl md:text-[1.95rem] text-[#701a41] font-semibold mt-1">
        {isNepali ? 'नानी श्रीवाको आशिर्वाद पुस्तिका' : "Shriva's Pasni Blessing Album"}
      </h2>

      <p className="text-[#755362] text-xs md:text-sm max-w-[490px] mx-auto mt-1 mb-5">
        {isNepali
          ? 'प्रत्येक पाहुनाको स्नेह र आशिर्वाद यस पुस्तिकाको पानामा सधैंका लागि संगालिनेछ। पाना पल्टाएर पढ्नुहोस्।'
          : 'A keepsake storybook of blessings from family and friends. Turn each page to read every heartfelt wish for baby Shriva.'}
      </p>

      {/* Primary Write Blessing CTA */}
      <button
        onClick={onOpenAddModal}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#701a41] to-[#4f102d] text-white px-6 py-3 rounded-full font-sans text-xs font-semibold tracking-[1.2px] uppercase hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer shadow-md mb-6"
      >
        <Feather className="w-3.5 h-3.5 text-[#f3d06b]" />
        <span>
          {isNepali
            ? 'हाम्री नानी श्रीवाको पास्नीको लागि शुभकामना लेख्नुहोस्'
            : "Write your wishing for our baby Shriva's Pasni"}
        </span>
      </button>

      {/* Heirloom Hardcover Open Book Frame */}
      {mobileDestEntry && baseLeftEntry && baseRightEntry ? (
        <div
          className="relative max-w-[580px] mx-auto p-2.5 sm:p-3.5 rounded-[22px] border-2 border-[#d4af37]/70 shadow-[0_20px_48px_rgba(112,26,65,0.2)]"
          style={{
            background: 'linear-gradient(135deg, #8b2852 0%, #701a41 50%, #58122f 100%)'
          }}
        >
          {/* Decorative Gold Album Corner Clasps */}
          <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#f3d06b] rounded-tl-lg pointer-events-none" />
          <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#f3d06b] rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#f3d06b] rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#f3d06b] rounded-br-lg pointer-events-none" />

          {/* Book Stage with 3D Perspective */}
          <div className="relative book-stage-3d rounded-[14px] overflow-hidden bg-[#fffdf7] border border-[#eab8cd]/80 shadow-inner min-h-[305px]">
            {/* DESKTOP BASE TWO-PAGE SPREAD */}
            <div className="hidden md:grid grid-cols-2 min-h-[305px]">
              <AlbumLeftPage
                entry={baseLeftEntry}
                pageIndex={baseLeftIndex}
                isNepali={isNepali}
              />
              <AlbumRightPage
                entry={baseRightEntry}
                pageIndex={baseRightIndex}
                totalPages={messages.length}
                isNepali={isNepali}
                onTapNext={goToNextPage}
                interactive={!turnState}
              />
            </div>

            {/* MOBILE BASE SINGLE-COLUMN SPREAD */}
            <div className="grid grid-cols-1 md:hidden min-h-[305px]">
              <AlbumLeftPage
                entry={mobileDestEntry}
                pageIndex={activeToIndex}
                isNepali={isNepali}
              />
              <AlbumRightPage
                entry={mobileDestEntry}
                pageIndex={activeToIndex}
                totalPages={messages.length}
                isNepali={isNepali}
                onTapNext={goToNextPage}
                interactive={!turnState}
              />
            </div>

            {/* Central Book Spine Shadow (Desktop) */}
            <div
              className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-7 pointer-events-none z-10"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(112,26,65,0.08) 42%, rgba(112,26,65,0.22) 50%, rgba(112,26,65,0.08) 58%, transparent 100%)'
              }}
            />

            {/* DESKTOP REALISTIC SLOW-MOTION 3D HINGED TURNING LEAF */}
            {turnState && fromEntry && toEntry && (
              <div
                key={`desktop-leaf-${turnState.turnKey}`}
                aria-hidden="true"
                className={`hidden md:block absolute top-0 bottom-0 w-1/2 preserve-3d pointer-events-none z-20 ${
                  turnState.direction === 'next'
                    ? 'left-1/2 animate-real-turn-next'
                    : 'left-0 animate-real-turn-prev'
                }`}
              >
                {/* FRONT OF TURNING SHEET */}
                <div className="absolute inset-0 backface-hidden overflow-hidden shadow-[0_8px_24px_rgba(59,32,43,0.18)]">
                  {turnState.direction === 'next' ? (
                    <AlbumRightPage
                      entry={fromEntry}
                      pageIndex={turnState.fromIndex}
                      totalPages={messages.length}
                      isNepali={isNepali}
                      interactive={false}
                    />
                  ) : (
                    <AlbumLeftPage
                      entry={fromEntry}
                      pageIndex={turnState.fromIndex}
                      isNepali={isNepali}
                    />
                  )}
                  {/* Dynamic fold shadow across the turning sheet */}
                  <div
                    className="absolute inset-0 pointer-events-none animate-page-sweep-shadow"
                    style={{
                      background:
                        turnState.direction === 'next'
                          ? 'linear-gradient(90deg, rgba(112,26,65,0.28) 0%, rgba(59,32,43,0.08) 45%, transparent 100%)'
                          : 'linear-gradient(270deg, rgba(112,26,65,0.28) 0%, rgba(59,32,43,0.08) 45%, transparent 100%)'
                    }}
                  />
                </div>

                {/* BACK OF TURNING SHEET (Revealed once page passes 90deg) */}
                <div
                  className="absolute inset-0 backface-hidden overflow-hidden shadow-[0_8px_24px_rgba(59,32,43,0.18)]"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  {turnState.direction === 'next' ? (
                    <AlbumLeftPage
                      entry={toEntry}
                      pageIndex={turnState.toIndex}
                      isNepali={isNepali}
                    />
                  ) : (
                    <AlbumRightPage
                      entry={toEntry}
                      pageIndex={turnState.toIndex}
                      totalPages={messages.length}
                      isNepali={isNepali}
                      interactive={false}
                    />
                  )}
                  {/* Subtle lighting gradient as back face settles flat */}
                  <div
                    className="absolute inset-0 pointer-events-none animate-page-sweep-shadow"
                    style={{
                      background:
                        turnState.direction === 'next'
                          ? 'linear-gradient(270deg, rgba(112,26,65,0.22) 0%, transparent 55%)'
                          : 'linear-gradient(90deg, rgba(112,26,65,0.22) 0%, transparent 55%)'
                    }}
                  />
                </div>
              </div>
            )}

            {/* MOBILE SLOW-MOTION TURNING SHEET OVERLAY */}
            {turnState && fromEntry && (
              <div
                key={`mobile-leaf-${turnState.turnKey}`}
                aria-hidden="true"
                className={`grid grid-cols-1 md:hidden absolute inset-0 pointer-events-none z-20 bg-[#fffdf7] shadow-[0_10px_28px_rgba(59,32,43,0.22)] ${
                  turnState.direction === 'next'
                    ? 'animate-mobile-turn-next'
                    : 'animate-mobile-turn-prev'
                }`}
              >
                <AlbumLeftPage
                  entry={fromEntry}
                  pageIndex={turnState.fromIndex}
                  isNepali={isNepali}
                />
                <AlbumRightPage
                  entry={fromEntry}
                  pageIndex={turnState.fromIndex}
                  totalPages={messages.length}
                  isNepali={isNepali}
                  interactive={false}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="py-10 text-sm text-[#755362]">
          {isNepali ? 'पहिलो आशिर्वाद लेख्नुहोस्!' : 'Be the first to write a blessing in Shriva’s album!'}
        </div>
      )}

      {/* Page Turn Navigation Controls */}
      {messages.length > 0 && (
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-[580px] mx-auto">
          <button
            onClick={goToPrevPage}
            disabled={messages.length <= 1 || Boolean(turnState)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fdf2f6] hover:bg-white text-xs font-semibold text-[#701a41] border border-[#eab8cd] transition-all cursor-pointer disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{isNepali ? 'अघिल्लो पाना' : 'Previous Page'}</span>
          </button>

          {/* Interactive Page Dots */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {messages.map((msg, idx) => (
              <button
                key={msg.id}
                onClick={() => jumpToPage(idx)}
                disabled={Boolean(turnState)}
                title={msg.author}
                aria-label={`Page ${idx + 1}: ${msg.author}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === safeIndex
                    ? 'w-7 bg-[#701a41]'
                    : 'w-2.5 bg-[#eab8cd] hover:bg-[#d87ca0]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={messages.length <= 1 || Boolean(turnState)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fdf2f6] hover:bg-white text-xs font-semibold text-[#701a41] border border-[#eab8cd] transition-all cursor-pointer disabled:opacity-50"
          >
            <span>{isNepali ? 'अर्को पाना' : 'Next Page'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
