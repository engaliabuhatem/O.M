/**
 * Services — PDF chapters "Expertise & Services" through "BIM".
 * Long paragraphs are condensed into a short lead + bullets; facts unchanged.
 */
import type { L } from './types';

/** The five "Field of Work" pillars from the Expertise & Services table. */
export interface Pillar {
  id: string;
  no: string;
  icon: 'Route' | 'Waves' | 'Building2' | 'Network' | 'Zap';
  title: L;
  text: L;
  /** Section on /services this pillar links to. */
  href: string;
  image: string;
}

export const pillars: Pillar[] = [
  {
    id: 'roads',
    no: '01',
    icon: 'Route',
    title: { en: 'Roads & Highways', ar: 'الطرق والطرق السريعة' },
    text: {
      en: 'Design, construction and maintenance of roads, highways and mountain routes.',
      ar: 'تصميم وإنشاء وصيانة الطرق والطرق السريعة والطرق الجبلية.',
    },
    href: '/services#transportation',
    image: 'grader-road-works',
  },
  {
    id: 'dams',
    no: '02',
    icon: 'Waves',
    title: { en: 'Dams & Water Structures', ar: 'السدود والمنشآت المائية' },
    text: {
      en: 'Concrete, earth and stone dams; canals, weirs, irrigation networks, water tanks and well drilling.',
      ar: 'السدود الخرسانية والترابية والحجرية، والقنوات والحواجز المائية وشبكات الري وخزانات المياه وحفر الآبار.',
    },
    href: '/services#dams-irrigation',
    image: 'hassan-dam-main-dyke',
  },
  {
    id: 'buildings',
    no: '03',
    icon: 'Building2',
    title: { en: 'Buildings & Structures', ar: 'المباني والمنشآت' },
    text: {
      en: 'Custom homes, villas, apartment complexes, office buildings, warehouses and large steel structures.',
      ar: 'المنازل والفلل والمجمعات السكنية والمباني الإدارية والمستودعات والمنشآت المعدنية الكبيرة.',
    },
    href: '/services#buildings',
    image: 'fcom-hq-aden',
  },
  {
    id: 'networks',
    no: '04',
    icon: 'Network',
    title: { en: 'Infrastructure Networks', ar: 'شبكات البنية التحتية' },
    text: {
      en: 'Sewerage networks, water supply networks and internal roads.',
      ar: 'شبكات الصرف الصحي وشبكات إمدادات المياه والطرق الداخلية.',
    },
    href: '/services#water-services',
    image: 'artil-city-internal-streets',
  },
  {
    id: 'power-mep',
    no: '05',
    icon: 'Zap',
    title: { en: 'Power, Solar & MEP', ar: 'الطاقة والطاقة الشمسية والأعمال الكهروميكانيكية' },
    text: {
      en: 'Solar system projects, electrical, mechanical and security works.',
      ar: 'مشاريع أنظمة الطاقة الشمسية، والأعمال الكهربائية والميكانيكية وأعمال الأنظمة الأمنية.',
    },
    href: '/services#power-services',
    image: 'fcom-hq-aden-interior',
  },
];

export interface Service {
  slug: string;
  icon: 'PackageCheck' | 'DraftingCompass' | 'HardHat' | 'ClipboardList' | 'Building' | 'Wrench' | 'Boxes';
  title: L;
  summary: L;
  bullets: L[];
  bulletsTitle?: L;
  image: string;
  imageAlt: L;
}

