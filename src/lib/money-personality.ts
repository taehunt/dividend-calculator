export type AxisKey = "purpose" | "structure" | "ownership" | "horizon";

export type MoneyScores = Record<AxisKey, number>;

export type MoneyQuestion = {
  id: number;
  axis: AxisKey;
  prompt: string;
  low: string;
  high: string;
};

export type MoneyType = {
  signature: string;
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  summary: string;
  spending: string;
  stress: string;
  relationship: string;
  strengths: string[];
  cautions: string[];
  action: string;
  color: string;
};

export const AXIS_KEYS: AxisKey[] = [
  "purpose",
  "structure",
  "ownership",
  "horizon",
];

export const AXES: Record<
  AxisKey,
  {
    title: string;
    question: string;
    low: { code: string; label: string; description: string };
    high: { code: string; label: string; description: string };
  }
> = {
  purpose: {
    title: "돈의 목적",
    question: "돈이 내 삶에서 가장 먼저 해줘야 하는 일은?",
    low: {
      code: "S",
      label: "안정",
      description: "예상 밖의 상황에서도 흔들리지 않을 안전망을 먼저 봅니다.",
    },
    high: {
      code: "E",
      label: "경험",
      description: "원하는 선택과 경험의 폭을 넓혀주는 가능성을 먼저 봅니다.",
    },
  },
  structure: {
    title: "관리 방식",
    question: "돈을 다룰 때 어떤 방식이 더 편한가요?",
    low: {
      code: "P",
      label: "계획",
      description: "기준과 한도를 먼저 정하면 마음이 편해집니다.",
    },
    high: {
      code: "F",
      label: "유연",
      description: "그때의 상황과 우선순위에 맞춰 조정하는 편입니다.",
    },
  },
  ownership: {
    title: "결정 관계",
    question: "함께 쓰는 돈을 결정할 때 무엇이 중요한가요?",
    low: {
      code: "I",
      label: "독립",
      description: "각자의 경계와 선택권이 분명할 때 관계가 편합니다.",
    },
    high: {
      code: "T",
      label: "공유",
      description: "과정과 이유를 나누고 함께 합의할 때 안심됩니다.",
    },
  },
  horizon: {
    title: "시간 관점",
    question: "현재와 미래 사이에서 어디에 먼저 무게를 두나요?",
    low: {
      code: "N",
      label: "현재",
      description: "지금 체감할 수 있는 효용과 만족을 중요하게 봅니다.",
    },
    high: {
      code: "A",
      label: "미래",
      description: "시간이 지날수록 커질 여유와 선택권을 중요하게 봅니다.",
    },
  },
};

