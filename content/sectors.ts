/** Sectors — PDF chapters "Buildings Sector" and "Infrastructure". */
import type { L } from './types';

export interface ExpertiseGroup {
  title?: L;
  items: L[];
}

export interface SubSector {
  id: string;
  title: L;
  lead: L;
  groups: ExpertiseGroup[];
}

export interface Sector {
  id: 'buildings' | 'infrastructure';
  title: L;
  lead: L;
  sub: SubSector[];
}

export const sectors: Sector[] = [
  {
    id: 'buildings',
    title: { en: 'Buildings', ar: 'قطاع المباني' },
    lead: {
      en: 'Distinguished public and private buildings, each studied, analysed and engineered as a singular project — enduring, efficient and comfortable for people and their surroundings.',
      ar: 'مبانٍ عامة وخاصة متميّزة، يُدرس كل منها ويُحلَّل ويُصمَّم هندسياً كمشروع فريد، لتكون منشآت متينة وفعّالة ومريحة لشاغليها وللبيئة المحيطة بها.',
    },
    sub: [
      {
        id: 'architecture',
        title: { en: 'Architecture', ar: 'الإدارة المعمارية' },
        lead: {
          en: 'Architecture as art and science: graphics, aesthetics, functionality and spatial harmony working together.',
          ar: 'العمارة فنّ وعلم يجمع بين التعبير البصري والجمال والوظيفة والتناغم المكاني.',
        },
        groups: [
          {
            items: [
              { en: 'Public buildings', ar: 'المباني العامة' },
              { en: 'Private buildings and residences', ar: 'المباني والمساكن الخاصة' },
              { en: 'Each project engineered as a distinct undertaking', ar: 'تصميم كل مشروع هندسياً بوصفه مشروعاً مستقلاً' },
            ],
          },
        ],
      },
      {
        id: 'mep',
        title: { en: 'MEP Engineering', ar: 'الهندسة الكهروميكانيكية (MEP)' },
        lead: {
          en: 'Mechanical, electrical and plumbing systems for residential and commercial buildings.',
          ar: 'الأنظمة الميكانيكية والكهربائية وأنظمة السباكة للمباني السكنية والتجارية.',
        },
        groups: [
          {
            title: { en: 'Mechanical', ar: 'الميكانيكا' },
            items: [{ en: 'HVAC — distributing cooled or heated air for living and working', ar: 'التدفئة والتهوية والتكييف لتوزيع الهواء المبرّد أو الساخن في أماكن السكن والعمل' }],
          },
          {
            title: { en: 'Electrical', ar: 'الكهرباء' },
            items: [
              { en: 'AC electrical power systems', ar: 'أنظمة القدرة الكهربائية للتيار المتردد' },
              { en: 'Telecommunication network infrastructure', ar: 'البنية التحتية لشبكات الاتصالات' },
            ],
          },
          {
            title: { en: 'Plumbing', ar: 'السباكة' },
            items: [{ en: 'Water supply and sanitation systems', ar: 'أنظمة إمدادات المياه والصرف الصحي' }],
          },
        ],
      },
    ],
  },
  {
    id: 'infrastructure',
    title: { en: 'Infrastructure', ar: 'قطاع البنية التحتية' },
    lead: {
      en: 'Water, dams, ports, transportation and power — delivered with our own plant and a workforce that mobilises quickly to remote locations.',
      ar: 'المياه والسدود والموانئ والنقل والطاقة، تُنفَّذ بمعداتنا الذاتية وبقوى عاملة قادرة على الانتقال السريع إلى المواقع النائية.',
    },
    sub: [
      {
        id: 'water-services',
        title: { en: 'Water Services', ar: 'خدمات المياه' },
        lead: {
          en: 'Efficient water supply and delivery that minimises waste — expert advice, best practice, modern technology and effective supply-chain management.',
          ar: 'إمداد المياه وتوصيلها بكفاءة وبأقل قدر من الهدر، من خلال الاستشارات المتخصصة وأفضل الممارسات والتقنيات الحديثة والإدارة الفعّالة لسلاسل الإمداد.',
        },
        groups: [
          {
            title: { en: 'Water supply', ar: 'إمدادات المياه' },
            items: [
              { en: 'Water resources and hydrogeology', ar: 'الموارد المائية والهيدروجيولوجيا' },
              { en: 'Water treatment', ar: 'معالجة المياه' },
              { en: 'Water storage structures', ar: 'منشآت تخزين المياه' },
            ],
          },
          {
            title: { en: 'Sanitation', ar: 'الصرف الصحي' },
            items: [
              { en: 'Wastewater collection & treatment', ar: 'تجميع مياه الصرف ومعالجتها' },
              { en: 'Wastewater reuse for plants and sludge treatment', ar: 'إعادة استخدام مياه الصرف للنباتات ومعالجة الحمأة' },
            ],
          },
          {
            title: { en: 'Dams', ar: 'السدود' },
            items: [
              { en: 'Storm-water flood control', ar: 'التحكم في السيول ومياه الأمطار' },
              { en: 'Water storage', ar: 'تخزين المياه' },
            ],
          },
          {
            title: { en: 'Irrigation', ar: 'الري' },
            items: [
              { en: 'Water supply for irrigation', ar: 'إمداد المياه لأغراض الري' },
              { en: 'System design', ar: 'تصميم الأنظمة' },
              { en: 'Landscape irrigation systems', ar: 'أنظمة ري المسطحات الخضراء' },
            ],
          },
        ],
      },
      {
        id: 'dams-irrigation',
        title: { en: 'Dams & Irrigation', ar: 'السدود والري' },
        lead: {
          en: 'In arid and semi-arid regions, dams retain water and ease seasonal shortages; well-designed irrigation supports sustainable agriculture and a reliable water supply.',
          ar: 'تحجز السدود المياه في المناطق الجافة وشبه الجافة وتخفّف النقص الموسمي، فيما تدعم أنظمة الري المصمَّمة جيداً الزراعة المستدامة وتوفّر إمداداً موثوقاً بالمياه.',
        },
        groups: [
          {
            items: [
              { en: 'Storm-water flood control', ar: 'التحكم في السيول ومياه الأمطار' },
              { en: 'Water storage', ar: 'تخزين المياه' },
              { en: 'Irrigation system design and implementation', ar: 'تصميم أنظمة الري وتنفيذها' },
              { en: 'Landscape irrigation systems', ar: 'أنظمة ري المسطحات الخضراء' },
            ],
          },
        ],
      },
      {
        id: 'ports',
        title: { en: 'Ports', ar: 'الموانئ' },
        lead: {
          en: 'Marine engineering is demanding. Many of our staff are certified professionals, and we assemble committed teams for each client’s requirements.',
          ar: 'الهندسة البحرية بيئة عمل متطلّبة ومتجددة. وكثير من كوادرنا مهنيون معتمدون، ونشكّل لكل عميل فريقاً ملتزماً يلبّي متطلباته.',
        },
        groups: [
          {
            items: [
              { en: 'Innovative, pragmatic engineering solutions', ar: 'حلول هندسية مبتكرة وعملية' },
              { en: 'Stringent quality standards', ar: 'معايير جودة صارمة' },
              { en: 'Strict timelines', ar: 'التزام دقيق بالجداول الزمنية' },
            ],
          },
        ],
      },
      {
        id: 'transportation',
        title: { en: 'Transportation', ar: 'خدمات النقل' },
        lead: {
          en: 'Large, complex transport projects delivered with our clients. Our own plant and a rapidly deployable workforce let us work in some of the most challenging environments — and we build long-term partnerships.',
          ar: 'ننفّذ مشاريع النقل الكبيرة والمعقدة بالتعاون الوثيق مع عملائنا. وتمكّننا معداتنا الذاتية وقوانا العاملة سريعة الانتشار من العمل في أصعب البيئات، مع الحرص على بناء شراكات طويلة الأمد.',
        },
        groups: [
          {
            items: [
              {
                en: 'Land transportation — roads, highways, urban & rural roads, tracks, public car parks, bridges',
                ar: 'النقل البري: الطرق والطرق السريعة والطرق الحضرية والريفية والمسارات ومواقف السيارات العامة والجسور',
              },
              { en: 'Marine transportation', ar: 'النقل البحري' },
              { en: 'Air transportation', ar: 'النقل الجوي' },
            ],
          },
        ],
      },
      {
        id: 'power-services',
        title: { en: 'Power Services', ar: 'خدمات الطاقة' },
        lead: {
          en: 'Power and energy projects from renewable ventures to gas and fuel power plants.',
          ar: 'مشاريع الطاقة بدءاً من مشاريع الطاقة المتجددة وصولاً إلى محطات التوليد العاملة بالغاز والوقود.',
        },
        groups: [
          {
            title: { en: 'Power generation', ar: 'توليد الطاقة' },
            items: [
              { en: 'Steam plants', ar: 'المحطات البخارية' },
              { en: 'Diesel engine plants', ar: 'محطات محركات الديزل' },
              { en: 'Renewables', ar: 'الطاقة المتجددة' },
              { en: 'Gas turbines + dual cycle', ar: 'التوربينات الغازية والدورة المزدوجة' },
            ],
          },
          {
            title: { en: 'Power delivery', ar: 'نقل الطاقة وتوزيعها' },
            items: [
              { en: 'Overhead transmission network', ar: 'شبكات النقل الهوائية' },
              { en: 'Underground transmission network', ar: 'شبكات النقل الأرضية' },
              { en: 'Underground + overhead distribution network', ar: 'شبكات التوزيع الأرضية والهوائية' },
              { en: 'Substations and ring main units', ar: 'محطات التحويل ووحدات الحلقة الرئيسية' },
              { en: 'Electrical systems studies', ar: 'دراسات الأنظمة الكهربائية' },
              { en: 'Testing and commissioning', ar: 'الاختبار والتشغيل التجريبي' },
              { en: 'GIS asset management solutions', ar: 'حلول إدارة الأصول بنظم المعلومات الجغرافية' },
              { en: 'Utility automation', ar: 'أتمتة المرافق' },
            ],
          },
        ],
      },
    ],
  },
];

/** "Sector of Activities" list (Buildings Sector chapter). */
export const activitySectors: L[] = [
  { en: 'Buildings', ar: 'المباني' },
  { en: 'Networks and infrastructure', ar: 'الشبكات والبنية التحتية' },
  { en: 'Civil works', ar: 'الأعمال المدنية' },
  { en: 'Transportation, roads & bridges', ar: 'النقل والطرق والجسور' },
  { en: 'Water & sewage treatment plants and networks', ar: 'محطات وشبكات معالجة المياه والصرف الصحي' },
  { en: 'Dams and irrigation', ar: 'السدود والري' },
  { en: 'Pipelines', ar: 'خطوط الأنابيب' },
];
