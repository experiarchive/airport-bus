🚍 Korea Transit Guide (Incheon Airport Bus) 개발 명세서

1. 프로젝트 개요

목표: 인천공항 공항버스 운행 정보를 외국인 여행객에게 제공하며, 애드센스 및 제휴 마케팅을 통한 수익 창출.

핵심 가치: "호텔 이름으로 버스 찾기" (기존의 노선 번호 중심 검색 탈피).

타겟 유저: 한국 방문 외국인 (영어권 중심).

디자인 컨셉: 모던 핀테크 스타일 (Toss, Airbnb 풍) - 신뢰감, 깔끔함.

2. 기술 스택 (Tech Stack)

Framework: React (Next.js 권장 - SEO 유리)

Styling: Tailwind CSS

Icons: Lucide React

Font: Google Fonts 'Plus Jakarta Sans' (필수 적용)

Deploy: Vercel or Netlify

3. 디자인 시스템 (Design System)

3.1. 컬러 팔레트 (Color Palette)

Background: bg-slate-50 (전체 배경), bg-slate-900 (히어로 섹션)

Primary (Brand): indigo-600 ~ blue-500 (그라데이션 활용)

Surface: bg-white (카드, 모달)

Text: slate-900 (제목), slate-500 (본문)

Accent: yellow-400 (Star/Tip 아이콘), green-100 (매칭 태그)

3.2. 타이포그래피 (Typography)

Font Family: Plus Jakarta Sans

Rules:

제목: font-extrabold, tracking-tight

본문: font-medium, leading-relaxed

라벨: uppercase, tracking-wide, text-[10px]

3.3. UI 컴포넌트 스타일

Cards: rounded-2xl 또는 rounded-3xl, shadow-lg, border border-slate-100

Effects:

backdrop-blur-md (헤더, 검색창)

animate-fadeIn (상세 정보 펼침 시 부드러운 등장)

4. 데이터 구조 (Data Structure)

버스 데이터는 JSON 배열 형태여야 하며, SEO와 검색을 위한 필드가 반드시 포함되어야 합니다.

[
  {
    "id": "6001",
    "busNo": "6001",
    "direction": "Dongdaemun / Myeongdong",
    "price": "17,000 KRW",
    "interval": "20-30 min",
    "hotels": [
      "Hotel Skypark",
      "Lotte Hotel Seoul",
      "Nine Tree Hotel",
      "Westin Josun"
      // 외국인이 검색할만한 주요 호텔명 영문 필수 포함
    ],
    "description": "SEO optimized description containing keywords like 'Incheon Airport to Myeongdong', 'Best way to Dongdaemun'.",
    "captainTip": "Practical advice from an employee (e.g., 'Crowded on Fridays', 'Terminal 2 departure tips')."
  }
]


5. 핵심 기능 요건 (Functional Requirements)

5.1. 검색 로직 (Search Engine)

다중 필터링: 사용자의 검색어(searchTerm)가 다음 중 하나라도 일치하면 결과를 반환해야 함.

busNo (예: "6001")

direction (예: "Gangnam")

hotels 배열 내부의 문자열 (예: "Lotte")

대소문자 무시: searchTerm.toLowerCase() 처리 필수.

결과 없음 처리: 검색 결과가 0건일 경우, "No buses found" UI와 함께 "지역명(District)으로 검색해보라"는 가이드 문구 노출.

5.2. UI 인터랙션

버스 카드 클릭: 클릭 시 상세 정보(description, captainTip, AdUnit)가 아코디언 형태로 펼쳐짐.

베스트 매치 하이라이트: 검색어와 일치하는 호텔 태그는 bg-yellow-100 등으로 강조 표시.

6. 수익화 및 광고 안전 가이드 (AdSense Safety) - ⭐중요

무효 트래픽(Invalid Traffic) 정책 위반을 방지하기 위해 다음 규칙을 코드로 강제해야 합니다.

6.1. SafeAdUnit 컴포넌트 구현

모든 광고는 독립된 컴포넌트로 관리하며 다음 속성을 가집니다.

Labeling: 상단에 반드시 Advertisement 또는 Sponsored 텍스트 표기.

CLS 방지: 광고 로딩 전 레이아웃 밀림을 막기 위해 min-height (예: 250px) 설정 필수.

Visual Separation: 배경색(bg-slate-50)이나 테두리(border)로 콘텐츠와 구분.

6.2. 광고 배치 전략 (Placements)

Top Banner: 히어로 섹션(검색창) 바로 아래. 가장 조회수가 높은 영역.

In-Feed: 검색 결과 리스트의 1번째와 2번째 아이템 사이에 삽입.

In-Article (High CTR): 상세 정보(Accordion) 내부, 'Captain's Tip'과 '시간표 보기 버튼' 사이에 배치. (단, 버튼과 물리적 거리 margin-top 확보 필수)

7. SEO 가이드라인 (Search Engine Optimization)

Meta Tags:

Title: Incheon Airport Bus Guide - Find Bus to Your Hotel

Description: Don't get lost. Enter your hotel name and find the direct limousine bus from Incheon Airport (ICN) to Seoul, Myeongdong, and Gangnam.

Semantic HTML:

각 버스 카드는 <article> 태그 사용.

주요 키워드(Hotel names, Bus numbers)는 텍스트로 렌더링되어야 함 (이미지 처리 금지).

8. 개발 단계 (Step-by-Step Implementation)

Project Setup: React + Tailwind CSS 설치. plus-jakarta-sans 폰트 설정.

Component Build:

Layout (Navbar, Footer)

Hero (Search Input, Background Effects)

BusCard (List item, Expanded view)

SafeAdUnit (AdSense wrapper)

Data Integration: data.js에 실제 버스 노선 및 주요 호텔 매핑 데이터 입력.

Logic Implementation: 검색 필터링 로직(filter, includes) 구현.

AdSense Integration: SafeAdUnit 내부에 실제 구글 애드센스 스크립트(ins 태그) 삽입.

Deployment: Vercel 배포 및 도메인 연결.