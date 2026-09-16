import React from 'react';
import { Flame, Heart, Sparkles, TrendingUp } from 'lucide-react';
import { OutfitItem } from '../types';

interface Top20PanelProps {
  outfits: OutfitItem[];
  selectedOutfitId: string;
  onSelectOutfit: (outfit: OutfitItem) => void;
}

const SEASON_LABELS: Record<string, string> = {
  spring: '봄',
  summer: '여름',
  autumn: '가을',
  winter: '겨울',
};

const GENDER_LABELS: Record<string, string> = {
  female: '여성',
  male: '남성',
  unisex: '유니섹스',
};

const AGE_LABELS: Record<string, string> = {
  '10s': '10대',
  '20s': '20대',
  '30s': '30대',
  '40s': '40대',
  '50s': '50대',
  '60s': '60대',
};

export const Top20Panel: React.FC<Top20PanelProps> = ({
  outfits,
  selectedOutfitId,
  onSelectOutfit,
}) => {
  return (
    <aside
      id="target-top20"
      className="w-full h-full flex flex-col bg-white border border-slate-100 rounded-2xl p-4 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
              TOP 코디 20
              <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 px-1.5 py-0.2 rounded">
                LIVE
              </span>
            </h2>
            <p className="text-[11px] text-slate-600">지금 가장 많이 저장된 룩</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2 py-1 rounded-md">
          <TrendingUp className="w-3 h-3 text-purple-600" />
          실시간
        </div>
      </div>

      {/* Outfit List (Scrollable internally up to 20 items) */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar max-h-[calc(100vh-140px)]">
        {outfits.map((item, index) => {
          const rank = item.rank || index + 1;
          const isSelected = item.id === selectedOutfitId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectOutfit(item)}
              className={`w-full text-left flex items-center gap-3 p-2 rounded-xl transition-all border group ${
                isSelected
                  ? 'bg-purple-50/80 border-purple-300 ring-2 ring-purple-400/20'
                  : 'bg-white border-slate-100 hover:border-purple-200 hover:bg-slate-50/70'
              }`}
            >
              {/* Rank Badge */}
              <div className="flex-shrink-0 w-6 text-center">
                <span
                  className={`text-xs font-black ${
                    rank <= 3
                      ? 'text-purple-700 text-sm'
                      : 'text-slate-600'
                  }`}
                >
                  {String(rank).padStart(2, '0')}
                </span>
              </div>

              {/* Thumbnail */}
              <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {rank <= 3 && (
                  <div className="absolute top-0 left-0 bg-purple-600 text-white text-[9px] font-black px-1 rounded-br">
                    BEST
                  </div>
                )}
              </div>

              {/* Outfit details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-purple-700 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-600 mt-1">
                  <span>{SEASON_LABELS[item.season] || item.season}</span>
                  <span>·</span>
                  <span>{GENDER_LABELS[item.gender] || item.gender}</span>
                  <span>·</span>
                  <span>{AGE_LABELS[item.age] || item.age}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    {item.styleCategory}
                  </span>
                  <span className="flex items-center gap-0.5 text-[10px] text-slate-600 font-medium">
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                    {item.likes.toLocaleString()}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-2 mt-2 border-t border-slate-100 text-center">
        <p className="text-[11px] text-slate-600">
          클릭 시 가운데 TodayPick 추천 화면에 즉시 적용됩니다.
        </p>
      </div>
    </aside>
  );
};
