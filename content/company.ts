/**
 * Company facts. Single source of truth: _source/profile.pdf (Company Profile 2026).
 */
import type { L } from './types';

export type OfficeId = 'uae' | 'canada' | 'ksa' | 'yemen';

export interface Office {
  id: OfficeId;
  country: 'AE' | 'CA' | 'SA' | 'YE';
  name: L;
  city: L;
  hq?: boolean;
  address?: { en: string[]; ar: string[] };
  phones: { kind: 'tel' | 'mob'; display: string; tel: string }[];
  /** Map pin. Only the Aden HQ has one (district-level: Khormaksar, Airport Zone). */
  latLng?: [number, number];
}

export const offices: Office[] = [
  {
    id: 'uae',
    country: 'AE',
    name: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' },
    city: { en: 'Dubai', ar: 'دبي' },
    address: {
      en: ['Office 1907, Gold Crest Executive Tower', 'Cluster C, Dubai, UAE'],
      ar: ['مكتب 1907، برج جولد كرست التنفيذي', 'المجمّع C، دبي، الإمارات'],
    },
    phones: [
      { kind: 'mob', display: '+971 50 909 8322', tel: '+971509098322' },
      { kind: 'mob', display: '+971 56 666 6347', tel: '+971566666347' },
    ],
  },
  {
    id: 'canada',
    country: 'CA',
    name: { en: 'Canada', ar: 'كندا' },
    city: { en: 'Oakville, Ontario', ar: 'أوكفيل، أونتاريو' },
    address: {
      en: ['Oakville, Ontario L6H 5R7', 'Canada'],
      ar: ['أوكفيل، أونتاريو L6H 5R7', 'كندا'],
    },
    phones: [{ kind: 'mob', display: '+1 902 293 3322', tel: '+19022933322' }],
  },
  {
    id: 'ksa',
    country: 'SA',
    name: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
    city: { en: 'Kingdom of Saudi Arabia', ar: 'المملكة العربية السعودية' },
    phones: [{ kind: 'mob', display: '+966 55 000 0618', tel: '+966550000618' }],
  },
  {
    id: 'yemen',
    country: 'YE',
    hq: true,
    name: { en: 'Yemen — Headquarters', ar: 'اليمن — المقر الرئيسي' },
    city: { en: 'Aden', ar: 'عدن' },
    address: {
      en: ['Airport Zone, Khormaksar', 'Aden, Yemen'],
      ar: ['منطقة المطار، خور مكسر', 'عدن، اليمن'],
    },
    phones: [
      { kind: 'tel', display: '+967 2 278267', tel: '+9672278267' },
      { kind: 'tel', display: '+967 2 278268', tel: '+9672278268' },
      { kind: 'mob', display: '+967 777 799 920', tel: '+967777799920' },
    ],
    latLng: [12.8285, 45.0305],
  },
];

