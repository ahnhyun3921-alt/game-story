const { useState, useEffect } = React;

// 더미 데이터
const DUMMY_SCENARIOS = [
    {
        id: 1,
        title: "픽셀 던전 RPG 시나리오",
        author: "게임 제작자 A",
        description: "레트로 감성의 로그라이크 던전 탐험 게임입니다. 매번 다른 맵 생성으로 재미를 더했고 전략적 턴제 전투 시스템이 이어집니다 조합하고 전략적 던전 진행을 할줄합니다.",
        tags: ["판타지", "던전", "모험", "RPG"],
        rating: "4/5"
    },
    {
        id: 2,
        title: "사이버펑크 2087 시나리오",
        author: "게임 제작자 B",
        description: "네온이 빛나는 미래 도시를 배경으로 한 액션 RPG입니다. 해킹 시스템과 사이버웨어 강화를 통해 다양한 플레이 스타일을 즐길 수 있습니다.",
        tags: ["SF", "액션", "오픈월드", "RPG"],
        rating: "5/5"
    },
    {
        id: 3,
        title: "마법학교 어드벤처",
        author: "게임 제작자 C",
        description: "마법학교에 입학한 학생이 되어 다양한 마법을 배우고 친구들과 함께 모험을 떠나는 이야기입니다. 선택에 따라 엔딩이 달라집니다.",
        tags: ["판타지", "학교", "선택형", "어드벤처"],
        rating: "4/5"
    },
    {
        id: 4,
        title: "좀비 서바이벌 타워디펜스",
        author: "게임 제작자 D",
        description: "좀비 아포칼립스 세계에서 살아남기 위해 기지를 건설하고 방어하는 전략 게임입니다. 자원 관리와 타워 배치가 핵심입니다.",
        tags: ["호러", "생존", "전략", "타워디펜스"],
        rating: "4/5"
    },
    {
        id: 5,
        title: "우주 탐험 시뮬레이션",
        author: "게임 제작자 E",
        description: "광활한 우주를 탐험하며 새로운 행성을 발견하고 자원을 채굴하는 시뮬레이션 게임입니다. 우주선 업그레이드와 외계 생명체와의 조우가 가능합니다.",
        tags: ["SF", "탐험", "시뮬레이션", "전략"],
        rating: "5/5"
    },
    {
        id: 6,
        title: "중세 왕국 경영 시뮬레이션",
        author: "게임 제작자 F",
        description: "중세 왕국의 군주가 되어 영토를 확장하고 백성들을 다스리는 게임입니다. 외교, 전쟁, 경제 등 다양한 요소를 관리해야 합니다.",
        tags: ["역사", "전략", "경영", "시뮬레이션"],
        rating: "4/5"
    },
    {
        id: 7,
        title: "바다의 전설 해적 RPG",
        author: "게임 제작자 G",
        description: "대항해시대를 배경으로 해적선을 이끌고 보물을 찾아 항해하는 모험 RPG입니다. 해전 시스템과 크루 관리가 특징입니다.",
        tags: ["모험", "해적", "전투", "RPG"],
        rating: "5/5"
    },
    {
        id: 8,
        title: "탐정 추리 어드벤처",
        author: "게임 제작자 H",
        description: "빅토리아 시대 런던을 배경으로 한 추리 게임입니다. 단서를 모으고 증거를 분석하여 사건의 진실을 밝혀내세요.",
        tags: ["미스터리", "추리", "선택형", "어드벤처"],
        rating: "4/5"
    }
];

