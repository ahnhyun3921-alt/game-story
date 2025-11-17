const { useState, useEffect } = React;

// 더미 데이터
const DUMMY_SCENARIOS = [
    {
        id: 1,
        title: "픽셀 던전 RPG 시나리오",
        author: "게임 제작자 A",
        description: "레트로 감성의 로그라이크 던전 탐험 게임입니다. 매번 다른 맵 생성으로 재미를 더했고 전략적 턴제 전투 시스템이 이어집니다 조합하고 전략적 던전 진행을 할줄합니다.",
        tags: ["판타지", "던전", "모험", "RPG"],
        rating: "4/5",
        fullContent: "레트로 감성의 로그라이크 던전 탐험 게임입니다.\n\n**게임 개요**\n매번 다른 맵 생성으로 재미를 더했고 전략적 턴제 전투 시스템이 이어집니다. 플레이어는 무작위로 생성되는 던전을 탐험하며, 다양한 몬스터와 보스를 상대하게 됩니다.\n\n**핵심 시스템**\n- 로그라이크 맵 생성\n- 턴제 전투 시스템\n- 아이템 조합 시스템\n- 캐릭터 성장 시스템\n\n**스토리 라인**\n고대 던전에 갇힌 영웅이 탈출을 위해 깊은 지하로 내려가는 이야기입니다.",
        comments: []
    },
    {
        id: 2,
        title: "사이버펑크 2087 시나리오",
        author: "게임 제작자 B",
        description: "네온이 빛나는 미래 도시를 배경으로 한 액션 RPG입니다. 해킹 시스템과 사이버웨어 강화를 통해 다양한 플레이 스타일을 즐길 수 있습니다.",
        tags: ["SF", "액션", "오픈월드", "RPG"],
        rating: "5/5",
        fullContent: "네온이 빛나는 미래 도시를 배경으로 한 액션 RPG입니다.\n\n**게임 개요**\n2087년, 거대 기업이 지배하는 메가시티에서 펼쳐지는 사이버펑크 이야기입니다.\n\n**핵심 시스템**\n- 해킹 시스템\n- 사이버웨어 커스터마이징\n- 분기형 스토리\n- 오픈월드 탐험",
        comments: []
    },
    {
        id: 3,
        title: "마법학교 어드벤처",
        author: "게임 제작자 C",
        description: "마법학교에 입학한 학생이 되어 다양한 마법을 배우고 친구들과 함께 모험을 떠나는 이야기입니다. 선택에 따라 엔딩이 달라집니다.",
        tags: ["판타지", "학교", "선택형", "어드벤처"],
        rating: "4/5",
        fullContent: "마법학교에 입학한 학생이 되어 다양한 마법을 배우고 친구들과 함께 모험을 떠나는 이야기입니다.\n\n**게임 개요**\n선택에 따라 엔딩이 달라지는 비주얼 노벨 스타일의 어드벤처 게임입니다.",
        comments: []
    },
    {
        id: 4,
        title: "좀비 서바이벌 타워디펜스",
        author: "게임 제작자 D",
        description: "좀비 아포칼립스 세계에서 살아남기 위해 기지를 건설하고 방어하는 전략 게임입니다. 자원 관리와 타워 배치가 핵심입니다.",
        tags: ["호러", "생존", "전략", "타워디펜스"],
        rating: "4/5",
        fullContent: "좀비 아포칼립스 세계에서 살아남기 위한 전략 게임입니다.\n\n**게임 개요**\n기지를 건설하고 방어하며, 자원을 관리하여 생존하는 타워디펜스 게임입니다.",
        comments: []
    },
    {
        id: 5,
        title: "우주 탐험 시뮬레이션",
        author: "게임 제작자 E",
        description: "광활한 우주를 탐험하며 새로운 행성을 발견하고 자원을 채굴하는 시뮬레이션 게임입니다. 우주선 업그레이드와 외계 생명체와의 조우가 가능합니다.",
        tags: ["SF", "탐험", "시뮬레이션", "전략"],
        rating: "5/5",
        fullContent: "광활한 우주를 탐험하는 시뮬레이션 게임입니다.\n\n**게임 개요**\n새로운 행성을 발견하고 자원을 채굴하며 우주선을 업그레이드합니다.",
        comments: []
    },
    {
        id: 6,
        title: "중세 왕국 경영 시뮬레이션",
        author: "게임 제작자 F",
        description: "중세 왕국의 군주가 되어 영토를 확장하고 백성들을 다스리는 게임입니다. 외교, 전쟁, 경제 등 다양한 요소를 관리해야 합니다.",
        tags: ["역사", "전략", "경영", "시뮬레이션"],
        rating: "4/5",
        fullContent: "중세 왕국의 군주가 되어 영토를 확장하고 백성들을 다스리는 게임입니다.",
        comments: []
    },
    {
        id: 7,
        title: "바다의 전설 해적 RPG",
        author: "게임 제작자 G",
        description: "대항해시대를 배경으로 해적선을 이끌고 보물을 찾아 항해하는 모험 RPG입니다. 해전 시스템과 크루 관리가 특징입니다.",
        tags: ["모험", "해적", "전투", "RPG"],
        rating: "5/5",
        fullContent: "대항해시대를 배경으로 해적선을 이끌고 보물을 찾아 항해하는 모험 RPG입니다.",
        comments: []
    },
    {
        id: 8,
        title: "탐정 추리 어드벤처",
        author: "게임 제작자 H",
        description: "빅토리아 시대 런던을 배경으로 한 추리 게임입니다. 단서를 모으고 증거를 분석하여 사건의 진실을 밝혀내세요.",
        tags: ["미스터리", "추리", "선택형", "어드벤처"],
        rating: "4/5",
        fullContent: "빅토리아 시대 런던을 배경으로 한 추리 게임입니다.",
        comments: []
    }
];

