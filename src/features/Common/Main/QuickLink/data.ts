export interface OtherCardType {
  href: string;
  homepage: string;
  src: string;
}

const data: OtherCardType[] = [
  {
    href: 'https://school.busanedu.net/bssm-h/',
    homepage: '부산 소마고',
    src: '/GoTo/bssm.svg',
  },
  {
    href: 'https://bssm.app/',
    homepage: 'BSM',
    src: '/GoTo/bsm.svg',
  },
  {
    href: 'https://occount.bsm-aripay.kr/',
    homepage: 'Occount',
    src: '/GoTo/Occount.svg',
  },
  {
    href: 'https://read365.edunet.net/',
    homepage: '독서로',
    src: '/GoTo/read365.svg',
  },
  {
    href: 'https://bssm-h.dkyobobook.co.kr/main.ink',
    homepage: '전자도서관',
    src: '/GoTo/kyobo.svg',
  },
];

export default data;