const DUMMY_TEAM_MEMBERS = [
    {
        id: 1,
        name: "레드플라임",
        role: "스토리 기반 VN 제작자",
        description: "감성적인 연출과 복잡한의 분기 구조 설계에 특화된 제작자입니다. 감동을 주는 게임을 함께 만들어가고!",
        skills: ["연출", "UX", "비주얼 노벨"],
        avatar: "🔥"
    },
    {
        id: 2,
        name: "블루드롭",
        role: "스토리 기반 VN 제작자",
        description: "미스터리와 스릴러 장르에 강점이 있으며 긴장감 넘치는 스토리를 구성합니다. 함께 프로젝트를 진행할 작가를 찾습니다!",
        skills: ["미스터리", "스릴러", "시나리오"],
        avatar: "💧"
    },
    {
        id: 3,
        name: "그린리프",
        role: "판타지 RPG 제작자",
        description: "방대한 세계관 구축과 캐릭터 디자인에 능숙합니다. 함께 거대한 판타지 세계를 만들 동료를 구합니다!",
        skills: ["세계관", "캐릭터 디자인", "RPG"],
        avatar: "🌱"
    },
    {
        id: 4,
        name: "골드크라운",
        role: "역사 시뮬레이션 제작자",
        description: "역사적 고증과 전략 게임 밸런싱에 전문성을 가지고 있습니다. 깊이 있는 전략 게임을 만들고 싶은 분을 찾습니다!",
        skills: ["전략", "밸런싱", "역사"],
        avatar: "👑"
    },
    {
        id: 5,
        name: "실버나이트",
        role: "액션 RPG 제작자",
        description: "다이나믹한 전투 시스템과 스킬 트리 설계를 전문으로 합니다. 함께 박진감 넘치는 게임을 만들 파트너를 구합니다!",
        skills: ["전투 시스템", "액션", "RPG"],
        avatar: "⚔️"
    },
    {
        id: 6,
        name: "바이올렛매직",
        role: "마법 판타지 제작자",
        description: "독창적인 마법 시스템과 판타지 세계관 구축에 강점이 있습니다. 환상적인 세계를 함께 만들 작가를 찾습니다!",
        skills: ["마법 시스템", "판타지", "세계관"],
        avatar: "🔮"
    },
    {
        id: 7,
        name: "다크쉐도우",
        role: "호러 게임 제작자",
        description: "심리적 공포와 서스펜스 연출에 특화되어 있습니다. 함께 등골이 오싹한 게임을 만들 동료를 찾습니다!",
        skills: ["호러", "심리", "연출"],
        avatar: "👻"
    },
    {
        id: 8,
        name: "화이트드림",
        role: "힐링 게임 제작자",
        description: "따뜻하고 감성적인 스토리텔링과 평화로운 게임 플레이 디자인이 전문입니다. 치유가 되는 게임을 만들고 싶은 분 환영합니다!",
        skills: ["힐링", "감성", "스토리텔링"],
        avatar: "☁️"
    }
];