const DUMMY_TEAM_MEMBERS = [
    {
        id: 1,
        name: "레드플라임",
        role: "스토리 기반 VN 제작자",
        description: "감성적인 연출과 복잡한의 분기 구조 설계에 특화된 제작자입니다. 감동을 주는 게임을 함께 만들어가고!",
        skills: ["연출", "UX", "비주얼 노벨"],
        avatar: "🔥",
        contact: "redflame@example.com",
        portfolio: "3년차 비주얼 노벨 제작자로, 다수의 인디 게임 프로젝트에 참여했습니다.",
        experience: "대표작: '봄날의 약속', '겨울 이야기'",
        detailedDescription: "감성적인 스토리텔링과 복잡한 분기 구조 설계를 전문으로 합니다. 플레이어의 선택이 의미있게 다가가는 게임을 만들고자 합니다."
    },
    {
        id: 2,
        name: "블루드롭",
        role: "스토리 기반 VN 제작자",
        description: "미스터리와 스릴러 장르에 강점이 있으며 긴장감 넘치는 스토리를 구성합니다. 함께 프로젝트를 진행할 작가를 찾습니다!",
        skills: ["미스터리", "스릴러", "시나리오"],
        avatar: "💧",
        contact: "bluedrop@example.com",
        portfolio: "5년차 게임 시나리오 작가입니다.",
        experience: "대표작: '어둠 속의 진실', '밤의 목격자'",
        detailedDescription: "미스터리와 스릴러 장르에 특화되어 있으며, 긴장감 넘치는 플롯과 반전을 설계하는 데 강점이 있습니다."
    },
    {
        id: 3,
        name: "그린리프",
        role: "판타지 RPG 제작자",
        description: "방대한 세계관 구축과 캐릭터 디자인에 능숙합니다. 함께 거대한 판타지 세계를 만들 동료를 구합니다!",
        skills: ["세계관", "캐릭터 디자인", "RPG"],
        avatar: "🌱",
        contact: "greenleaf@example.com",
        portfolio: "판타지 세계관 전문 작가, 4년 경력",
        experience: "대표작: '에테르 연대기', '고대의 숲'",
        detailedDescription: "방대한 판타지 세계관 구축과 매력적인 캐릭터 설계에 전문성을 가지고 있습니다."
    },
    {
        id: 4,
        name: "골드크라운",
        role: "역사 시뮬레이션 제작자",
        description: "역사적 고증과 전략 게임 밸런싱에 전문성을 가지고 있습니다. 깊이 있는 전략 게임을 만들고 싶은 분을 찾습니다!",
        skills: ["전략", "밸런싱", "역사"],
        avatar: "👑",
        contact: "goldcrown@example.com",
        portfolio: "역사 시뮬레이션 게임 디자이너, 6년 경력",
        experience: "대표작: '삼국지 외전', '제국의 흥망'",
        detailedDescription: "역사적 고증과 게임 밸런싱을 조화롭게 설계하는 데 강점이 있습니다."
    },
    {
        id: 5,
        name: "실버나이트",
        role: "액션 RPG 제작자",
        description: "다이나믹한 전투 시스템과 스킬 트리 설계를 전문으로 합니다. 함께 박진감 넘치는 게임을 만들 파트너를 구합니다!",
        skills: ["전투 시스템", "액션", "RPG"],
        avatar: "⚔️",
        contact: "silverknight@example.com",
        portfolio: "액션 RPG 전투 시스템 디자이너, 5년 경력",
        experience: "대표작: '검의 전설', '전쟁의 서막'",
        detailedDescription: "다이나믹한 전투 시스템과 깊이 있는 스킬 트리 설계를 전문으로 합니다."
    },
    {
        id: 6,
        name: "바이올렛매직",
        role: "마법 판타지 제작자",
        description: "독창적인 마법 시스템과 판타지 세계관 구축에 강점이 있습니다. 환상적인 세계를 함께 만들 작가를 찾습니다!",
        skills: ["마법 시스템", "판타지", "세계관"],
        avatar: "🔮",
        contact: "violetmagic@example.com",
        portfolio: "마법 시스템 설계 전문, 4년 경력",
        experience: "대표작: '마법사의 탑', '영원한 마나'",
        detailedDescription: "독창적인 마법 시스템과 환상적인 판타지 세계관 구축에 강점이 있습니다."
    },
    {
        id: 7,
        name: "다크쉐도우",
        role: "호러 게임 제작자",
        description: "심리적 공포와 서스펜스 연출에 특화되어 있습니다. 함께 등골이 오싹한 게임을 만들 동료를 찾습니다!",
        skills: ["호러", "심리", "연출"],
        avatar: "👻",
        contact: "darkshadow@example.com",
        portfolio: "호러 게임 연출가, 3년 경력",
        experience: "대표작: '어둠의 숨결', '공포의 저택'",
        detailedDescription: "심리적 공포와 서스펜스 연출에 특화되어 있으며, 플레이어에게 깊은 인상을 남기는 호러 게임을 만듭니다."
    },
    {
        id: 8,
        name: "화이트드림",
        role: "힐링 게임 제작자",
        description: "따뜻하고 감성적인 스토리텔링과 평화로운 게임 플레이 디자인이 전문입니다. 치유가 되는 게임을 만들고 싶은 분 환영합니다!",
        skills: ["힐링", "감성", "스토리텔링"],
        avatar: "☁️",
        contact: "whitedream@example.com",
        portfolio: "힐링 게임 스토리텔러, 4년 경력",
        experience: "대표작: '작은 정원', '따뜻한 하루'",
        detailedDescription: "따뜻하고 감성적인 스토리텔링으로 플레이어에게 치유와 위로를 전하는 게임을 만듭니다."
    }
];