export const company = {
  legalName: 'First Canadian O.M-LTD',
  shortName: 'FCOM',
  founded: 1988,
  email: 'global@fc-om.com',
  /** Order of the cover strip "UAE · Canada · KSA · Yemen". */
  countryStrip: ['uae', 'canada', 'ksa', 'yemen'] as OfficeId[],
  countryShort: {
    uae: { en: 'UAE', ar: 'الإمارات' },
    canada: { en: 'Canada', ar: 'كندا' },
    ksa: { en: 'KSA', ar: 'السعودية' },
    yemen: { en: 'Yemen', ar: 'اليمن' },
  } satisfies Record<OfficeId, L>,

  about: {
    lead: {
      en: 'A contracting firm established in 1988, specialising in civil, building and infrastructure projects across Yemen and the Middle East — from design to execution.',
      ar: 'شركة مقاولات تأسست عام 1988، متخصصة في مشاريع الأعمال المدنية والمباني والبنية التحتية في اليمن والشرق الأوسط، من التصميم حتى التنفيذ.',
    },
    body: {
      en: 'Every project is delivered by our own engineering and project teams — efficiently, on time, and to project specifications and international codes, with an emphasis on quality, sustainability and client satisfaction.',
      ar: 'تنفّذ فرقنا الهندسية وفرق إدارة المشاريع كل مشروع بكفاءة وفي الموعد المحدد، وفق مواصفات المشروع والمعايير والأكواد الدولية، مع التركيز على الجودة والاستدامة ورضا العميل.',
    },
    core: [
      { en: 'Civil and structural works', ar: 'الأعمال المدنية والإنشائية' },
      { en: 'Buildings — residential, commercial, institutional', ar: 'المباني السكنية والتجارية والمؤسسية' },
      { en: 'MEP systems — mechanical, electrical, plumbing', ar: 'أنظمة الأعمال الكهروميكانيكية: الميكانيكا والكهرباء والسباكة' },
      {
        en: 'Infrastructure — roads, bridges, utilities, water networks, dams, irrigation',
        ar: 'البنية التحتية: الطرق والجسور والمرافق وشبكات المياه والسدود والري',
      },
    ] satisfies L[],
  },

  mission: {
    en: 'To build sustainable and innovative infrastructure that meets today’s needs without compromising the ability of future generations to meet their own — delivering projects that are environmentally friendly, socially responsible and economically viable.',
    ar: 'بناء بنية تحتية مستدامة ومبتكرة تلبّي احتياجات الحاضر دون المساس بقدرة الأجيال القادمة على تلبية احتياجاتها، وتنفيذ مشاريع صديقة للبيئة ومسؤولة اجتماعياً ومجدية اقتصادياً.',
  } satisfies L,

  vision: {
    en: 'To become a leading contracting and construction company recognised for excellence, innovation and client-focused service, making a lasting impact on communities and infrastructure development.',
    ar: 'أن نكون شركة رائدة في المقاولات والإنشاءات، معروفة بالتميّز والابتكار وخدمة تتمحور حول العميل، وأن نترك أثراً دائماً في المجتمعات وفي تطوير البنية التحتية.',
  } satisfies L,

  values: [
    {
      id: 'integrity',
      icon: 'Scale',
      title: { en: 'Integrity', ar: 'النزاهة' },
      text: { en: 'Conducting business with honesty and transparency.', ar: 'ممارسة الأعمال بأمانة وشفافية.' },
    },
    {
      id: 'quality',
      icon: 'BadgeCheck',
      title: { en: 'Quality', ar: 'الجودة' },
      text: { en: 'Ensuring excellence in every aspect of our work.', ar: 'ضمان التميّز في كل جانب من جوانب عملنا.' },
    },
    {
      id: 'safety',
      icon: 'HardHat',
      title: { en: 'Safety', ar: 'السلامة' },
      text: {
        en: 'Prioritising the health and safety of our employees, clients and the public.',
        ar: 'إعطاء الأولوية لصحة وسلامة موظفينا وعملائنا والجمهور.',
      },
    },
    {
      id: 'innovation',
      icon: 'Lightbulb',
      title: { en: 'Innovation', ar: 'الابتكار' },
      text: {
        en: 'Embracing new technologies and methods to improve efficiency and outcomes.',
        ar: 'تبنّي التقنيات والأساليب الحديثة لرفع الكفاءة وتحسين النتائج.',
      },
    },
    {
      id: 'sustainability',
      icon: 'Leaf',
      title: { en: 'Sustainability', ar: 'الاستدامة' },
      text: {
        en: 'Committing to environmental stewardship in all our projects.',
        ar: 'الالتزام بحماية البيئة ورعايتها في جميع مشاريعنا.',
      },
    },
  ] as const,

  /** "Clients partnering with FCOM can benefit from" — Buildings Sector pages. */
  advantages: [
    {
      title: { en: 'Extensive experience', ar: 'خبرة واسعة' },
      text: {
        en: 'Deep expertise to understand and address each client’s requirements.',
        ar: 'خبرة ومعرفة عميقتان لفهم متطلبات كل عميل وتلبيتها.',
      },
    },
    {
      title: { en: 'Reliability', ar: 'الموثوقية' },
      text: {
        en: 'A track record of delivering projects on time and to the highest quality.',
        ar: 'سجلّ حافل في تسليم المشاريع في مواعيدها وبأعلى مستويات الجودة.',
      },
    },
    {
      title: { en: 'Abundant resources', ar: 'موارد وفيرة' },
      text: {
        en: 'Plant and equipment, a skilled workforce, highly trained staff and robust headquarters support.',
        ar: 'معدات وآليات، وقوى عاملة ماهرة، وكوادر عالية التدريب، ودعم قوي من المقر الرئيسي.',
      },
    },
    {
      title: { en: 'Remote-location capability', ar: 'العمل في المواقع النائية' },
      text: {
        en: 'Experience working in challenging and remote locations.',
        ar: 'قدرة وخبرة في العمل في المواقع الصعبة والنائية.',
      },
    },
    {
      title: { en: 'Engineering & design centres', ar: 'مراكز الدعم الهندسي والتصميم' },
      text: {
        en: 'Engineering support and design centres across several locations.',
        ar: 'مراكز للدعم الهندسي والتصميم في مواقع متعددة.',
      },
    },
    {
      title: { en: 'Contract flexibility', ar: 'مرونة التعاقد' },
      text: {
        en: 'Flexible contract terms to suit each client’s requirements.',
        ar: 'شروط تعاقدية مرنة تلائم متطلبات كل عميل.',
      },
    },
  ] satisfies { title: L; text: L }[],
} as const;