export const QUESTIONS: MoneyQuestion[] = [
  {
    id: 1,
    axis: "purpose",
    prompt: "예상하지 못한 보너스가 생겼습니다. 가장 먼저 드는 생각은?",
    low: "비상금이나 미뤄둔 고정비부터 채운다",
    high: "해보고 싶었던 경험이나 기회에 쓸 방법을 찾는다",
  },
  {
    id: 2,
    axis: "purpose",
    prompt: "돈이 충분하다고 느끼는 순간은 언제인가요?",
    low: "갑작스러운 일이 생겨도 버틸 수 있을 때",
    high: "원하는 선택을 돈 때문에 포기하지 않아도 될 때",
  },
  {
    id: 3,
    axis: "purpose",
    prompt: "큰 지출을 하고 가장 만족스러운 경우는?",
    low: "오래 쓰고 생활이 안정적으로 편해졌을 때",
    high: "기억에 남거나 새로운 가능성이 생겼을 때",
  },
  {
    id: 4,
    axis: "purpose",
    prompt: "수입이 늘었을 때 자연스럽게 먼저 하고 싶은 일은?",
    low: "저축 여력을 늘려 불확실성을 줄인다",
    high: "그동안 미뤘던 삶의 선택을 하나 실행한다",
  },
  {
    id: 5,
    axis: "purpose",
    prompt: "재정적으로 잘 살고 있다는 말에 더 가까운 모습은?",
    low: "웬만한 변수에는 흔들리지 않는 상태",
    high: "내가 원하는 방향으로 삶을 움직이는 상태",
  },
  {
    id: 6,
    axis: "structure",
    prompt: "월급이 들어온 날의 내 모습에 더 가까운 것은?",
    low: "정해둔 항목과 금액대로 먼저 나눈다",
    high: "이번 달 상황을 보고 우선순위를 조정한다",
  },
  {
    id: 7,
    axis: "structure",
    prompt: "여행 경비를 준비할 때 더 편한 방식은?",
    low: "교통·숙소·식비 한도를 미리 정한다",
    high: "큰 금액만 정하고 현지 상황에 맞춘다",
  },
  {
    id: 8,
    axis: "structure",
    prompt: "사고 싶던 물건이 예상보다 크게 할인 중입니다.",
    low: "예산에 없었다면 일단 보류한다",
    high: "전체 상황에 무리가 없으면 기회를 잡는다",
  },
  {
    id: 9,
    axis: "structure",
    prompt: "저축을 오래 유지하기 쉬운 방식은?",
    low: "매달 같은 날 같은 금액을 자동으로 옮긴다",
    high: "그달의 수입과 지출에 맞춰 가능한 만큼 옮긴다",
  },
  {
    id: 10,
    axis: "structure",
    prompt: "계획하지 않은 지출이 생겼을 때 나는?",
    low: "다른 항목을 줄여 전체 계획을 다시 맞춘다",
    high: "이번 달의 예외로 두고 다음 선택에서 조절한다",
  },
  {
    id: 11,
    axis: "ownership",
    prompt: "연인이나 가족이 큰돈을 쓰려 할 때 더 중요한 것은?",
    low: "각자 감당할 수 있다면 선택을 존중하는 것",
    high: "결정 전에 이유와 영향을 함께 이야기하는 것",
  },
  {
    id: 12,
    axis: "ownership",
    prompt: "함께 사는 두 사람이 생활비를 관리한다면?",
    low: "각자의 부담 범위만 명확하게 정하는 편이 편하다",
    high: "공동 목표와 전체 흐름을 같이 보는 편이 편하다",
  },
  {
    id: 13,
    axis: "ownership",
    prompt: "누군가 내 소비 방식에 조언할 때 드는 생각은?",
    low: "내 사정을 모르면 판단은 내가 해야 한다",
    high: "관계가 가까우면 함께 점검해볼 수 있다",
  },
  {
    id: 14,
    axis: "ownership",
    prompt: "공동 여행에서 예상보다 비용이 커졌습니다.",
    low: "각자 선택한 비용을 기준으로 다시 나눈다",
    high: "전체 경험을 기준으로 모두가 납득할 방법을 찾는다",
  },
  {
    id: 15,
    axis: "ownership",
    prompt: "돈 문제로 갈등이 생겼을 때 먼저 필요한 것은?",
    low: "서로 넘지 않을 기준과 책임을 정하는 것",
    high: "왜 그렇게 선택했는지 충분히 이해하는 것",
  },
  {
    id: 16,
    axis: "horizon",
    prompt: "지금의 나에게 더 가치 있게 느껴지는 선택은?",
    low: "이번 달의 생활 만족을 확실히 높이는 선택",
    high: "몇 년 뒤의 부담을 확실히 줄이는 선택",
  },
  {
    id: 17,
    axis: "horizon",
    prompt: "오랫동안 갖고 싶었던 물건을 살 수 있게 됐습니다.",
    low: "현재 형편에 무리가 없다면 지금 산다",
    high: "미래 목표에 미치는 영향을 한 번 더 본다",
  },
  {
    id: 18,
    axis: "horizon",
    prompt: "수입을 관리할 때 가장 먼저 확보하고 싶은 것은?",
    low: "현재 생활에서 꼭 필요한 여유",
    high: "장기 목표를 위한 꾸준한 몫",
  },
  {
    id: 19,
    axis: "horizon",
    prompt: "선택을 후회하는 경우에 더 가까운 것은?",
    low: "지금 누릴 수 있었는데 너무 오래 미뤘을 때",
    high: "당장의 만족 때문에 미래 계획이 늦어졌을 때",
  },
  {
    id: 20,
    axis: "horizon",
    prompt: "여유 자금의 사용처를 정할 때 더 자주 보는 것은?",
    low: "앞으로 몇 달 안에 달라지는 것",
    high: "몇 년 뒤 누적되어 달라지는 것",
  },
];