// 헤더 컴포넌트 (통일된 GNB)
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
                                className={`nav-link ${currentPage === 'team' || currentPage.includes('team-detail') ? 'active' : ''}`}
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
                        {!isLoggedIn && (
                            <>
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
                                    <a 
                                        href="#" 
                                        className={`nav-link ${currentPage === 'login' ? 'active' : ''}`}
                                        onClick={(e) => { e.preventDefault(); onNavigate('login'); }}
                                    >
                                        로그인
                                    </a>
                                </li>
                            </>
                        )}
                        {isLoggedIn && (
                            <li className="nav-item">
                                <a 
                                    href="#" 
                                    className="nav-link"
                                    onClick={(e) => { e.preventDefault(); onLogout(); }}
                                >
                                    로그아웃
                                </a>
                            </li>
                        )}
                    </ul>
                </nav>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {isLoggedIn && currentUser && (
                        <span style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>
                            {currentUser}님
                        </span>
                    )}
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
                </div>
            </div>
        </header>
    );
}

// 홈 페이지
function HomePage({ onNavigate, onScenarioClick }) {
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
            <div className="banner" style={{ position: 'relative', minHeight: '400px' }}>
                <div className="banner-characters">
                    <img src="./images/start-banner.png" alt="캐릭터들" className="banner-image" />
                </div>
                <h1 className="banner-title" style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10%',
                    transform: 'translateY(-50%)',
                    color: '#ff6b6b',
                    fontSize: '48px',
                    fontWeight: '700',
                    textAlign: 'right',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                    lineHeight: '1.4',
                    margin: 0,
                    zIndex: 10
                }}>
                    함께할 팀원을 찾아보세요!
                </h1>
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
                    <div 
                        key={scenario.id} 
                        className="scenario-card"
                        onClick={() => onScenarioClick(scenario.id)}
                        style={{ cursor: 'pointer' }}
                    >
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

