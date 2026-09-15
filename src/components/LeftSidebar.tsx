import React from 'react';
import { Sparkles, Shirt, Flame, Bookmark, Info, UtensilsCrossed, Compass } from 'lucide-react';

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

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ currentTab, onSelectTab, savedCount }) => (
  <aside id="target-left-menu" className="w-full h-full flex flex-col bg-white border-r border-slate-100 rounded-2xl p-4 shadow-sm">
    <div className="flex items-center justify-between pb-4 mb-3 border-b border-slate-100">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-200"><Sparkles className="w-5 h-5" /></div>
        <div>
          <div className="flex items-center gap-1.5"><span className="font-black text-lg tracking-tight text-slate-900">TodayPick</span><span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-100">PRO</span></div>
          <p className="text-[11px] text-slate-600 font-medium">AI 라이프스타일 큐레이터</p>
        </div>
      </div>
    </div>

    <div className="mb-6">
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2 px-2">서비스 메뉴</p>
      <nav className="space-y-1">
        <button type="button" onClick={() => onSelectTab('today')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${currentTab === 'today' ? 'bg-purple-50 text-purple-700 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}><span className="flex items-center gap-2.5"><Shirt className="w-4 h-4" />오늘뭐입지</span><span className="w-2 h-2 rounded-full bg-purple-600" /></button>
        <button type="button" onClick={() => onSelectTab('top')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${currentTab === 'top' ? 'bg-purple-50 text-purple-700 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}><span className="flex items-center gap-2.5"><Flame className="w-4 h-4 text-orange-500" />TOP 코디</span><span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">20</span></button>
        <button type="button" onClick={() => onSelectTab('saved')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${currentTab === 'saved' ? 'bg-purple-50 text-purple-700 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}><span className="flex items-center gap-2.5"><Bookmark className="w-4 h-4 text-purple-500" />내 코디 (보관함)</span>{savedCount > 0 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-600 text-white font-bold">{savedCount}</span>}</button>
        <button type="button" onClick={() => onSelectTab('about')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${currentTab === 'about' ? 'bg-purple-50 text-purple-700 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}><span className="flex items-center gap-2.5"><Info className="w-4 h-4" />TodayPick 소개</span></button>
      </nav>
      <div className="mt-4 pt-3 border-t border-slate-100">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 px-2">출시 예정 (Future)</p>
        <div className="space-y-1 opacity-70">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 bg-slate-50/70"><span className="flex items-center gap-2"><UtensilsCrossed className="w-3.5 h-3.5 text-slate-500" />오늘뭐먹지</span><span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">Coming Soon</span></div>
          <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 bg-slate-50/70"><span className="flex items-center gap-2"><Compass className="w-3.5 h-3.5 text-slate-500" />오늘뭐하지</span><span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">Coming Soon</span></div>
        </div>
      </div>
    </div>
  </aside>
);