export const MONEY_TYPES: MoneyType[] = [
  {
    signature: "SPIN",
    slug: "steady-vault",
    name: "현실 금고지기",
    emoji: "🧱",
    tagline: "오늘을 지키는 단단한 기준",
    summary: "생활이 흔들리지 않는 상태를 중요하게 여기며, 정한 범위 안에서는 현재의 만족도 놓치지 않습니다.",
    spending: "가격보다 오래 쓸 수 있는지, 생활을 실제로 편하게 만드는지를 따집니다. 충동구매는 드물지만 필요하다고 판단하면 미루지 않습니다.",
    stress: "예상 밖의 지출이 연달아 생기거나 내 돈의 경계가 흐려질 때 긴장합니다. 이때 선택을 지나치게 축소할 수 있습니다.",
    relationship: "각자의 책임이 분명한 관계에서 편안합니다. 공동비용은 감정보다 기준표로 정할 때 갈등이 줄어듭니다.",
    strengths: ["현실적인 위험 감지", "생활비 통제", "독립적인 판단"],
    cautions: ["즐거운 지출까지 낭비로 볼 수 있음", "도움을 요청하는 시점이 늦음", "예외 상황에 경직될 수 있음"],
    action: "즐거움을 위한 작은 고정 예산을 먼저 만들어 보세요.",
    color: "#315c4c",
  },
  {
    signature: "SPIA",
    slug: "future-architect",
    name: "미래 건축가",
    emoji: "🏛️",
    tagline: "시간을 내 편으로 만드는 설계자",
    summary: "돈을 장기적인 안전과 선택권을 만드는 재료로 봅니다. 혼자 세운 기준을 꾸준히 지키는 힘이 강합니다.",
    spending: "큰 목표에서 역산해 현재 지출을 결정합니다. 눈앞의 할인보다 계획과의 일치 여부가 더 중요합니다.",
    stress: "장기 계획이 흐려지거나 다른 사람이 계획에 개입할 때 통제력을 잃었다고 느낍니다.",
    relationship: "각자의 목표와 공동 목표를 분리해 합의하면 편합니다. 강요보다 숫자와 일정을 공유하는 대화가 잘 맞습니다.",
    strengths: ["장기 계획", "꾸준한 축적", "유혹에 흔들리지 않는 기준"],
    cautions: ["현재의 만족을 계속 미룸", "계획 변경을 실패로 느낄 수 있음", "상대의 감정적 이유를 놓칠 수 있음"],
    action: "미래 예산과 별도로 지금 누릴 몫도 같은 중요도로 예약해 보세요.",
    color: "#294b72",
  },
  {
    signature: "SPTN",
    slug: "life-coordinator",
    name: "생활 조율가",
    emoji: "🫶",
    tagline: "우리의 오늘을 안정시키는 사람",
    summary: "현재의 생활을 안정적으로 운영하면서 가까운 사람과 과정까지 나누려는 유형입니다.",
    spending: "함께 쓰는 돈일수록 목적과 한도를 분명히 합니다. 모두가 실제로 편해지는 지출에 만족을 느낍니다.",
    stress: "상의 없이 결정된 공동지출이나 불공평한 역할 분담에서 크게 지칩니다.",
    relationship: "대화를 통해 기준을 세우는 데 강합니다. 다만 상대가 혼자 결정할 시간을 침범하지 않도록 주의해야 합니다.",
    strengths: ["생활비 조율", "공정한 합의", "현실적인 배려"],
    cautions: ["모두를 챙기다 내 욕구를 미룸", "합의가 없으면 불안해짐", "작은 지출도 설명하려 할 수 있음"],
    action: "공동 예산과 설명하지 않아도 되는 개인 예산을 함께 정해 보세요.",
    color: "#7a5441",
  },
  {
    signature: "SPTA",
    slug: "family-planner",
    name: "함께 짓는 설계자",
    emoji: "🏡",
    tagline: "우리의 내일을 계획으로 연결합니다",
    summary: "돈을 함께 살아갈 사람들의 미래를 지키는 도구로 봅니다. 공동 목표를 구체적인 계획으로 바꾸는 데 능합니다.",
    spending: "가족·연인·팀의 장기 목표에 맞는 지출을 선호합니다. 합의된 계획에는 누구보다 꾸준합니다.",
    stress: "혼자 책임져야 한다고 느끼거나 상대가 공동 목표에 무관심할 때 부담이 커집니다.",
    relationship: "정기적인 재정 대화와 역할 분담이 잘 맞습니다. 상대를 계획에 맞추려 하기보다 수정 권한도 함께 나눠야 합니다.",
    strengths: ["공동 목표 설계", "책임감", "장기적 돌봄"],
    cautions: ["관계의 책임을 과하게 짊어짐", "계획 참여를 애정으로 판단할 수 있음", "현재의 기쁨을 뒤로 미룸"],
    action: "공동 목표마다 책임자와 다시 논의할 날짜를 함께 적어 보세요.",
    color: "#3f5f7d",
  },
  {
    signature: "SFIN",
    slug: "adaptive-guardian",
    name: "유연한 방어자",
    emoji: "🛟",
    tagline: "흔들려도 다시 균형을 찾는 사람",
    summary: "안전을 중요하게 보지만 정해진 방식 하나에 매이지 않습니다. 상황을 읽고 빠르게 균형을 회복합니다.",
    spending: "생활의 변화를 보면서 지출과 저축을 조절합니다. 고정 계획보다 충분한 완충 공간을 선호합니다.",
    stress: "선택권 없이 세세한 규칙을 따라야 할 때 답답함을 느낍니다. 반대로 여유가 너무 적으면 판단을 미룰 수 있습니다.",
    relationship: "각자 자율적으로 관리하되 위험 신호만 공유하는 관계가 편합니다.",
    strengths: ["상황 대응", "현실 감각", "자율적인 회복"],
    cautions: ["기록이 느슨해질 수 있음", "안전 기준이 상황마다 달라짐", "문제를 혼자 해결하려 함"],
    action: "복잡한 예산 대신 반드시 지킬 최소 안전선 하나만 숫자로 정해 보세요.",
    color: "#386468",
  },
  {
    signature: "SFIA",
    slug: "quiet-opportunity-keeper",
    name: "조용한 기회수집가",
    emoji: "🧭",
    tagline: "안전을 확보하고 기회를 기다립니다",
    summary: "미래의 안전을 바라보면서도 계획을 상황에 맞게 바꿀 줄 압니다. 혼자 관찰하고 결정하는 시간이 중요합니다.",
    spending: "유행보다 장기적으로 쓸모가 남는 선택을 찾습니다. 확신이 생기면 예상보다 과감하게 움직이기도 합니다.",
    stress: "결정을 재촉받거나 아직 정리되지 않은 생각을 설명해야 할 때 피로를 느낍니다.",
    relationship: "독립성을 존중받으면 오히려 중요한 판단을 더 잘 공유합니다. 결론보다 검토 시간을 먼저 합의하는 것이 좋습니다.",
    strengths: ["기회 관찰", "위험과 유연성의 균형", "독립적인 장기 판단"],
    cautions: ["결정 근거가 타인에게 잘 보이지 않음", "기회를 오래 기다릴 수 있음", "계획을 기록하지 않아 흔들릴 수 있음"],
    action: "머릿속 기준을 세 줄짜리 체크리스트로 밖에 꺼내 보세요.",
    color: "#46636f",
  },
  {
    signature: "SFTN",
    slug: "warm-pragmatist",
    name: "다정한 생활가",
    emoji: "☕",
    tagline: "사람과 오늘을 함께 돌봅니다",
    summary: "현재 생활의 편안함과 관계의 온도를 중요하게 여깁니다. 필요에 따라 자연스럽게 자원을 나눕니다.",
    spending: "함께 먹고 쉬고 시간을 보내는 데 쓰는 돈의 가치를 크게 봅니다. 상황이 괜찮다면 계획 밖의 지출도 받아들입니다.",
    stress: "누군가를 실망시킬까 봐 감당하기 어려운 지출까지 받아들일 수 있습니다.",
    relationship: "대화를 통해 서로의 필요를 빠르게 알아차립니다. 거절이 관계 거절은 아니라는 기준이 필요합니다.",
    strengths: ["생활의 만족 발견", "유연한 배려", "관계 분위기 조율"],
    cautions: ["호의성 지출", "내 한계를 늦게 알림", "장기 목표가 뒤로 밀릴 수 있음"],
    action: "누군가를 위한 지출에도 월 한도를 정해 다정함이 부담이 되지 않게 하세요.",
    color: "#9a5f54",
  },
  {
    signature: "SFTA",
    slug: "flexible-supporter",
    name: "유연한 후원자",
    emoji: "🌿",
    tagline: "함께 오래가기 위한 여유를 만듭니다",
    summary: "사람들의 미래를 지키고 싶어 하지만 한 가지 방식만 고집하지 않습니다. 변화에 맞춰 지원 방식을 조절합니다.",
    spending: "교육·건강·성장처럼 시간이 지나도 가치가 남는 공동지출에 마음이 갑니다.",
    stress: "모두의 미래를 챙겨야 한다는 책임감이 커지면 정작 자신의 상태를 놓칩니다.",
    relationship: "정서적인 공감과 장기 계획을 함께 나눌 때 안정됩니다. 도움의 범위를 명확히 하면 관계가 오래갑니다.",
    strengths: ["장기적인 배려", "변화 대응", "관계 중심의 위험 관리"],
    cautions: ["타인의 목표를 대신 책임짐", "내 미래 자원을 양보함", "명확한 거절이 늦음"],
    action: "도울 수 있는 범위와 도울 수 없는 범위를 같은 문장에 적어 보세요.",
    color: "#547259",
  },
  {
    signature: "EPIN",
    slug: "planned-enjoyer",
    name: "계획형 향유자",
    emoji: "🎟️",
    tagline: "즐거움도 제대로 준비해서 누립니다",
    summary: "현재의 좋은 경험을 중요하게 여기지만 충동에 맡기기보다 미리 자리를 만들어 둡니다.",
    spending: "여행·취미·경험 예산을 계획에 넣어 죄책감 없이 쓰는 편입니다. 원하는 것의 우선순위가 분명합니다.",
    stress: "열심히 준비한 경험이 외부 변수로 취소되거나 타인의 기준 때문에 축소될 때 스트레스를 받습니다.",
    relationship: "각자가 원하는 경험을 존중하는 관계가 편합니다. 함께할 일은 비용과 기대를 미리 맞추면 좋습니다.",
    strengths: ["목표 있는 소비", "경험 예산 관리", "독립적인 취향"],
    cautions: ["계획한 소비를 반드시 실행하려 함", "안전 여유가 얇아질 수 있음", "상대의 즉흥 제안을 부담스러워함"],
    action: "경험 예산 안에 취소·변경을 위한 여유도 함께 넣어 보세요.",
    color: "#8e4f63",
  },
  {
    signature: "EPIA",
    slug: "strategic-pioneer",
    name: "전략적 개척자",
    emoji: "🚀",
    tagline: "큰 가능성을 계획으로 현실화합니다",
    summary: "미래의 선택지를 넓혀줄 경험과 기회를 찾고, 그것을 구체적인 계획으로 실행합니다.",
    spending: "배움·도구·프로젝트처럼 미래 가능성을 키우는 지출을 선호합니다. 목표와 연결되지 않은 소비에는 냉정합니다.",
    stress: "성장이 멈췄다고 느끼거나 내 계획을 사소한 일로 방해받을 때 예민해집니다.",
    relationship: "서로의 비전을 존중하는 관계에서 잘 성장합니다. 상대가 원하는 안정도 비용이 아니라 조건으로 이해해야 합니다.",
    strengths: ["기회 설계", "실행 계획", "장기적인 자기투자"],
    cautions: ["모든 지출을 성장으로 정당화함", "현재 생활을 프로젝트처럼 다룸", "타인의 속도를 재촉할 수 있음"],
    action: "성장 목표와 아무 성과가 없어도 좋은 휴식 예산을 분리하세요.",
    color: "#6c4c8c",
  },
  {
    signature: "EPTN",
    slug: "experience-curator",
    name: "경험 기획자",
    emoji: "🎉",
    tagline: "함께 누릴 순간을 세심하게 만듭니다",
    summary: "사람들과 좋은 현재를 만드는 데 돈의 가치를 느끼며, 모두가 편하도록 미리 준비합니다.",
    spending: "모임·여행·선물처럼 공동의 기억이 남는 지출을 잘 기획합니다. 비용보다 만족의 균형을 봅니다.",
    stress: "준비한 경험에 상대가 무심하거나 비용 합의가 뒤늦게 어긋날 때 서운함이 커집니다.",
    relationship: "기대와 비용을 미리 말할수록 장점이 살아납니다. 좋은 분위기를 위해 혼자 더 부담하지 않도록 해야 합니다.",
    strengths: ["공동 경험 설계", "세심한 준비", "사람별 만족 조율"],
    cautions: ["분위기를 위해 추가 지출", "상대 반응을 보상처럼 기대함", "계획이 깨지면 서운함"],
    action: "함께 쓰는 돈은 초대 전에 예상 범위부터 자연스럽게 공유하세요.",
    color: "#a45b45",
  },
  {
    signature: "EPTA",
    slug: "shared-pioneer",
    name: "함께 가는 개척자",
    emoji: "⛵",
    tagline: "우리의 가능성을 큰 계획으로 키웁니다",
    summary: "가까운 사람과 더 넓은 미래를 경험하는 것이 중요합니다. 공동의 꿈을 실제 계획으로 바꾸는 힘이 있습니다.",
    spending: "함께 성장하거나 새로운 환경으로 이동하는 데 쓰는 돈을 가치 있게 봅니다.",
    stress: "상대가 공동 비전에 확신을 보이지 않거나 현재의 안정만 요구할 때 답답함을 느낍니다.",
    relationship: "큰 목표를 함께 세울 때 강하지만 각자의 목표도 같은 비중으로 인정해야 합니다.",
    strengths: ["공동 비전", "장기 프로젝트 추진", "사람을 움직이는 기대감"],
    cautions: ["상대의 동의를 확신으로 해석함", "목표 규모가 계속 커짐", "안전 비용을 과소평가할 수 있음"],
    action: "공동 목표를 시작하기 전에 중단 조건과 개인 안전선도 함께 정하세요.",
    color: "#5b5794",
  },
  {
    signature: "EFIN",
    slug: "spontaneous-explorer",
    name: "즉흥 탐험가",
    emoji: "🛵",
    tagline: "지금 열린 가능성을 놓치지 않습니다",
    summary: "현재의 생생한 경험과 개인의 선택권을 가장 중요하게 봅니다. 기회를 빠르게 알아보고 움직입니다.",
    spending: "계획보다 순간의 효용과 설렘을 따릅니다. 경험이 충분했다면 비용 자체를 후회하는 일은 적습니다.",
    stress: "선택을 통제받거나 모든 지출을 설명해야 할 때 크게 답답해합니다. 반복되는 작은 결제가 쌓이는 것은 놓칠 수 있습니다.",
    relationship: "서로의 자유를 존중하는 관계가 편합니다. 공동비용만큼은 즉흥성과 별개로 기준을 정해야 합니다.",
    strengths: ["기회 포착", "현재를 누리는 힘", "독립적인 선택"],
    cautions: ["작은 지출의 누적", "안전 여유 부족", "상의가 필요한 시점을 놓침"],
    action: "자유롭게 쓸 수 있는 잔액만 한 화면에서 바로 보이게 만들어 보세요.",
    color: "#b05c3e",
  },
  {
    signature: "EFIA",
    slug: "bold-experimenter",
    name: "대담한 실험가",
    emoji: "🧪",
    tagline: "미래의 가능성에 먼저 투자합니다",
    summary: "새로운 기회를 발견하면 정해진 길보다 직접 시험해보는 편입니다. 실패도 정보로 바꾸려 합니다.",
    spending: "새 기술·학습·프로젝트처럼 미래 선택지를 넓히는 지출에 과감합니다. 세부 예산보다 전체 가능성을 봅니다.",
    stress: "정체되거나 반복되는 환경에서 무기력해집니다. 새로운 가능성을 찾다가 진행 중인 계획을 흩뜨릴 수 있습니다.",
    relationship: "개인의 실험을 존중받을 때 편합니다. 가까운 사람에게는 기대수익보다 감당 가능한 손실부터 설명해야 합니다.",
    strengths: ["새로운 가능성 탐색", "빠른 실험", "실패 후 전환"],
    cautions: ["여러 기회에 동시에 비용 사용", "낙관적인 위험 판단", "주변의 불안을 답답함으로 해석"],
    action: "새 시도마다 잃어도 생활에 영향 없는 최대 금액을 먼저 적으세요.",
    color: "#7653a6",
  },
  {
    signature: "EFTN",
    slug: "social-spark",
    name: "분위기 메이커",
    emoji: "✨",
    tagline: "사람과 지금을 빛나게 씁니다",
    summary: "사람들과 보내는 현재의 순간에 돈의 가치를 크게 느낍니다. 상황에 맞춰 자연스럽게 베풀고 움직입니다.",
    spending: "모임·선물·맛있는 경험처럼 바로 관계의 온도를 높이는 지출을 좋아합니다.",
    stress: "비용 때문에 분위기가 식거나 누군가 소외되는 상황을 불편해합니다. 그래서 혼자 더 부담할 수 있습니다.",
    relationship: "함께 즐기는 힘이 크지만 호의와 책임의 경계를 나누는 연습이 필요합니다.",
    strengths: ["사람을 연결하는 소비", "빠른 분위기 감지", "유연한 나눔"],
    cautions: ["즉흥적인 공동지출", "거절하기 어려움", "미래의 나에게 비용을 넘길 수 있음"],
    action: "모임 전에 오늘 기꺼이 쓸 수 있는 최대 금액을 혼자 먼저 정하세요.",
    color: "#b65369",
  },
  {
    signature: "EFTA",
    slug: "possibility-sponsor",
    name: "가능성 후원자",
    emoji: "🌠",
    tagline: "사람의 미래에 기꺼이 힘을 보탭니다",
    summary: "나와 가까운 사람들의 성장 가능성을 발견하고 자원을 연결하는 데 의미를 느낍니다.",
    spending: "교육·도전·창작처럼 누군가의 미래를 바꿀 수 있는 지출에 마음이 움직입니다.",
    stress: "도움을 준 결과가 보이지 않거나 상대가 기회를 활용하지 않을 때 실망할 수 있습니다.",
    relationship: "응원과 자율성을 함께 주는 관계에 강합니다. 지원 전에 상대가 정말 원하는지 확인하면 갈등이 줄어듭니다.",
    strengths: ["성장 가능성 발견", "유연한 지원", "미래 지향적인 관계"],
    cautions: ["타인의 가능성에 과도하게 투자", "회수 기준이 모호함", "내 계획을 뒤로 미룸"],
    action: "지원은 선물인지 대여인지 투자 전부터 분명하게 구분하세요.",
    color: "#6f579d",
  },
];

