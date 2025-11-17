# Game Story 플랫폼 백엔드 시스템 구현 가이드

## 📋 개요
Game Story는 게임 시나리오 작가와 제작자를 연결하는 매칭 플랫폼입니다.
현재는 프론트엔드만 구현되어 있으며, 실제 작동을 위해서는 백엔드 시스템이 필요합니다.

---

## 🏗️ 필요한 백엔드 시스템 구성요소

### 1. **사용자 인증 시스템 (Authentication)**

#### 필요 기능:
- 회원가입 (아이디 중복 확인, 닉네임 중복 확인)
- 로그인/로그아웃
- 비밀번호 암호화 (bcrypt 권장)
- 세션 관리 또는 JWT 토큰 기반 인증
- 비밀번호 찾기/재설정

#### 데이터베이스 테이블 설계:

```sql
CREATE TABLE users (
    user_id VARCHAR(50) PRIMARY KEY,
    password_hash VARCHAR(255) NOT NULL,
    nickname VARCHAR(50) UNIQUE NOT NULL,
    role ENUM('writer', 'creator') NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_users_nickname ON users(nickname);
CREATE INDEX idx_users_email ON users(email);
```

#### API 엔드포인트:

```
POST   /api/auth/signup              # 회원가입
POST   /api/auth/login               # 로그인
POST   /api/auth/logout              # 로그아웃
GET    /api/auth/check-id/:userId    # 아이디 중복 확인
GET    /api/auth/check-nickname/:nickname  # 닉네임 중복 확인
POST   /api/auth/reset-password      # 비밀번호 재설정
```

---

### 2. **시나리오 관리 시스템**

#### 필요 기능:
- 시나리오 작성 (직접, AI, 업로드)
- 시나리오 조회/검색/필터링
- 시나리오 수정/삭제
- 시나리오 평점 및 리뷰

#### 데이터베이스 테이블 설계:

```sql
CREATE TABLE scenarios (
    scenario_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    content LONGTEXT,
    genre VARCHAR(50),
    tags JSON,
    creation_method ENUM('direct', 'ai', 'upload') NOT NULL,
    file_path VARCHAR(500),  -- 업로드된 파일 경로
    rating DECIMAL(2,1) DEFAULT 0.0,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_public BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE scenario_tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE scenario_tag_mapping (
    scenario_id INT,
    tag_id INT,
    PRIMARY KEY (scenario_id, tag_id),
    FOREIGN KEY (scenario_id) REFERENCES scenarios(scenario_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES scenario_tags(tag_id) ON DELETE CASCADE
);

CREATE TABLE scenario_ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    scenario_id INT NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (scenario_id) REFERENCES scenarios(scenario_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_scenario_rating (scenario_id, user_id)
);

CREATE INDEX idx_scenarios_user ON scenarios(user_id);
CREATE INDEX idx_scenarios_genre ON scenarios(genre);
CREATE FULLTEXT INDEX idx_scenarios_search ON scenarios(title, description);
```

#### API 엔드포인트:

```
POST   /api/scenarios                # 시나리오 생성
GET    /api/scenarios                # 시나리오 목록 조회 (페이징, 필터링)
GET    /api/scenarios/:id            # 특정 시나리오 조회
PUT    /api/scenarios/:id            # 시나리오 수정
DELETE /api/scenarios/:id            # 시나리오 삭제
GET    /api/scenarios/search?q=...   # 시나리오 검색
POST   /api/scenarios/:id/rating     # 시나리오 평가
POST   /api/scenarios/upload         # 파일 업로드
```

---

### 3. **팀원 매칭 시스템**

#### 필요 기능:
- 프로필 생성/수정
- 팀원 검색/필터링
- 협업 요청 전송/수락/거절
- 매칭 히스토리

#### 데이터베이스 테이블 설계:

```sql
CREATE TABLE user_profiles (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100),
    bio TEXT,
    avatar VARCHAR(500),
    skills JSON,  -- ["연출", "UX", "비주얼 노벨"]
    portfolio_url VARCHAR(500),
    available_for_collab BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE collaboration_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id VARCHAR(50) NOT NULL,
    receiver_id VARCHAR(50) NOT NULL,
    scenario_id INT,
    message TEXT,
    status ENUM('pending', 'accepted', 'rejected', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (scenario_id) REFERENCES scenarios(scenario_id) ON DELETE SET NULL
);

CREATE TABLE teams (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    creator_id VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE team_members (
    team_id INT,
    user_id VARCHAR(50),
    role VARCHAR(50),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (team_id, user_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_profiles_user ON user_profiles(user_id);
CREATE INDEX idx_collab_receiver ON collaboration_requests(receiver_id);
CREATE INDEX idx_collab_sender ON collaboration_requests(sender_id);
```

#### API 엔드포인트:

```
GET    /api/profiles                 # 프로필 목록 조회
GET    /api/profiles/:userId         # 특정 프로필 조회
PUT    /api/profiles/:userId         # 프로필 수정
POST   /api/collaboration/request    # 협업 요청
GET    /api/collaboration/requests   # 받은 협업 요청 목록
PUT    /api/collaboration/:id/accept # 협업 요청 수락
PUT    /api/collaboration/:id/reject # 협업 요청 거절
GET    /api/teams                    # 팀 목록
POST   /api/teams                    # 팀 생성
```

---

### 4. **알림 시스템**

#### 필요 기능:
- 실시간 알림 (WebSocket 또는 Server-Sent Events)
- 알림 히스토리 저장
- 알림 읽음/안읽음 표시

#### 데이터베이스 테이블 설계:

```sql
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    type ENUM('comment', 'collaboration', 'rating', 'system') NOT NULL,
    title VARCHAR(200),
    message TEXT NOT NULL,
    link VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(user_id, is_read);
```

#### API 엔드포인트:

```
GET    /api/notifications            # 알림 목록 조회
PUT    /api/notifications/:id/read   # 알림 읽음 처리
DELETE /api/notifications/:id        # 알림 삭제
```

---

### 5. **파일 관리 시스템**

#### 필요 기능:
- 파일 업로드 (Word 문서)
- 파일 다운로드
- 파일 미리보기
- 파일 용량 제한 및 검증

#### 저장 방식:
1. **로컬 파일 시스템** (개발 환경)
   - 경로: `/uploads/scenarios/`
   - 파일명 규칙: `{user_id}_{timestamp}_{original_filename}`

2. **클라우드 스토리지** (프로덕션 환경 권장)
   - AWS S3
   - Google Cloud Storage
   - Azure Blob Storage

#### API 엔드포인트:

```
POST   /api/files/upload             # 파일 업로드
GET    /api/files/:fileId            # 파일 다운로드
DELETE /api/files/:fileId            # 파일 삭제
```

---

### 6. **AI 시나리오 생성 시스템**

#### 필요 기능:
- AI API 연동 (OpenAI GPT, Claude, 등)
- 프롬프트 템플릿 관리
- 생성 히스토리 저장

#### 구현 예시 (Node.js):

```javascript
// AI 시나리오 생성 API
const { Anthropic } = require('@anthropic-ai/sdk');

async function generateScenario(userInput) {
    const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
    });

    const prompt = `
당신은 게임 시나리오 작가입니다. 
다음 아이디어를 바탕으로 게임 시나리오를 작성해주세요:

${userInput}

다음 형식으로 작성해주세요:
1. 게임 컨셉
2. 스토리 개요
3. 주요 캐릭터
4. 주요 장면 설명
    `;

    const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
    });

    return message.content[0].text;
}
```

#### API 엔드포인트:

```
POST   /api/ai/generate-scenario     # AI 시나리오 생성
GET    /api/ai/templates             # AI 템플릿 목록
```

---

## 🛠️ 기술 스택 권장사항

### Backend Framework
- **Node.js + Express** (추천)
  - 빠른 개발
  - 대규모 커뮤니티
  - JavaScript 풀스택 가능

- **Python + FastAPI**
  - AI 통합에 유리
  - 빠른 성능
  - 자동 API 문서화

- **Java + Spring Boot**
  - 엔터프라이즈급 안정성
  - 강력한 보안

### Database
- **MySQL/PostgreSQL** (추천)
  - 관계형 데이터에 적합
  - 복잡한 쿼리 지원

- **MongoDB**
  - 유연한 스키마
  - JSON 형태 데이터 저장