export const services: Service[] = [
  {
    slug: 'procurement-expediting',
    icon: 'PackageCheck',
    title: { en: 'Procurement & Expediting', ar: 'المشتريات والمتابعة' },
    summary: {
      en: 'Our Procurement and Expediting Department supports every FCOM project, so materials, equipment and services arrive on time and to the required quality. Structured processes optimise resources and keep schedules on track.',
      ar: 'تدعم إدارة المشتريات والمتابعة جميع مشاريع الشركة، لضمان توريد المواد والمعدات والخدمات في مواعيدها وبالجودة المطلوبة، عبر إجراءات منظّمة ترشّد الموارد وتحافظ على الجداول الزمنية.',
    },
    bullets: [
      { en: 'Purchasing and sourcing with market expertise', ar: 'الشراء والتوريد بخبرة واسعة في الأسواق' },
      { en: 'Desk and shop expediting', ar: 'المتابعة المكتبية والمتابعة في مواقع التصنيع' },
      { en: 'Quality checks, inspections and testing', ar: 'فحوصات الجودة والتفتيش والاختبارات' },
      { en: 'Logistics and traffic coordination', ar: 'الخدمات اللوجستية وتنسيق النقل' },
    ],
    image: 'transport-trucks-fleet',
    imageAlt: { en: 'FCOM transport trucks lined up on site', ar: 'شاحنات النقل التابعة للشركة مصطفّة في الموقع' },
  },
  {
    slug: 'detailed-engineering',
    icon: 'DraftingCompass',
    title: { en: 'Detailed Engineering', ar: 'التصميم الهندسي التفصيلي' },
    summary: {
      en: 'Full engineering and design services by an experienced in-house team, using advanced CAD/CAE software to integrate disciplines. Additional engineering and drafting resources can be mobilised quickly when workload increases.',
      ar: 'خدمات هندسية وتصميمية متكاملة يقدّمها فريق داخلي متمرّس باستخدام برامج CAD/CAE المتقدمة لتكامل التخصصات، مع إمكانية حشد موارد هندسية وفنية إضافية بسرعة عند زيادة حجم العمل.',
    },
    bullets: [
      { en: 'Buildings — architectural, structural and MEP systems', ar: 'المباني: التصميم المعماري والإنشائي والأنظمة الكهروميكانيكية' },
      { en: 'Civil and structural works — roads, bridges, infrastructure', ar: 'الأعمال المدنية والإنشائية: الطرق والجسور والبنية التحتية' },
      {
        en: 'Water and wastewater — reservoirs, storage tanks, water networks, sewage treatment',
        ar: 'المياه والصرف الصحي: الخزانات وشبكات المياه ومعالجة مياه الصرف',
      },
      {
        en: 'Dams and irrigation — design and analysis for water retention and distribution',
        ar: 'السدود والري: التصميم والتحليل لحجز المياه وتوزيعها',
      },
      {
        en: 'Power generation and distribution — electrical design for networks and substations',
        ar: 'توليد الطاقة وتوزيعها: التصميم الكهربائي للشبكات ومحطات التحويل',
      },
      { en: 'Transportation — roads, highways and related structures', ar: 'هندسة النقل: الطرق والطرق السريعة والمنشآت المرتبطة بها' },
    ],
    image: 'concrete-batching-site',
    imageAlt: { en: 'Concrete batching plant with cement silos', ar: 'محطة خلط الخرسانة مع صوامع الإسمنت' },
  },
  {
    slug: 'construction',
    icon: 'HardHat',
    title: { en: 'Construction', ar: 'التنفيذ والإنشاء' },
    summary: {
      en: 'Comprehensive construction capability delivered by experienced specialist teams. We know local regulations, mobilise equipment and crews efficiently, and manage diverse workforces across project types and cultural contexts.',
      ar: 'قدرات إنشائية شاملة تنفّذها فرق متخصصة ذات خبرة. نُلمّ بالأنظمة والمتطلبات المحلية، ونحشد المعدات والأطقم بكفاءة، ونُدير قوى عاملة متنوعة عبر مختلف أنواع المشاريع والبيئات.',
    },
    bulletsTitle: { en: 'Fields covered', ar: 'المجالات المشمولة' },
    bullets: [
      { en: 'Building works', ar: 'أعمال المباني' },
      { en: 'Civil engineering', ar: 'الهندسة المدنية' },
      { en: 'Mechanical & electrical works', ar: 'الأعمال الميكانيكية والكهربائية' },
      { en: 'Roads and infrastructure', ar: 'الطرق والبنية التحتية' },
    ],
    image: 'building-site-crane',
    imageAlt: { en: 'Building construction site with tower crane', ar: 'موقع إنشاء مبنى مع رافعة برجية' },
  },
  {
    slug: 'construction-management',
    icon: 'ClipboardList',
    title: { en: 'Construction Management', ar: 'إدارة التشييد' },
    summary: {
      en: 'Advanced management controls to plan, monitor and execute large, complex projects safely, to specification and on time. Local labour is employed and trained wherever possible, adding value and supporting the local economy.',
      ar: 'أدوات إدارة ورقابة متقدمة لتخطيط المشاريع الكبيرة والمعقدة ومتابعتها وتنفيذها بأمان ووفق المواصفات وفي الموعد المحدد، مع توظيف العمالة المحلية وتدريبها كلما أمكن دعماً للاقتصاد المحلي.',
    },
    bulletsTitle: { en: 'Fields covered', ar: 'المجالات المشمولة' },
    bullets: [
      { en: 'Building works', ar: 'أعمال المباني' },
      { en: 'Civil engineering — roads & bridges', ar: 'الهندسة المدنية: الطرق والجسور' },
      { en: 'Mechanical & electrical works', ar: 'الأعمال الميكانيكية والكهربائية' },
      { en: 'Water & irrigation systems', ar: 'أنظمة المياه والري' },
    ],
    image: 'tower-crane',
    imageAlt: { en: 'Tower crane on an FCOM building site', ar: 'رافعة برجية في أحد مواقع المباني' },
  },
  {
    slug: 'facilities-management',
    icon: 'Building',
    title: { en: 'Facilities Management', ar: 'إدارة المرافق' },
    summary: {
      en: 'A one-stop shop for facility and property management across private, public and government sectors — management, maintenance, procurement, design, health & safety and environment. Every service is tailored client by client.',
      ar: 'خدمة متكاملة لإدارة المرافق والعقارات للقطاعات الخاصة والعامة والحكومية، تشمل الإدارة والصيانة والمشتريات والتصميم والصحة والسلامة والبيئة، مع تصميم كل خدمة وفق احتياجات كل عميل على حدة.',
    },
    bullets: [
      {
        en: 'Complete facilities management solutions or consultancy, across the full portfolio life cycle',
        ar: 'حلول متكاملة لإدارة المرافق أو خدمات استشارية تغطي دورة حياة المحفظة العقارية كاملة',
      },
      {
        en: 'On-site facilities service teams, procured or directly employed',
        ar: 'فرق خدمات المرافق في الموقع، سواء عبر التعاقد أو التوظيف المباشر',
      },
      { en: 'Off-site resources such as help desks and call centres', ar: 'موارد خارج الموقع مثل مكاتب الدعم ومراكز الاتصال' },
    ],
    image: 'fcom-hq-aden-3',
    imageAlt: { en: 'FCOM headquarters building, Khormaksar, Aden', ar: 'مبنى المقر الرئيسي للشركة، خور مكسر، عدن' },
  },
  {
    slug: 'operation-maintenance',
    icon: 'Wrench',
    title: { en: 'Operation & Maintenance', ar: 'التشغيل والصيانة' },
    summary: {
      en: 'Comprehensive O&M services that keep clients’ facilities, equipment and infrastructure performing — reliable, cost-effective support that extends asset life and minimises downtime.',
      ar: 'خدمات تشغيل وصيانة شاملة تحافظ على أداء مرافق العملاء ومعداتهم وبنيتهم التحتية، بدعم موثوق وفعّال من حيث التكلفة يطيل عمر الأصول ويقلّل فترات التوقف.',
    },
    bullets: [
      { en: 'Routine inspections', ar: 'الفحوصات الدورية' },
      { en: 'Preventive maintenance', ar: 'الصيانة الوقائية' },
      { en: 'Troubleshooting and emergency repairs', ar: 'تشخيص الأعطال والإصلاحات الطارئة' },
      {
        en: 'Management and upkeep of facilities, equipment and infrastructure',
        ar: 'إدارة المرافق والمعدات والبنية التحتية والمحافظة عليها',
      },
    ],
    image: 'graders-lineup',
    imageAlt: { en: 'Maintained graders lined up at the plant yard', ar: 'آليات التسوية (الجريدرات) مصطفّة في ساحة المعدات' },
  },
  {
    slug: 'bim',
    icon: 'Boxes',
    title: { en: 'Building Information Modeling (BIM)', ar: 'نمذجة معلومات البناء (BIM)' },
    summary: {
      en: 'A data-rich, intelligent digital representation of each facility that supports decisions across the project life cycle. Our BIM centres combine engineers and IT professionals experienced in buildings, roads, ports, airports and infrastructure.',
      ar: 'تمثيل رقمي ذكي وغني بالبيانات لكل منشأة يدعم اتخاذ القرار طوال دورة حياة المشروع. وتضم مراكز BIM لدينا مهندسين ومتخصصين في تقنية المعلومات ذوي خبرة في المباني والطرق والموانئ والمطارات والبنية التحتية.',
    },
    bulletsTitle: { en: 'Complete BIM solutions', ar: 'حلول BIM متكاملة' },
    bullets: [
      { en: 'Requirement analysis and budgeting', ar: 'تحليل المتطلبات وإعداد الموازنات' },
      { en: 'Technology selection', ar: 'اختيار التقنيات' },
      { en: 'Implementation and follow-up', ar: 'التطبيق والمتابعة' },
      { en: 'Training', ar: 'التدريب' },
    ],
    image: 'concrete-pour',
    imageAlt: { en: 'Concrete slab pour with a pump boom', ar: 'صبّ بلاطة خرسانية باستخدام مضخة الخرسانة' },
  },
];
