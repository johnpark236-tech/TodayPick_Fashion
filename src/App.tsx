import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Sparkles,
  Menu,
  X,
  Bookmark,
  Smartphone,
  Monitor,
  GraduationCap,
  Share2,
  Check,
  ChevronDown,
  ChevronUp,
  Heart
} from 'lucide-react';
import { OutfitItem, Season, Gender, AgeGroup } from './types';
import { OUTFIT_SETS, TOP_20_OUTFITS, ADDITIONAL_SET_3 } from './data/outfits';
import { CLASS_LESSONS } from './data/lessons';
import { LeftSidebar } from './components/LeftSidebar';
import { TodayPickCenter } from './components/TodayPickCenter';
import { Top20Panel } from './components/Top20Panel';
import { LessonPanel } from './components/LessonPanel';
import { HighlightRing } from './components/HighlightRing';
import { LandingSections } from './components/LandingSections';
import {
  BuildInspectorModal,
  GithubFlowModal,
  VercelFlowModal,
  FiveSecTestModal,
  FinalQAModal,
  OutfitDetailModal,
  OutfitZoomModal,
} from './components/PracticeModals';

export default function App() {
  // Navigation & tabs
  const [currentTab, setCurrentTab] = useState<'today' | 'top' | 'saved' | 'about'>('today');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Learning Mode states (disabled on public site)
  const [learningMode, setLearningMode] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [targetLabel, setTargetLabel] = useState<string>('');
  const [isTargetCompleted, setIsTargetCompleted] = useState<boolean>(false);
  const [mobileLessonSheetOpen, setMobileLessonSheetOpen] = useState(false);

  // 3-Click Exercise state
  const [threeClickPhase, setThreeClickPhase] = useState<'season' | 'gender_age' | 'outfit' | 'done'>('season');

  // Filter selections
  const [selectedSeason, setSelectedSeason] = useState<Season>('autumn');
  const [selectedGender, setSelectedGender] = useState<Gender>('female');
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('20s');

  // Outfits state
  const [allOutfits, setAllOutfits] = useState<OutfitItem[]>(OUTFIT_SETS);
  const [currentOutfit, setCurrentOutfit] = useState<OutfitItem>(OUTFIT_SETS[0]);
  const [viewMode, setViewMode] = useState<'single' | 'ten'>('single');
  const [hasMoreSets, setHasMoreSets] = useState<boolean>(true);

  // Saved / Bookmarks state
  const [savedOutfitIds, setSavedOutfitIds] = useState<string[]>(['outfit-set1-1']);

  // Modals state
  const [buildModalOpen, setBuildModalOpen] = useState(false);
  const [githubModalOpen, setGithubModalOpen] = useState(false);
  const [vercelModalOpen, setVercelModalOpen] = useState(false);
  const [fiveSecModalOpen, setFiveSecModalOpen] = useState(false);
  const [finalQAModalOpen, setFinalQAModalOpen] = useState(false);
  const [zoomOutfit, setZoomOutfit] = useState<OutfitItem | null>(null);
  const [detailOutfit, setDetailOutfit] = useState<OutfitItem | null>(null);

  // Mobile simulation toggle
  const [isMobileSimulated, setIsMobileSimulated] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Get current lesson
  const currentLesson = useMemo(() => {
    return CLASS_LESSONS.find((l) => l.step === activeStep) || CLASS_LESSONS[0];
  }, [activeStep]);

  // Ten-looks set matching the current outfit's setId (sorted by cutIndex, strictly within set)
  const tenLooksSet = useMemo(() => {
    const matching = allOutfits
      .filter((o) => o.setId === currentOutfit.setId)
      .sort((a, b) => a.cutIndex - b.cutIndex);
    if (matching.length > 0) return matching;
    return [currentOutfit];
  }, [allOutfits, currentOutfit]);

  // Exact filter matcher: strictly no cross-season, no cross-age, no cross-gender fallback
  const handleSeasonChange = (season: Season) => {
    setSelectedSeason(season);
    // Try exact match first
    let match = allOutfits.find((o) => o.season === season && o.gender === selectedGender && o.age === selectedAge);
    // If switching season and no exact match for this age/gender in target season,
    // ensure we safely switch to target season data so we NEVER show another season's images:
    if (!match && currentOutfit.season !== season) {
      match = allOutfits.find((o) => o.season === season && o.gender === selectedGender)
        || allOutfits.find((o) => o.season === season);
    }
    if (match) {
      setCurrentOutfit(match);
    }

    // If in 3-click lesson step 2
    if (activeStep === 2 && threeClickPhase === 'season') {
      setThreeClickPhase('gender_age');
      setTargetId('target-gender-age-filter');
      setTargetLabel('2. 성별 및 연령 필터를 선택하세요');
      showToast('1단계: 계절 선택 완료! 다음으로 성별/연령을 선택하세요.');
    }
  };

  const handleGenderChange = (gender: Gender) => {
    setSelectedGender(gender);
    // Strict exact match only: no cross-gender fallback
    const match = allOutfits.find((o) => o.season === selectedSeason && o.gender === gender && o.age === selectedAge);
    if (match) {
      setCurrentOutfit(match);
    }

    if (activeStep === 2 && threeClickPhase === 'gender_age') {
      setThreeClickPhase('outfit');
      setTargetId('target-main-outfit');
      setTargetLabel('3. 추천 코디 카드를 확인하세요');
      showToast('2단계: 성별/연령 완료! 메인 코디 카드를 확인하세요.');
    }
  };

  const handleAgeChange = (age: AgeGroup) => {
    setSelectedAge(age);
    // Strict exact match only: no cross-age fallback
    const match = allOutfits.find((o) => o.season === selectedSeason && o.gender === selectedGender && o.age === age);
    if (match) {
      setCurrentOutfit(match);
    }

    if (activeStep === 2 && threeClickPhase === 'gender_age') {
      setThreeClickPhase('outfit');
      setTargetId('target-main-outfit');
      setTargetLabel('3. 추천 코디 카드를 확인하세요');
      showToast('2단계: 성별/연령 완료! 메인 코디 카드를 확인하세요.');
    }
  };

  // Synchronize highlight target when activeStep changes
  useEffect(() => {
    if (!learningMode) {
      setTargetId(null);
      return;
    }

    const step = currentLesson.step;
    setIsTargetCompleted(completedSteps.includes(step));

    if (step === 1) {
      setTargetId('target-center-app');
      setTargetLabel('가운데 TodayPick 앱을 확인하세요');
    } else if (step === 2) {
      if (threeClickPhase === 'season') {
        setTargetId('target-season-filter');
        setTargetLabel('1. 계절 필터를 클릭하세요');
      } else if (threeClickPhase === 'gender_age') {
        setTargetId('target-gender-age-filter');
        setTargetLabel('2. 성별/연령을 선택하세요');
      } else if (threeClickPhase === 'outfit') {
        setTargetId('target-main-outfit');
        setTargetLabel('3. 추천 코디를 확인하세요');
      } else {
        setTargetId('target-main-outfit');
        setTargetLabel('3클릭 완료!');
      }
    } else if (step === 3) {
      setTargetId('target-action-save');
      setTargetLabel('저장/공유 액션 버튼을 확인하세요');
    } else if (step === 4) {
      setTargetId('target-landing-sections');
      setTargetLabel('랜딩페이지 5단 구조를 확인하세요');
    } else if (step === 5) {
      setTargetId('target-center-app');
      setTargetLabel('AI Studio Build 코디 영역');
    } else if (step === 6) {
      setTargetId('target-github-card');
      setTargetLabel('GitHub 저장 실습 버튼');
    } else if (step === 7) {
      setTargetId('target-vercel-card');
      setTargetLabel('Vercel 배포 파이프라인');
    } else if (step === 8) {
      setTargetId('target-mobile-preview-btn');
      setTargetLabel('모바일 뷰 전환 점검');
    } else if (step === 9) {
      setTargetId('target-fivesec-card');
      setTargetLabel('5초 테스트 도전하기');
    } else if (step === 10) {
      setTargetId('target-final-qa-card');
      setTargetLabel('최종 점검 10대 체크리스트');
    }
  }, [activeStep, learningMode, currentLesson, threeClickPhase, completedSteps]);

  // Handle interactive element clicks in TodayPick
  const handleElementClick = useCallback((clickedTargetId: string) => {
    if (!learningMode) return;

    // Check step 2 3-click tutorial
    if (activeStep === 2) {
      if (threeClickPhase === 'season' && clickedTargetId === 'target-season-filter') {
        setThreeClickPhase('gender_age');
        setTargetId('target-gender-age-filter');
        setTargetLabel('2. 성별/연령 필터를 선택하세요');
      } else if (threeClickPhase === 'gender_age' && clickedTargetId === 'target-gender-age-filter') {
        setThreeClickPhase('outfit');
        setTargetId('target-main-outfit');
        setTargetLabel('3. 추천 코디 카드를 확인하세요');
      } else if (threeClickPhase === 'outfit' && clickedTargetId === 'target-main-outfit') {
        setThreeClickPhase('done');
        setIsTargetCompleted(true);
        if (!completedSteps.includes(2)) {
          setCompletedSteps((prev) => [...prev, 2]);
        }
        showToast('🎉 3클릭 완성! 단 3번의 클릭으로 코디 추천에 도달했습니다.');
      }
    } else if (activeStep === 1 && clickedTargetId === 'target-center-app') {
      setIsTargetCompleted(true);
      if (!completedSteps.includes(1)) {
        setCompletedSteps((prev) => [...prev, 1]);
      }
    } else if (activeStep === 3 && (clickedTargetId === 'target-action-save' || clickedTargetId === 'target-action-share')) {
      setIsTargetCompleted(true);
      if (!completedSteps.includes(3)) {
        setCompletedSteps((prev) => [...prev, 3]);
      }
      showToast('사용자 여정(선택 → 확인 → 저장) 도달 확인 완료!');
    }
  }, [activeStep, learningMode, threeClickPhase, completedSteps]);

  // Step navigation
  const handleNextStep = () => {
    if (activeStep < CLASS_LESSONS.length) {
      const next = activeStep + 1;
      setActiveStep(next);
      if (!completedSteps.includes(activeStep)) {
        setCompletedSteps((prev) => [...prev, activeStep]);
      }
      if (next === 2) {
        setThreeClickPhase('season');
      }
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSelectLesson = (stepNumber: number) => {
    setLearningMode(true);
    setActiveStep(stepNumber);
    if (stepNumber === 2) {
      setThreeClickPhase('season');
    }
    setMobileMenuOpen(false);
  };

  const handleCompleteStep = (stepNumber: number) => {
    setIsTargetCompleted(true);
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps((prev) => [...prev, stepNumber]);
    }
    showToast(`STEP ${stepNumber} 학습 확인 완료!`);
  };

  // Load more sets (+10 looks)
  const handleLoadMore = () => {
    if (hasMoreSets) {
      setAllOutfits((prev) => [...prev, ...ADDITIONAL_SET_3]);
      setHasMoreSets(false);
      showToast('새로운 봄 룩북 10컷 세트가 추가되었습니다!');
    }
  };

  // Save / bookmark toggle
  const handleToggleSave = (outfit: OutfitItem) => {
    setSavedOutfitIds((prev) => {
      const exists = prev.includes(outfit.id);
      if (exists) {
        showToast('코디 보관함에서 삭제되었습니다.');
        return prev.filter((id) => id !== outfit.id);
      } else {
        showToast('❤️ 마음에 드는 코디로 저장되었습니다!');
        return [...prev, outfit.id];
      }
    });
  };

  // Share outfit
  const handleShare = async (outfit: OutfitItem) => {
    const shareData = {
      title: `TodayPick — ${outfit.title}`,
      text: `오늘의 추천 코디: ${outfit.title} (${outfit.styleCategory})`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast('공유 창이 열렸습니다.');
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard?.writeText(window.location.href);
        showToast('코디 링크가 클립보드에 복사되었습니다.');
      }
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('코디 링크가 클립보드에 복사되었습니다.');
    }
  };

  // Smooth scroll to landing
  const handleScrollToLanding = () => {
    document.getElementById('target-landing-sections')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToApp = () => {
    document.getElementById('target-center-app')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-[#F8F7FC] text-slate-800 transition-all ${isMobileSimulated ? 'max-w-[430px] mx-auto border-x border-slate-300 shadow-2xl my-4 rounded-3xl overflow-hidden' : ''}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Target Guide Ring */}
      {learningMode && (
        <HighlightRing
          targetId={targetId}
          label={targetLabel}
          isCompleted={isTargetCompleted}
          onTargetClick={() => targetId && handleElementClick(targetId)}
        />
      )}

      {/* TOP GLOBAL BAR */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-100 px-4 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl bg-slate-100 text-slate-600"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2 cursor-pointer" onClick={handleScrollToApp}>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-200">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-black text-base sm:text-lg tracking-tight text-slate-900">TodayPick</span>
                <span className="hidden sm:inline-block ml-2 text-[11px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                  오늘 뭐 입지?
                </span>
              </div>
            </div>
          </div>

          {/* Center Quick Nav for fast access */}
          <div className="hidden md:flex items-center gap-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setCurrentTab('today');
                handleScrollToApp();
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                currentTab === 'today' ? 'bg-purple-100 text-purple-700 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              오늘뭐입지
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentTab('top');
                document.getElementById('target-top20')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
            >
              TOP 코디 20
            </button>
            <button
              type="button"
              onClick={handleScrollToLanding}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
            >
              TodayPick 소개
            </button>
          </div>

          {/* Right Controls: Learning Mode Switch & Mobile View Simulator */}
          <div className="flex items-center gap-2">
            {/* Mobile View Simulator Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileSimulated(!isMobileSimulated)}
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isMobileSimulated
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="모바일 뷰포트 시뮬레이션 전환"
            >
              {isMobileSimulated ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
              <span>{isMobileSimulated ? '데스크톱 뷰' : '모바일 뷰'}</span>
            </button>

            {/* Learning Mode Toggle */}
            <button
              type="button"
              onClick={() => setLearningMode(!learningMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                learningMode
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>실습 모드 {learningMode ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER FOR SIDEBAR MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full p-4 overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <span className="font-bold text-slate-900 text-sm">메뉴 및 실습 순서</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <LeftSidebar
              currentTab={currentTab}
              onSelectTab={(tab) => {
                setCurrentTab(tab);
                setMobileMenuOpen(false);
                if (tab === 'about') handleScrollToLanding();
              }}
              savedCount={savedOutfitIds.length}
              learningMode={learningMode}
              onToggleLearningMode={() => setLearningMode(!learningMode)}
              activeStep={activeStep}
              completedSteps={completedSteps}
              onSelectLesson={handleSelectLesson}
            />
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* MAIN CONTAINER: 3-COLUMN DESKTOP LAYOUT (Left 18-20%, Center 50-55%, Right 25-30%) */}
      <main className="max-w-[1600px] mx-auto px-3 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: NAVIGATION + CLASS MENU (approx 20% on desktop: 2.5 of 12 cols, or 3 cols) */}
          <div className="hidden lg:block lg:col-span-3 space-y-4 sticky top-20 max-h-[calc(100vh-100px)]">
            <LeftSidebar
              currentTab={currentTab}
              onSelectTab={(tab) => {
                setCurrentTab(tab);
                if (tab === 'about') handleScrollToLanding();
              }}
              savedCount={savedOutfitIds.length}
              learningMode={learningMode}
              onToggleLearningMode={() => setLearningMode(!learningMode)}
              activeStep={activeStep}
              completedSteps={completedSteps}
              onSelectLesson={handleSelectLesson}
            />

            {/* In desktop mode, if learning mode is active, show lesson card right below menu */}
            {learningMode && (
              <div className="mt-4">
                <LessonPanel
                  currentLesson={currentLesson}
                  currentStep={activeStep}
                  totalSteps={CLASS_LESSONS.length}
                  isCompleted={completedSteps.includes(activeStep)}
                  onNextStep={handleNextStep}
                  onPrevStep={handlePrevStep}
                  onClose={() => setLearningMode(false)}
                  onCompleteStep={handleCompleteStep}
                  onOpenBuildInspect={() => setBuildModalOpen(true)}
                  onOpenGithubModal={() => setGithubModalOpen(true)}
                  onOpenVercelModal={() => setVercelModalOpen(true)}
                  onToggleMobilePreview={() => setIsMobileSimulated(!isMobileSimulated)}
                  isMobilePreviewActive={isMobileSimulated}
                  onOpenFiveSecTest={() => setFiveSecModalOpen(true)}
                  onOpenFinalQA={() => setFinalQAModalOpen(true)}
                  onScrollToLanding={handleScrollToLanding}
                  threeClickPhase={threeClickPhase}
                />
              </div>
            )}
          </div>

          {/* CENTER COLUMN: TODAYPICK INTERACTIVE APP (50-55% visual dominance: 6 of 12 cols) */}
          <div className="col-span-1 lg:col-span-6 space-y-6">
            <TodayPickCenter
              currentOutfit={currentOutfit}
              tenLooksSet={tenLooksSet}
              allSets={allOutfits}
              viewMode={viewMode}
              onToggleViewMode={(mode) => setViewMode(mode)}
              onSelectOutfit={(outfit) => setCurrentOutfit(outfit)}
              onLoadMore={handleLoadMore}
              hasMoreSets={hasMoreSets}
              isSaved={savedOutfitIds.includes(currentOutfit.id)}
              onToggleSave={handleToggleSave}
              onShare={handleShare}
              onZoomModal={(outfit) => setZoomOutfit(outfit)}
              onDetailModal={(outfit) => setDetailOutfit(outfit)}
              onElementClick={handleElementClick}
              selectedSeason={selectedSeason}
              onChangeSeason={handleSeasonChange}
              selectedGender={selectedGender}
              onChangeGender={handleGenderChange}
              selectedAge={selectedAge}
              onChangeAge={handleAgeChange}
            />
          </div>

          {/* RIGHT COLUMN: TOP 코디 20 (approx 25%: 3 of 12 cols) */}
          <div className="col-span-1 lg:col-span-3 space-y-4 lg:sticky lg:top-20">
            <Top20Panel
              outfits={TOP_20_OUTFITS}
              selectedOutfitId={currentOutfit.id}
              onSelectOutfit={(outfit) => {
                setCurrentOutfit(outfit);
                handleScrollToApp();
                showToast(`TOP 20 코디 '${outfit.title}' 적용되었습니다.`);
              }}
            />
          </div>
        </div>

        {/* MOBILE LEARNING FLOATING BOTTOM SHEET (Visible on small screens when learning mode is active) */}
        {learningMode && (
          <div className="lg:hidden fixed bottom-3 left-3 right-3 z-40">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl border-2 border-purple-300 shadow-2xl p-3">
              <div
                className="flex items-center justify-between cursor-pointer pb-2"
                onClick={() => setMobileLessonSheetOpen(!mobileLessonSheetOpen)}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {String(currentLesson.step).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{currentLesson.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-purple-600 font-bold">
                    {activeStep} / {CLASS_LESSONS.length}
                  </span>
                  {mobileLessonSheetOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {mobileLessonSheetOpen && (
                <div className="pt-2 border-t border-slate-100">
                  <LessonPanel
                    currentLesson={currentLesson}
                    currentStep={activeStep}
                    totalSteps={CLASS_LESSONS.length}
                    isCompleted={completedSteps.includes(activeStep)}
                    onNextStep={handleNextStep}
                    onPrevStep={handlePrevStep}
                    onClose={() => setLearningMode(false)}
                    onCompleteStep={handleCompleteStep}
                    onOpenBuildInspect={() => setBuildModalOpen(true)}
                    onOpenGithubModal={() => setGithubModalOpen(true)}
                    onOpenVercelModal={() => setVercelModalOpen(true)}
                    onToggleMobilePreview={() => setIsMobileSimulated(!isMobileSimulated)}
                    isMobilePreviewActive={isMobileSimulated}
                    onOpenFiveSecTest={() => setFiveSecModalOpen(true)}
                    onOpenFinalQA={() => setFinalQAModalOpen(true)}
                    onScrollToLanding={handleScrollToLanding}
                    threeClickPhase={threeClickPhase}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* LOWER LANDING PAGE SECTIONS (Hero, Problem, Solution, Social Proof, FAQ, CTA) */}
        <LandingSections onScrollToApp={handleScrollToApp} />
      </main>

      {/* PRACTICE MODALS */}
      <BuildInspectorModal isOpen={buildModalOpen} onClose={() => setBuildModalOpen(false)} />
      <GithubFlowModal isOpen={githubModalOpen} onClose={() => setGithubModalOpen(false)} />
      <VercelFlowModal isOpen={vercelModalOpen} onClose={() => setVercelModalOpen(false)} />
      <FiveSecTestModal isOpen={fiveSecModalOpen} onClose={() => setFiveSecModalOpen(false)} />
      <FinalQAModal
        isOpen={finalQAModalOpen}
        onClose={() => setFinalQAModalOpen(false)}
        onCompleteAll={() => {
          setCompletedSteps([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
          showToast('🎓 축하합니다! TodayPick 웹사이트 제작 실습을 전 과정 수료하셨습니다!');
        }}
      />
      <OutfitDetailModal
        isOpen={!!detailOutfit}
        outfit={detailOutfit}
        onClose={() => setDetailOutfit(null)}
      />
      <OutfitZoomModal
        isOpen={!!zoomOutfit}
        outfit={zoomOutfit}
        onClose={() => setZoomOutfit(null)}
      />
    </div>
  );
}
