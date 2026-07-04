# Cẩm Nang Hàn — 프로젝트 지침 (CLAUDE.md)

## 프로젝트 개요
**Cẩm Nang Hàn**("한국 생활 필수 안내서")는 한국에 거주 중이거나 입국 예정인 베트남인(노동자, 유학생, 결혼이민자 등 약 34만 명+)을 위한 생활 SaaS다.
전체 UI는 **베트남어 100%**가 기본이며, 한국어는 관공서 제출용 원문 확인이 필요한 경우에만 병기한다.

### 타겟 유저
- 한국 거주 중인 베트남 노동자(E-9 등), 유학생, 결혼이민자
- 한국어에 서툴러서 관공서·병원·은행 서류를 이해하기 어려운 사람들

### 왜 만드는가 (시장 조사 근거)
- 2026년 3월 기준 재한 베트남인 337,183명 (재한 외국인 중 2위, 중국 다음)
- 경쟁: 우리은행 '우리WON글로벌', 하나은행 'Hana EZ', 서울시 'My Seoul' 등이 이미 다국어 생활정보 앱을 운영 중이나, 전부 "넓고 얕은" 종합 포털형이라 **AI 해석형 서류 안내, 상황별 준비물 체크리스트**는 비어있는 틈새
- 전략: 큰 플레이어와 정면승부하지 않고, 아주 구체적인 순간("이 서류 뭐지?", "뭘 챙겨가야 하지?")을 깊게 파고든다

## 핵심 기능 (우선순위 순)
1. **✅ 완료 — 상황별 준비물 체크리스트** (`/cam-nang/[slug]`)
   진짜 차별화 포인트. "병원 첫 방문", "외국인등록증 갱신" 등 상황을 고르면 필요한 서류와 "왜 필요한지" 이유까지 보여줌. 체크 가능, 진행률 표시.
2. **⏳ 미구현 — 사진 찍어 서류 해석** (예: 급여명세서, 관공서 우편물)
   OCR + AI로 항목 하나하나를 베트남어로 해석. "이건 4대보험 공제입니다" 식.
3. **⏳ 미구현 — 베트남어 지도**
   구글맵 API 위에 "외국인 진료 가능 병원", "베트남어 지원 은행" 필터를 얹는 방식. 지도 자체를 새로 만들지 않는다.

## 기술 스택
- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- 폰트: Be Vietnam Pro(디스플레이/본문, 베트남어 디자이너가 만든 폰트라 브랜드 정체성에 맞음), IBM Plex Mono(숫자/유틸리티)
- 상태관리: 현재는 클라이언트 useState만 사용 (DB 없음)
- 추후 연결 예정: **Supabase**(사용자별 체크리스트 저장, 인증), **GitHub**(matahari999 계정), **Vercel**(배포)
- 로컬 개발 포트: **3118** (`package.json`의 dev/start 스크립트에 `next dev -p 3118` / `next start -p 3118`로 고정됨 — 절대 임의로 바꾸지 말 것)

## 디자인 시스템 (반드시 유지할 것)
일반적인 AI 생성 디자인(크림+테라코타+세리프, 다크+네온)을 의도적으로 피하고 "관공서 도장(dấu mộc)" 모티프로 설계함. 새 화면 만들 때도 이 톤을 유지.

- **색상**: `--paper #F6F1E4`(종이), `--ink #201C14`(잉크), `--navy #16223E`(신뢰/공식 문서), `--seal #B7292F`(도장 빨강, 시그니처 컬러), `--gold #B08A34`(증명서 골드, 아껴서 사용)
- **시그니처 요소**: `.seal-mark` 클래스 = 이중 원형 테두리의 빨간 도장. 체크리스트 체크박스, 로고, 히어로 장식에 반복 사용
- **레이아웃**: `.paper-card` = 종이 카드 스타일(연한 테두리, 미세한 그림자)
- **타이포**: Be Vietnam Pro, 굵은 weight로 헤드라인, 절대 세리프체 쓰지 않음

## 데이터 구조
`lib/checklists.ts` 한 파일에 모든 체크리스트 데이터가 있음 (현재 16개 상황):
```ts
type Situation = {
  slug: string; title: string; short: string; emoji: string;
  category: string; // categories 배열의 id (giay-to | y-te | tien-bac | cong-viec | doi-song)
  items: { label: string; why: string }[]; tip?: string;
};
```
새 상황 추가 시 이 배열에 객체 하나 추가하면 `/cam-nang/[slug]` 라우트가 자동 생성됨 (generateStaticParams 사용 중).
**⚠️ 새 slug 추가 시 `public/sw.js`의 `PRECACHE_PAGES`에도 추가하고 `VERSION`을 올릴 것** (오프라인 캐싱 목록).
**⚠️ 기존 항목의 `label` 문자열은 DB 저장 키이므로 변경 금지** (checklist_progress.checked_items가 label로 매칭됨).

긴급 연락처 데이터는 `lib/emergency.ts` (`/khan-cap` 페이지), 유용한 앱 목록은 `app/ung-dung/page.tsx` 안에 인라인.