export function getMoneyType(slug: string): MoneyType | undefined {
  return MONEY_TYPES.find((type) => type.slug === slug);
}

export function getTypeBySignature(signature: string): MoneyType {
  return MONEY_TYPES.find((type) => type.signature === signature) ?? MONEY_TYPES[0];
}

export function typeFromScores(scores: MoneyScores): MoneyType {
  const signature = AXIS_KEYS.map((key) =>
    scores[key] >= 50 ? AXES[key].high.code : AXES[key].low.code
  ).join("");
  return getTypeBySignature(signature);
}

export function scoreAnswers(answers: Record<number, 0 | 1>): MoneyScores {
  const totals: Record<AxisKey, { high: number; count: number }> = {
    purpose: { high: 0, count: 0 },
    structure: { high: 0, count: 0 },
    ownership: { high: 0, count: 0 },
    horizon: { high: 0, count: 0 },
  };

  QUESTIONS.forEach((question) => {
    const answer = answers[question.id];
    if (answer === undefined) return;
    totals[question.axis].high += answer;
    totals[question.axis].count += 1;
  });

  return AXIS_KEYS.reduce((scores, key) => {
    const total = totals[key];
    scores[key] = total.count ? Math.round((total.high / total.count) * 100) : 0;
    return scores;
  }, {} as MoneyScores);
}