// 헤더 컴포넌트
function Header({ currentPage, onNavigate, isLoggedIn, onLogout, currentUser }) {
    const [showNotification, setShowNotification] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, date: "11월 17일", text: "안현진 님이 시나리오에 댓글을 남겼습니다." },
        { id: 2, date: "11월 15일", text: "제임 제작자 A 님이 회의를 남겼습니다." },
        { id: 3, date: "11월 12일", text: "현진 님이 시나리오에 댓글을 남겼습니다." },
        { id: 4, date: "11월 5일", text: "제임 제작자 B 님이 지원을 받았습니다." }
    ]);

    return (
        <header className="header">
            <div className="header-content">
                <a href="#" className="logo" onClick={() => onNavigate('home')}>
                    <img src="./images/logo.png" alt="GAME STORY" className="logo-image" />
                    <span className="logo-text">GAME STORY</span>
                </a>
                
                <nav>
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <a 
                                href="#" 
                                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
                            >
                                홈
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                href="#" 
                                className={`nav-link ${currentPage === 'team' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); onNavigate('team'); }}
                            >
                                팀원 찾기
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                href="#" 
                                className={`nav-link ${currentPage.includes('scenario') ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); onNavigate('scenario-select'); }}
                            >
                                시나리오 업로드
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">마이페이지</a>
                        </li>
                        <li className="nav-item">
                            <a 
                                href="#" 
                                className={`nav-link ${currentPage === 'signup' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); onNavigate('signup'); }}
                            >
                                회원가입
                            </a>
                        </li>
                        <li className="nav-item">
                            {isLoggedIn ? (
                                <a 
                                    href="#" 
                                    className="nav-link"
                                    onClick={(e) => { e.preventDefault(); onLogout(); }}
                                >
                                    로그아웃
                                </a>
                            ) : (
                                <a 
                                    href="#" 
                                    className={`nav-link ${currentPage === 'login' ? 'active' : ''}`}
                                    onClick={(e) => { e.preventDefault(); onNavigate('login'); }}
                                >
                                    로그인
                                </a>
                            )}
                        </li>
                    </ul>
                </nav>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {isLoggedIn && currentUser && (
                        <span style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>
                            {currentUser}님
                        </span>
                    )}
                    {currentPage === 'home' && (
                        <div style={{ position: 'relative' }}>
                            <img 
                                src="./images/icon-notification.png" 
                                alt="알림" 
                                className="notification-icon"
                                onClick={() => setShowNotification(!showNotification)}
                            />
                            {showNotification && (
                                <div className="notification-dropdown">
                                    <div className="notification-header">알림</div>
                                    {notifications.map(notif => (
                                        <div key={notif.id} className="notification-item">
                                            <div className="notification-date">{notif.date}</div>
                                            <div className="notification-text">{notif.text}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

// 홈 페이지
function HomePage({ onNavigate }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('모든 장르');
    const [scenarios, setScenarios] = useState(DUMMY_SCENARIOS);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            const filtered = DUMMY_SCENARIOS.filter(scenario => 
                scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                scenario.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                scenario.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setScenarios(filtered);
        } else {
            setScenarios(DUMMY_SCENARIOS);
        }
    };

    return (
        <div className="main-content">
            <div className="banner">
                <h1 className="banner-title">머리 속의 이야기에서 손끝의 게임으로</h1>
                <div className="banner-characters">
                    <img src="./images/start-banner.png" alt="캐릭터들" className="banner-image" />
                </div>
            </div>

            <div className="search-section">
                <select 
                    className="filter-dropdown"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option>모든 장르</option>
                    <option>판타지</option>
                    <option>SF</option>
                    <option>호러</option>
                    <option>로맨스</option>
                    <option>액션</option>
                </select>
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="찾고 싶은 시나리오에 대한 키워드로 검색해보세요."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="search-button" onClick={handleSearch}>검색</button>
            </div>

            <div className="card-grid">
                {scenarios.map(scenario => (
                    <div key={scenario.id} className="scenario-card">
                        <div className="card-header">
                            <div>
                                <h3 className="card-title">{scenario.title}</h3>
                                <p className="card-subtitle">{scenario.author}</p>
                            </div>
                            <span className="rating-badge">{scenario.rating}</span>
                        </div>
                        <p className="card-description">{scenario.description}</p>
                        <div className="card-tags">
                            {scenario.tags.map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// 시나리오 작성 방식 선택
function ScenarioSelectPage({ onNavigate }) {
    return (
        <div className="main-content">
            <div className="selection-banner">
                <img src="./images/select-banner.png" alt="배너" className="selection-banner-image" />
                <h1 className="banner-text">내 상상 속 멋진 이야기를<br />시나리오로 써보세요!</h1>
            </div>

            <div className="method-cards">
                <div className="method-card" onClick={() => onNavigate('scenario-direct')}>
                    <img src="./images/icon-direct.png" alt="직접 작성" className="method-icon" />
                    <h2 className="method-title">직접 시나리오<br />작성하기</h2>
                    <p className="method-description">
                        장르 선택을 바탕으로 제공되는 템플렛을 활용해서<br />
                        더 쉽고 빠르게 시나리오를 작성해보세요.
                    </p>
                    <button className="method-button">시작하기</button>
                </div>

                <div className="method-card" onClick={() => onNavigate('scenario-ai')}>
                    <img src="./images/icon-ai.png" alt="AI 작성" className="method-icon" />
                    <h2 className="method-title">AI와 시나리오<br />작성하기</h2>
                    <p className="method-description">
                        AI의 도움으로 막힘없이<br />
                        탄탄한 이야기를 완성해보세요.
                    </p>
                    <button className="method-button">시작하기</button>
                </div>

                <div className="method-card" onClick={() => onNavigate('scenario-upload')}>
                    <img src="./images/icon-upload.png" alt="업로드" className="method-icon" />
                    <h2 className="method-title">작성한 시나리오<br />업로드하기</h2>
                    <p className="method-description">
                        미리 작성한 시나리오를 업로드하고<br />
                        팀원들을 모집해보세요.<br />
                        <span style={{ color: '#EC6363' }}>*Word만 지원됩니다.</span>
                    </p>
                    <button className="method-button">시작하기</button>
                </div>
            </div>
        </div>
    );
}

// 직접 작성 페이지
function DirectCreatePage({ onNavigate }) {
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        if (content.trim()) {
            alert('시나리오가 성공적으로 제출되었습니다!');
            onNavigate('home');
        } else {
            alert('내용을 입력해주세요.');
        }
    };

    return (
        <div className="create-page">
            <img src="./images/illust-direct.png" alt="직접 작성" className="create-character" />
            <h1 className="page-title">직접 시나리오 작성하기</h1>
            
            <textarea 
                className="textarea-large"
                placeholder="게임 아이디어, 스토리, 컨셉 등을 자유롭게 작성해주세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            
            <button className="submit-button" onClick={handleSubmit}>
                AI 시나리오 작가 활아버지에게 아이디어 보내기
            </button>
        </div>
    );
}

// AI 작성 페이지
function AICreatePage({ onNavigate }) {
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        if (content.trim()) {
            alert('AI가 시나리오를 생성 중입니다. 잠시만 기다려주세요!');
            setTimeout(() => {
                alert('시나리오 생성이 완료되었습니다!');
                onNavigate('home');
            }, 2000);
        } else {
            alert('내용을 입력해주세요.');
        }
    };

    return (
        <div className="create-page">
            <img src="./images/illust-ai.png" alt="AI 작성" className="create-character" />
            <h1 className="page-title">AI와 시나리오 작성하기</h1>
            
            <textarea 
                className="textarea-large"
                placeholder="게임 아이디어, 스토리, 컨셉 등을 자유롭게 작성해주세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            
            <button className="submit-button" onClick={handleSubmit}>
                AI 시나리오 작가 활아버지에게 아이디어 보내기
            </button>
        </div>
    );
}

// 업로드 페이지
function UploadPage({ onNavigate }) {
    const [files, setFiles] = useState([
        { name: "전설의 시작 시나리오_안현진 .docx" },
        { name: "전설의 시작 컨셉 기획서_안현진 .docx" }
    ]);

    const handleSubmit = () => {
        if (files.length > 0) {
            alert('파일이 성공적으로 업로드되었습니다!');
            onNavigate('home');
        } else {
            alert('파일을 추가해주세요.');
        }
    };

    return (
        <div className="create-page">
            <h1 className="page-title">작성한 시나리오 업로드하기</h1>
            
            <div className="upload-section">
                <label className="upload-label">파일 추가하기</label>
                <div className="file-list">
                    {files.map((file, index) => (
                        <div key={index} className="file-item">
                            <span className="file-name">{file.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <button className="submit-button" onClick={handleSubmit}>
                완료
            </button>
        </div>
    );
}

// 팀원 찾기 페이지
function TeamPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('모든 작가');
    const [members, setMembers] = useState(DUMMY_TEAM_MEMBERS);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            const filtered = DUMMY_TEAM_MEMBERS.filter(member => 
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setMembers(filtered);
        } else {
            setMembers(DUMMY_TEAM_MEMBERS);
        }
    };

    return (
        <div className="main-content">
            <div className="team-banner">
                <img src="./images/team-banner.png" alt="팀 캐릭터" className="team-banner-image" />
                <h1 className="team-title">함께할 팀원을 찾아보세요!</h1>
            </div>

            <div className="search-section">
                <select 
                    className="filter-dropdown"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option>모든 작가</option>
                    <option>시나리오 작가</option>
                    <option>게임 기획자</option>
                    <option>개발자</option>
                </select>
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="찾고 싶은 작가에 대한 키워드로 검색해보세요."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="search-button" onClick={handleSearch}>검색</button>
            </div>

            <div className="card-grid">
                {members.map(member => (
                    <div key={member.id} className="member-card">
                        <div className="member-header">
                            <div>
                                <h3 className="member-name">{member.name}</h3>
                                <p className="member-role">{member.role}</p>
                            </div>
                            <div className="member-avatar">{member.avatar}</div>
                        </div>
                        <p className="member-description">{member.description}</p>
                        <div>
                            {member.skills.map((skill, index) => (
                                <span key={index} className="skill-badge">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// 로그인 페이지
function LoginPage({ onNavigate, onLogin }) {
    const [formData, setFormData] = useState({
        id: '',
        password: ''
    });

    // 실제 계정 데이터 (실제 서비스에서는 백엔드에서 관리해야 함)
    const VALID_ACCOUNT = {
        id: 'ahnhyun9',
        password: 'dksgusWls8&',
        name: '안현진'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.id || !formData.password) {
            alert('아이디와 비밀번호를 입력해주세요.');
            return;
        }
        
        // 계정 확인
        if (formData.id === VALID_ACCOUNT.id && formData.password === VALID_ACCOUNT.password) {
            onLogin(VALID_ACCOUNT.name);
            alert(`${VALID_ACCOUNT.name}님, 환영합니다!`);
            onNavigate('home');
        } else {
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <div className="auth-page">
            <h1 className="auth-title">로그인</h1>
            <p className="auth-subtitle">로그인 후 게임 스토리를 즐거보세요!</p>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">아이디</label>
                    <input 
                        type="text" 
                        className="form-input"
                        value={formData.id}
                        onChange={(e) => setFormData({...formData, id: e.target.value})}
                        placeholder="아이디를 입력하세요"
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">비밀번호</label>
                    <input 
                        type="password" 
                        className="form-input"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>
                
                <button type="submit" className="auth-button">로그인</button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
                계정이 없으신가요? 상단의 "회원가입"을 클릭하세요.
            </p>
            
            <div style={{ marginTop: '40px', padding: '16px', background: '#f8f8f8', borderRadius: '8px', fontSize: '14px', color: '#666' }}>
                <p style={{ marginBottom: '8px', fontWeight: '600' }}>테스트 계정:</p>
                <p style={{ marginBottom: '4px' }}>아이디: ahnhyun9</p>
                <p>비밀번호: dksgusWls8&</p>
            </div>
        </div>
    );
}

// 회원가입 페이지
function SignupPage({ onNavigate }) {
    const [step, setStep] = useState('role'); // 'role' 또는 'form'
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        nickname: '',
        passwordConfirm: '',
        role: ''
    });

    const handleRoleSelect = (role) => {
        setFormData({...formData, role});
        setStep('form');
    };

    const handleSubmit = () => {
        if (!formData.id || !formData.password || !formData.nickname || !formData.passwordConfirm) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        if (formData.password !== formData.passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        alert('회원가입이 완료되었습니다!');
        onNavigate('login');
    };

    if (step === 'role') {
        return (
            <div className="role-selection">
                <h1 className="page-title">회원 가입</h1>
                <p className="auth-subtitle">간편한 회원가입으로 게임스토리를 사용하세요.</p>
                
                <div className="role-cards">
                    <div 
                        className="role-card"
                        onClick={() => handleRoleSelect('creator')}
                    >
                        <h2 className="role-title">제작자에요</h2>
                        <p className="role-subtitle">
                            재밌는 이야기와<br />
                            좋은 동료들과 함께해보세요!
                        </p>
                        <img src="./images/role-creater.png" alt="제작자" className="role-image" />
                    </div>
                    
                    <div 
                        className="role-card"
                        onClick={() => handleRoleSelect('writer')}
                    >
                        <h2 className="role-title">작가에요</h2>
                        <p className="role-subtitle">
                            재밌는 이야기를 손끝의 게임으로<br />
                            만드는 여정을 시작하세요!
                        </p>
                        <img src="./images/role-writer.png" alt="작가" className="role-image" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <h1 className="auth-title">회원 가입</h1>
            <p className="auth-subtitle">간편한 회원가입으로 게임스토리를 사용하세요.</p>
            
            <div className="form-group">
                <label className="form-label">아이디</label>
                <div className="input-with-button">
                    <input 
                        type="text" 
                        className="form-input"
                        value={formData.id}
                        onChange={(e) => setFormData({...formData, id: e.target.value})}
                    />
                    <button className="check-button">중복 검사</button>
                </div>
                <p className="form-hint">영문/숫자 포함된 8자 이상의 아이디를 입력해주세요</p>
            </div>
            
            <div className="form-group">
                <label className="form-label">비밀번호</label>
                <input 
                    type="password" 
                    className="form-input"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <p className="form-hint">영문/숫자/특수문자 포함된 8자 이상의 비밀번호를 입력해주세요</p>
            </div>
            
            <div className="form-group">
                <label className="form-label">닉네임</label>
                <div className="input-with-button">
                    <input 
                        type="text" 
                        className="form-input"
                        value={formData.nickname}
                        onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                    />
                    <button className="check-button">중복 검사</button>
                </div>
                <p className="form-hint">영문/한글/숫자가 포함된 3자 이상의 닉네임을 입력해주세요</p>
            </div>
            
            <div className="form-group">
                <label className="form-label">비밀번호 재입력</label>
                <input 
                    type="password" 
                    className="form-input"
                    value={formData.passwordConfirm}
                    onChange={(e) => setFormData({...formData, passwordConfirm: e.target.value})}
                />
                <p className="form-hint">위에 입력한 비밀번호와 동일한 비밀번호를 다시 입력해주세요</p>
            </div>
            
            <button className="auth-button" onClick={handleSubmit}>회원가입 완료</button>
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button 
                    onClick={() => setStep('role')} 
                    style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline', fontSize: '14px' }}
                >
                    역할 다시 선택하기
                </button>
            </div>
        </div>
    );
}

// 메인 앱 컴포넌트
function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogin = (userId) => {
        setIsLoggedIn(true);
        setCurrentUser(userId);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setCurrentPage('home');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage onNavigate={setCurrentPage} />;
            case 'team':
                return <TeamPage />;
            case 'scenario-select':
                return <ScenarioSelectPage onNavigate={setCurrentPage} />;
            case 'scenario-direct':
                return <DirectCreatePage onNavigate={setCurrentPage} />;
            case 'scenario-ai':
                return <AICreatePage onNavigate={setCurrentPage} />;
            case 'scenario-upload':
                return <UploadPage onNavigate={setCurrentPage} />;
            case 'login':
                return <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
            case 'signup':
                return <SignupPage onNavigate={setCurrentPage} />;
            default:
                return <HomePage onNavigate={setCurrentPage} />;
        }
    };

    return (
        <div>
            <Header 
                currentPage={currentPage} 
                onNavigate={setCurrentPage}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                currentUser={currentUser}
            />
            {renderPage()}
        </div>
    );
}

// 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
