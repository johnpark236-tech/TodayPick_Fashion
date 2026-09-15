import React from 'react';
import {
  GraduationCap,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  CheckCircle2,
  Play,
  ArrowRight,
  Layers,
  GitBranch,
  Rocket,
  Smartphone,
  Timer,
  ClipboardCheck
} from 'lucide-react';
import { LessonStep } from '../types';

interface LessonPanelProps {
  currentLesson: LessonStep;
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
  onNextStep: () => void;
  onPrevStep: () => void;
  onClose: () => void;
  onCompleteStep: (stepNumber: number) => void;
  // Interactive tool triggers
  onOpenBuildInspect: () => void;
  onOpenGithubModal: () => void;
  onOpenVercelModal: () => void;
  onToggleMobilePreview: () => void;
  isMobilePreviewActive: boolean;
  onOpenFiveSecTest: () => void;
  onOpenFinalQA: () => void;
  onScrollToLanding: () => void;
  threeClickPhase?: 'season' | 'gender_age' | 'outfit' | 'done';
}

export const LessonPanel: React.FC<LessonPanelProps> = ({
  currentLesson,
  currentStep,
  totalSteps,
  isCompleted,
  onNextStep,
  onPrevStep,
  onClose,
  onCompleteStep,
  onOpenBuildInspect,
  onOpenGithubModal,
  onOpenVercelModal,
  onToggleMobilePreview,
  isMobilePreviewActive,
  onOpenFiveSecTest,
  onOpenFinalQA,
  onScrollToLanding,
  threeClickPhase = 'season',
}) => {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border-2 border-purple-200 shadow-xl p-4 sm:p-5 relative transition-all">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-100">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs font-black">
            {String(currentLesson.step).padStart(2, '0')}
          </span>
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-purple-600">
              STEP {String(currentLesson.step).padStart(2, '0')} / {totalSteps}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              {currentLesson.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {isCompleted && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <CheckCircle2 className="w-3.5 h-3.5" />
              학습 완료
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="실습 패널 닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="space-y-3 text-xs">
        {/* Short Summary (Concise, not textbook-like) */}
        <div className="p-2.5 bg-purple-50/70 rounded-xl border border-purple-100">
          <p className="font-semibold text-purple-900 leading-relaxed">
            "{currentLesson.summary}"
          </p>
        </div>

        {/* Concept description */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            핵심 개념
          </span>
          <p className="text-slate-600 leading-relaxed">
            {currentLesson.concept}
          </p>
        </div>

        {/* TodayPick Application */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            TodayPick 적용 사례
          </span>
          <ul className="space-y-1">
            {currentLesson.application.map((app, index) => (
              <li key={index} className="flex items-start gap-1.5 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 flex-shrink-0" />
                <span>{app}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lesson 2 (3-Click Rule) Progress Tracker */}
        {currentLesson.step === 2 && (
          <div className="p-2.5 bg-indigo-50/70 rounded-xl border border-indigo-100 text-[11px]">
            <span className="font-bold text-indigo-900 block mb-1.5">🎯 3클릭 실시간 달성도:</span>
            <div className="grid grid-cols-3 gap-1 text-center font-semibold">
              <div className={`py-1 rounded ${threeClickPhase !== 'season' ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white animate-pulse'}`}>
                1. 계절 필터
              </div>
              <div className={`py-1 rounded ${threeClickPhase === 'outfit' || threeClickPhase === 'done' ? 'bg-emerald-500 text-white' : threeClickPhase === 'gender_age' ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-200 text-slate-500'}`}>
                2. 성별/연령
              </div>
              <div className={`py-1 rounded ${threeClickPhase === 'done' ? 'bg-emerald-500 text-white' : threeClickPhase === 'outfit' ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-200 text-slate-500'}`}>
                3. 코디 확인
              </div>
            </div>
          </div>
        )}

        {/* Interactive Action Buttons per lesson */}
        <div className="pt-1">
          {currentLesson.step === 4 && (
            <button
              type="button"
              onClick={onScrollToLanding}
              className="w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <ArrowRight className="w-4 h-4" />
              랜딩페이지 5단 구조 스크롤 확인
            </button>
          )}

          {currentLesson.step === 5 && (
            <button
              type="button"
              onClick={onOpenBuildInspect}
              className="w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Layers className="w-4 h-4" />
              AI Studio Build 컴포넌트 아키텍처 보기
            </button>
          )}

          {currentLesson.step === 6 && (
            <button
              type="button"
              id="target-github-card"
              onClick={onOpenGithubModal}
              className="w-full py-2 px-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <GitBranch className="w-4 h-4 text-emerald-400" />
              GitHub 저장 및 버전 기록 프로세스 열기
            </button>
          )}

          {currentLesson.step === 7 && (
            <button
              type="button"
              id="target-vercel-card"
              onClick={onOpenVercelModal}
              className="w-full py-2 px-3 bg-black hover:bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Rocket className="w-4 h-4 text-sky-400" />
              Vercel 3단계 배포 파이프라인 열기
            </button>
          )}

          {currentLesson.step === 8 && (
            <button
              type="button"
              id="target-mobile-preview-btn"
              onClick={onToggleMobilePreview}
              className={`w-full py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all ${
                isMobilePreviewActive
                  ? 'bg-emerald-600 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              {isMobilePreviewActive ? '모바일 시뮬레이터 종료 (기본 뷰)' : '모바일 뷰포트 시뮬레이션 전환'}
            </button>
          )}

          {currentLesson.step === 9 && (
            <button
              type="button"
              id="target-fivesec-card"
              onClick={onOpenFiveSecTest}
              className="w-full py-2 px-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Timer className="w-4 h-4" />
              5초 테스트 카드 열기 & 도전
            </button>
          )}

          {currentLesson.step === 10 && (
            <button
              type="button"
              id="target-final-qa-card"
              onClick={onOpenFinalQA}
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <ClipboardCheck className="w-4 h-4" />
              최종 점검 10대 체크리스트 열기
            </button>
          )}
        </div>

        {/* What to inspect instruction */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 font-medium">
            🎯 <span className="text-purple-700 font-semibold">{currentLesson.instruction}</span>
          </div>
          {!isCompleted && (
            <button
              type="button"
              onClick={() => onCompleteStep(currentLesson.step)}
              className="text-[11px] text-purple-600 hover:text-purple-800 font-bold underline"
            >
              직접 확인 완료
            </button>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-purple-100">
        <button
          type="button"
          onClick={onPrevStep}
          disabled={currentStep <= 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          이전 단계
        </button>

        <span className="text-[11px] font-mono font-bold text-purple-700">
          {currentStep} / {totalSteps}
        </span>

        <button
          type="button"
          onClick={onNextStep}
          disabled={currentStep >= totalSteps}
          className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          다음 단계
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