export function oppositeType(type: MoneyType): MoneyType {
  const oppositeSignature = AXIS_KEYS.map((key, index) => {
    const axis = AXES[key];
    return type.signature[index] === axis.low.code
      ? axis.high.code
      : axis.low.code;
  }).join("");
  return getTypeBySignature(oppositeSignature);
}

export function axisLabel(type: MoneyType, key: AxisKey) {
  const index = AXIS_KEYS.indexOf(key);
  const axis = AXES[key];
  return type.signature[index] === axis.high.code ? axis.high : axis.low;
}

export const DAILY_PROMPTS = [
  {
    question: "기분이 가라앉은 날, 예정에 없던 작은 소비가 위로가 될 것 같습니다.",
    options: ["오늘의 위로로 허용한다", "다른 회복 방법을 먼저 찾는다"],
    reflection: "위로를 위해 쓴 돈보다, 내가 무엇을 달래려 했는지 알아차리는 것이 오늘의 기록입니다.",
  },
  {
    question: "친한 사람이 급하게 돈을 빌려달라고 요청했습니다.",
    options: ["관계와 상황을 먼저 본다", "돌려받지 못해도 되는 범위부터 본다"],
    reflection: "도움의 마음과 감당 가능한 범위는 동시에 존중받아야 합니다.",
  },
  {
    question: "오래 고민하던 물건이 오늘까지만 할인됩니다.",
    options: ["필요했다면 오늘 결정한다", "마감 압박과 필요를 분리한다"],
    reflection: "할인이 결정을 앞당겼는지, 필요가 결정을 만든 것인지 구분해 보세요.",
  },
  {
    question: "이번 달 목표보다 돈을 적게 모았습니다.",
    options: ["남은 기간에 더 줄인다", "원인을 기록하고 다음 달 기준을 조정한다"],
    reflection: "한 달의 결과보다 반복 가능한 기준을 만드는 일이 더 오래갑니다.",
  },
  {
    question: "친구들과 예상보다 비싼 모임 장소가 정해졌습니다.",
    options: ["이번 경험을 위해 참여한다", "내 예산을 솔직하게 말한다"],
    reflection: "관계를 지키는 방식에는 참여뿐 아니라 솔직한 경계도 포함됩니다.",
  },
  {
    question: "아직 쓸 수 있지만 더 좋은 도구가 눈에 들어옵니다.",
    options: ["효율이 높아진다면 바꾼다", "현재 도구의 불편을 더 확인한다"],
    reflection: "새 도구의 기대와 지금 도구의 실제 한계를 같은 기준으로 비교해 보세요.",
  },
  {
    question: "하루가 너무 바빠 지출 기록을 놓쳤습니다.",
    options: ["오늘 다시 모두 정리한다", "가장 큰 항목 하나만 기억해 둔다"],
    reflection: "완벽한 기록보다 다시 시작하기 쉬운 기록이 더 유용할 수 있습니다.",
  },
  {
    question: "예상보다 돈이 조금 남은 저녁입니다.",
    options: ["작은 만족에 사용한다", "미래의 나에게 남긴다"],
    reflection: "어느 선택이든 이유를 알고 고르면 자동적인 소비나 절약에서 벗어날 수 있습니다.",
  },
  {
    question: "가까운 사람의 소비 방식이 이해되지 않습니다.",
    options: ["내 기준과 다른 지점을 말한다", "그 선택이 주는 의미를 먼저 묻는다"],
    reflection: "돈에 대한 갈등은 금액보다 서로 다른 안전과 자유의 기준에서 시작되기도 합니다.",
  },
  {
    question: "새로운 수입 기회가 있지만 결과가 불확실합니다.",
    options: ["작게라도 시험해 본다", "조건이 더 분명해질 때까지 기다린다"],
    reflection: "가능성과 위험 중 어느 쪽을 크게 보는지 오늘의 선택에서 확인해 보세요.",
  },
  {
    question: "이번 주에 나를 위해 돈을 쓴 기억이 거의 없습니다.",
    options: ["작은 보상을 계획한다", "지금 괜찮다면 그대로 둔다"],
    reflection: "보상은 의무가 아니지만 계속 미루는 습관도 한 번은 살펴볼 필요가 있습니다.",
  },
  {
    question: "정기결제 하나를 거의 사용하지 않고 있습니다.",
    options: ["오늘 바로 해지한다", "다음 사용 시점을 정해 한 번 더 본다"],
    reflection: "이미 낸 돈보다 앞으로 실제로 사용할 가능성을 기준으로 판단해 보세요.",
  },
  {
    question: "가족의 목표를 위해 내 계획을 늦춰야 할 것 같습니다.",
    options: ["함께 가는 일을 우선한다", "내 계획의 최소선을 먼저 지킨다"],
    reflection: "양보의 크기와 기간을 말할 수 있어야 배려가 오래갑니다.",
  },
  {
    question: "사고 싶은 것과 배우고 싶은 것이 같은 가격입니다.",
    options: ["지금 만족이 큰 것을 고른다", "오래 남을 가능성이 큰 것을 고른다"],
    reflection: "무엇이 더 낫다는 답보다 지금 나에게 부족한 쪽을 찾는 질문입니다.",
  },
  {
    question: "계획한 예산을 이미 한 번 넘겼습니다.",
    options: ["남은 기간의 기준을 더 단단히 잡는다", "계획이 현실적이었는지 다시 본다"],
    reflection: "기준을 지키는 힘과 기준을 고치는 용기는 서로 반대가 아닙니다.",
  },
  {
    question: "누군가에게 선물하고 싶은 마음이 갑자기 들었습니다.",
    options: ["마음이 생겼을 때 표현한다", "상대에게 필요한지 한 번 더 생각한다"],
    reflection: "선물의 크기보다 내가 전하고 싶은 마음을 가장 잘 전달하는 방식을 찾아보세요.",
  },
  {
    question: "오늘의 선택이 1년 뒤에는 기억나지 않을 것 같습니다.",
    options: ["그래도 오늘의 편안함을 고른다", "작더라도 쌓이는 쪽을 고른다"],
    reflection: "작은 현재와 작은 미래 중 오늘은 어느 쪽이 더 필요한지 확인해 보세요.",
  },
  {
    question: "공동비용을 누군가 더 많이 부담했습니다.",
    options: ["다음번에 자연스럽게 맞춘다", "지금 정확하게 정산한다"],
    reflection: "공정함을 느끼는 방식은 사람마다 다릅니다. 상대가 편한 방식도 확인해 보세요.",
  },
  {
    question: "무료 체험이 끝나면 자동결제되는 서비스를 시작하려 합니다.",
    options: ["필요하니 일단 사용한다", "해지 알림부터 설정하고 시작한다"],
    reflection: "미래의 기억력에 기대지 않고 지금 장치를 만드는 것도 선택의 일부입니다.",
  },
  {
    question: "하루 동안 돈 생각을 전혀 하지 않고 싶습니다.",
    options: ["오늘은 의식적으로 쉬어간다", "5분만 확인하고 마음을 놓는다"],
    reflection: "관리에서 쉬는 것과 불안을 피하는 것은 다를 수 있습니다.",
  },
  {
    question: "좋은 기회라는 확신이 들지만 주변은 신중하라고 합니다.",
    options: ["내 판단을 믿고 움직인다", "반대 이유에서 놓친 조건을 찾는다"],
    reflection: "확신을 버리지 않으면서도 반대 의견을 점검 도구로 쓸 수 있습니다.",
  },
  {
    question: "오래 세운 목표가 지금의 나와 맞지 않는 것 같습니다.",
    options: ["끝까지 해본 뒤 판단한다", "지금의 기준으로 목표를 수정한다"],
    reflection: "목표를 바꾸는 것이 포기인지 조정인지는 이유와 다음 행동이 말해줍니다.",
  },
  {
    question: "오늘 누군가의 소비를 보며 부러운 마음이 들었습니다.",
    options: ["내가 원하는 것이 무엇인지 적어본다", "비교가 지나가도록 다른 일에 집중한다"],
    reflection: "부러움은 구매 명령이 아니라 내가 원하는 삶을 알려주는 단서일 수 있습니다.",
  },
  {
    question: "작은 돈을 아꼈지만 시간이 더 많이 들었습니다.",
    options: ["절약한 금액이 만족스럽다", "다음에는 시간을 사는 쪽을 택한다"],
    reflection: "돈과 시간 중 지금 더 부족한 자원이 무엇인지에 따라 답은 달라집니다.",
  },
  {
    question: "이번 달에 예상보다 많은 사람을 만나게 됐습니다.",
    options: ["관계에 필요한 비용으로 받아들인다", "만남별 예산을 정해 조절한다"],
    reflection: "사람을 아끼는 마음과 내 생활을 지키는 기준은 함께 존재할 수 있습니다.",
  },
  {
    question: "잘 사용하던 물건을 더 이상 쓰지 않게 됐습니다.",
    options: ["필요한 사람에게 바로 나눈다", "판매하거나 다른 쓰임을 찾아본다"],
    reflection: "처분 방식에도 관계, 시간, 금액 중 무엇을 중요하게 보는지가 드러납니다.",
  },
  {
    question: "한동안 재정 목표가 잘 지켜지지 않았습니다.",
    options: ["목표를 더 작게 다시 시작한다", "왜 필요한 목표였는지부터 되짚는다"],
    reflection: "실행 크기를 줄이는 것과 의미를 다시 찾는 것 중 오늘 필요한 시작을 고르세요.",
  },
  {
    question: "사소한 비용을 두고 가까운 사람과 의견이 다릅니다.",
    options: ["금액이 작으니 한쪽이 양보한다", "작아도 서로의 기준을 확인한다"],
    reflection: "작은 돈 문제는 다음 큰 결정을 연습하는 안전한 대화가 될 수 있습니다.",
  },
  {
    question: "미래를 위해 준비한 돈을 지금 사용할 이유가 생겼습니다.",
    options: ["지금의 필요가 충분하면 사용한다", "다른 방법을 먼저 모두 찾아본다"],
    reflection: "미래 자금은 금지된 돈이 아니라 목적이 있는 돈입니다. 현재 필요와 원래 목적을 함께 비교하세요.",
  },
  {
    question: "오늘 한 가지 돈 습관만 바꿀 수 있습니다.",
    options: ["불필요한 것 하나를 멈춘다", "원하는 것 하나를 위해 따로 모은다"],
    reflection: "줄이는 변화와 만드는 변화 중 더 오래 이어질 쪽을 선택해 보세요.",
  },
  {
    question: "결제를 앞두고 생각보다 오래 고민하고 있습니다.",
    options: ["필요 기준을 통과했다면 결정한다", "고민이 계속되면 오늘은 사지 않는다"],
    reflection: "망설임이 정보 부족인지 마음의 거절인지 구분하면 선택이 선명해집니다.",
  },
];

export function kstDateKey(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function dailyPrompt(date = new Date()) {
  const key = kstDateKey(date);
  const dayNumber = Math.floor(
    (Date.UTC(Number(key.slice(0, 4)), Number(key.slice(5, 7)) - 1, Number(key.slice(8, 10))) -
      Date.UTC(2026, 0, 1)) /
      86_400_000
  );
  return DAILY_PROMPTS[((dayNumber % DAILY_PROMPTS.length) + DAILY_PROMPTS.length) % DAILY_PROMPTS.length];
}
