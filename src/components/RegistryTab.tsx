import React from 'react';
import { Gift, ExternalLink, Heart } from 'lucide-react';
import { Language } from '../types';

interface RegistryTabProps {
  language?: Language;
}

export const RegistryTab: React.FC<RegistryTabProps> = ({ language = 'en' }) => {
  const isNepali = language === 'ne';

  const registries = [
    {
      name: 'Babylist Registry',
      url: 'https://www.babylist.com'
    },
    {
      name: 'Amazon Baby Registry',
      url: 'https://www.amazon.com/baby-reg'
    },
    {
      name: isNepali ? 'परम्परागत चाँदीको भाँडा' : 'Traditional Pasni Sets',
      url: 'https://www.google.com/search?q=silver+baby+spoon+and+bowl+pasni'
    }
  ];

  return (
    <div className="w-full bg-[#fffcf8]/95 backdrop-blur-xs rounded-[28px] p-8 md:p-10 text-center border border-[#eab8cd]/70 shadow-[0_16px_40px_rgba(112,26,65,0.10)] animate-fade-in">
      <span className="inline-block font-sans text-xs tracking-[3px] uppercase text-[#701a41] bg-[#fdf2f6] px-4 py-1.5 rounded-full border border-[#eab8cd] mb-3">
        {isNepali ? 'आशिर्वाद र शुभेच्छा · Wishes' : 'Blessings & Wishes · आशिर्वाद'}
      </span>

      <h2 className="font-serif-cormorant text-3xl md:text-4xl text-[#701a41] font-semibold mt-1">
        {isNepali ? 'श्रीवाको लागि शुभकामना' : 'A Few Wishes for Shriva'}
      </h2>

      <p className="text-[#755362] text-sm md:text-[0.95rem] leading-relaxed my-3 mx-auto max-w-[460px]">
        {isNepali
          ? 'हाम्री नानी श्रीवाको लागि तपाईंको स्नेहपूर्ण उपस्थिति र मंगलमय आशिर्वाद नै सबैभन्दा अमूल्य उपहार हो। यदि कुनै सम्झनास्वरूप उपहार दिन चाहनुहुन्छ भने:'
          : 'Your loving presence and sacred blessings (आशिर्वाद) for our sweet baby girl are the greatest gift. If you wish to bless Shriva with a keepsake, here are our registries:'}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3.5 mt-6 mb-2">
        {registries.map((reg) => (
          <a
            key={reg.name}
            href={reg.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs md:text-sm font-medium text-[#701a41] bg-[#fdf2f6] border border-[#eab8cd] hover:bg-white hover:shadow-md transition-all duration-200"
          >
            <Gift className="w-4 h-4 text-[#be5a83] group-hover:scale-110 transition-transform" />
            <span>{reg.name}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#755362] opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>

      <div className="mt-7 pt-4 border-t border-[#eab8cd]/60 max-w-md mx-auto text-xs text-[#755362] leading-relaxed flex items-center justify-center gap-2">
        <Heart className="w-3.5 h-3.5 text-[#d87ca0] shrink-0" />
        <span>
          {isNepali
            ? 'चाँदीको कचौरा र चम्चा, बाल कथाका पुस्तकहरू वा तपाईंको न्यानो आशिर्वाद सधैं स्मरणीय रहनेछ।'
            : 'Traditional silver bowl & spoon, storybooks, or your warm hugs & blessings are forever cherished.'}
        </span>
      </div>
    </div>
  );
};
