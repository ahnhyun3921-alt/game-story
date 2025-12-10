const { useState, useEffect } = React;

// 장르별 시나리오 작성 템플릿
const SCENARIO_TEMPLATES = {
    "RPG": {
        sections: [
            { 
                title: "기본 정보",
                fields: [
                    { label: "제목", placeholder: "게임의 정체성을 나타내는 제목", type: "text" },
                    { label: "장르", value: "RPG", type: "readonly" },
                    { label: "배경설정", placeholder: "세계관에 대한 간단한 개요를 적어주세요", type: "textarea" },
                    { label: "메인 테마", placeholder: "게임이 전달하고 싶은 핵심 메시지는 무엇인가요?", type: "textarea" },
                    { label: "타겟 유저층", placeholder: "어떤 플레이어를 대상으로 하나요?", type: "text" },
                    { label: "플랫폼", placeholder: "PC, 모바일, 콘솔 등", type: "text" }
                ]
            },
            {
                title: "캐릭터",
                fields: [
                    { label: "주인공", placeholder: "플레이어가 직접 플레이할 캐릭터", type: "textarea" },
                    { label: "주연", placeholder: "주인공과 상호작용이 많은 캐릭터", type: "textarea" },
                    { label: "조연", placeholder: "비중이 적은 조력자, NPC", type: "textarea" },
                    { label: "적대 세력", placeholder: "주인공의 행보와 반대되는 캐릭터", type: "textarea" }
                ]
            },
            {
                title: "세계관",
                fields: [
                    { label: "세계관 규칙", placeholder: "해당 세계관에서 중요한 규칙은 무엇인가요?", type: "textarea" },
                    { label: "공간적 배경", placeholder: "작품의 주 무대 (대륙, 섬, 도시 등)", type: "textarea" },
                    { label: "시간적 배경", placeholder: "작품 속 시대적 배경", type: "text" },
                    { label: "특징적 배경", placeholder: "해당 세계관만의 독특한 점", type: "textarea" }
                ]
            },
            {
                title: "1막 [도입] - 퀘스트 1",
                description: "플레이어가 세계관을 파악하고 갈등을 인식하는 단계",
                fields: [
                    { label: "목표", placeholder: "이 퀘스트를 수행해야 하는 목적은 무엇인가요?", type: "textarea" },
                    { label: "캐릭터/장소", placeholder: "퀘스트 완수를 위해 주인공과 주변 인물은 어디서 어떤 역할을 수행하나요?", type: "textarea" },
                    { label: "성공조건/실패조건", placeholder: "어떤 조건을 완수해야 퀘스트를 성공하나요?", type: "textarea" },
                    { label: "보상 및 변화", placeholder: "아이템, 세계관 변화, 캐릭터 관계", type: "textarea" },
                    { label: "관련 NPC, 진영관계 변화", placeholder: "해당 퀘스트의 완성으로 인해 다른 인물은 어떻게 반응하나요?", type: "textarea" },
                    { label: "스토리 변화", placeholder: "해당 선택으로 인해 분기점이 어떻게 변화하나요?", type: "textarea" }
                ]
            },
            {
                title: "2막 [전개 및 위기] - 퀘스트 2.1",
                description: "주요 갈등이 심화되고 플레이어가 성장하거나 선택을 하게 되는 단계",
                fields: [
                    { label: "목표", placeholder: "이 퀘스트를 수행해야 하는 목적은 무엇인가요?", type: "textarea" },
                    { label: "캐릭터/장소", placeholder: "퀘스트 완수를 위해 주인공과 주변 인물은 어디서 어떤 역할을 수행하나요?", type: "textarea" },
                    { label: "성공조건/실패조건", placeholder: "어떤 조건을 완수해야 퀘스트를 성공하나요?", type: "textarea" },
                    { label: "보상 및 변화", placeholder: "아이템, 세계관 변화, 캐릭터 관계", type: "textarea" },
                    { label: "관련 NPC, 진영관계 변화", placeholder: "해당 퀘스트의 완성으로 인해 다른 인물은 어떻게 반응하나요?", type: "textarea" },
                    { label: "스토리 변화", placeholder: "해당 선택이 스토리에 어떤 영향을 미치나요?", type: "textarea" }
                ]
            },
            {
                title: "2막 [전개 및 위기] - 퀘스트 2.2",
                fields: [
                    { label: "목표", placeholder: "이 퀘스트를 수행해야 하는 목적은 무엇인가요?", type: "textarea" },
                    { label: "캐릭터/장소", placeholder: "퀘스트 완수를 위해 주인공과 주변 인물은 어디서 어떤 역할을 수행하나요?", type: "textarea" },
                    { label: "성공조건/실패조건", placeholder: "어떤 조건을 완수해야 퀘스트를 성공하나요?", type: "textarea" },
                    { label: "보상 및 변화", placeholder: "아이템, 세계관 변화, 캐릭터 관계", type: "textarea" },
                    { label: "관련 NPC, 진영관계 변화", placeholder: "해당 퀘스트의 완성으로 인해 다른 인물은 어떻게 반응하나요?", type: "textarea" },
                    { label: "스토리 변화", placeholder: "해당 선택이 스토리에 어떤 영향을 미치나요?", type: "textarea" }
                ]
            },
            {
                title: "3막 [절정 및 결말] - 퀘스트 3",
                description: "플레이어의 선택 + 행동이 결과를 만들고 결말로 이어지는 단계",
                fields: [
                    { label: "목표", placeholder: "이 퀘스트를 수행해야 하는 목적은 무엇인가요?", type: "textarea" },
                    { label: "캐릭터/장소", placeholder: "퀘스트 완수를 위해 주인공과 주변 인물은 어디서 어떤 역할을 수행하나요?", type: "textarea" },
                    { label: "성공조건/실패조건", placeholder: "어떤 조건을 완수해야 퀘스트를 성공하나요?", type: "textarea" },
                    { label: "보상 및 변화", placeholder: "아이템, 세계관 변화, 캐릭터 관계", type: "textarea" },
                    { label: "관련 NPC, 진영관계 변화", placeholder: "해당 퀘스트의 완성으로 인해 다른 인물은 어떻게 반응하나요?", type: "textarea" },
                    { label: "스토리 변화", placeholder: "해당 선택이 스토리에 어떤 영향을 미치나요?", type: "textarea" }
                ]
            },
            {
                title: "분기점 1",
                fields: [
                    { label: "선택지", placeholder: "이 분기점을 선택해야 하는 이유는 무엇인가요?", type: "textarea" },
                    { label: "캐릭터/장소", placeholder: "해당 분기점에 도달하기 위해 주인공과 주변 인물은 어디서 어떤 역할을 수행해야 하나요?", type: "textarea" },
                    { label: "성공조건/실패조건", placeholder: "어떤 조건을 완수해야 해당 분기점에 진입할 수 있나요?", type: "textarea" },
                    { label: "보상 및 변화", placeholder: "아이템, 세계관 변화, 캐릭터 관계 [자동으로 다른 분기점 선택 불가]", type: "textarea" },
                    { label: "관련 NPC, 진영관계 변화", placeholder: "해당 분기점의 선택으로 인해 다른 인물은 어떻게 반응하나요?", type: "textarea" },
                    { label: "스토리 변화", placeholder: "해당 선택지가 스토리에 어떤 영향을 미치나요?", type: "textarea" }
                ]
            },
            {
                title: "서브 퀘스트",
                description: "세계관을 넓히고 캐릭터 성장/동료 확보/정보 획득 등을 위한 하위 스토리",
                fields: [
                    { label: "퀘스트 4 - 목표", placeholder: "이 퀘스트를 수행해야 하는 목적은 무엇인가요?", type: "textarea" },
                    { label: "퀘스트 4 - 캐릭터/장소", placeholder: "퀘스트 완수를 위해 필요한 인물과 장소", type: "textarea" },
                    { label: "퀘스트 5 - 목표", placeholder: "이 퀘스트를 수행해야 하는 목적은 무엇인가요?", type: "textarea" },
                    { label: "퀘스트 5 - 캐릭터/장소", placeholder: "퀘스트 완수를 위해 필요한 인물과 장소", type: "textarea" }
                ]
            }
        ]
    },
    "어드벤처": {
        sections: [
            {
                title: "기본 정보",
                fields: [
                    { label: "제목", placeholder: "게임의 정체성을 나타내는 제목", type: "text" },
                    { label: "장르", value: "어드벤처", type: "readonly" },
                    { label: "배경설정", placeholder: "세계관에 대한 간단한 개요", type: "textarea" },
                    { label: "메인 테마", placeholder: "게임이 전달하고 싶은 핵심 메시지 (예: 죽음의 의미, 역지사지)", type: "textarea" },
                    { label: "플랫폼", placeholder: "PC, 모바일 등", type: "text" }
                ]
            },
            {
                title: "세계관 및 핵심 규칙",
                fields: [
                    { label: "배경", placeholder: "게임이 펼쳐지는 공간 (예: 사후세계, 미래 도시)", type: "textarea" },
                    { label: "주요 규칙", placeholder: "세계관의 중요한 법칙 3가지 이상", type: "textarea" },
                    { label: "특별한 시스템", placeholder: "독특한 게임 메커니즘 (예: 역지사지 체험, 시간 역행)", type: "textarea" }
                ]
            },
            {
                title: "캐릭터",
                fields: [
                    { label: "주인공", placeholder: "플레이어가 조종하는 캐릭터의 배경과 특징", type: "textarea" },
                    { label: "주요 NPC", placeholder: "스토리에 중요한 역할을 하는 캐릭터들", type: "textarea" },
                    { label: "적대자/갈등 요소", placeholder: "주인공을 방해하거나 갈등을 유발하는 존재", type: "textarea" }
                ]
            },
            {
                title: "1막 - 도입 (에피소드 1)",
                description: "갈등의 인식과 학습 단계",
                fields: [
                    { label: "에피소드 제목", placeholder: "에피소드의 주제를 담은 제목", type: "text" },
                    { label: "내용", placeholder: "이 에피소드에서 일어나는 주요 사건", type: "textarea" },
                    { label: "목표", placeholder: "주인공이 이 에피소드를 통해 얻는 교훈이나 깨달음", type: "textarea" },
                    { label: "등장 인물", placeholder: "이 에피소드에 등장하는 주요 캐릭터", type: "text" },
                    { label: "결과", placeholder: "에피소드가 주인공에게 미치는 영향", type: "textarea" }
                ]
            },
            {
                title: "2막 - 전개 (에피소드 2-1)",
                description: "다양한 형태의 갈등 목격",
                fields: [
                    { label: "에피소드 제목", placeholder: "에피소드의 주제를 담은 제목", type: "text" },
                    { label: "내용", placeholder: "이 에피소드에서 일어나는 주요 사건", type: "textarea" },
                    { label: "목표", placeholder: "주인공이 이 에피소드를 통해 얻는 교훈이나 깨달음", type: "textarea" },
                    { label: "등장 인물", placeholder: "이 에피소드에 등장하는 주요 캐릭터", type: "text" },
                    { label: "결과", placeholder: "에피소드가 주인공에게 미치는 영향", type: "textarea" }
                ]
            },
            {
                title: "2막 - 위기 (에피소드 2-2)",
                fields: [
                    { label: "에피소드 제목", placeholder: "에피소드의 주제를 담은 제목", type: "text" },
                    { label: "내용", placeholder: "이 에피소드에서 일어나는 주요 사건", type: "textarea" },
                    { label: "목표", placeholder: "주인공이 이 에피소드를 통해 얻는 교훈이나 깨달음", type: "textarea" },
                    { label: "등장 인물", placeholder: "이 에피소드에 등장하는 주요 캐릭터", type: "text" },
                    { label: "비밀/반전", placeholder: "이 에피소드에서 밝혀지는 숨겨진 진실", type: "textarea" }
                ]
            },
            {
                title: "3막 - 절정 및 결말 (최종 에피소드)",
                description: "최종 심판과 선택",
                fields: [
                    { label: "에피소드 제목", placeholder: "최종 에피소드의 제목", type: "text" },
                    { label: "내용", placeholder: "최종 갈등과 클라이맥스", type: "textarea" },
                    { label: "선택지 A", placeholder: "첫 번째 엔딩으로 가는 선택", type: "textarea" },
                    { label: "선택지 A 결과", placeholder: "선택지 A를 선택했을 때의 결말", type: "textarea" },
                    { label: "선택지 B", placeholder: "두 번째 엔딩으로 가는 선택", type: "textarea" },
                    { label: "선택지 B 결과", placeholder: "선택지 B를 선택했을 때의 결말", type: "textarea" }
                ]
            },
            {
                title: "서브 스토리",
                description: "보조 테마와 추가 에피소드",
                fields: [
                    { label: "서브 테마 1", placeholder: "예: 후회와 치유", type: "text" },
                    { label: "서브 테마 1 내용", placeholder: "이 테마를 다루는 에피소드 아이디어", type: "textarea" },
                    { label: "서브 테마 2", placeholder: "예: 사랑과 인연", type: "text" },
                    { label: "서브 테마 2 내용", placeholder: "이 테마를 다루는 에피소드 아이디어", type: "textarea" }
                ]
            }
        ]
    },
    "시뮬레이션": {
        sections: [
            {
                title: "기본 정보",
                fields: [
                    { label: "제목", placeholder: "게임의 정체성을 나타내는 제목", type: "text" },
                    { label: "장르", value: "육성 시뮬레이션", type: "readonly" },
                    { label: "배경", placeholder: "게임 배경 (예: 현대 한국 2015~2025)", type: "text" },
                    { label: "플랫폼", placeholder: "PC, 모바일 등", type: "text" },
                    { label: "육성 기간", placeholder: "게임 내 시간 (예: 10세~20세)", type: "text" }
                ]
            },
            {
                title: "세계관",
                fields: [
                    { label: "세계관 규칙", placeholder: "이 세계의 특별한 법칙들을 설명해주세요", type: "textarea" },
                    { label: "시간적 배경", placeholder: "작품 속 시대적 배경", type: "text" },
                    { label: "특수 시스템", placeholder: "독특한 게임 메커니즘 (예: 빙의, 회상, 업보)", type: "textarea" }
                ]
            },
            {
                title: "캐릭터",
                fields: [
                    { label: "주인공", placeholder: "플레이어가 육성할 캐릭터 (나이, 배경)", type: "textarea" },
                    { label: "조력자", placeholder: "주인공을 돕는 인물들 (신, 엄마, 친구 등)", type: "textarea" },
                    { label: "특수 캐릭터", placeholder: "특정 조건에서 등장하는 캐릭터 (예: 그림자)", type: "textarea" }
                ]
            },
            {
                title: "핵심 스탯 시스템",
                fields: [
                    { label: "스탯 1", placeholder: "스탯 이름 (예: 체력)", type: "text" },
                    { label: "스탯 1 설명", placeholder: "이 스탯이 게임에 미치는 영향", type: "textarea" },
                    { label: "스탯 2", placeholder: "스탯 이름 (예: 지성)", type: "text" },
                    { label: "스탯 2 설명", placeholder: "이 스탯이 게임에 미치는 영향", type: "textarea" },
                    { label: "스탯 3", placeholder: "스탯 이름 (예: 공감)", type: "text" },
                    { label: "스탯 3 설명", placeholder: "이 스탯이 게임에 미치는 영향", type: "textarea" },
                    { label: "특수 스탯", placeholder: "긍정/부정 스탯 (예: 공덕/업보)", type: "textarea" }
                ]
            },
            {
                title: "주요 이벤트 - 초반 (10-13세)",
                fields: [
                    { label: "이벤트 1", placeholder: "초반 주요 이벤트 제목", type: "text" },
                    { label: "이벤트 1 내용", placeholder: "이벤트 설명 및 선택지", type: "textarea" },
                    { label: "이벤트 1 결과", placeholder: "선택에 따른 스탯 변화", type: "textarea" }
                ]
            },
            {
                title: "주요 이벤트 - 중반 (14-17세)",
                fields: [
                    { label: "이벤트 2", placeholder: "중반 주요 이벤트 제목", type: "text" },
                    { label: "이벤트 2 내용", placeholder: "이벤트 설명 및 선택지", type: "textarea" },
                    { label: "이벤트 2 결과", placeholder: "선택에 따른 스탯 변화", type: "textarea" }
                ]
            },
            {
                title: "주요 이벤트 - 후반 (18-20세)",
                fields: [
                    { label: "이벤트 3", placeholder: "후반 주요 이벤트 제목", type: "text" },
                    { label: "이벤트 3 내용", placeholder: "이벤트 설명 및 선택지", type: "textarea" },
                    { label: "이벤트 3 결과", placeholder: "선택에 따른 스탯 변화", type: "textarea" }
                ]
            },
            {
                title: "엔딩 시스템",
                description: "누적 스탯 기반 분기",
                fields: [
                    { label: "S급 엔딩", placeholder: "최고 등급 엔딩 조건과 내용", type: "textarea" },
                    { label: "A급 엔딩", placeholder: "상위 등급 엔딩 조건과 내용", type: "textarea" },
                    { label: "B급 엔딩", placeholder: "보통 등급 엔딩 조건과 내용", type: "textarea" },
                    { label: "F급 엔딩", placeholder: "배드 엔딩 조건과 내용", type: "textarea" },
                    { label: "크레딧 연출", placeholder: "엔딩 후 보여줄 정보 (예: 인생 포트폴리오)", type: "textarea" }
                ]
            },
            {
                title: "특수 시스템 상세",
                fields: [
                    { label: "특수 시스템 1", placeholder: "시스템 이름 및 발동 조건", type: "text" },
                    { label: "특수 시스템 1 연출", placeholder: "어떻게 표현되나요? (예: 황금빛 눈동자)", type: "textarea" },
                    { label: "특수 시스템 2", placeholder: "시스템 이름 및 발동 조건", type: "text" },
                    { label: "특수 시스템 2 연출", placeholder: "어떻게 표현되나요?", type: "textarea" }
                ]
            }
        ]
    },
    "비주얼 노벨": {
        sections: [
            {
                title: "기본 정보",
                fields: [
                    { label: "제목", placeholder: "게임의 정체성을 나타내는 제목", type: "text" },
                    { label: "장르", value: "비주얼 노벨", type: "readonly" },
                    { label: "배경설정", placeholder: "스토리가 펼쳐지는 세계", type: "textarea" },
                    { label: "메인 테마", placeholder: "이야기의 핵심 주제", type: "textarea" },
                    { label: "플랫폼", placeholder: "PC, 모바일 등", type: "text" }
                ]
            },
            {
                title: "캐릭터",
                fields: [
                    { label: "주인공", placeholder: "주인공의 이름, 나이, 성격, 배경", type: "textarea" },
                    { label: "히로인/히어로 1", placeholder: "첫 번째 공략 캐릭터", type: "textarea" },
                    { label: "히로인/히어로 2", placeholder: "두 번째 공략 캐릭터", type: "textarea" },
                    { label: "조연", placeholder: "스토리를 풍성하게 하는 조연들", type: "textarea" }
                ]
            },
            {
                title: "공통 루트 - 도입",
                description: "모든 플레이어가 경험하는 초반 스토리",
                fields: [
                    { label: "챕터 1", placeholder: "첫 만남과 상황 설정", type: "textarea" },
                    { label: "챕터 2", placeholder: "관계 형성과 일상", type: "textarea" },
                    { label: "챕터 3", placeholder: "갈등의 시작", type: "textarea" }
                ]
            },
            {
                title: "루트 A - 첫 번째 캐릭터 루트",
                fields: [
                    { label: "루트 진입 조건", placeholder: "어떤 선택을 해야 이 루트로 진입하나요?", type: "textarea" },
                    { label: "주요 이벤트 1", placeholder: "이 루트의 핵심 이벤트", type: "textarea" },
                    { label: "주요 이벤트 2", placeholder: "관계 발전 이벤트", type: "textarea" },
                    { label: "클라이맥스", placeholder: "이 루트의 절정 장면", type: "textarea" },
                    { label: "해피 엔딩", placeholder: "좋은 선택을 했을 때의 결말", type: "textarea" },
                    { label: "배드 엔딩", placeholder: "나쁜 선택을 했을 때의 결말", type: "textarea" }
                ]
            },
            {
                title: "루트 B - 두 번째 캐릭터 루트",
                fields: [
                    { label: "루트 진입 조건", placeholder: "어떤 선택을 해야 이 루트로 진입하나요?", type: "textarea" },
                    { label: "주요 이벤트 1", placeholder: "이 루트의 핵심 이벤트", type: "textarea" },
                    { label: "주요 이벤트 2", placeholder: "관계 발전 이벤트", type: "textarea" },
                    { label: "클라이맥스", placeholder: "이 루트의 절정 장면", type: "textarea" },
                    { label: "해피 엔딩", placeholder: "좋은 선택을 했을 때의 결말", type: "textarea" },
                    { label: "배드 엔딩", placeholder: "나쁜 선택을 했을 때의 결말", type: "textarea" }
                ]
            },
            {
                title: "주요 선택지",
                description: "스토리에 영향을 주는 중요한 선택들",
                fields: [
                    { label: "선택지 1 상황", placeholder: "언제, 어디서 이 선택이 주어지나요?", type: "textarea" },
                    { label: "선택지 1 옵션", placeholder: "A: _____ / B: _____", type: "textarea" },
                    { label: "선택지 1 결과", placeholder: "각 선택이 스토리에 미치는 영향", type: "textarea" }
                ]
            },
            {
                title: "True 엔딩",
                description: "모든 루트 클리어 후 열리는 진실",
                fields: [
                    { label: "진입 조건", placeholder: "True 엔딩을 보기 위한 조건", type: "textarea" },
                    { label: "숨겨진 진실", placeholder: "True 엔딩에서 밝혀지는 비밀", type: "textarea" },
                    { label: "최종 결말", placeholder: "모든 것이 해결된 후의 결말", type: "textarea" }
                ]
            }
        ]
    },
    "전략": {
        sections: [
            {
                title: "기본 정보",
                fields: [
                    { label: "제목", placeholder: "게임의 정체성을 나타내는 제목", type: "text" },
                    { label: "장르", value: "전략 게임", type: "readonly" },
                    { label: "전략 유형", placeholder: "RTS, 턴제, 타워디펜스, 4X 등", type: "text" },
                    { label: "배경설정", placeholder: "전쟁이나 경쟁이 벌어지는 세계", type: "textarea" },
                    { label: "플랫폼", placeholder: "PC, 모바일 등", type: "text" }
                ]
            },
            {
                title: "진영 및 팩션",
                fields: [
                    { label: "플레이어 진영", placeholder: "플레이어가 속한 세력의 배경과 특징", type: "textarea" },
                    { label: "적대 진영 1", placeholder: "첫 번째 적 세력", type: "textarea" },
                    { label: "적대 진영 2", placeholder: "두 번째 적 세력", type: "textarea" },
                    { label: "중립 세력", placeholder: "협상이나 거래가 가능한 세력", type: "textarea" }
                ]
            },
            {
                title: "자원 시스템",
                fields: [
                    { label: "주요 자원 1", placeholder: "자원 이름 및 획득 방법", type: "text" },
                    { label: "주요 자원 2", placeholder: "자원 이름 및 획득 방법", type: "text" },
                    { label: "주요 자원 3", placeholder: "자원 이름 및 획득 방법", type: "text" },
                    { label: "자원 관리", placeholder: "자원을 어떻게 사용하고 관리하나요?", type: "textarea" }
                ]
            },
            {
                title: "유닛 및 건물",
                fields: [
                    { label: "기본 유닛", placeholder: "초반에 사용 가능한 유닛들", type: "textarea" },
                    { label: "고급 유닛", placeholder: "업그레이드 후 사용 가능한 유닛들", type: "textarea" },
                    { label: "특수 유닛", placeholder: "특별한 조건에서만 생산 가능한 유닛", type: "textarea" },
                    { label: "주요 건물", placeholder: "생산, 방어, 연구 등의 건물들", type: "textarea" }
                ]
            },
            {
                title: "캠페인 - 초반 미션 (1-3)",
                fields: [
                    { label: "미션 1", placeholder: "튜토리얼 성격의 첫 미션", type: "textarea" },
                    { label: "미션 1 목표", placeholder: "승리 조건", type: "textarea" },
                    { label: "미션 2", placeholder: "두 번째 미션 시나리오", type: "textarea" },
                    { label: "미션 2 목표", placeholder: "승리 조건", type: "textarea" }
                ]
            },
            {
                title: "캠페인 - 중반 미션 (4-6)",
                fields: [
                    { label: "미션 4", placeholder: "난이도가 상승하는 중반 미션", type: "textarea" },
                    { label: "미션 4 특수 조건", placeholder: "시간 제한, 자원 제한 등", type: "textarea" },
                    { label: "미션 5", placeholder: "전략적 선택이 필요한 미션", type: "textarea" },
                    { label: "스토리 전개", placeholder: "중반부 스토리 변화", type: "textarea" }
                ]
            },
            {
                title: "캠페인 - 최종 미션",
                fields: [
                    { label: "최종 미션 설정", placeholder: "클라이맥스 전투 상황", type: "textarea" },
                    { label: "최종 목표", placeholder: "게임을 끝내는 조건", type: "textarea" },
                    { label: "최종 보스/적", placeholder: "마지막 적의 특징과 전략", type: "textarea" },
                    { label: "승리 엔딩", placeholder: "승리 후 결말", type: "textarea" }
                ]
            },
            {
                title: "멀티플레이 요소",
                fields: [
                    { label: "PvP 모드", placeholder: "플레이어 대 플레이어 모드 설명", type: "textarea" },
                    { label: "협동 모드", placeholder: "협력 플레이 방식", type: "textarea" },
                    { label: "랭킹 시스템", placeholder: "경쟁 시스템 구조", type: "textarea" }
                ]
            }
        ]
    },
    "액션": {
        sections: [
            {
                title: "기본 정보",
                fields: [
                    { label: "제목", placeholder: "게임의 정체성을 나타내는 제목", type: "text" },
                    { label: "장르", value: "액션 게임", type: "readonly" },
                    { label: "액션 스타일", placeholder: "핵앤슬래시, 플랫포머, 슈팅 등", type: "text" },
                    { label: "배경설정", placeholder: "게임 세계관", type: "textarea" },
                    { label: "플랫폼", placeholder: "PC, 콘솔, 모바일 등", type: "text" }
                ]
            },
            {
                title: "주인공 설정",
                fields: [
                    { label: "주인공", placeholder: "이름, 배경, 동기", type: "textarea" },
                    { label: "기본 능력", placeholder: "초반 공격/방어 능력", type: "textarea" },
                    { label: "특수 능력", placeholder: "고유 스킬이나 특성", type: "textarea" }
                ]
            },
            {
                title: "전투 시스템",
                fields: [
                    { label: "기본 공격", placeholder: "약공격, 강공격 등", type: "textarea" },
                    { label: "콤보 시스템", placeholder: "연계 공격 방식", type: "textarea" },
                    { label: "방어/회피", placeholder: "막기, 구르기, 패링 등", type: "textarea" },
                    { label: "특수 기술", placeholder: "필살기, 마법, 스킬 등", type: "textarea" }
                ]
            },
            {
                title: "스테이지 1 - 도입",
                fields: [
                    { label: "스테이지 배경", placeholder: "첫 번째 스테이지의 장소와 분위기", type: "textarea" },
                    { label: "등장 적", placeholder: "이 스테이지의 적 유형", type: "textarea" },
                    { label: "미드 보스", placeholder: "중간 보스 정보", type: "textarea" },
                    { label: "스토리 전개", placeholder: "이 스테이지에서 일어나는 사건", type: "textarea" }
                ]
            },
            {
                title: "스테이지 2-3 - 전개",
                fields: [
                    { label: "스테이지 2 배경", placeholder: "두 번째 스테이지 설명", type: "textarea" },
                    { label: "새로운 적", placeholder: "난이도 상승 요소", type: "textarea" },
                    { label: "스테이지 3 배경", placeholder: "세 번째 스테이지 설명", type: "textarea" },
                    { label: "환경 기믹", placeholder: "함정, 퍼즐, 특수 지형 등", type: "textarea" }
                ]
            },
            {
                title: "보스 전투",
                fields: [
                    { label: "보스 1", placeholder: "첫 메인 보스 이름과 특징", type: "textarea" },
                    { label: "보스 1 패턴", placeholder: "공격 패턴 및 약점", type: "textarea" },
                    { label: "보스 2", placeholder: "중반 보스 이름과 특징", type: "textarea" },
                    { label: "보스 2 패턴", placeholder: "공격 패턴 및 약점", type: "textarea" },
                    { label: "최종 보스", placeholder: "라스트 보스 정보", type: "textarea" },
                    { label: "최종 보스 패턴", placeholder: "페이즈별 공격 패턴", type: "textarea" }
                ]
            },
            {
                title: "성장 시스템",
                fields: [
                    { label: "레벨업", placeholder: "경험치 획득 및 스탯 상승", type: "textarea" },
                    { label: "무기 업그레이드", placeholder: "무기 강화 시스템", type: "textarea" },
                    { label: "스킬 트리", placeholder: "능력 해금 구조", type: "textarea" }
                ]
            },
            {
                title: "엔딩",
                fields: [
                    { label: "최종 스테이지", placeholder: "마지막 스테이지 연출", type: "textarea" },
                    { label: "클라이맥스", placeholder: "최종 보스전 후 결말", type: "textarea" },
                    { label: "엔딩 크레딧", placeholder: "엔딩 연출 및 보상", type: "textarea" }
                ]
            }
        ]
    },
    "퍼즐": {
        sections: [
            {
                title: "기본 정보",
                fields: [
                    { label: "제목", placeholder: "게임의 정체성을 나타내는 제목", type: "text" },
                    { label: "장르", value: "퍼즐 게임", type: "readonly" },
                    { label: "퍼즐 유형", placeholder: "매치3, 물리 퍼즐, 논리 퍼즐 등", type: "text" },
                    { label: "배경설정", placeholder: "퍼즐이 펼쳐지는 세계 (선택사항)", type: "textarea" },
                    { label: "플랫폼", placeholder: "PC, 모바일 등", type: "text" }
                ]
            },
            {
                title: "핵심 메커니즘",
                fields: [
                    { label: "기본 규칙", placeholder: "퍼즐의 기본 플레이 방법", type: "textarea" },
                    { label: "목표", placeholder: "퍼즐을 클리어하는 조건", type: "textarea" },
                    { label: "조작 방법", placeholder: "어떻게 퍼즐을 조작하나요?", type: "textarea" }
                ]
            },
            {
                title: "튜토리얼 스테이지 (1-5)",
                fields: [
                    { label: "스테이지 1", placeholder: "가장 기본적인 메커니즘 소개", type: "textarea" },
                    { label: "스테이지 2-3", placeholder: "기본 요소 조합", type: "textarea" },
                    { label: "스테이지 4-5", placeholder: "첫 번째 장애물 소개", type: "textarea" }
                ]
            },
            {
                title: "초급 스테이지 (6-15)",
                fields: [
                    { label: "새로운 요소 1", placeholder: "추가되는 퍼즐 요소", type: "textarea" },
                    { label: "난이도 상승", placeholder: "어떻게 어려워지나요?", type: "textarea" }
                ]
            },
            {
                title: "중급 스테이지 (16-30)",
                fields: [
                    { label: "새로운 요소 2", placeholder: "추가되는 복잡한 메커니즘", type: "textarea" },
                    { label: "시간 제한", placeholder: "시간 제한 도입 여부", type: "textarea" },
                    { label: "이동 제한", placeholder: "제한된 횟수 내 클리어", type: "textarea" }
                ]
            },
            {
                title: "고급 스테이지 (31-50)",
                fields: [
                    { label: "최고 난이도 요소", placeholder: "모든 메커니즘이 결합된 스테이지", type: "textarea" },
                    { label: "특별 스테이지", placeholder: "보너스 또는 챌린지 스테이지", type: "textarea" }
                ]
            },
            {
                title: "보상 시스템",
                fields: [
                    { label: "별 시스템", placeholder: "별 3개 획득 조건", type: "textarea" },
                    { label: "아이템", placeholder: "힌트, 부스터 등", type: "textarea" },
                    { label: "코스메틱", placeholder: "스킨, 테마 등 수집 요소", type: "textarea" }
                ]
            },
            {
                title: "스토리 모드 (선택사항)",
                fields: [
                    { label: "캐릭터", placeholder: "스토리 주인공", type: "textarea" },
                    { label: "목표", placeholder: "스토리의 최종 목표", type: "textarea" },
                    { label: "챕터별 전개", placeholder: "각 챕터에서 일어나는 일", type: "textarea" }
                ]
            }
        ]
    }
};

