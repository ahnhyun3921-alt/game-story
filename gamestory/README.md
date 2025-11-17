# 🎮 GAME STORY - 게임 시나리오 작가 매칭 플랫폼

게임 시나리오 작가와 제작자를 연결하는 웹 플랫폼입니다.

---

## 📁 프로젝트 구조

```
game-story/
├── index.html              # 메인 HTML 파일
├── styles.css              # 스타일시트
├── script.js               # React 컴포넌트 및 로직
├── BACKEND_GUIDE.md        # 백엔드 구현 가이드
├── fonts/                  # 폰트 폴더
│   ├── Paperlogy-1Thin.ttf
│   ├── Paperlogy-2ExtraLight.ttf
│   ├── Paperlogy-3Light.ttf
│   ├── Paperlogy-4Regular.ttf
│   ├── Paperlogy-5Medium.ttf
│   ├── Paperlogy-6SemiBold.ttf
│   ├── Paperlogy-7Bold.ttf
│   ├── Paperlogy-8ExtraBold.ttf
│   └── Paperlogy-9Black.ttf
└── images/                 # 이미지 폴더
    ├── logo.png
    ├── icon-notification.png
    ├── icon-direct.png
    ├── icon-ai.png
    ├── icon-upload.png
    ├── select-banner.png
    ├── illust-upload.png
    ├── illust-direct.png
    ├── illust-ai.png
    ├── start-banner.png
    ├── team-banner.png
    ├── role-writer.png
    └── role-creater.png
```

---

## 🚀 시작하기

### 1. 프로젝트 클론

```bash
# 프로젝트 다운로드 후 압축 해제
cd game-story
```

### 2. 로컬 서버 실행

**방법 1: Python 내장 서버 사용**
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

**방법 2: Node.js http-server 사용**
```bash
# http-server 설치
npm install -g http-server

# 서버 실행
http-server -p 8000
```

**방법 3: VS Code Live Server 확장 사용**
1. VS Code에서 프로젝트 열기
2. Live Server 확장 설치
3. index.html 우클릭 > "Open with Live Server"

### 3. 브라우저에서 접속

```
http://localhost:8000
```

---

## 🎨 주요 기능

### ✅ 현재 구현된 기능 (프론트엔드)

#### 1. **홈 페이지**
- 시나리오 카드 리스트 표시
- 검색 및 필터링 기능
- 장르별 분류

#### 2. **시나리오 작성**
- **직접 작성**: 텍스트 에디터로 직접 시나리오 작성
- **AI 작성**: AI를 활용한 시나리오 생성
- **업로드**: Word 문서 업로드 (UI만 구현)

#### 3. **팀원 찾기**
- 작가/제작자 프로필 카드
- 검색 및 필터링
- 스킬 뱃지 표시

#### 4. **회원가입/로그인**
- 회원가입 폼 (아이디, 비밀번호, 닉네임)
- 역할 선택 (작가/제작자)
- 로그인 폼
- 중복 확인 버튼 (UI만 구현)

#### 5. **알림 시스템**
- 알림 드롭다운 UI
- 알림 목록 표시

---

## 🔧 백엔드 구현 필요사항

현재는 **프론트엔드만 구현**되어 있으며, 실제 작동을 위해서는 백엔드 시스템이 필요합니다.

자세한 백엔드 구현 가이드는 **`BACKEND_GUIDE.md`** 파일을 참조해주세요.

### 필요한 주요 시스템:
1. ✅ **사용자 인증 시스템** (회원가입, 로그인, 세션 관리)
2. ✅ **시나리오 관리 시스템** (CRUD, 검색, 평점)
3. ✅ **팀원 매칭 시스템** (프로필, 협업 요청)
4. ✅ **알림 시스템** (실시간 알림)
5. ✅ **파일 관리 시스템** (업로드, 다운로드)
6. ✅ **AI 시나리오 생성 시스템** (AI API 연동)

---

## 🎯 더미 데이터