### 캐싱
- **Redis**
  - 세션 관리
  - 자주 조회되는 데이터 캐싱
  - 실시간 알림

### 파일 저장소
- **AWS S3** (추천)
  - 확장성
  - 저렴한 비용
  - CDN 연동 가능

### 실시간 통신
- **Socket.IO**
  - WebSocket 기반
  - 실시간 알림

---

## 🔐 보안 고려사항

### 1. **인증 보안**
```javascript
// bcrypt를 사용한 비밀번호 해싱
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}
```

### 2. **JWT 토큰 기반 인증**
```javascript
const jwt = require('jsonwebtoken');

function generateToken(userId) {
    return jwt.sign(
        { userId }, 
        process.env.JWT_SECRET, 
        { expiresIn: '7d' }
    );
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}
```

### 3. **입력 검증**
- SQL Injection 방지
- XSS 공격 방지
- CSRF 토큰 사용

### 4. **파일 업로드 보안**
- 파일 타입 검증 (MIME type)
- 파일 크기 제한
- 악성 코드 스캔

---

## 📊 성능 최적화

### 1. **데이터베이스 최적화**
- 적절한 인덱스 사용
- 쿼리 최적화
- 커넥션 풀 설정

### 2. **캐싱 전략**
```javascript
// Redis 캐싱 예시
const redis = require('redis');
const client = redis.createClient();

async function getScenarios(page) {
    const cacheKey = `scenarios:page:${page}`;
    
    // 캐시 확인
    const cached = await client.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    
    // DB 조회
    const scenarios = await db.query('SELECT * FROM scenarios LIMIT ? OFFSET ?', [10, page * 10]);
    
    // 캐시 저장 (5분)
    await client.setex(cacheKey, 300, JSON.stringify(scenarios));
    
    return scenarios;
}
```

### 3. **페이징 처리**
```javascript
// 효율적인 페이징
app.get('/api/scenarios', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    
    const scenarios = await db.query(
        'SELECT * FROM scenarios ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [limit, offset]
    );
    
    const total = await db.query('SELECT COUNT(*) as count FROM scenarios');
    
    res.json({
        data: scenarios,
        pagination: {
            page,
            limit,
            total: total[0].count,
            totalPages: Math.ceil(total[0].count / limit)
        }
    });
});
```

---

## 🚀 배포 가이드

### 1. **환경 변수 설정**
```bash
# .env 파일
NODE_ENV=production
PORT=3000
DATABASE_URL=mysql://user:password@localhost:3306/gamestory
JWT_SECRET=your-secret-key
ANTHROPIC_API_KEY=your-api-key
AWS_ACCESS_KEY=your-aws-key
AWS_SECRET_KEY=your-aws-secret
REDIS_URL=redis://localhost:6379
```

### 2. **Docker 배포**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### 3. **Nginx 설정**
```nginx
server {
    listen 80;
    server_name gamestory.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📝 다음 단계

### Phase 1: MVP 개발 (1-2개월)
1. 사용자 인증 시스템 구현
2. 시나리오 CRUD 기능
3. 기본 검색 기능

### Phase 2: 핵심 기능 (2-3개월)
1. 팀원 매칭 시스템
2. AI 시나리오 생성
3. 파일 업로드

### Phase 3: 고급 기능 (3-4개월)
1. 실시간 알림
2. 협업 공간
3. 평점 및 리뷰 시스템

### Phase 4: 최적화 및 확장 (진행 중)
1. 성능 최적화
2. 모니터링 시스템
3. 모바일 앱 개발

---

## 💡 추가 권장사항

1. **테스트 코드 작성**
   - Unit Test (Jest, Mocha)
   - Integration Test
   - E2E Test (Cypress)

2. **API 문서화**
   - Swagger/OpenAPI
   - Postman Collection

3. **모니터링**
   - Application Performance Monitoring (APM)
   - Error Tracking (Sentry)
   - Logging (Winston, Bunyan)

4. **CI/CD 파이프라인**
   - GitHub Actions
   - GitLab CI
   - Jenkins

---

## 📞 문의 및 지원

이 가이드를 따라 백엔드를 구현하시면 Game Story 플랫폼을 완전히 작동시킬 수 있습니다.
추가 질문이나 도움이 필요하시면 언제든 문의해주세요!