// 시나리오 상세보기 페이지
function ScenarioDetailPage({ scenarioId, onNavigate }) {
    const scenario = DUMMY_SCENARIOS.find(s => s.id === scenarioId);
    const [comments, setComments] = useState(scenario?.comments || []);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');

    if (!scenario) {
        return <div className="main-content"><h2>시나리오를 찾을 수 없습니다.</h2></div>;
    }

    const handleAddComment = () => {
        if (newComment.trim()) {
            const comment = {
                id: Date.now(),
                author: "현재 사용자",
                text: newComment,
                date: new Date().toLocaleDateString('ko-KR'),
                replies: []
            };
            setComments([...comments, comment]);
            setNewComment('');
        }
    };

    const handleAddReply = (commentId) => {
        if (replyText.trim()) {
            const updatedComments = comments.map(comment => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        replies: [...(comment.replies || []), {
                            id: Date.now(),
                            author: "현재 사용자",
                            text: replyText,
                            date: new Date().toLocaleDateString('ko-KR')
                        }]
                    };
                }
                return comment;
            });
            setComments(updatedComments);
            setReplyText('');
            setReplyingTo(null);
        }
    };

    return (
        <div className="main-content">
            <div className="detail-container">
                <button 
                    onClick={() => onNavigate('home')} 
                    style={{ 
                        marginBottom: '20px', 
                        padding: '8px 16px', 
                        background: '#666', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer' 
                    }}
                >
                    ← 목록으로
                </button>

                <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                        <div>
                            <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>{scenario.title}</h1>
                            <p style={{ color: '#666', fontSize: '16px' }}>작성자: {scenario.author}</p>
                        </div>
                        <span className="rating-badge" style={{ fontSize: '24px' }}>{scenario.rating}</span>
                    </div>

                    <div className="card-tags" style={{ marginBottom: '30px' }}>
                        {scenario.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>

                    <div style={{ lineHeight: '1.8', fontSize: '16px', whiteSpace: 'pre-line', marginBottom: '40px' }}>
                        {scenario.fullContent}
                    </div>

                    <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ddd' }} />

                    <div>
                        <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>댓글 ({comments.length})</h3>
                        
                        <div style={{ marginBottom: '30px' }}>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="댓글을 입력하세요..."
                                style={{
                                    width: '100%',
                                    minHeight: '100px',
                                    padding: '12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    resize: 'vertical'
                                }}
                            />
                            <button
                                onClick={handleAddComment}
                                style={{
                                    marginTop: '10px',
                                    padding: '10px 20px',
                                    background: '#7c3aed',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                댓글 작성
                            </button>
                        </div>

                        <div>
                            {comments.map(comment => (
                                <div key={comment.id} style={{ marginBottom: '30px', padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <strong>{comment.author}</strong>
                                        <span style={{ color: '#666', fontSize: '14px' }}>{comment.date}</span>
                                    </div>
                                    <p style={{ marginBottom: '10px' }}>{comment.text}</p>
                                    <button
                                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                        style={{
                                            padding: '6px 12px',
                                            background: 'transparent',
                                            color: '#7c3aed',
                                            border: '1px solid #7c3aed',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                    >
                                        {replyingTo === comment.id ? '취소' : '답글'}
                                    </button>

                                    {replyingTo === comment.id && (
                                        <div style={{ marginTop: '15px', marginLeft: '20px' }}>
                                            <textarea
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                placeholder="답글을 입력하세요..."
                                                style={{
                                                    width: '100%',
                                                    minHeight: '80px',
                                                    padding: '10px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    fontSize: '14px'
                                                }}
                                            />
                                            <button
                                                onClick={() => handleAddReply(comment.id)}
                                                style={{
                                                    marginTop: '8px',
                                                    padding: '8px 16px',
                                                    background: '#7c3aed',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '13px'
                                                }}
                                            >
                                                답글 작성
                                            </button>
                                        </div>
                                    )}

                                    {comment.replies && comment.replies.length > 0 && (
                                        <div style={{ marginTop: '20px', marginLeft: '30px' }}>
                                            {comment.replies.map(reply => (
                                                <div key={reply.id} style={{ marginBottom: '15px', padding: '15px', background: 'white', borderRadius: '6px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                        <strong style={{ fontSize: '14px' }}>↳ {reply.author}</strong>
                                                        <span style={{ color: '#666', fontSize: '12px' }}>{reply.date}</span>
                                                    </div>
                                                    <p style={{ fontSize: '14px' }}>{reply.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 팀원 찾기 페이지
function TeamPage({ onTeamMemberClick }) {
    return (
        <div className="main-content">
            <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>팀원 찾기</h2>
            <div className="card-grid">
                {DUMMY_TEAM_MEMBERS.map(member => (
                    <div 
                        key={member.id} 
                        className="team-card"
                        onClick={() => onTeamMemberClick(member.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="team-avatar">{member.avatar}</div>
                        <h3 className="team-name">{member.name}</h3>
                        <p className="team-role">{member.role}</p>
                        <p className="team-description">{member.description}</p>
                        <div className="team-skills">
                            {member.skills.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// 팀원 상세보기 페이지
function TeamDetailPage({ memberId, onNavigate }) {
    const member = DUMMY_TEAM_MEMBERS.find(m => m.id === memberId);
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactMessage, setContactMessage] = useState('');

    if (!member) {
        return <div className="main-content"><h2>팀원을 찾을 수 없습니다.</h2></div>;
    }

    const handleSendMessage = () => {
        if (contactMessage.trim()) {
            alert(`${member.name}님에게 메시지를 전송했습니다:\n\n${contactMessage}`);
            setContactMessage('');
            setShowContactForm(false);
        }
    };

    return (
        <div className="main-content">
            <div className="detail-container">
                <button 
                    onClick={() => onNavigate('team')} 
                    style={{ 
                        marginBottom: '20px', 
                        padding: '8px 16px', 
                        background: '#666', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer' 
                    }}
                >
                    ← 목록으로
                </button>

                <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <div style={{ fontSize: '80px', marginBottom: '20px' }}>{member.avatar}</div>
                        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>{member.name}</h1>
                        <p style={{ color: '#7c3aed', fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>{member.role}</p>
                        
                        <div className="team-skills" style={{ justifyContent: 'center', marginBottom: '20px' }}>
                            {member.skills.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowContactForm(!showContactForm)}
                            style={{
                                padding: '12px 32px',
                                background: '#7c3aed',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: '600',
                                marginTop: '10px'
                            }}
                        >
                            💬 연락하기
                        </button>
                    </div>

                    {showContactForm && (
                        <div style={{ 
                            marginTop: '30px', 
                            padding: '30px', 
                            background: '#f9fafb', 
                            borderRadius: '8px',
                            border: '2px solid #7c3aed'
                        }}>
                            <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>메시지 보내기</h3>
                            <textarea
                                value={contactMessage}
                                onChange={(e) => setContactMessage(e.target.value)}
                                placeholder={`${member.name}님에게 전달할 메시지를 입력하세요...`}
                                style={{
                                    width: '100%',
                                    minHeight: '150px',
                                    padding: '15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    resize: 'vertical',
                                    marginBottom: '15px'
                                }}
                            />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={handleSendMessage}
                                    style={{
                                        padding: '10px 24px',
                                        background: '#7c3aed',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600'
                                    }}
                                >
                                    전송
                                </button>
                                <button
                                    onClick={() => setShowContactForm(false)}
                                    style={{
                                        padding: '10px 24px',
                                        background: '#e5e7eb',
                                        color: '#374151',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600'
                                    }}
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    )}

                    <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ddd' }} />

                    <div>
                        <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>소개</h3>
                        <p style={{ lineHeight: '1.8', marginBottom: '30px' }}>{member.detailedDescription}</p>

                        <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>포트폴리오</h3>
                        <p style={{ lineHeight: '1.8', marginBottom: '30px' }}>{member.portfolio}</p>

                        <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>주요 작업 경험</h3>
                        <p style={{ lineHeight: '1.8', marginBottom: '30px' }}>{member.experience}</p>

                        <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>연락처</h3>
                        <p style={{ lineHeight: '1.8', color: '#7c3aed' }}>{member.contact}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 시나리오 선택 페이지
function ScenarioSelectPage({ onNavigate }) {
    return (
        <div className="main-content">
            <div className="scenario-select-container">
                <h2 className="select-title">어떤 방식으로 시나리오를 업로드하시겠어요?</h2>
                <div className="select-cards">
                    <div className="select-card" onClick={() => onNavigate('scenario-direct')}>
                        <div className="select-icon">✍️</div>
                        <h3 className="select-card-title">직접 작성하기</h3>
                        <p className="select-card-description">시나리오를 직접 입력하여 업로드합니다</p>
                    </div>
                    <div className="select-card" onClick={() => onNavigate('scenario-ai')}>
                        <div className="select-icon">🤖</div>
                        <h3 className="select-card-title">AI와 함께 작성하기</h3>
                        <p className="select-card-description">AI의 도움을 받아 시나리오를 작성합니다</p>
                    </div>
                    <div className="select-card" onClick={() => onNavigate('scenario-upload')}>
                        <div className="select-icon">📁</div>
                        <h3 className="select-card-title">파일 업로드하기</h3>
                        <p className="select-card-description">작성된 시나리오 파일을 업로드합니다</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 직접 작성 페이지
function DirectCreatePage({ onNavigate }) {
    const [formData, setFormData] = useState({
        title: '',
        genre: '판타지',
        summary: '',
        content: ''
    });

    const handleSubmit = () => {
        alert('시나리오가 업로드되었습니다!');
        onNavigate('home');
    };

    return (
        <div className="main-content">
            <div className="form-container">
                <h2 className="form-title">시나리오 직접 작성하기</h2>
                
                <div className="form-group">
                    <label className="form-label">시나리오 제목</label>
                    <input 
                        type="text" 
                        className="form-input"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="시나리오 제목을 입력하세요"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">장르</label>
                    <select 
                        className="form-input"
                        value={formData.genre}
                        onChange={(e) => setFormData({...formData, genre: e.target.value})}
                    >
                        <option>판타지</option>
                        <option>SF</option>
                        <option>호러</option>
                        <option>로맨스</option>
                        <option>액션</option>
                        <option>어드벤처</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">간단한 요약</label>
                    <textarea 
                        className="form-input"
                        value={formData.summary}
                        onChange={(e) => setFormData({...formData, summary: e.target.value})}
                        placeholder="시나리오를 간단히 요약해주세요"
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">시나리오 내용</label>
                    <textarea 
                        className="form-input"
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        placeholder="시나리오 내용을 작성해주세요"
                        rows="15"
                    />
                </div>

                <button className="auth-button" onClick={handleSubmit}>업로드</button>
            </div>
        </div>
    );
}

// AI 작성 페이지
function AICreatePage({ onNavigate }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        genre: '',
        theme: '',
        characters: '',
        setting: ''
    });
    const [generatedScenario, setGeneratedScenario] = useState('');

    const handleGenerate = () => {
        setGeneratedScenario(`[AI 생성 시나리오]\n\n장르: ${formData.genre}\n테마: ${formData.theme}\n\n이것은 AI가 생성한 시나리오 예시입니다...`);
        setStep(2);
    };

    const handleSubmit = () => {
        alert('AI 생성 시나리오가 업로드되었습니다!');
        onNavigate('home');
    };

    if (step === 1) {
        return (
            <div className="main-content">
                <div className="form-container">
                    <h2 className="form-title">AI와 함께 시나리오 작성하기</h2>
                    
                    <div className="form-group">
                        <label className="form-label">장르</label>
                        <select 
                            className="form-input"
                            value={formData.genre}
                            onChange={(e) => setFormData({...formData, genre: e.target.value})}
                        >
                            <option value="">선택하세요</option>
                            <option>판타지</option>
                            <option>SF</option>
                            <option>호러</option>
                            <option>로맨스</option>
                            <option>액션</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">주요 테마</label>
                        <input 
                            type="text" 
                            className="form-input"
                            value={formData.theme}
                            onChange={(e) => setFormData({...formData, theme: e.target.value})}
                            placeholder="예: 우정, 모험, 성장"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">주요 캐릭터</label>
                        <textarea 
                            className="form-input"
                            value={formData.characters}
                            onChange={(e) => setFormData({...formData, characters: e.target.value})}
                            placeholder="주요 캐릭터들을 간단히 설명해주세요"
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">배경 설정</label>
                        <textarea 
                            className="form-input"
                            value={formData.setting}
                            onChange={(e) => setFormData({...formData, setting: e.target.value})}
                            placeholder="게임의 배경이 되는 세계관을 설명해주세요"
                            rows="4"
                        />
                    </div>

                    <button className="auth-button" onClick={handleGenerate}>AI로 시나리오 생성</button>
                </div>
            </div>
        );
    }

    return (
        <div className="main-content">
            <div className="form-container">
                <h2 className="form-title">생성된 시나리오</h2>
                
                <div className="form-group">
                    <label className="form-label">AI가 생성한 시나리오</label>
                    <textarea 
                        className="form-input"
                        value={generatedScenario}
                        onChange={(e) => setGeneratedScenario(e.target.value)}
                        rows="15"
                    />
                    <p className="form-hint">생성된 시나리오를 수정할 수 있습니다</p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="auth-button" onClick={handleSubmit}>업로드</button>
                    <button 
                        className="auth-button" 
                        onClick={() => setStep(1)}
                        style={{ background: '#666' }}
                    >
                        다시 생성
                    </button>
                </div>
            </div>
        </div>
    );
}

// 파일 업로드 페이지
function UploadPage({ onNavigate }) {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        genre: '판타지',
        summary: ''
    });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        if (!file) {
            alert('파일을 선택해주세요!');
            return;
        }
        alert('시나리오 파일이 업로드되었습니다!');
        onNavigate('home');
    };

    return (
        <div className="main-content">
            <div className="form-container">
                <h2 className="form-title">시나리오 파일 업로드</h2>
                
                <div className="form-group">
                    <label className="form-label">시나리오 제목</label>
                    <input 
                        type="text" 
                        className="form-input"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="시나리오 제목을 입력하세요"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">장르</label>
                    <select 
                        className="form-input"
                        value={formData.genre}
                        onChange={(e) => setFormData({...formData, genre: e.target.value})}
                    >
                        <option>판타지</option>
                        <option>SF</option>
                        <option>호러</option>
                        <option>로맨스</option>
                        <option>액션</option>
                        <option>어드벤처</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">간단한 요약</label>
                    <textarea 
                        className="form-input"
                        value={formData.summary}
                        onChange={(e) => setFormData({...formData, summary: e.target.value})}
                        placeholder="시나리오를 간단히 요약해주세요"
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">시나리오 파일</label>
                    <input 
                        type="file" 
                        className="form-input"
                        onChange={handleFileChange}
                        accept=".txt,.doc,.docx,.pdf"
                    />
                    <p className="form-hint">TXT, DOC, DOCX, PDF 파일을 업로드할 수 있습니다</p>
                </div>

                <button className="auth-button" onClick={handleSubmit}>업로드</button>
            </div>
        </div>
    );
}

// 로그인 페이지
function LoginPage({ onNavigate, onLogin }) {
    const [formData, setFormData] = useState({ id: '', password: '' });

    const handleSubmit = () => {
        if (formData.id && formData.password) {
            onLogin(formData.id);
            onNavigate('home');
        } else {
            alert('아이디와 비밀번호를 입력해주세요!');
        }
    };

    return (
        <div className="main-content">
            <div className="auth-container">
                <h2 className="auth-title">로그인</h2>
                
                <div className="form-group">
                    <label className="form-label">아이디</label>
                    <input 
                        type="text" 
                        className="form-input"
                        value={formData.id}
                        onChange={(e) => setFormData({...formData, id: e.target.value})}
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">비밀번호</label>
                    <input 
                        type="password" 
                        className="form-input"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </div>
                
                <button className="auth-button" onClick={handleSubmit}>로그인</button>
                
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <span style={{ color: '#666' }}>계정이 없으신가요? </span>
                    <a href="#" onClick={() => onNavigate('signup')} style={{ color: '#7c3aed', fontWeight: '600' }}>
                        회원가입
                    </a>
                </div>
            </div>
        </div>
    );
}

// 회원가입 페이지 (직군 선택 추가)
function SignupPage({ onNavigate }) {
    const [step, setStep] = useState('role'); // 'role' or 'form'
    const [selectedRole, setSelectedRole] = useState('');
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        passwordConfirm: '',
        nickname: ''
    });

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setStep('form');
    };

    const handleSubmit = () => {
        if (!formData.id || !formData.password || !formData.passwordConfirm || !formData.nickname) {
            alert('모든 항목을 입력해주세요!');
            return;
        }
        if (formData.password !== formData.passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다!');
            return;
        }
        alert(`${selectedRole}로 회원가입이 완료되었습니다!`);
        onNavigate('login');
    };

    if (step === 'role') {
        return (
            <div className="main-content">
                <div className="auth-container">
                    <h2 className="auth-title">직군 선택</h2>
                    <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
                        어떤 역할로 활동하시겠어요?
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <button
                            onClick={() => handleRoleSelect('시나리오 작가')}
                            style={{
                                padding: '20px',
                                background: '#262123',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#3a3538';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = '#262123';
                            }}
                        >
                            ✍️ 시나리오 작가
                        </button>
                        
                        <button
                            onClick={() => handleRoleSelect('게임 제작자')}
                            style={{
                                padding: '20px',
                                background: '#262123',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#3a3538';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = '#262123';
                            }}
                        >
                            🎮 게임 제작자
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="main-content">
            <div className="auth-container">
                <h2 className="auth-title">회원가입</h2>
                <p style={{ textAlign: 'center', color: '#7c3aed', fontWeight: '600', marginBottom: '20px' }}>
                    선택한 직군: {selectedRole}
                </p>
                
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
        </div>
    );
}

// 메인 앱 컴포넌트
function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedScenarioId, setSelectedScenarioId] = useState(null);
    const [selectedMemberId, setSelectedMemberId] = useState(null);

    const handleLogin = (userId) => {
        setIsLoggedIn(true);
        setCurrentUser(userId);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setCurrentPage('home');
    };

    const handleScenarioClick = (scenarioId) => {
        setSelectedScenarioId(scenarioId);
        setCurrentPage('scenario-detail');
    };

    const handleTeamMemberClick = (memberId) => {
        setSelectedMemberId(memberId);
        setCurrentPage('team-detail-' + memberId);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage onNavigate={setCurrentPage} onScenarioClick={handleScenarioClick} />;
            case 'scenario-detail':
                return <ScenarioDetailPage scenarioId={selectedScenarioId} onNavigate={setCurrentPage} />;
            case 'team':
                return <TeamPage onTeamMemberClick={handleTeamMemberClick} />;
            default:
                if (currentPage.startsWith('team-detail-')) {
                    return <TeamDetailPage memberId={selectedMemberId} onNavigate={setCurrentPage} />;
                }
                switch (currentPage) {
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
                        return <HomePage onNavigate={setCurrentPage} onScenarioClick={handleScenarioClick} />;
                }
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