## 지금까지 완료된 것
- [x] 프로젝트 스캐폴딩: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, 포트 3118 고정
- [x] 폰트: Be Vietnam Pro(본문/디스플레이) + IBM Plex Mono(숫자/유틸) — `next/font/google`, CSS 변수로 주입
- [x] 디자인 시스템: `app/globals.css`에 색상 CSS 변수 + `.seal-mark`(이중 원형 도장) + `.paper-card` 구현
- [x] 랜딩 페이지 (`app/page.tsx`)
- [x] 체크리스트 전체 목록 (`app/cam-nang/page.tsx`)
- [x] 체크리스트 상세 + 인터랙티브 체크박스/진행률/"왜 필요한지" 토글 (`app/cam-nang/[slug]/page.tsx`, `components/ChecklistInteractive.tsx`)
- [x] `generateStaticParams`로 5개 slug 정적 생성 확인 (`npm run build` 성공)
- [x] 실제 데이터 5개 상황, 전부 베트남어 (`lib/checklists.ts`): 병원 첫 방문, ARC 갱신, 계좌개설, 집계약, 구직서류
- [x] footer 면책 문구(참고용·법적 자문 아님) 베트남어로 추가 (`components/SiteFooter.tsx`)
- [x] `.env.example` (Supabase 키 자리만 미리 생성, 실제 키 없음)
- [x] Supabase 프로젝트 생성 및 스키마 적용: `wsvxkamvxqrtothpcety` — `supabase/migrations/0001_init.sql`(profiles + checklist_progress 테이블, RLS 정책, 트리거)을 SQL Editor에서 직접 실행 완료. 로컬 `.env.local` + Vercel(Production/Development) 환경변수에 URL·anon key 등록 완료
- [x] Vercel 배포: https://cam-nang-han.vercel.app (matahari999s-projects, GitHub 레포 연동 완료 — master push 시 자동 배포)
- [x] Supabase Auth 연동: `lib/supabase/client.ts`(브라우저), `lib/supabase/server.ts`(서버), `proxy.ts`(세션 갱신, Next 16 미들웨어 명칭). 이메일+비밀번호 회원가입/로그인, Kakao/Facebook OAuth 버튼, `app/login/page.tsx`, `app/auth/callback/route.ts`, `app/auth/signout/route.ts`, 헤더 `components/AuthNav.tsx`
- [x] 체크리스트 서버 저장: `ChecklistInteractive.tsx`가 로그인 시 `checklist_progress` 테이블에서 불러오고 체크할 때마다 upsert, 비로그인 시 기존 로컬 `useState` 동작 유지
- [x] 이메일 회원가입 동작 확인(Supabase signup API 정상 도달), Kakao/Facebook 버튼도 OAuth authorize 요청까지 정상 도달 확인 — 단, **Kakao/Facebook은 Supabase 대시보드에서 프로바이더 활성화 전이라 "provider is not enabled" 상태**
- [x] (2026-07-04) 체크리스트 5개 → **16개로 확장** + `category` 필드/`categories` 배열 추가 (기존 5개 label은 그대로 유지)
- [x] (2026-07-04) 신규 페이지: `/khan-cap` (긴급 연락처, `lib/emergency.ts`, tel: 링크), `/ung-dung` (유용한 앱/사이트 모음)
- [x] (2026-07-04) `/cam-nang` 목록에 검색(베트남어 성조 무시 매칭) + 카테고리 필터 (`components/ChecklistBrowser.tsx`)
- [x] (2026-07-04) **PWA 완성**: `app/manifest.ts`, `public/sw.js`(체크리스트 전체+긴급페이지 프리캐시, 페이지 network-first/정적 cache-first, auth 라우트 제외), `components/PwaRegister.tsx`(프로덕션에서만 등록), `components/InstallPrompt.tsx`(Android beforeinstallprompt 버튼 + iOS 수동 안내, localStorage로 닫기 기억)
- [x] (2026-07-04) 아이콘: 도장 모티프 PNG 세트(`public/icons/`, maskable 포함) + `apple-touch-icon.png` + `app/icon.svg` — 재생성은 `node scripts/gen-icons.mjs` (sharp devDependency)
- [x] (2026-07-04) 모바일 하단 탭바 `components/BottomNav.tsx` (sm 미만에서만 표시, safe-area 대응, globals.css `.bottom-nav`)
- [x] (2026-07-04) SEO/메타: `app/sitemap.ts`, `app/robots.ts`, OG 메타(metadataBase), viewport themeColor, `color-scheme: light` 선언
- [x] (2026-07-04) 랜딩 고도화: 설치 배너, 카테고리별 그룹 목록, 긴급/앱 바로가기 카드, 푸터 내비 링크

## 다음 작업 우선순위
1. **Kakao/Facebook OAuth 프로바이더 활성화 필요** — Kakao Developers / Facebook for Developers에서 앱 생성 후 REST API 키(Kakao)·App ID/Secret(Facebook)을 Supabase 대시보드(Authentication → Providers)에 등록. Redirect URI는 두 프로바이더 모두 `https://wsvxkamvxqrtothpcety.supabase.co/auth/v1/callback`
2. Supabase 기본 이메일 발송(built-in mailer)은 시간당 발송량이 매우 제한적 — 실사용 전 커스텀 SMTP(Resend/SendGrid 등) 연결 권장
3. Preview 환경변수는 master 외 브랜치가 생기면 그때 추가 필요 (지금은 Production/Development만 등록됨)
4. 기능 2(사진 서류 해석) MVP 착수 — MediCerti의 문서 처리 로직 참고 가능
5. 신사방TV 베트남어 구독자 대상 배포 전, 관공서 서류 정보의 정확성 재검증 필요 (참고용 문구는 이미 footer에 있음, 법적 자문은 아님)

## 절대 하지 말 것
- 실제 API 키/시크릿을 코드나 커밋에 하드코딩하지 말 것 — `.env.local`만 사용
- 도장 모티프를 다른 장식(그라디언트, 이모지 배지 등)으로 대체하지 말 것 — 브랜드 일관성 핵심
- dev 포트 3118 임의 변경 금지