### 시나리오 데이터 (8개)
- 픽셀 던전 RPG 시나리오
- 사이버펑크 2087 시나리오
- 마법학교 어드벤처
- 좀비 서바이벌 타워디펜스
- 우주 탐험 시뮬레이션
- 중세 왕국 경영 시뮬레이션
- 바다의 전설 해적 RPG
- 탐정 추리 어드벤처

### 팀원 데이터 (8명)
- 레드플라임 (VN 제작자)
- 블루드롭 (미스터리 작가)
- 그린리프 (판타지 RPG)
- 골드크라운 (역사 시뮬레이션)
- 실버나이트 (액션 RPG)
- 바이올렛매직 (마법 판타지)
- 다크쉐도우 (호러 게임)
- 화이트드림 (힐링 게임)

### 알림 데이터 (4개)
- 댓글 알림
- 회의 요청
- 시나리오 댓글
- 지원 요청

---

## 🛠️ 기술 스택

### 프론트엔드
- **HTML5**: 웹 페이지 구조
- **CSS3**: 스타일링 및 레이아웃
- **React 18**: UI 컴포넌트 (CDN 방식)
- **Babel**: JSX 트랜스파일링

### 폰트
- **Paperlogy**: 커스텀 한글 폰트 (9가지 굵기)

### 추천 백엔드 스택
- **Node.js + Express**: 빠른 개발, JavaScript 풀스택
- **MySQL/PostgreSQL**: 관계형 데이터베이스
- **Redis**: 캐싱 및 세션 관리
- **AWS S3**: 파일 저장소
- **Anthropic Claude API**: AI 시나리오 생성

---

## 📱 반응형 디자인

- **데스크톱**: 1400px 이상 (최적화됨)
- **태블릿**: 768px ~ 1024px
- **모바일**: 768px 이하

---

## 🎨 디자인 특징

### 컬러 팔레트
- **Primary Color**: #E85F5C (코랄 레드)
- **Background**: #f5f5f5 (라이트 그레이)
- **Text Primary**: #333 (다크 그레이)
- **Text Secondary**: #666, #999 (미디엄/라이트 그레이)

### 타이포그래피
- **Heading**: 700 (Bold)
- **Body**: 400 (Regular), 500 (Medium)
- **UI Elements**: 600 (SemiBold)

### UI 컴포넌트
- 둥근 모서리 (8px, 12px, 16px)
- 부드러운 그림자 효과
- 호버 애니메이션 (transform, box-shadow)
- 카드 기반 레이아웃

---

## 📖 페이지 구조

### 1. 홈 페이지 (`/`)
- 배너 섹션
- 검색 바 (필터 + 검색어)
- 시나리오 카드 그리드

### 2. 팀원 찾기 (`/team`)
- 배너 섹션
- 검색 바
- 팀원 카드 그리드

### 3. 시나리오 작성 선택 (`/scenario-select`)
- 3가지 방식 선택 카드
  - 직접 작성
  - AI 작성
  - 업로드

### 4. 직접 작성 (`/scenario-direct`)
- 텍스트 에리어
- 제출 버튼

### 5. AI 작성 (`/scenario-ai`)
- 텍스트 에리어 (프롬프트 입력)
- AI 생성 버튼

### 6. 업로드 (`/scenario-upload`)
- 파일 목록
- 완료 버튼

### 7. 로그인 (`/login`)
- 아이디 입력
- 비밀번호 입력
- 로그인 버튼

### 8. 회원가입 (`/signup`)
- **Step 1**: 정보 입력
  - 아이디 (중복 확인)
  - 비밀번호
  - 닉네임 (중복 확인)
  - 비밀번호 확인
- **Step 2**: 역할 선택
  - 제작자
  - 작가

---

## 🔍 주요 기능 설명

### 네비게이션
- 모든 페이지에서 헤더를 통해 이동 가능
- 현재 페이지 활성화 표시 (빨간 밑줄)
- 알림 아이콘 클릭으로 드롭다운 표시

