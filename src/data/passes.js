export const passes = [
  {
    id: 'seoul-hangang',
    name: '서울 한강 로컬패스',
    region: '서울',
    duration: '1일',
    price: 12900,
    description: '한강 주변 로컬 카페·맛집·문화 공간을 자유롭게 누비는 1일 패스',
    highlights: ['한강 카페 3곳 할인', '로컬 맛집 쿠폰', '자전거 대여 20%'],
    image: '🌉',
  },
  {
    id: 'busan-haeundae',
    name: '부산 해운대 로컬패스',
    region: '부산',
    duration: '2일',
    price: 24900,
    description: '해운대·광안리 일대 숨은 로컬 스팟을 2일간 탐험하는 패스',
    highlights: ['해변 카페 할인', '시장 투어 가이드', '야경 포토존 안내'],
    image: '🏖️',
  },
  {
    id: 'jeju-east',
    name: '제주 동쪽 로컬패스',
    region: '제주',
    duration: '3일',
    price: 39900,
    description: '성산·우도·섭지코지 동쪽 코스의 로컬 체험을 담은 3일 패스',
    highlights: ['로컬 농장 체험', '동쪽 맛집 패키지', '렌터카 할인 연동'],
    image: '🌋',
  },
  {
    id: 'jeonju-hanok',
    name: '전주 한옥마을 로컬패스',
    region: '전주',
    duration: '1일',
    price: 9900,
    description: '한옥마을 골목과 전통 시장을 걸으며 즐기는 하루 패스',
    highlights: ['비빔밥 맛집 쿠폰', '한복 대여 할인', '공예 체험 1회'],
    image: '🏯',
  },
]

export function getPassById(id) {
  return passes.find((p) => p.id === id)
}
