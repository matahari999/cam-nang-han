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
`lib/checklists.ts` 한 파일에 모든 체크리스트 데이터가 있음:
```ts
type Situation = {
  slug: string; title: string; short: string; emoji: string;
  items: { label: string; why: string }[]; tip?: string;
};
```
새 상황 추가 시 이 배열에 객체 하나 추가하면 `/cam-nang/[slug]` 라우트가 자동 생성됨 (generateStaticParams 사용 중).

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
- [x] Supabase 스키마 설계 (`supabase/migrations/0001_init.sql`): profiles + checklist_progress 테이블, RLS 정책, 트리거 (실제 Supabase 프로젝트는 무료 티어 한도로 아직 미생성)

## 다음 작업 우선순위
1. Supabase 프로젝트 실제 생성(무료 티어 한도 해소 필요) 후 `supabase/migrations/0001_init.sql` 적용, 인증 연동
2. `lib/checklists.ts` 클라이언트 useState → checklist_progress 테이블 연동(로그인 시 서버 저장)
3. Vercel 배포
4. 기능 2(사진 서류 해석) MVP 착수 — MediCerti의 문서 처리 로직 참고 가능
5. 신사방TV 베트남어 구독자 대상 배포 전, 관공서 서류 정보의 정확성 재검증 필요 (참고용 문구는 이미 footer에 있음, 법적 자문은 아님)

## 절대 하지 말 것
- 실제 API 키/시크릿을 코드나 커밋에 하드코딩하지 말 것 — `.env.local`만 사용
- 도장 모티프를 다른 장식(그라디언트, 이모지 배지 등)으로 대체하지 말 것 — 브랜드 일관성 핵심
- dev 포트 3118 임의 변경 금지
