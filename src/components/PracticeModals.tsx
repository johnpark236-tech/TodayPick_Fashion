import React, { useState, useEffect } from 'react';
import {
  X,
  Layers,
  GitBranch,
  Rocket,
  Timer,
  CheckCircle2,
  Check,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Award,
  Maximize2,
  Bookmark,
  Share2,
  Shirt,
  Scissors
} from 'lucide-react';
import { OutfitItem } from '../types';

// 1. Build Component Architecture Inspector Modal (Lesson 05)
export const BuildInspectorModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const components = [
    { name: 'App.tsx', role: '전체 애플리케이션 진입점 및 전역 상태 오케스트레이션' },
    { name: 'LeftSidebar', role: '브랜드 로고, 서비스 메인 메뉴 및 10단계 실습 진행 순서' },
    { name: 'TodayPickCenter', role: '시간대 인사말, 3클릭 필터, 1컷/10컷 뷰, 고해상도 메인 코디' },
    { name: 'Top20Panel', role: '실시간 인기 코디 20종 스크롤 랭킹 및 1클릭 센터 연동' },
    { name: 'LandingSections', role: 'Hero → Problem → Solution → Social Proof → FAQ 5단 전환 구조' },
    { name: 'HighlightRing', role: '학습 단계 타겟 DOM 엘리먼트 자동 추적 및 펄스 링 렌더러' },
    { name: 'LessonPanel', role: '단계별 핵심 개념, 실무 적용 사례 및 대화형 튜토리얼 제어기' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-purple-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">AI Studio Build 아키텍처</h3>
              <p className="text-xs text-slate-600">Google AI Studio Build 컴포넌트 모듈화 구조</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            Google AI Studio Build는 하나의 거대한 단일 파일로 코드를 작성하지 않고,
            <strong> 독립적인 관심사를 가진 컴포넌트</strong>로 분리하여 유지보수성과 빌드 안정성을 보장합니다.
          </p>

          <div className="space-y-2">
            {components.map((comp, i) => (
              <div key={i} className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 flex items-start gap-3">
                <span className="font-mono font-bold text-purple-700 bg-white px-2 py-0.5 rounded shadow-xs border border-purple-100">
                  {comp.name}
                </span>
                <span className="text-slate-700 flex-1 leading-normal">{comp.role}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900 text-[11px] leading-relaxed">
            💡 프롬프트로 생성된 화면을 실시간 프리뷰에서 확인하며 즉시 수정하고 검증할 수 있습니다.
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs shadow-sm"
          >
            확인 완료
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. GitHub Version Control Simulation Modal (Lesson 06)
export const GithubFlowModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [gitStep, setGitStep] = useState<'modify' | 'commit' | 'push' | 'done'>('modify');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <GitBranch className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">GitHub 버전 관리 실습</h3>
              <p className="text-xs text-slate-600">수정 → Commit → Push 파이프라인</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl text-slate-700 leading-relaxed">
            GitHub는 웹사이트의 소스코드와 모든 수정 이력을 안전하게 기록하는 원격 저장소입니다.
            (※ 실제 계정 연결 없이도 동작 원리를 완전히 체험할 수 있습니다.)
          </div>

          {/* Interactive Pipeline */}
          <div className="grid grid-cols-3 gap-2 text-center font-bold">
            <div className={`p-3 rounded-xl border ${gitStep === 'modify' ? 'bg-purple-50 border-purple-500 text-purple-700 ring-2 ring-purple-200' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
              <span className="block text-[10px] text-slate-600">STEP 1</span>
              1. 코드 수정
            </div>
            <div className={`p-3 rounded-xl border ${gitStep === 'commit' ? 'bg-purple-50 border-purple-500 text-purple-700 ring-2 ring-purple-200' : gitStep === 'push' || gitStep === 'done' ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
              <span className="block text-[10px] text-slate-600">STEP 2</span>
              2. Commit
            </div>
            <div className={`p-3 rounded-xl border ${gitStep === 'push' || gitStep === 'done' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-200' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
              <span className="block text-[10px] text-slate-600">STEP 3</span>
              3. Push to Main
            </div>
          </div>

          <div className="bg-slate-900 text-emerald-400 p-3 rounded-xl font-mono text-[11px] leading-relaxed">
            {gitStep === 'modify' && '$ git status\n> modified: src/App.tsx (TodayPick UI 업데이트)'}
            {gitStep === 'commit' && '$ git commit -m "feat: TodayPick 3클릭 룩북 및 반응형 완성"\n> [main e7b2a19] 1 file changed, 45 insertions'}
            {(gitStep === 'push' || gitStep === 'done') && '$ git push origin main\n> To github.com/user/todaypick.git\n> * [new branch] main -> main\n> ✓ 동기화 완료!'}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500 font-medium">
              현재 상태: {gitStep === 'done' ? '원격 저장소 동기화 완료' : '진행 중'}
            </span>

            {gitStep === 'modify' && (
              <button
                onClick={() => setGitStep('commit')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold"
              >
                커밋 생성하기 (Commit)
              </button>
            )}
            {gitStep === 'commit' && (
              <button
                onClick={() => setGitStep('push')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold"
              >
                원격 푸시하기 (Push)
              </button>
            )}
            {(gitStep === 'push' || gitStep === 'done') && (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold"
              >
                학습 완료
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Vercel Deployment Pipeline Simulation Modal (Lesson 07)
export const VercelFlowModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [deployStep, setDeployStep] = useState<number>(1);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);

  const startDeploy = () => {
    setIsDeploying(true);
    setDeployStep(1);
    setTimeout(() => setDeployStep(2), 1000);
    setTimeout(() => setDeployStep(3), 2200);
    setTimeout(() => {
      setDeployStep(4);
      setIsDeploying(false);
    }, 3200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center">
              <Rocket className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Vercel 배포 파이프라인</h3>
              <p className="text-xs text-slate-600">GitHub 레포지토리 → 글로벌 CDN 라이브 배포</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            Vercel은 GitHub의 main 브랜치에 코드가 푸시되면 자동으로 빌드(Build) 및 검증을 거쳐
            전 세계 사용자가 접속 가능한 고유 URL로 즉시 배포합니다.
          </p>

          {/* 4-Step Diagram */}
          <div className="space-y-2">
            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${deployStep >= 1 ? 'bg-purple-50 border-purple-200 text-purple-900 font-bold' : 'bg-slate-50 text-slate-400'}`}>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">1</span>
                <span>GitHub Repository 연결 및 감지</span>
              </div>
              {deployStep >= 1 && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${deployStep >= 2 ? 'bg-purple-50 border-purple-200 text-purple-900 font-bold' : 'bg-slate-50 text-slate-400'}`}>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">2</span>
                <span>Vite Production Build (TypeScript 컴파일)</span>
              </div>
              {deployStep >= 2 && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${deployStep >= 3 ? 'bg-purple-50 border-purple-200 text-purple-900 font-bold' : 'bg-slate-50 text-slate-400'}`}>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">3</span>
                <span>Global Edge CDN 배포 및 도메인 바인딩</span>
              </div>
              {deployStep >= 3 && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${deployStep >= 4 ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-slate-50 text-slate-400'}`}>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">4</span>
                <span>Live URL: <span className="font-mono text-emerald-700 underline">todaypick.vercel.app</span></span>
              </div>
              {deployStep >= 4 && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={startDeploy}
              disabled={isDeploying}
              className="px-4 py-2.5 bg-black hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              <Rocket className="w-4 h-4 text-sky-400" />
              {isDeploying ? '배포 파이프라인 가동 중...' : '원클릭 배포 시뮬레이션 시작'}
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold"
            >
              학습 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. 5-Second Test Modal (Lesson 09)
export const FiveSecTestModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [seconds, setSeconds] = useState(5);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSeconds(5);
      setRevealed(false);
      return;
    }

    if (seconds > 0 && !revealed) {
      const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
      return () => clearTimeout(timer);
    } else if (seconds === 0) {
      setRevealed(true);
    }
  }, [isOpen, seconds, revealed]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-purple-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Timer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">5초 테스트 (5-Second Test)</h3>
              <p className="text-xs text-slate-600">첫 화면만 보고 5초 안에 3대 질문 답하기</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          {/* Timer Circle */}
          <div className="text-center py-2">
            <span className={`text-4xl font-black font-mono ${seconds > 0 ? 'text-purple-600 animate-pulse' : 'text-emerald-600'}`}>
              0{seconds}s
            </span>
            <p className="text-xs text-slate-500 mt-1">
              {seconds > 0 ? '첫 화면을 머릿속에 떠올리며 아래 3가지 질문에 답해보세요.' : '5초 경과! 표준 모범 답안을 확인하세요.'}
            </p>
          </div>

          {/* 3 Questions */}
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-800">Q1. 무엇을 하는 서비스인가요?</p>
              {revealed ? (
                <p className="mt-1 text-purple-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  정답: AI 기반 실시간 계절별 코디 추천 서비스
                </p>
              ) : (
                <p className="mt-1 text-slate-400 italic">5초 후 정답 공개...</p>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-800">Q2. 누구를 위한 서비스인가요?</p>
              {revealed ? (
                <p className="mt-1 text-purple-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  정답: 매일 아침 옷 고르기가 고민인 10대~60대 남녀 모두
                </p>
              ) : (
                <p className="mt-1 text-slate-400 italic">5초 후 정답 공개...</p>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-800">Q3. 사용자는 무엇을 눌러야 하나요?</p>
              {revealed ? (
                <p className="mt-1 text-purple-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  정답: 계절/성별/연령 필터 탭 후 추천 코디 확인
                </p>
              ) : (
                <p className="mt-1 text-slate-400 italic">5초 후 정답 공개...</p>
              )}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            {!revealed && (
              <button
                onClick={() => setRevealed(true)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
              >
                지금 정답 확인
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold"
            >
              5초 테스트 통과!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. Final QA Checklist Modal (Lesson 10)
export const FinalQAModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCompleteAll: () => void;
}> = ({ isOpen, onClose, onCompleteAll }) => {
  const [checks, setChecks] = useState<Record<string, boolean>>({
    '3click': true,
    '5sec': true,
    mobile: true,
    cta: true,
    image: true,
    menu: true,
    more: true,
    views: true,
    top20: true,
    brand: true,
  });

  const toggleCheck = (key: string) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecked = Object.values(checks).every(Boolean);

  if (!isOpen) return null;

  const items = [
    { key: '3click', label: '3클릭 규칙 준수 (계절 → 성별/연령 → 코디 확인 완료)' },
    { key: '5sec', label: '5초 테스트 통과 (서비스 정체성 및 행동 타겟 즉시 인지)' },
    { key: 'mobile', label: '모바일 반응형 최적화 (가로 오버플로우 없음, 터치 44px 이상)' },
    { key: 'cta', label: 'CTA 명확성 ([오늘 코디 보기] 주요 행동 유도)' },
    { key: 'image', label: '이미지 깨짐 없음 (고해상도 최적화 패션 룩북 데이터셋)' },
    { key: 'menu', label: '메뉴 단순성 (불필요한 depth 배제 및 직관적 구조)' },
    { key: 'more', label: '더보기 동작 정상 (+10컷 세트 경계 보존)' },
    { key: 'views', label: '1컷 보기 / 10개 코디 보기 상호 연동 정상' },
    { key: 'top20', label: 'TOP 20 코디 카드 클릭 시 센터 즉시 업데이트' },
    { key: 'brand', label: 'TodayPick 정체성 (AI 라이프스타일 큐레이션) 확립' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-purple-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">최종 점검 10대 체크리스트</h3>
              <p className="text-xs text-slate-600">출시 전 실무 검증 체크리스트</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-2 text-xs">
          {items.map((item) => {
            const isChecked = checks[item.key];
            return (
              <label
                key={item.key}
                onClick={() => toggleCheck(item.key)}
                className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-semibold'
                    : 'bg-slate-50 border-slate-100 text-slate-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="flex-1">{item.label}</span>
              </label>
            );
          })}
        </div>

        {allChecked && (
          <div className="mt-4 p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-center space-y-1">
            <div className="flex items-center justify-center gap-1 font-black text-sm">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              🎉 축하합니다! 모든 웹사이트 실습 점검 완료!
            </div>
            <p className="text-[11px] text-purple-100">
              기획부터 3클릭 규칙, 아키텍처, 배포, QA까지 성공적으로 실습을 마쳤습니다.
            </p>
          </div>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={() => {
              onCompleteAll();
              onClose();
            }}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md"
          >
            실습 완료 승인하기
          </button>
        </div>
      </div>
    </div>
  );
};

// 6. Outfit Detail Pieces Modal
export const OutfitDetailModal: React.FC<{
  isOpen: boolean;
  outfit: OutfitItem | null;
  onClose: () => void;
}> = ({ isOpen, outfit, onClose }) => {
  if (!isOpen || !outfit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Shirt className="w-4 h-4 text-purple-600" />
            착용 아이템 상세 명세서
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl space-y-2">
            {outfit.pieces.outer && (
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="font-semibold text-slate-500">아우터 (Outer)</span>
                <span className="font-bold text-slate-900">{outfit.pieces.outer}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="font-semibold text-slate-500">상의 (Top)</span>
              <span className="font-bold text-slate-900">{outfit.pieces.top}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="font-semibold text-slate-500">하의 (Bottom)</span>
              <span className="font-bold text-slate-900">{outfit.pieces.bottom}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="font-semibold text-slate-500">신발 (Shoes)</span>
              <span className="font-bold text-slate-900">{outfit.pieces.shoes}</span>
            </div>
            {outfit.pieces.accessory && (
              <div className="flex justify-between py-1">
                <span className="font-semibold text-slate-500">악세서리 (Acc)</span>
                <span className="font-bold text-slate-900">{outfit.pieces.accessory}</span>
              </div>
            )}
          </div>

          <div className="p-3 bg-purple-50 rounded-xl">
            <span className="text-purple-900 font-bold block mb-1">스타일링 팁:</span>
            <p className="text-purple-800 leading-relaxed">{outfit.description}</p>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-purple-600 text-white rounded-xl font-bold text-xs"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

// 7. Outfit Zoom Modal
export const OutfitZoomModal: React.FC<{
  isOpen: boolean;
  outfit: OutfitItem | null;
  onClose: () => void;
}> = ({ isOpen, outfit, onClose }) => {
  if (!isOpen || !outfit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="aspect-[4/5] bg-black">
          <img
            src={outfit.imageUrl}
            alt={outfit.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-4 bg-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">{outfit.title}</h3>
            <p className="text-xs text-slate-500">{outfit.styleCategory} · {outfit.tempRange}</p>
          </div>
          <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            SET: {outfit.setId} #{outfit.cutIndex}
          </span>
        </div>
      </div>
    </div>
  );
};
