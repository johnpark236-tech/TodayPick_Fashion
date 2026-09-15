import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Bookmark,
  Share2,
  Maximize2,
  ListFilter,
  Volume2,
  VolumeX,
  ChevronRight,
  Sun,
  CloudSun,
  Layers,
  Check,
  Heart,
  Calendar,
  Thermometer,
  Grid,
  Square,
  Plus
} from 'lucide-react';
import { OutfitItem, Season, Gender, AgeGroup } from '../types';

interface TodayPickCenterProps {
  currentOutfit: OutfitItem;
  tenLooksSet: OutfitItem[];
  allSets: OutfitItem[];
  viewMode: 'single' | 'ten';
  onToggleViewMode: (mode: 'single' | 'ten') => void;
  onSelectOutfit: (outfit: OutfitItem) => void;
  onLoadMore: () => void;
  hasMoreSets: boolean;
  isSaved: boolean;
  onToggleSave: (outfit: OutfitItem) => void;
  onShare: (outfit: OutfitItem) => void;
  onZoomModal: (outfit: OutfitItem) => void;
  onDetailModal: (outfit: OutfitItem) => void;
  // Callback when interactive elements are clicked for class tutorial
  onElementClick?: (targetId: string) => void;
  selectedSeason: Season;
  onChangeSeason: (season: Season) => void;
  selectedGender: Gender;
  onChangeGender: (gender: Gender) => void;
  selectedAge: AgeGroup;
  onChangeAge: (age: AgeGroup) => void;
}

