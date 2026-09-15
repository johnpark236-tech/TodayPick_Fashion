import React, { useState } from 'react';
import {
  Sparkles,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ArrowUp,
  Shirt,
  Compass,
  UtensilsCrossed,
  Layers,
  Heart,
  Calendar,
  Users,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface LandingSectionsProps {
  onScrollToApp: () => void;
}

export const LandingSections: React.FC<LandingSectionsProps> = ({ onScrollToApp }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'TodayPick은 무료로 이용할 수 있나요?',
      a: '네, TodayPick의 모든 계절별 AI 코디 큐레이션, 10컷 룩북 보기, TOP 20 트렌드 랭킹 조회 및 코디 보관 기능은 별도의 회원가입이나 유료 결제 없이 100% 무료로 즉시 이용하실 수 있습니다.'
    },
    {
      q: '어떤 연령대와 성별이 사용할 수 있나요?',
      a: '10대 청소년부터 2030 대학생 및 직장인, 4050 이상의 어번 캐주얼 세대까지 폭넓은 스타일 스펙트럼을 지원합니다. 여성, 남성, 유니섹스 등 원하는 카테고리를 1번의 클릭으로 간편하게 필터링할 수 있습니다.'
    },
    {
      q: '추천 코디 데이터는 얼마나 자주 업데이트되나요?',
      a: '실시간 날씨 API 연동 기온 데이터와 계절별 최신 트렌드를 반영하여 주 2~3회 새로운 10컷 룩북 세트가 지속적으로 추가됩니다. 최신 트렌드는 [TOP 코디 20]에서 실시간으로 확인하실 수 있습니다.'
    },
    {
      q: '오늘뭐먹지, 오늘뭐하지 서비스는 언제 오픈되나요?',
      a: 'TodayPick은 의류 패션 추천(오늘뭐입지)을 시작으로 점심·저녁 메뉴 추천(오늘뭐먹지), 주말 데이트 및 액티비티 큐레이션(오늘뭐하지)으로 확장 예정입니다. 현재 클로즈 베타 검증 단계이며 곧 만나보실 수 있습니다.'
    }
  ];

  return (
    <div id="target-landing-sections" className="w-full mt-16 space-y-20 border-t border-slate-200/80 pt-16">
      {/* 1. HERO BANNER COPY */}
      <section id="section-hero" className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-bold mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          AI 기반 데일리 라이프스타일 큐레이션
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          오늘 뭐 입지?<br />
          <span className="text-purple-600">TodayPick</span>이 골라드릴게요.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
          계절과 연령, 스타일에 맞는 오늘의 코디를 한 번에 만나보세요. 복잡한 검색 없이 단 3번의 클릭으로 완성됩니다.
        </p>
        <div className="mt-8">
          <button
            type="button"
            onClick={onScrollToApp}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-black text-base shadow-lg shadow-purple-200 hover:shadow-xl transition-all hover:scale-102"
          >
            오늘 코디 바로 보기
          </button>
        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section id="section-problem" className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500 bg-rose-50 px-2.5 py-1 rounded-md">
            The Problem
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            매일 반복되는 작은 고민
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            TodayPick은 일상에서 가장 자주 부딪히는 결정 피로를 덜어드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-purple-200 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
              <Shirt className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">오늘 뭐 입지?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              옷장은 가득 차 있는데 아침마다 입을 옷이 없는 현상. 날씨와 장소에 맞는 최적의 매칭을 찾기 어렵습니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-purple-200 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">오늘 뭐 먹지?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              동료들과 점심 메뉴 하나 고르는 데만 15분. 배달앱 메뉴판을 끝없이 스크롤하다 지치는 일상.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-purple-200 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">오늘 뭐 하지?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              모처럼의 주말이나 쉬는 날, 집에서 누워만 있다 후회하지 않도록 감각적인 힐링 코스를 제안합니다.
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-center">
          <p className="text-xs sm:text-sm font-bold text-purple-900">
            ✨ TodayPick은 매일 반복되는 선택을 가장 명쾌하고 우아하게 단순화합니다.
          </p>
        </div>
      </section>

      {/* 3. SOLUTION SECTION */}
      <section id="section-solution" className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
            The Solution
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            단 3단계, 3번의 클릭으로 완성
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            원하는 조건만 가볍게 누르면 끝! 복잡한 설정 없이 직관적으로 확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="bg-white p-6 rounded-2xl border-2 border-purple-100 shadow-sm relative">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center mb-3">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">나를 선택</h4>
            <p className="text-xs text-purple-600 font-semibold mb-2">계절 · 성별 · 연령</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              현재 계절과 성별, 연령대를 단 2번의 탭으로 지정합니다. 나에게 딱 맞는 룩북 그룹이 필터링됩니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-purple-100 shadow-sm relative">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center mb-3">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">코디 확인</h4>
            <p className="text-xs text-purple-600 font-semibold mb-2">오늘의 추천 스타일</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              실제 착용 사진과 상·하의·신발 세부 아이템, 컬러 팔레트, 체감 온도 정보까지 한눈에 감상합니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border-2 border-purple-100 shadow-sm relative">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center mb-3">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">저장 및 공유</h4>
            <p className="text-xs text-purple-600 font-semibold mb-2">마음에 드는 룩 보관</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              북마크 버튼을 눌러 나만의 보관함에 담아두거나 메신저로 친구들에게 오늘의 착장을 공유해보세요.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SOCIAL PROOF (FACTUAL STATEMENTS ONLY) */}
      <section id="section-social-proof" className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
            Product Facts
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            검증된 데이터와 실질적 가치
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            과장된 가짜 리뷰 대신 실질적인 데이터와 서비스 약속만을 전달합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-purple-700">10대부터 60대까지</div>
            <p className="text-xs text-slate-600 mt-1 font-medium">전 세대를 아우르는 맞춤 스타일</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-sky-700">4계절 맞춤 제안</div>
            <p className="text-xs text-slate-600 mt-1 font-medium">봄·여름·가을·겨울 체감 기온별 룩</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-emerald-700">지속 업데이트</div>
            <p className="text-xs text-slate-600 mt-1 font-medium">주기적 10컷 룩북 세트 추가 갱신</p>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section id="section-faq" className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
            FAQ
          </span>
          <h3 className="text-2xl font-black text-slate-900 mt-2">자주 묻는 질문</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 hover:text-purple-600 transition-colors"
                >
                  <span className="text-sm sm:text-base flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-purple-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section id="section-cta" className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              오늘의 선택,<br />지금 TodayPick에서 시작하세요.
            </h3>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
              더 이상 옷장 앞에서 망설이지 마세요. 계절과 날씨, 연령에 꼭 맞는 오늘의 스타일링을 바로 확인해보세요.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onScrollToApp}
                className="px-8 py-3.5 bg-white text-purple-800 hover:bg-purple-50 rounded-xl font-black text-sm shadow-md transition-all hover:scale-105"
              >
                오늘 코디 보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/70 pt-8 pb-12 text-center text-xs text-slate-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="font-bold text-slate-700">TodayPick Official</span>
          <span>·</span>
          <span>Google AI Studio Build & Learning Mode</span>
        </div>
        <p className="text-[11px] text-slate-600">
          AI 라이프스타일 큐레이션 서비스 및 웹사이트 기획·제작 실습 포털. 모든 코디 이미지는 고해상도 패션 데이터셋을 기반으로 제공됩니다.
        </p>
        <p className="text-[10px] text-slate-600 mt-2">
          © 2026 TodayPick Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
