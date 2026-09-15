import { LessonStep } from '../types';

export const CLASS_LESSONS: LessonStep[] = [
  {
    step: 1,
    title: '기획 (Planning)',
    summary: '웹사이트 제작의 80%는 기획입니다.',
    concept: '누구를 위한 서비스인지(Target), 사용자가 무엇을 해야 하는지(Goal), 첫 화면에 무엇을 보여줄 것인지(First View) 정의합니다.',
    application: [
      'Target: 매일 아침 옷 고르기가 고민인 10대~60대 사용자',
      'Main Action: 계절/연령 필터 후 맞춤 추천 코디 확인',
      'First View: 3초 안에 오늘의 코디를 한눈에 확인할 수 있는 센터 앱 배치'
    ],
    targetId: 'target-center-app',
    instruction: '가운데 TodayPick 앱 체험 영역을 확인해보세요.',
    actionType: 'highlight'
  },
  {
    step: 2,
    title: '3클릭 규칙 (3-Click Rule)',
    summary: '사용자는 3번의 클릭 안에 핵심 목적에 도달해야 합니다.',
    concept: '불필요한 서브 메뉴나 복잡한 depth를 없애고 [계절] → [성별/연령] → [코디 확인]까지 즉시 완료되도록 설계합니다.',
    application: [
      '1번째 클릭: 계절 선택 (봄/여름/가을/겨울)',
      '2번째 클릭: 성별 및 연령대 선택',
      '3번째 클릭: 추천 코디 카드 확인 및 저장'
    ],
    targetId: 'target-season-filter',
    instruction: '안내 링이 표시된 [계절 필터]를 먼저 클릭해보세요.',
    actionType: 'three_click'
  },
  {
    step: 3,
    title: '사용자 여정 (User Journey)',
    summary: '클릭 경로는 목적지에서 거꾸로 설계합니다.',
    concept: '사용자가 얻고자 하는 최종 가치(저장/공유)에서 출발해 진입 경로를 역산하여 군더더기 없는 최단 동선을 구축합니다.',
    application: [
      'Step 1: 오늘의 옷차림이 궁금하여 접속',
      'Step 2: 상단 원클릭 필터 조정',
      'Step 3: 실물 코디 사진과 세부 피스 정보 확인',
      'Step 4: 저장(북마크) 및 공유'
    ],
    targetId: 'target-main-outfit',
    instruction: '메인 코디 카드의 스타일 정보와 우측 플로팅 액션 버튼을 확인하세요.',
    actionType: 'highlight'
  },
  {
    step: 4,
    title: '랜딩페이지 구조 (Landing Structure)',
    summary: 'Hero → Problem → Solution → Social Proof → CTA 5단계',
    concept: '방문자의 뇌리에 자연스럽게 설득되도록 구성하는 글로벌 표준 전환 공식입니다.',
    application: [
      'Hero: 오늘 뭐 입지? TodayPick이 골라드릴게요',
      'Problem: 매일 반복되는 작은 고민 (입을 옷이 없음)',
      'Solution: 3단계 즉시 해결 (선택 → 확인 → 저장)',
      'Social Proof: 10대부터 60대까지, 계절별 실시간 데이터',
      'CTA: 지금 TodayPick에서 시작하기'
    ],
    targetId: 'target-landing-sections',
    instruction: '스크롤을 내려 랜딩페이지의 5단 설득 구조를 직접 확인해보세요.',
    actionType: 'landing_scroll'
  },
  {
    step: 5,
    title: 'AI Studio Build (Architecture)',
    summary: 'Google AI Studio Build에서는 프롬프트로 화면을 만들고 미리보기에서 즉시 수정합니다.',
    concept: '하나의 거대한 단일 파일이 아닌 Header, SideMenu, TodayPickExperience, TopLooksPanel 등으로 컴포넌트를 모듈화합니다.',
    application: [
      '프롬프트 기반 빠른 프로토타이핑 & 실시간 빌드',
      'Typescript + React + Tailwind CSS의 견고한 조화',
      '컴포넌트 단위 관심사 분리로 유지보수성 극대화'
    ],
    targetId: 'target-center-app',
    instruction: '[Build 구조 보기]를 클릭하여 컴포넌트 아키텍처를 확인하세요.',
    actionType: 'build_inspect'
  },
  {
    step: 6,
    title: 'GitHub 저장 (Version Control)',
    summary: 'GitHub는 웹사이트 소스와 변경 이력을 안전하게 보관합니다.',
    concept: '작업한 코드를 커밋하고 브랜치로 분기하여 변경 사항을 안전하게 추적하고 협업할 수 있습니다.',
    application: [
      'Repository: 프로젝트 원격 저장소 생성',
      'Commit: 변경 사항 메시지와 함께 스냅샷 기록',
      'Push: 원격 main 브랜치로 코드 전송'
    ],
    targetId: 'target-github-card',
    instruction: 'GitHub 버전 관리 시뮬레이션 카드를 확인해보세요.',
    actionType: 'github_flow'
  },
  {
    step: 7,
    title: 'Vercel 배포 (Deployment)',
    summary: 'Vercel은 GitHub의 웹사이트를 실제 전 세계 URL로 자동 배포합니다.',
    concept: 'Git Push 한 번으로 CI/CD 파이프라인이 동작하여 전 세계 CDN 엣지에 10초 만에 실서비스로 게시됩니다.',
    application: [
      'Step 1: GitHub 계정 연동 및 레포지토리 Import',
      'Step 2: 자동 Vite 프레임워크 감지 및 빌드 세팅',
      'Step 3: Instant Deploy & 고유 도메인 (.vercel.app) 발급'
    ],
    targetId: 'target-vercel-card',
    instruction: 'Vercel 3단계 자동 배포 파이프라인 다이어그램을 확인하세요.',
    actionType: 'vercel_flow'
  },
  {
    step: 8,
    title: '모바일 QA (Mobile First)',
    summary: '모바일 뷰포트에서 터치 44px 이상과 가로 넘침(Overflow) 방지를 확인합니다.',
    concept: '사용자의 70% 이상은 스마트폰으로 접속합니다. 탭 타겟 크기와 원핸드 동선이 최우선입니다.',
    application: [
      '터치 타겟 44px x 44px 이상 확보',
      '가로 스크롤 및 레이아웃 깨짐(Horizontal Overflow) 제로',
      '모바일 하단 플로팅 바텀시트와 상단 간소화 헤더 적용'
    ],
    targetId: 'target-mobile-preview-btn',
    instruction: '[모바일 뷰 전환] 버튼을 눌러 모바일 최적화 상태를 점검해보세요.',
    actionType: 'mobile_qa'
  },
  {
    step: 9,
    title: '5초 테스트 (5-Second Test)',
    summary: '5초 동안 첫 화면만 보고 3대 핵심 질문에 답할 수 있어야 합니다.',
    concept: '첫 방문자는 5초 안에 이 사이트의 정체를 모르면 이탈합니다. 즉각적 이해도를 테스트합니다.',
    application: [
      'Q1: 무엇을 하는 서비스인가? → AI 코디 추천 서비스',
      'Q2: 누구를 위한 서비스인가? → 패션 선택이 필요한 10대~60대',
      'Q3: 무엇을 눌러야 하는가? → 계절/성별 선택 후 코디 확인'
    ],
    targetId: 'target-fivesec-card',
    instruction: '5초 테스트 카드를 열어 질문에 답해보세요.',
    actionType: 'five_sec_test'
  },
  {
    step: 10,
    title: '최종 점검 (Final QA Checklist)',
    summary: '실서비스 런칭 전 10대 필수 체크리스트를 꼼꼼하게 검증합니다.',
    concept: '3클릭, 반응형, CTA, 이미지 로딩, 접근성 등 모든 품질 기준을 최종 확인합니다.',
    application: [
      '10개 항목 모두 체크 완료 시 [실습 수료 배지] 획득',
      'TodayPick 실무 완성도 최종 승인'
    ],
    targetId: 'target-final-qa-card',
    instruction: '체크리스트를 하나씩 확인하고 최종 점검을 완료하세요.',
    actionType: 'final_qa'
  }
];
