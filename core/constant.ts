
import {
  HomeOutlined, GlobalOutlined, CalendarOutlined, InfoCircleOutlined, MessageOutlined, GiftOutlined
} from "@ant-design/icons-vue";

 export const menuItem = [
  { label: 'nav.home', to: '/' },
  { label: 'nav.seemore', to: '/propos' },
] 

export const randomImage = {
  URL: "https://picsum.photos/1920/900?random=1"
}

// ~/core/constant.ts
export const cards = [
  {
    image: '/assets/img/frantzou-jb.png',
    alt: 'Frantzou JB'
  },
  {
    image: '',
    alt: ''
  },
  {
    image: '/assets/img/presentation.jpg',
    alt: 'Culte PNG'
  }
]

export const goals = [
  {
    textStrong: "Adorer Dieu en esprit et en vérité, ",
    endofText: "en cultivant une atmosphère de louange authentique et de prière fervente."
  },
  {
    textStrong: "Équiper les croyants ",
    endofText: "à travers l’enseignement biblique solide, le discipulat, et la formation de leaders intègres et engagés."
  },
  {
    textStrong: "Servir avec compassion, ",
    endofText: "en répondant aux besoins physiques, émotionnels et spirituels des personnes, sans distinction."
  },
  {
    textStrong: "Promouvoir une vie de sainteté, de justice et d’amour, ",
    endofText: "fondée sur la Parole de Dieu."
  },
  {
    textStrong: "Favoriser l’unité du Corps de Christ ",
    endofText: "fondée sur la Parole de Dieu."
  },
  {
    textStrong: "Spirituel : ",
    endofText: "Nourrir la foi et former des disciples solides, enracinés dans la Parole."
  },
  {
    textStrong: "Social : ",
    endofText: "Tendre la main à ceux qui souffrent et bâtir des ponts d’amour et de solidarité."
  },

  {
    textStrong: "Culturel : ",
    endofText: "Réconcilier la foi et les expressions culturelles pour glorifier Dieu dans la diversité."
  },
  {
    textStrong: "Économique : ",
    endofText: "Encourager l’autonomie et la dignité par des initiatives concrètes d’entrepreneuriat et de soutien communautaire."
  }

]


export const coords = [
  {
    textStrong: "Le dimanche soir de",
    endofText: "6:00 à 8:00 pm."
  },
  {
    textStrong: "À partir du ",
    endofText: "30 mai 2025."
  },
  {
    textStrong: "Prenez rendez-vous avec le Pasteur ",
    endofText: "Frantzou Jean-Baptiste."
  }
]

export const cardsDiscuss = [
  {
    image: '/assets/img/church-discuss-1.jpg',
    alt: 'Frantzou JB'
  },
  {
    image: '/assets/img/church-discuss-2.jpg',
    alt: 'Culte PNG'
  }
]

export const menuItems = [
  {
    name: 'nav.home',
    to: "/",
    icon: HomeOutlined,
    dropdown: null,
  },
  {
    name: "nav.follow",
    to: "#",
    icon: GlobalOutlined,
    dropdown: null,
  },
  {
    name: "nav.ask",
    to: "#",
    icon: MessageOutlined,
    dropdown: null,
  },
  {
    name: "nav.give",
    to: "#",
    icon: GiftOutlined,
    dropdown: null,
  },
  {
    name: "nav.seemore",
    to: "#",
    icon: InfoCircleOutlined,
    dropdown: null,
  },
];

export const actionButtons = [
  {
    label: 'Prendre un rendez-vous',
    icon: CalendarOutlined,
    type: 'primary',
    showOnMobile: true,
    redirectButton: "#test",
    isTablette: false

  }
]