// 더미 데이터 - 게임 형식 중심 태그로 변경
const DUMMY_SCENARIOS = [
    {
        id: 1,
        title: "픽셀 던전 RPG 시나리오",
        author: "게임 제작자 A",
        description: "레트로 감성의 로그라이크 던전 탐험 게임입니다. 매번 다른 맵 생성으로 재미를 더했고 전략적 턴제 전투 시스템이 이어집니다 조합하고 전략적 던전 진행을 할줄합니다.",
        tags: ["RPG", "로그라이크", "턴제", "전략"],
        rating: "4/5",
        fullContent: "레트로 감성의 로그라이크 던전 탐험 게임입니다.\n\n**게임 개요**\n매번 다른 맵 생성으로 재미를 더했고 전략적 턴제 전투 시스템이 이어집니다. 플레이어는 무작위로 생성되는 던전을 탐험하며, 다양한 몬스터와 보스를 상대하게 됩니다.\n\n**핵심 시스템**\n- 로그라이크 맵 생성\n- 턴제 전투 시스템\n- 아이템 조합 시스템\n- 캐릭터 성장 시스템\n\n**스토리 라인**\n고대 던전에 갇힌 영웅이 탈출을 위해 깊은 지하로 내려가는 이야기입니다.",
        comments: []
    },
    {
        id: 2,
        title: "사이버펑크 2087 시나리오",
        author: "게임 제작자 B",
        description: "네온이 빛나는 미래 도시를 배경으로 한 액션 RPG입니다. 해킹 시스템과 사이버웨어 강화를 통해 다양한 플레이 스타일을 즐길 수 있습니다.",
        tags: ["액션 RPG", "오픈월드", "해킹", "실시간"],
        rating: "5/5",
        fullContent: "네온이 빛나는 미래 도시를 배경으로 한 액션 RPG입니다.\n\n**게임 개요**\n2087년, 거대 기업이 지배하는 메가시티에서 펼쳐지는 사이버펑크 이야기입니다.\n\n**핵심 시스템**\n- 해킹 시스템\n- 사이버웨어 커스터마이징\n- 분기형 스토리\n- 오픈월드 탐험",
        comments: []
    },
    {
        id: 3,
        title: "마법학교 어드벤처",
        author: "게임 제작자 C",
        description: "마법학교에 입학한 학생이 되어 다양한 마법을 배우고 친구들과 함께 모험을 떠나는 이야기입니다. 선택에 따라 엔딩이 달라집니다.",
        tags: ["비주얼 노벨", "선택형", "어드벤처", "시뮬레이션"],
        rating: "4/5",
        fullContent: "마법학교에 입학한 학생이 되어 다양한 마법을 배우고 친구들과 함께 모험을 떠나는 이야기입니다.\n\n**게임 개요**\n선택에 따라 엔딩이 달라지는 비주얼 노벨 스타일의 어드벤처 게임입니다.",
        comments: []
    },
    {
        id: 4,
        title: "좀비 서바이벌 타워디펜스",
        author: "게임 제작자 D",
        description: "좀비 아포칼립스 세계에서 살아남기 위해 기지를 건설하고 방어하는 전략 게임입니다. 자원 관리와 타워 배치가 핵심입니다.",
        tags: ["타워디펜스", "전략", "서바이벌", "RTS"],
        rating: "4/5",
        fullContent: "좀비 아포칼립스 세계에서 살아남기 위한 전략 게임입니다.\n\n**게임 개요**\n기지를 건설하고 방어하며, 자원을 관리하여 생존하는 타워디펜스 게임입니다.",
        comments: []
    },
    {
        id: 5,
        title: "우주 탐험 시뮬레이션",
        author: "게임 제작자 E",
        description: "광활한 우주를 탐험하며 새로운 행성을 발견하고 자원을 채굴하는 시뮬레이션 게임입니다. 우주선 업그레이드와 외계 생명체와의 조우가 가능합니다.",
        tags: ["시뮬레이션", "경영", "샌드박스", "전략"],
        rating: "5/5",
        fullContent: "광활한 우주를 탐험하는 시뮬레이션 게임입니다.\n\n**게임 개요**\n새로운 행성을 발견하고 자원을 채굴하며 우주선을 업그레이드합니다.",
        comments: []
    },
    {
        id: 6,
        title: "중세 왕국 경영 시뮬레이션",
        author: "게임 제작자 F",
        description: "중세 왕국의 군주가 되어 영토를 확장하고 백성들을 다스리는 게임입니다. 외교, 전쟁, 경제 등 다양한 요소를 관리해야 합니다.",
        tags: ["시뮬레이션", "전략", "경영", "4X"],
        rating: "4/5",
        fullContent: "중세 왕국의 군주가 되어 영토를 확장하고 백성들을 다스리는 게임입니다.",
        comments: []
    },
    {
        id: 7,
        title: "바다의 전설 해적 RPG",
        author: "게임 제작자 G",
        description: "대항해시대를 배경으로 해적선을 이끌고 보물을 찾아 항해하는 모험 RPG입니다. 해전 시스템과 크루 관리가 특징입니다.",
        tags: ["액션 RPG", "오픈월드", "해전", "탐험"],
        rating: "5/5",
        fullContent: "대항해시대를 배경으로 해적선을 이끌고 보물을 찾아 항해하는 모험 RPG입니다.",
        comments: []
    },
    {
        id: 8,
        title: "탐정 추리 어드벤처",
        author: "게임 제작자 H",
        description: "빅토리아 시대 런던을 배경으로 한 추리 게임입니다. 단서를 모으고 증거를 분석하여 사건의 진실을 밝혀내세요.",
        tags: ["어드벤처", "추리", "퍼즐", "선택형"],
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
        portfolio: "3년차 비주얼 노벨 제작자입니다.\n대표작: '봄날의 약속', '겨울 이야기'\n\n주요 경력:\n- 인디 게임 '봄날의 약속' 시나리오 및 연출 (2022)\n- 비주얼 노벨 '겨울 이야기' 기획 및 제작 (2023)\n- 다수의 게임잼 참가 경험",
        portfolioLinks: [
            { id: 1, title: "게임 포트폴리오", url: "https://redflame-portfolio.com" },
            { id: 2, title: "Itch.io 작품", url: "https://itch.io/redflame" }
        ]
    },
    {
        id: 2,
        name: "블루드롭",
        role: "스토리 기반 VN 제작자",
        description: "미스터리와 스릴러 장르에 강점이 있으며 긴장감 넘치는 스토리를 구성합니다. 함께 프로젝트를 진행할 작가를 찾습니다!",
        skills: ["미스터리", "스릴러", "시나리오"],
        avatar: "💧",
        portfolio: "5년차 게임 시나리오 작가입니다.\n대표작: '어둠 속의 진실', '밤의 목격자'\n\n전문 분야: 미스터리, 스릴러 장르",
        portfolioLinks: [
            { id: 1, title: "작품 목록", url: "https://bluedrop-works.com" },
            { id: 2, title: "브런치 글", url: "https://brunch.co.kr/@bluedrop" }
        ]
    },
    {
        id: 3,
        name: "그린리프",
        role: "판타지 RPG 제작자",
        description: "방대한 세계관 구축과 캐릭터 디자인에 능숙합니다. 함께 거대한 판타지 세계를 만들 동료를 구합니다!",
        skills: ["세계관", "캐릭터 디자인", "RPG"],
        avatar: "🌱",
        portfolio: "판타지 세계관 전문 작가, 4년 경력\n대표작: '에테르 연대기', '고대의 숲'",
        portfolioLinks: [
            { id: 1, title: "아트스테이션", url: "https://artstation.com/greenleaf" }
        ]
    },
    {
        id: 4,
        name: "골드크라운",
        role: "역사 시뮬레이션 제작자",
        description: "역사적 고증과 전략 게임 밸런싱에 전문성을 가지고 있습니다. 깊이 있는 전략 게임을 만들고 싶은 분을 찾습니다!",
        skills: ["전략", "밸런싱", "역사"],
        avatar: "👑",
        portfolio: "역사 시뮬레이션 게임 디자이너, 6년 경력\n대표작: '삼국지 외전', '제국의 흥망'",
        portfolioLinks: [
            { id: 1, title: "게임 디자인 블로그", url: "https://goldcrown-gamedesign.blog" },
            { id: 2, title: "Steam 작품", url: "https://steam.com/goldcrown" }
        ]
    },
    {
        id: 5,
        name: "실버나이트",
        role: "액션 RPG 제작자",
        description: "다이나믹한 전투 시스템과 스킬 트리 설계를 전문으로 합니다. 함께 박진감 넘치는 게임을 만들 파트너를 구합니다!",
        skills: ["전투 시스템", "액션", "RPG"],
        avatar: "⚔️",
        portfolio: "액션 RPG 전투 시스템 디자이너, 5년 경력\n대표작: '검의 전설', '전쟁의 서막'",
        portfolioLinks: [
            { id: 1, title: "YouTube 플레이 영상", url: "https://youtube.com/@silverknight" }
        ]
    },
    {
        id: 6,
        name: "바이올렛매직",
        role: "마법 판타지 제작자",
        description: "독창적인 마법 시스템과 판타지 세계관 구축에 강점이 있습니다. 환상적인 세계를 함께 만들 작가를 찾습니다!",
        skills: ["마법 시스템", "판타지", "세계관"],
        avatar: "🔮",
        portfolio: "마법 시스템 설계 전문, 4년 경력\n대표작: '마법사의 탑', '영원한 마나'",
        portfolioLinks: [
            { id: 1, title: "개인 웹사이트", url: "https://violetmagic.com" },
            { id: 2, title: "Notion 포트폴리오", url: "https://notion.so/violetmagic" }
        ]
    },
    {
        id: 7,
        name: "다크쉐도우",
        role: "호러 게임 제작자",
        description: "심리적 공포와 서스펜스 연출에 특화되어 있습니다. 함께 등골이 오싹한 게임을 만들 동료를 찾습니다!",
        skills: ["호러", "심리", "연출"],
        avatar: "👻",
        portfolio: "호러 게임 연출가, 3년 경력\n대표작: '어둠의 숨결', '공포의 저택'",
        portfolioLinks: [
            { id: 1, title: "공포 게임 컬렉션", url: "https://darkshadow.itch.io" }
        ]
    },
    {
        id: 8,
        name: "화이트드림",
        role: "힐링 게임 제작자",
        description: "따뜻하고 감성적인 스토리텔링과 평화로운 게임 플레이 디자인이 전문입니다. 치유가 되는 게임을 만들고 싶은 분 환영합니다!",
        skills: ["힐링", "감성", "스토리텔링"],
        avatar: "☁️",
        portfolio: "힐링 게임 스토리텔러, 4년 경력\n대표작: '작은 정원', '따뜻한 하루'",
        portfolioLinks: [
            { id: 1, title: "포트폴리오 사이트", url: "https://whitedream.studio" },
            { id: 2, title: "인스타그램", url: "https://instagram.com/whitedream_studio" }
        ]
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
                            <a 
                                href="#" 
                                className={`nav-link ${currentPage === 'mypage' ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); onNavigate('mypage'); }}
                            >
                                마이페이지
                            </a>
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
            <div className="banner" style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
                <h1 className="banner-title" style={{ 
                    position: 'absolute',
                    top: '15%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    zIndex: 10,
                    margin: 0,
                    textShadow: 'none'
                }}>머리 속의 이야기에서<br />손끝의 게임으로</h1>
                <div className="banner-characters">
                    <img src="./images/start-banner.png" alt="캐릭터들" className="banner-image" style={{ width: '100%', display: 'block', height: '400px', objectFit: 'cover' }} />
                </div>
            </div>

            <div className="search-section">
                <select 
                    className="filter-dropdown"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option>모든 장르</option>
                    <option>RPG</option>
                    <option>액션</option>
                    <option>전략</option>
                    <option>시뮬레이션</option>
                    <option>어드벤처</option>
                    <option>비주얼 노벨</option>
                    <option>퍼즐</option>
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
                        onClick={() => onNavigate(`scenario-detail-${scenario.id}`)}
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

// 시나리오 작성 방식 선택
function ScenarioSelectPage({ onNavigate }) {
    return (
        <div className="main-content">
            <div className="selection-banner" style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
                <img src="./images/select-banner.png" alt="배너" className="selection-banner-image" style={{ width: '100%', display: 'block', height: '400px', objectFit: 'cover' }} />
                <h1 className="banner-text" style={{ 
                    position: 'absolute', 
                    bottom: '8%', 
                    right: '5%',
                    textAlign: 'right',
                    fontSize: '48px',
                    fontWeight: '700',
                    color: '#EC6363',
                    lineHeight: '1.4',
                    margin: 0,
                    zIndex: 10,
                    fontFamily: 'Paperlogy, sans-serif',
                    textShadow: 'none'
                }}>
                    내 상상 속 멋진 이야기를<br />시나리오로 써보세요!
                </h1>
            </div>

            <div className="method-cards">
                <div className="method-card" onClick={() => onNavigate('scenario-direct')} style={{ display: 'flex', flexDirection: 'column' }}>
                    <img src="./images/icon-direct.png" alt="직접 작성" className="method-icon" />
                    <h2 className="method-title">직접 시나리오<br />작성하기</h2>
                    <p className="method-description" style={{ flex: 1 }}>
                        장르 선택을 바탕으로 제공되는 템플릿을 활용해서<br />
                        더 쉽고 빠르게 시나리오를 작성해보세요.
                    </p>
                    <button className="method-button">시작하기</button>
                </div>

                <div className="method-card" onClick={() => onNavigate('scenario-ai')} style={{ display: 'flex', flexDirection: 'column' }}>
                    <img src="./images/icon-ai.png" alt="AI 작성" className="method-icon" />
                    <h2 className="method-title">AI와 시나리오<br />작성하기</h2>
                    <p className="method-description" style={{ flex: 1 }}>
                        AI의 도움으로 막힘없이<br />
                        탄탄한 이야기를 완성해보세요.
                    </p>
                    <button className="method-button">시작하기</button>
                </div>

                <div className="method-card" onClick={() => onNavigate('scenario-upload')} style={{ display: 'flex', flexDirection: 'column' }}>
                    <img src="./images/icon-upload.png" alt="업로드" className="method-icon" />
                    <h2 className="method-title">작성한 시나리오<br />업로드하기</h2>
                    <p className="method-description" style={{ flex: 1 }}>
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

// 직접 작성 페이지 - 장르 선택 후 템플릿 제공
function DirectCreatePage({ onNavigate }) {
    const [selectedGenre, setSelectedGenre] = useState('');
    const [formData, setFormData] = useState({});
    const [showTemplate, setShowTemplate] = useState(false);

    const genres = ["RPG", "어드벤처", "시뮬레이션", "비주얼 노벨", "전략", "액션", "퍼즐"];

    const handleGenreSelect = (genre) => {
        setSelectedGenre(genre);
        setFormData({});
        setShowTemplate(true);
    };

    const handleFieldChange = (sectionIdx, fieldIdx, value) => {
        const key = `${sectionIdx}-${fieldIdx}`;
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = () => {
        alert('시나리오가 성공적으로 제출되었습니다!');
        onNavigate('home');
    };

    if (!showTemplate) {
        return (
            <div className="create-page">
                <img src="./images/illust-direct.png" alt="직접 작성" className="create-character" />
                <h1 className="page-title" style={{ fontFamily: 'Paperlogy, sans-serif' }}>직접 시나리오 작성하기</h1>
                <p style={{ textAlign: 'center', marginBottom: '30px', fontSize: '18px', color: '#666', fontFamily: 'Paperlogy, sans-serif' }}>
                    먼저 게임 장르를 선택해주세요
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
                    {genres.map(genre => (
                        <button
                            key={genre}
                            onClick={() => handleGenreSelect(genre)}
                            style={{
                                padding: '20px',
                                background: '#f5f5f5',
                                border: '2px solid #ddd',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontSize: '18px',
                                fontWeight: '600',
                                transition: 'all 0.2s',
                                fontFamily: 'Paperlogy, sans-serif'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.background = '#EC6363';
                                e.target.style.color = 'white';
                                e.target.style.borderColor = '#EC6363';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.background = '#f5f5f5';
                                e.target.style.color = 'black';
                                e.target.style.borderColor = '#ddd';
                            }}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    const template = SCENARIO_TEMPLATES[selectedGenre] || SCENARIO_TEMPLATES["RPG"];

    return (
        <div className="create-page" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
            <button 
                onClick={() => setShowTemplate(false)}
                style={{ marginBottom: '20px', padding: '8px 16px', background: '#888', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Paperlogy, sans-serif' }}
            >
                ← 장르 다시 선택
            </button>
            
            <h1 className="page-title" style={{ fontFamily: 'Paperlogy, sans-serif' }}>{selectedGenre} 시나리오 작성하기</h1>
            
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                {template.sections.map((section, sectionIdx) => (
                    <div key={sectionIdx} style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#EC6363', fontFamily: 'Paperlogy, sans-serif' }}>
                            {section.title}
                        </h2>
                        {section.description && (
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', fontFamily: 'Paperlogy, sans-serif' }}>
                                {section.description}
                            </p>
                        )}
                        
                        {section.fields.map((field, fieldIdx) => (
                            <div key={fieldIdx} style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', fontFamily: 'Paperlogy, sans-serif' }}>
                                    {field.label}
                                </label>
                                {field.type === 'readonly' ? (
                                    <input
                                        type="text"
                                        value={field.value}
                                        readOnly
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: '1px solid #ddd',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            background: '#f5f5f5',
                                            fontFamily: 'Paperlogy, sans-serif'
                                        }}
                                    />
                                ) : field.type === 'textarea' ? (
                                    <textarea
                                        placeholder={field.placeholder}
                                        value={formData[`${sectionIdx}-${fieldIdx}`] || ''}
                                        onChange={(e) => handleFieldChange(sectionIdx, fieldIdx, e.target.value)}
                                        style={{
                                            width: '100%',
                                            minHeight: '100px',
                                            padding: '12px',
                                            border: '1px solid #ddd',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            resize: 'vertical',
                                            fontFamily: 'Paperlogy, sans-serif'
                                        }}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        placeholder={field.placeholder}
                                        value={formData[`${sectionIdx}-${fieldIdx}`] || ''}
                                        onChange={(e) => handleFieldChange(sectionIdx, fieldIdx, e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: '1px solid #ddd',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            fontFamily: 'Paperlogy, sans-serif'
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
                
                <button 
                    className="submit-button" 
                    onClick={handleSubmit}
                    style={{ marginTop: '30px', fontFamily: 'Paperlogy, sans-serif' }}
                >
                    시나리오 제출하기
                </button>
            </div>
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
function TeamPage({ onNavigate }) {
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
        <div className="main-content" style={{ paddingTop: 0 }}>
            <div className="team-banner" style={{ position: 'relative', margin: 0, padding: 0, width: '100%', height: '400px', overflow: 'hidden' }}>
                <img src="./images/team-banner.png" alt="팀 배너" className="team-banner-image" style={{ width: '100%', display: 'block', margin: 0, padding: 0, verticalAlign: 'bottom', height: '400px', objectFit: 'cover' }} />
                <h1 className="team-title" style={{ 
                    position: 'absolute',
                    bottom: '8%',
                    right: '5%',
                    textAlign: 'right',
                    margin: 0,
                    zIndex: 10,
                    textShadow: 'none'
                }}>함께할 팀원을 찾아보세요!</h1>
            </div>

            <div className="search-section" style={{ marginTop: '50px' }}>
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
                    <div 
                        key={member.id} 
                        className="member-card"
                        onClick={() => onNavigate(`team-detail-${member.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
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

    const VALID_ACCOUNT = {
        id: 'ahnhyun9',
        password: '1234',
        name: '안현진'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.id || !formData.password) {
            alert('아이디와 비밀번호를 입력해주세요.');
            return;
        }
        
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
                <p>비밀번호: 1234</p>
            </div>
        </div>
    );
}

// 마이페이지
function MyPage({ contacts, currentUser, isLoggedIn, onNavigate, proposals, onProposalAction }) {
    const [portfolioLinks, setPortfolioLinks] = useState([
        { id: 1, title: '포트폴리오 웹사이트', url: 'https://myportfolio.com' },
        { id: 2, title: 'GitHub 프로젝트', url: 'https://github.com/myprojects' }
    ]);
    const [newLinkTitle, setNewLinkTitle] = useState('');
    const [newLinkUrl, setNewLinkUrl] = useState('');
    const [isAddingLink, setIsAddingLink] = useState(false);

    if (!isLoggedIn) {
        return (
            <div className="main-content">
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '20px', fontFamily: 'Paperlogy, sans-serif' }}>로그인이 필요합니다</h2>
                    <p style={{ marginBottom: '30px', color: '#666', fontFamily: 'Paperlogy, sans-serif' }}>마이페이지를 이용하려면 로그인해주세요.</p>
                    <button
                        onClick={() => onNavigate('login')}
                        style={{
                            padding: '12px 32px',
                            background: '#EC6363',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '600',
                            fontFamily: 'Paperlogy, sans-serif'
                        }}
                    >
                        로그인하기
                    </button>
                </div>
            </div>
        );
    }

    const sentContacts = contacts.filter(c => c.from === currentUser);
    const receivedContacts = contacts.filter(c => c.to === currentUser);
    const sentProposals = proposals ? proposals.filter(p => p.from === currentUser) : [];
    const receivedProposals = proposals ? proposals.filter(p => p.to === currentUser) : [];

    const handleAddLink = () => {
        if (!newLinkTitle.trim() || !newLinkUrl.trim()) {
            alert('제목과 URL을 모두 입력해주세요.');
            return;
        }
        const newLink = {
            id: Date.now(),
            title: newLinkTitle.trim(),
            url: newLinkUrl.trim()
        };
        setPortfolioLinks([...portfolioLinks, newLink]);
        setNewLinkTitle('');
        setNewLinkUrl('');
        setIsAddingLink(false);
    };

    const handleDeleteLink = (linkId) => {
        if (window.confirm('이 링크를 삭제하시겠습니까?')) {
            setPortfolioLinks(portfolioLinks.filter(link => link.id !== linkId));
        }
    };

    return (
        <div className="main-content">
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '30px', fontFamily: 'Paperlogy, sans-serif' }}>마이페이지</h1>
                
                <div style={{ background: 'white', padding: '30px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'Paperlogy, sans-serif' }}>내 정보</h2>
                    <p style={{ fontSize: '18px', color: '#333', fontFamily: 'Paperlogy, sans-serif' }}>
                        <strong>닉네임:</strong> {currentUser}
                    </p>
                </div>

                <div style={{ background: 'white', padding: '30px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '24px', fontFamily: 'Paperlogy, sans-serif' }}>🔗 나의 포트폴리오</h2>
                        <button
                            onClick={() => setIsAddingLink(true)}
                            style={{
                                padding: '8px 16px',
                                background: '#EC6363',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                fontFamily: 'Paperlogy, sans-serif'
                            }}
                        >
                            + 링크 추가
                        </button>
                    </div>

                    {isAddingLink && (
                        <div style={{ 
                            background: '#f8f9fa', 
                            padding: '20px', 
                            borderRadius: '8px',
                            marginBottom: '15px',
                            border: '2px solid #EC6363'
                        }}>
                            <input
                                type="text"
                                placeholder="링크 제목 (예: 포트폴리오 웹사이트)"
                                value={newLinkTitle}
                                onChange={(e) => setNewLinkTitle(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    marginBottom: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontFamily: 'Paperlogy, sans-serif',
                                    boxSizing: 'border-box'
                                }}
                            />
                            <input
                                type="url"
                                placeholder="URL (예: https://myportfolio.com)"
                                value={newLinkUrl}
                                onChange={(e) => setNewLinkUrl(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    marginBottom: '15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontFamily: 'Paperlogy, sans-serif',
                                    boxSizing: 'border-box'
                                }}
                            />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={handleAddLink}
                                    style={{
                                        padding: '10px 20px',
                                        background: '#EC6363',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontFamily: 'Paperlogy, sans-serif'
                                    }}
                                >
                                    추가
                                </button>
                                <button
                                    onClick={() => {
                                        setIsAddingLink(false);
                                        setNewLinkTitle('');
                                        setNewLinkUrl('');
                                    }}
                                    style={{
                                        padding: '10px 20px',
                                        background: '#888',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontFamily: 'Paperlogy, sans-serif'
                                    }}
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'grid', gap: '12px' }}>
                        {portfolioLinks.map(link => (
                            <div key={link.id} style={{ 
                                background: '#f8f9fa', 
                                padding: '16px 20px', 
                                borderRadius: '8px',
                                border: '1px solid #e0e0e0',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '600', marginBottom: '5px', fontFamily: 'Paperlogy, sans-serif' }}>
                                        {link.title}
                                    </div>
                                    <a 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        style={{ 
                                            color: '#EC6363', 
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                            fontFamily: 'Paperlogy, sans-serif'
                                        }}
                                    >
                                        {link.url} ↗
                                    </a>
                                </div>
                                <button
                                    onClick={() => handleDeleteLink(link.id)}
                                    style={{
                                        padding: '6px 12px',
                                        background: '#333333',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        fontFamily: 'Paperlogy, sans-serif'
                                    }}
                                >
                                    삭제
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ background: 'white', padding: '30px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'Paperlogy, sans-serif' }}>📤 내가 보낸 제안</h2>
                    {sentProposals.length === 0 ? (
                        <p style={{ color: '#999', fontFamily: 'Paperlogy, sans-serif' }}>보낸 제안이 없습니다.</p>
                    ) : (
                        <div>
                            {sentProposals.map(proposal => (
                                <div key={proposal.id} style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px', marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <strong style={{ color: '#EC6363', fontFamily: 'Paperlogy, sans-serif' }}>받는 사람: {proposal.to}</strong>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ 
                                                padding: '4px 12px',
                                                background: proposal.status === 'accepted' ? '#4CAF50' : 
                                                           proposal.status === 'rejected' ? '#f44336' : '#FFA726',
                                                color: 'white',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontFamily: 'Paperlogy, sans-serif'
                                            }}>
                                                {proposal.status === 'accepted' ? '✓ 승낙됨' : 
                                                 proposal.status === 'rejected' ? '✗ 거부됨' : '⏱ 대기중'}
                                            </span>
                                            <span style={{ color: '#666', fontSize: '14px', fontFamily: 'Paperlogy, sans-serif' }}>
                                                {proposal.date} {proposal.time}
                                            </span>
                                        </div>
                                    </div>
                                    <p style={{ lineHeight: '1.6', fontFamily: 'Paperlogy, sans-serif' }}>{proposal.message}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ background: 'white', padding: '30px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'Paperlogy, sans-serif' }}>📥 받은 제안</h2>
                    {receivedProposals.length === 0 ? (
                        <p style={{ color: '#999', fontFamily: 'Paperlogy, sans-serif' }}>받은 제안이 없습니다.</p>
                    ) : (
                        <div>
                            {receivedProposals.map(proposal => (
                                <div key={proposal.id} style={{ padding: '20px', background: '#fff5f5', borderRadius: '8px', marginBottom: '15px', border: '1px solid #ffdddd' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <strong style={{ color: '#EC6363', fontFamily: 'Paperlogy, sans-serif' }}>보낸 사람: {proposal.from}</strong>
                                        <span style={{ color: '#666', fontSize: '14px', fontFamily: 'Paperlogy, sans-serif' }}>
                                            {proposal.date} {proposal.time}
                                        </span>
                                    </div>
                                    <p style={{ lineHeight: '1.6', marginBottom: '15px', fontFamily: 'Paperlogy, sans-serif' }}>
                                        {proposal.message}
                                    </p>
                                    
                                    {proposal.status === 'pending' && (
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button
                                                onClick={() => onProposalAction(proposal.id, 'accepted')}
                                                style={{
                                                    padding: '10px 24px',
                                                    background: '#4CAF50',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    fontFamily: 'Paperlogy, sans-serif'
                                                }}
                                            >
                                                ✓ 승낙
                                            </button>
                                            <button
                                                onClick={() => onProposalAction(proposal.id, 'rejected')}
                                                style={{
                                                    padding: '10px 24px',
                                                    background: '#f44336',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    fontFamily: 'Paperlogy, sans-serif'
                                                }}
                                            >
                                                ✗ 거부
                                            </button>
                                        </div>
                                    )}
                                    
                                    {proposal.status === 'accepted' && (
                                        <div style={{ 
                                            padding: '10px 16px',
                                            background: '#E8F5E9',
                                            borderRadius: '6px',
                                            color: '#2E7D32',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            fontFamily: 'Paperlogy, sans-serif'
                                        }}>
                                            ✓ 승낙한 제안입니다
                                        </div>
                                    )}
                                    
                                    {proposal.status === 'rejected' && (
                                        <div style={{ 
                                            padding: '10px 16px',
                                            background: '#FFEBEE',
                                            borderRadius: '6px',
                                            color: '#C62828',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            fontFamily: 'Paperlogy, sans-serif'
                                        }}>
                                            ✗ 거부한 제안입니다
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ background: 'white', padding: '30px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'Paperlogy, sans-serif' }}>보낸 연락 ({sentContacts.length})</h2>
                    {sentContacts.length === 0 ? (
                        <p style={{ color: '#999', fontFamily: 'Paperlogy, sans-serif' }}>보낸 연락이 없습니다.</p>
                    ) : (
                        <div>
                            {sentContacts.map(contact => (
                                <div key={contact.id} style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px', marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <strong style={{ color: '#EC6363', fontFamily: 'Paperlogy, sans-serif' }}>받는 사람: {contact.to}</strong>
                                        <span style={{ color: '#666', fontSize: '14px', fontFamily: 'Paperlogy, sans-serif' }}>{contact.date} {contact.time}</span>
                                    </div>
                                    <p style={{ lineHeight: '1.6', fontFamily: 'Paperlogy, sans-serif' }}>{contact.message}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'Paperlogy, sans-serif' }}>받은 연락 ({receivedContacts.length})</h2>
                    {receivedContacts.length === 0 ? (
                        <p style={{ color: '#999', fontFamily: 'Paperlogy, sans-serif' }}>받은 연락이 없습니다.</p>
                    ) : (
                        <div>
                            {receivedContacts.map(contact => (
                                <div key={contact.id} style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px', marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <strong style={{ color: '#EC6363', fontFamily: 'Paperlogy, sans-serif' }}>보낸 사람: {contact.from}</strong>
                                        <span style={{ color: '#666', fontSize: '14px', fontFamily: 'Paperlogy, sans-serif' }}>{contact.date} {contact.time}</span>
                                    </div>
                                    <p style={{ lineHeight: '1.6', fontFamily: 'Paperlogy, sans-serif' }}>{contact.message}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// 회원가입 페이지
function SignupPage({ onNavigate }) {
    const [step, setStep] = useState('role');
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
            <div className="role-selection" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: '80vh',
                padding: '40px 20px'
            }}>
                <h1 className="page-title" style={{ textAlign: 'center', marginBottom: '16px' }}>회원 가입</h1>
                <p className="auth-subtitle" style={{ textAlign: 'center', marginBottom: '40px' }}>간편한 회원가입으로 게임스토리를 사용하세요.</p>
                
                <div className="role-cards">
                    <div 
                        className="role-card"
                        onClick={() => handleRoleSelect('creator')}
                        style={{ 
                            background: '#2A2426',
                            border: '2px solid #3A3436'
                        }}
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
                        style={{ 
                            background: '#2A2426',
                            border: '2px solid #3A3436'
                        }}
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

// 시나리오 상세보기 페이지
function ScenarioDetailPage({ scenarioId, onNavigate, currentUser }) {
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
                author: currentUser || "게스트",
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
                            author: currentUser || "게스트",
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
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
                <button 
                    onClick={() => onNavigate('home')}
                    style={{ 
                        marginBottom: '20px', 
                        padding: '8px 16px', 
                        background: '#888', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        fontFamily: 'Paperlogy, sans-serif'
                    }}
                >
                    ← 목록으로
                </button>
                <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                        <div>
                            <h1 style={{ fontSize: '32px', marginBottom: '10px', fontFamily: 'Paperlogy, sans-serif' }}>{scenario.title}</h1>
                            <p style={{ color: '#666', fontSize: '16px', fontFamily: 'Paperlogy, sans-serif' }}>작성자: {scenario.author}</p>
                        </div>
                        <span className="rating-badge" style={{ fontSize: '24px' }}>{scenario.rating}</span>
                    </div>
                    <div className="card-tags" style={{ marginBottom: '30px' }}>
                        {scenario.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>
                    <div style={{ lineHeight: '1.8', fontSize: '16px', whiteSpace: 'pre-line', marginBottom: '40px', fontFamily: 'Paperlogy, sans-serif' }}>
                        {scenario.fullContent || scenario.description}
                    </div>

                    <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ddd' }} />

                    <div>
                        <h3 style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'Paperlogy, sans-serif' }}>댓글 ({comments.length})</h3>
                        
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
                                    resize: 'vertical',
                                    fontFamily: 'Paperlogy, sans-serif'
                                }}
                            />
                            <button
                                onClick={handleAddComment}
                                style={{
                                    marginTop: '10px',
                                    padding: '10px 20px',
                                    background: '#EC6363',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    fontFamily: 'Paperlogy, sans-serif'
                                }}
                            >
                                댓글 작성
                            </button>
                        </div>

                        <div>
                            {comments.map(comment => (
                                <div key={comment.id} style={{ marginBottom: '30px', padding: '20px', background: '#f9fafb', borderRadius: '8px', fontFamily: 'Paperlogy, sans-serif' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <strong style={{ fontFamily: 'Paperlogy, sans-serif' }}>{comment.author}</strong>
                                        <span style={{ color: '#666', fontSize: '14px', fontFamily: 'Paperlogy, sans-serif' }}>{comment.date}</span>
                                    </div>
                                    <p style={{ marginBottom: '10px', lineHeight: '1.6', fontFamily: 'Paperlogy, sans-serif' }}>{comment.text}</p>
                                    <button
                                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                        style={{
                                            padding: '6px 12px',
                                            background: 'transparent',
                                            color: '#EC6363',
                                            border: '1px solid #EC6363',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            fontFamily: 'Paperlogy, sans-serif'
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
                                                    fontSize: '14px',
                                                    fontFamily: 'Paperlogy, sans-serif'
                                                }}
                                            />
                                            <button
                                                onClick={() => handleAddReply(comment.id)}
                                                style={{
                                                    marginTop: '8px',
                                                    padding: '8px 16px',
                                                    background: '#EC6363',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '13px',
                                                    fontWeight: '600',
                                                    fontFamily: 'Paperlogy, sans-serif'
                                                }}
                                            >
                                                답글 작성
                                            </button>
                                        </div>
                                    )}

                                    {comment.replies && comment.replies.length > 0 && (
                                        <div style={{ marginTop: '20px', marginLeft: '30px' }}>
                                            {comment.replies.map(reply => (
                                                <div key={reply.id} style={{ marginBottom: '15px', padding: '15px', background: 'white', borderRadius: '6px', fontFamily: 'Paperlogy, sans-serif' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                        <strong style={{ fontSize: '14px', fontFamily: 'Paperlogy, sans-serif' }}>↳ {reply.author}</strong>
                                                        <span style={{ color: '#666', fontSize: '12px', fontFamily: 'Paperlogy, sans-serif' }}>{reply.date}</span>
                                                    </div>
                                                    <p style={{ fontSize: '14px', lineHeight: '1.6', fontFamily: 'Paperlogy, sans-serif' }}>{reply.text}</p>
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

// 메인 앱 컴포넌트
function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [proposals, setProposals] = useState([
        {
            id: 1,
            from: '레드플라임',
            to: 'ahnhyun9',
            message: '안녕하세요! 함께 프로젝트를 진행하고 싶습니다. 제 포트폴리오를 확인해주세요!',
            date: '2024.11.15',
            time: '14:30',
            status: 'pending'
        },
        {
            id: 2,
            from: 'ahnhyun9',
            to: '블루드롭',
            message: '미스터리 장르 프로젝트에 관심이 있습니다. 협업 가능한지 여쭤봅니다.',
            date: '2024.11.14',
            time: '10:15',
            status: 'pending'
        }
    ]);

    const handleLogin = (userId) => {
        setIsLoggedIn(true);
        setCurrentUser(userId);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setCurrentPage('home');
    };

    const handleSendContact = (recipientName, message) => {
        const newContact = {
            id: Date.now(),
            from: currentUser,
            to: recipientName,
            message: message,
            date: new Date().toLocaleDateString('ko-KR'),
            time: new Date().toLocaleTimeString('ko-KR')
        };
        setContacts([...contacts, newContact]);
    };

    const handleProposalAction = (proposalId, action) => {
        setProposals(proposals.map(proposal => 
            proposal.id === proposalId 
                ? { ...proposal, status: action }
                : proposal
        ));
        
        const actionText = action === 'accepted' ? '승낙' : '거부';
        alert(`제안을 ${actionText}했습니다.`);
    };

    const renderPage = () => {
        if (currentPage.startsWith('scenario-detail-')) {
            const scenarioId = parseInt(currentPage.replace('scenario-detail-', ''));
            return <ScenarioDetailPage scenarioId={scenarioId} onNavigate={setCurrentPage} currentUser={currentUser} />;
        }
        
        if (currentPage.startsWith('team-detail-')) {
            const memberId = parseInt(currentPage.replace('team-detail-', ''));
            const member = DUMMY_TEAM_MEMBERS.find(m => m.id === memberId);
            
            if (member) {
                return (
                    <div className="main-content">
                        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
                            <button 
                                onClick={() => setCurrentPage('team')}
                                style={{ 
                                    marginBottom: '20px', 
                                    padding: '8px 16px', 
                                    background: '#888', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '4px', 
                                    cursor: 'pointer',
                                    fontFamily: 'Paperlogy, sans-serif'
                                }}
                            >
                                ← 목록으로
                            </button>
                            <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                    <div style={{ fontSize: '80px', marginBottom: '20px' }}>{member.avatar}</div>
                                    <h1 style={{ fontSize: '32px', marginBottom: '10px', fontFamily: 'Paperlogy, sans-serif' }}>{member.name}</h1>
                                    <p style={{ color: '#EC6363', fontSize: '18px', fontWeight: '600', marginBottom: '20px', fontFamily: 'Paperlogy, sans-serif' }}>{member.role}</p>
                                    
                                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
                                        {member.skills.map((skill, index) => (
                                            <span key={index} className="skill-badge">{skill}</span>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => {
                                            if (!isLoggedIn) {
                                                alert('로그인이 필요합니다!');
                                                setCurrentPage('login');
                                                return;
                                            }
                                            const message = prompt(`${member.name}님에게 전달할 메시지를 입력하세요:`);
                                            if (message && message.trim()) {
                                                handleSendContact(member.name, message);
                                                alert(`${member.name}님에게 메시지를 전송했습니다!`);
                                            }
                                        }}
                                        style={{
                                            padding: '12px 32px',
                                            background: '#EC6363',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            marginTop: '10px',
                                            fontFamily: 'Paperlogy, sans-serif'
                                        }}
                                    >
                                        💬 연락하기
                                    </button>
                                </div>

                                <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ddd' }} />

                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ fontSize: '24px', marginBottom: '15px', fontFamily: 'Paperlogy, sans-serif' }}>소개</h3>
                                    <p style={{ lineHeight: '1.8', marginBottom: '30px', fontFamily: 'Paperlogy, sans-serif' }}>{member.description}</p>
                                    
                                    {member.portfolioLinks && member.portfolioLinks.length > 0 && (
                                        <>
                                            <h3 style={{ fontSize: '24px', marginBottom: '15px', fontFamily: 'Paperlogy, sans-serif' }}>🔗 포트폴리오 링크</h3>
                                            <div style={{ display: 'grid', gap: '12px', marginBottom: '30px' }}>
                                                {member.portfolioLinks.map(link => (
                                                    <div key={link.id} style={{ 
                                                        background: '#f8f9fa', 
                                                        padding: '16px 20px', 
                                                        borderRadius: '8px',
                                                        border: '1px solid #e0e0e0'
                                                    }}>
                                                        <div style={{ fontWeight: '600', marginBottom: '5px', fontFamily: 'Paperlogy, sans-serif' }}>
                                                            {link.title}
                                                        </div>
                                                        <a 
                                                            href={link.url} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            style={{ 
                                                                color: '#EC6363', 
                                                                textDecoration: 'none',
                                                                fontSize: '14px',
                                                                fontFamily: 'Paperlogy, sans-serif'
                                                            }}
                                                        >
                                                            {link.url} ↗
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                    
                                    {member.portfolio && (
                                        <>
                                            <h3 style={{ fontSize: '24px', marginBottom: '15px', fontFamily: 'Paperlogy, sans-serif' }}>포트폴리오</h3>
                                            <p style={{ lineHeight: '1.8', whiteSpace: 'pre-line', fontFamily: 'Paperlogy, sans-serif' }}>{member.portfolio}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        
        switch (currentPage) {
            case 'home':
                return <HomePage onNavigate={setCurrentPage} />;
            case 'team':
                return <TeamPage onNavigate={setCurrentPage} />;
            case 'mypage':
                return <MyPage contacts={contacts} currentUser={currentUser} isLoggedIn={isLoggedIn} onNavigate={setCurrentPage} proposals={proposals} onProposalAction={handleProposalAction} />;
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
