import React from 'react';
import {
  Sparkles,
  Shirt,
  Flame,
  Bookmark,
  Info,
  UtensilsCrossed,
  Compass,
  GraduationCap,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Eye,
  EyeOff
} from 'lucide-react';
import { CLASS_LESSONS } from '../data/lessons';

interface LeftSidebarProps {
  currentTab: 'today' | 'top' | 'saved' | 'about';
  onSelectTab: (tab: 'today' | 'top' | 'saved' | 'about') => void;
  savedCount: number;
  learningMode: boolean;
  onToggleLearningMode: () => void;
  activeStep: number;
  completedSteps: number[];
  onSelectLesson: (stepNumber: number) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  learningMode,
  onToggleLearningMode,
  activeStep,
  completedSteps,
  onSelectLesson,
}) => {
  return (
    <aside
      id="target-left-menu"
      className="w-full h-full flex flex-col bg-white border-r border-slate-100 rounded-2xl p-4 shadow-sm"
    >
      {/* Brand Logo & Tagline */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg tracking-tight text-slate-900">TodayPick</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-100">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">AI 라이프스타일 큐레이터</p>
          </div>
        </div>
      </div>

      {/* Main Service Navigation */}
      <div className="mb-6">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2 px-2">
          서비스 메뉴
        </p>
        <nav className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectTab('today')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              currentTab === 'today'
                ? 'bg-purple-50 text-purple-700 font-bold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Shirt className="w-4 h-4" />
              오늘뭐입지
            </span>
            <span className="w-2 h-2 rounded-full bg-purple-600" />
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('top')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              currentTab === 'top'
                ? 'bg-purple-50 text-purple-700 font-bold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Flame className="w-4 h-4 text-orange-500" />
              TOP 코디
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
              20
            </span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('saved')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              currentTab === 'saved'
                ? 'bg-purple-50 text-purple-700 font-bold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Bookmark className="w-4 h-4 text-purple-500" />
              내 코디 (보관함)
            </span>
            {savedCount > 0 && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-600 text-white font-bold">
                {savedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('about')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              currentTab === 'about'
                ? 'bg-purple-50 text-purple-700 font-bold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Info className="w-4 h-4" />
              TodayPick 소개
            </span>
          </button>
        </nav>

        {/* Future Modules */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 px-2">
            출시 예정 (Future)
          </p>
          <div className="space-y-1 opacity-70">
            <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 bg-slate-50/70">
              <span className="flex items-center gap-2">
                <UtensilsCrossed className="w-3.5 h-3.5 text-slate-500" />
                오늘뭐먹지
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">
                Coming Soon
              </span>
            </div>

            <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 bg-slate-50/70">
              <span className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-slate-500" />
                오늘뭐하지
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SEPARATED LEARNING / CLASS PRACTICE SECTION */}
      <div className="mt-auto pt-4 border-t-2 border-purple-100">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-purple-600" />
            <h3 className="text-xs font-bold text-slate-900">웹사이트 제작 실습</h3>
          </div>
          <button
            type="button"
            onClick={onToggleLearningMode}
            className="flex items-center gap-1 text-[11px] font-medium text-purple-600 hover:text-purple-800 transition-colors"
            title={learningMode ? '실습 모드 끄기' : '실습 모드 켜기'}
          >
            {learningMode ? (
              <>
                <Eye className="w-3 h-3" />
                <span>ON</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3 text-slate-400" />
                <span className="text-slate-400">OFF</span>
              </>
            )}
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-3 px-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span>수업 진행 순서</span>
            <span className="font-bold text-purple-600">
              {completedSteps.length} / {CLASS_LESSONS.length} 완료
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.length / CLASS_LESSONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step buttons list */}
        <div className="space-y-1 max-h-[260px] overflow-y-auto custom-scrollbar pr-1">
          {CLASS_LESSONS.map((lesson) => {
            const isCurrent = learningMode && activeStep === lesson.step;
            const isDone = completedSteps.includes(lesson.step);

            return (
              <button
                key={lesson.step}
                type="button"
                onClick={() => onSelectLesson(lesson.step)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all text-left ${
                  isCurrent
                    ? 'bg-purple-600 text-white font-bold shadow-sm shadow-purple-200'
                    : isDone
                    ? 'bg-emerald-50/80 text-emerald-800 hover:bg-emerald-100/70'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`font-mono text-[11px] px-1 py-0.5 rounded ${
                      isCurrent
                        ? 'bg-purple-700 text-white'
                        : isDone
                        ? 'bg-emerald-100 text-emerald-700 font-bold'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {String(lesson.step).padStart(2, '0')}
                  </span>
                  <span className="truncate">{lesson.title}</span>
                </div>

                {isDone ? (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 flex-shrink-0 ${
                      isCurrent ? 'text-white' : 'text-emerald-600'
                    }`}
                  />
                ) : (
                  <ChevronRight
                    className={`w-3 h-3 flex-shrink-0 ${
                      isCurrent ? 'text-white' : 'text-slate-300'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-3 p-2 bg-purple-50/60 rounded-xl border border-purple-100 text-[11px] text-purple-900 leading-snug">
          💡 각 스텝을 클릭하면 화면에 <strong>인터랙티브 안내 링</strong>이 나타나 실제 기획 및 구현 원리를 학습합니다.
        </div>
      </div>
    </aside>
  );
};