export const TodayPickCenter: React.FC<TodayPickCenterProps> = ({
  currentOutfit,
  tenLooksSet,
  allSets,
  viewMode,
  onToggleViewMode,
  onSelectOutfit,
  onLoadMore,
  hasMoreSets,
  isSaved,
  onToggleSave,
  onShare,
  onZoomModal,
  onDetailModal,
  onElementClick,
  selectedSeason,
  onChangeSeason,
  selectedGender,
  onChangeGender,
  selectedAge,
  onChangeAge,
}) => {
  const [greeting, setGreeting] = useState('안녕하세요');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('좋은 아침이에요! 활기찬 하루를 위한 추천 룩');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('기분 좋은 오후예요! 오늘 날씨에 딱 맞는 코디');
    } else if (hour >= 18 && hour < 22) {
      setGreeting('편안한 저녁 되세요! 퇴근 후 약속에도 좋은 룩');
    } else {
      setGreeting('조용한 밤이에요! 내일 입을 코디를 미리 골라보세요');
    }
  }, []);

  // Web Speech API for voice narration
  const handleVoiceNarration = () => {
    if (!('speechSynthesis' in window)) {
      alert('이 브라우저는 음성 안내 기능을 지원하지 않습니다.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const narrationText = `오늘의 추천 코디는 ${currentOutfit.title}입니다. ${currentOutfit.description}. 추천 착용 온도는 ${currentOutfit.tempRange}입니다.`;
    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.lang = 'ko-KR';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    onElementClick?.('target-action-voice');
  };

  const seasons: { id: Season; label: string }[] = [
    { id: 'spring', label: '봄 (Spring)' },
    { id: 'summer', label: '여름 (Summer)' },
    { id: 'autumn', label: '가을 (Autumn)' },
    { id: 'winter', label: '겨울 (Winter)' },
  ];

  const genders: { id: Gender; label: string }[] = [
    { id: 'female', label: '여성' },
    { id: 'male', label: '남성' },
    { id: 'unisex', label: '유니섹스' },
  ];

  const ages: { id: AgeGroup; label: string }[] = [
    { id: '10s', label: '10대' },
    { id: '20s', label: '20대' },
    { id: '30s', label: '30대' },
    { id: '40s', label: '40대' },
    { id: '50s', label: '50대+' },
  ];

  return (
    <div id="target-center-app" className="w-full space-y-4">
      {/* Time-Based Greeting Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span className="text-xs font-semibold text-purple-200 uppercase tracking-wider">
                TODAYPICK AI CURATION
              </span>
            </div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight">{greeting}</h1>
            <p className="text-xs text-purple-100/90 mt-0.5">
              계절과 연령, 스타일에 맞는 오늘의 코디를 쉽고 빠르게 만나보세요.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs">
            <Thermometer className="w-3.5 h-3.5 text-purple-200" />
            <span className="font-semibold">{currentOutfit.tempRange}</span>
            <span className="text-purple-200">· 최적 추천</span>
          </div>
        </div>
      </div>

      {/* 3-CLICK CORE FILTERS BAR */}
      <div
        id="target-filter-bar"
        className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3"
      >
        {/* Season selector */}
        <div id="target-season-filter">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              1. 계절 선택
            </span>
            <span className="text-[11px] text-purple-600 font-medium">1클릭 완료</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {seasons.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  onChangeSeason(s.id);
                  onElementClick?.('target-season-filter');
                }}
                className={`py-2 px-1 text-xs rounded-xl font-semibold transition-all text-center ${
                  selectedSeason === s.id
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-200'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gender & Age filter row */}
        <div id="target-gender-age-filter" className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          {/* Gender */}
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-1.5">2-A. 성별</span>
            <div className="grid grid-cols-3 gap-1">
              {genders.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    onChangeGender(g.id);
                    onElementClick?.('target-gender-age-filter');
                  }}
                  className={`py-1.5 px-2 text-xs rounded-lg font-semibold transition-all ${
                    selectedGender === g.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-1.5">2-B. 연령</span>
            <div className="grid grid-cols-5 gap-1">
              {ages.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => {
                    onChangeAge(a.id);
                    onElementClick?.('target-gender-age-filter');
                  }}
                  className={`py-1.5 px-1 text-xs rounded-lg font-semibold transition-all text-center ${
                    selectedAge === a.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SINGLE LOOK VS 10-LOOK VIEW TOGGLE BAR */}
      <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-900">
            현재 셋: <span className="text-purple-600">{currentOutfit.setId}</span>
          </span>
          <span className="text-[11px] text-slate-500">
            ({currentOutfit.cutIndex} / 10컷)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            id="target-single-look-btn"
            onClick={() => onToggleViewMode('single')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'single'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Square className="w-3.5 h-3.5" />
            1컷 보기
          </button>

          <button
            type="button"
            id="target-ten-look"
            onClick={() => {
              onToggleViewMode('ten');
              onElementClick?.('target-ten-look');
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'ten'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            10개 코디 보기
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      {viewMode === 'single' ? (
        /* SINGLE LOOK DOMINANT VIEW */
        <div
          id="target-main-outfit"
          onClick={() => onElementClick?.('target-main-outfit')}
          className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden relative group transition-all"
        >
          {/* Main Visual Image with floating badges */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[16/11] bg-slate-100 overflow-hidden">
            <img
              src={currentOutfit.imageUrl}
              alt={currentOutfit.title}
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

            {/* Top Bar on Image */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-900 shadow-md">
                {currentOutfit.styleCategory}
              </span>

              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>{currentOutfit.likes.toLocaleString()}</span>
              </div>
            </div>

            {/* Floating Action Buttons Bar (Round Buttons) */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              {/* Voice Narration */}
              <button
                type="button"
                id="target-action-voice"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVoiceNarration();
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  isSpeaking
                    ? 'bg-purple-600 text-white animate-pulse'
                    : 'bg-white/90 hover:bg-white text-slate-800 backdrop-blur-md'
                }`}
                title="AI 음성 코디 가이드"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-purple-600" />}
              </button>

              {/* Zoom */}
              <button
                type="button"
                id="target-action-zoom"
                onClick={(e) => {
                  e.stopPropagation();
                  onZoomModal(currentOutfit);
                }}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg backdrop-blur-md transition-all"
                title="크게 보기"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Details Breakdown */}
              <button
                type="button"
                id="target-action-detail"
                onClick={(e) => {
                  e.stopPropagation();
                  onDetailModal(currentOutfit);
                }}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg backdrop-blur-md transition-all"
                title="착용 아이템 상세 정보"
              >
                <Layers className="w-4 h-4 text-indigo-600" />
              </button>

              {/* Share */}
              <button
                type="button"
                id="target-action-share"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(currentOutfit);
                  onElementClick?.('target-action-share');
                }}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg backdrop-blur-md transition-all"
                title="코디 공유하기"
              >
                <Share2 className="w-4 h-4 text-blue-600" />
              </button>

              {/* Save / Bookmark */}
              <button
                type="button"
                id="target-action-save"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(currentOutfit);
                  onElementClick?.('target-action-save');
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  isSaved
                    ? 'bg-rose-500 text-white scale-105'
                    : 'bg-white/90 hover:bg-white text-slate-800 backdrop-blur-md'
                }`}
                title={isSaved ? '저장됨' : '코디 보관함에 저장'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : 'text-slate-700'}`} />
              </button>
            </div>

            {/* Bottom info banner overlaid on image */}
            <div className="absolute bottom-4 left-4 max-w-[65%] text-white pointer-events-none">
              <h2 className="text-xl font-black drop-shadow-md">{currentOutfit.title}</h2>
              <p className="text-xs text-slate-200 mt-1 line-clamp-1 drop-shadow">
                {currentOutfit.description}
              </p>
            </div>
          </div>

          {/* Bottom Card Details */}
          <div className="p-4 space-y-3">
            {/* Color Palette & Weather */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">추천 컬러 팔레트:</span>
                <div className="flex items-center gap-1.5">
                  {currentOutfit.colorPalette.map((color, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-full border border-slate-200 shadow-xs"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg">
                <CloudSun className="w-3.5 h-3.5 text-amber-500" />
                <span>체감온도 {currentOutfit.tempRange}</span>
              </div>
            </div>

            {/* Outfit Pieces Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
              {currentOutfit.pieces.outer && (
                <div className="bg-slate-50 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-600 block">아우터</span>
                  <span className="font-semibold text-slate-800 truncate block">
                    {currentOutfit.pieces.outer}
                  </span>
                </div>
              )}
              <div className="bg-slate-50 p-2 rounded-xl">
                <span className="text-[10px] text-slate-600 block">상의 (Top)</span>
                <span className="font-semibold text-slate-800 truncate block">
                  {currentOutfit.pieces.top}
                </span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl">
                <span className="text-[10px] text-slate-600 block">하의 (Bottom)</span>
                <span className="font-semibold text-slate-800 truncate block">
                  {currentOutfit.pieces.bottom}
                </span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl">
                <span className="text-[10px] text-slate-600 block">신발 (Shoes)</span>
                <span className="font-semibold text-slate-800 truncate block">
                  {currentOutfit.pieces.shoes}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentOutfit.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* 10-LOOK SET GRID VIEW */
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Grid className="w-4 h-4 text-purple-600" />
              {currentOutfit.styleCategory} 10개 코디 룩북
            </h3>
            <span className="text-xs text-slate-500">원하는 룩을 클릭하여 1컷 보기로 전환</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {tenLooksSet.map((look) => {
              const isSelected = look.id === currentOutfit.id;
              return (
                <button
                  key={look.id}
                  type="button"
                  onClick={() => {
                    onSelectOutfit(look);
                    onToggleViewMode('single');
                  }}
                  className={`group relative rounded-xl overflow-hidden border text-left transition-all ${
                    isSelected
                      ? 'border-purple-600 ring-2 ring-purple-400'
                      : 'border-slate-100 hover:border-purple-300'
                  }`}
                >
                  <div className="aspect-[3/4] bg-slate-100 relative">
                    <img
                      src={look.imageUrl}
                      alt={look.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <span className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      CUT {look.cutIndex}
                    </span>
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 bg-purple-600 text-white p-1 rounded-full shadow">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-[11px] font-bold text-slate-900 truncate">{look.title}</p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">{look.styleCategory}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 10-LOOK THUMBNAILS CAROUSEL / STRIP (ALWAYS VISIBLE IN SINGLE MODE) */}
      {viewMode === 'single' && (
        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold text-slate-700">
              동일 셋 10컷 미리보기 ({currentOutfit.setId})
            </span>
            <button
              type="button"
              onClick={() => onToggleViewMode('ten')}
              className="text-xs text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-0.5"
            >
              전체 보기 <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {tenLooksSet.map((item) => {
              const isSelected = item.id === currentOutfit.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectOutfit(item)}
                  className={`flex-shrink-0 w-16 text-left group rounded-xl overflow-hidden border transition-all ${
                    isSelected
                      ? 'border-purple-600 ring-2 ring-purple-300 scale-102'
                      : 'border-slate-100 hover:border-purple-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="w-16 h-20 bg-slate-100 relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1 rounded">
                      #{item.cutIndex}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* "더보기" (LOAD MORE) BUTTON */}
      <div className="pt-2 text-center">
        <button
          type="button"
          id="target-load-more"
          onClick={() => {
            onLoadMore();
            onElementClick?.('target-load-more');
          }}
          disabled={!hasMoreSets}
          className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-sm transition-all ${
            hasMoreSets
              ? 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
          }`}
        >
          <Plus className="w-4 h-4" />
          {hasMoreSets ? '새로운 룩북 셋 더보기 (+10컷)' : '모든 룩북 세트를 불러왔습니다'}
        </button>
        <p className="text-[11px] text-slate-500 mt-1.5">
          완전한 10컷 세트 경계를 보존하며 최신 등록 세트 순서대로 추가됩니다.
        </p>
      </div>
    </div>
  );
};