### 검색 기능
- 키워드 검색
- 장르 필터링
- Enter 키 또는 버튼 클릭으로 검색

### 시나리오 카드
- 제목, 작가, 설명, 태그 표시
- 평점 배지
- 호버 시 상승 애니메이션

### 팀원 카드
- 이름, 역할, 설명 표시
- 아바타 아이콘
- 스킬 뱃지

---

## 📝 코드 구조

### React 컴포넌트
```javascript
- App                    // 메인 앱 컴포넌트
  ├─ Header              // 헤더 (네비게이션 + 알림)
  ├─ HomePage            // 홈 페이지
  ├─ TeamPage            // 팀원 찾기
  ├─ ScenarioSelectPage  // 시나리오 작성 방식 선택
  ├─ DirectCreatePage    // 직접 작성
  ├─ AICreatePage        // AI 작성
  ├─ UploadPage          // 업로드
  ├─ LoginPage           // 로그인
  └─ SignupPage          // 회원가입
```

### 상태 관리
```javascript
useState를 사용한 로컬 상태 관리:
- currentPage: 현재 페이지
- isLoggedIn: 로그인 상태
- currentUser: 현재 사용자 ID
- searchQuery: 검색어
- filter: 필터 옵션
- scenarios: 시나리오 목록
- members: 팀원 목록
- notifications: 알림 목록
```

---

## 🐛 알려진 제한사항

### 현재 프론트엔드 전용
1. **데이터 저장 안됨**: 새로고침 시 모든 데이터 초기화
2. **인증 없음**: 로그인은 UI만 작동 (실제 인증 X)
3. **파일 업로드 안됨**: 파일 선택 UI만 표시
4. **AI 생성 안됨**: AI 버튼 클릭 시 시뮬레이션만
5. **검색 제한적**: 클라이언트 사이드 검색만 가능
6. **알림 정적**: 실시간 알림 X, 더미 데이터만 표시

### 백엔드 구현 시 해결 가능
위의 모든 제한사항은 `BACKEND_GUIDE.md`를 참조하여 백엔드를 구현하면 해결됩니다.

---

## 🔜 향후 개선사항

### Phase 1: 백엔드 구현
- [ ] 사용자 인증 API
- [ ] 시나리오 CRUD API
- [ ] 데이터베이스 연동

### Phase 2: 고급 기능
- [ ] 실시간 채팅
- [ ] 협업 공간
- [ ] 버전 관리

### Phase 3: UX 개선
- [ ] 드래그 앤 드롭 파일 업로드
- [ ] 시나리오 미리보기
- [ ] 다크 모드

### Phase 4: 모바일
- [ ] 반응형 디자인 최적화
- [ ] 모바일 앱 (React Native)
- [ ] PWA 지원

---

## 💡 개발 팁

### 1. 이미지 추가
images 폴더에 디자인에 맞는 이미지를 추가하세요:
- logo.png (로고)
- icon-notification.png (알림 아이콘)
- 기타 일러스트 이미지들

### 2. 폰트 추가
fonts 폴더에 Paperlogy 폰트 파일을 추가하세요.
없는 경우 다른 한글 폰트로 대체 가능합니다.

### 3. 백엔드 연동
`BACKEND_GUIDE.md`의 API 엔드포인트를 참조하여 fetch 호출을 추가하세요:

```javascript
// 예시: 시나리오 목록 조회
async function fetchScenarios() {
    const response = await fetch('/api/scenarios');
    const data = await response.json();
    setScenarios(data.scenarios);
}
```

### 4. 환경 변수
프로덕션 배포 시 API URL을 환경 변수로 관리하세요:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
```

---

## 📞 문의 및 지원

- **이메일**: support@gamestory.com
- **GitHub Issues**: [프로젝트 이슈 페이지]
- **문서**: BACKEND_GUIDE.md 참조

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

## 🙏 감사의 말

Game Story를 사용해주셔서 감사합니다!
게임 시나리오 작가와 제작자들의 멋진 협업을 응원합니다. 🎮✨
