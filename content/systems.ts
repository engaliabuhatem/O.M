/** Management systems. PDF chapter "Management Systems" (pp. 18–20) + BIM (p. 17). */
import type { L } from './types';

export interface System {
  id: string;
  icon: 'ShieldCheck' | 'HardHat' | 'Leaf' | 'Recycle' | 'Globe2' | 'Boxes';
  short: L;
  title: L;
  lead: L;
  bullets?: L[];
}

export const systems: System[] = [
  {
    id: 'qaqc',
    icon: 'ShieldCheck',
    short: { en: 'QA / QC', ar: 'ضمان الجودة وضبطها' },
    title: { en: 'Quality Assurance & Quality Control', ar: 'ضمان الجودة وضبط الجودة' },
    lead: {
      en: 'Comprehensive QA and QC to achieve and maintain the highest standards in all products and services.',
      ar: 'منظومة شاملة لضمان الجودة وضبطها لتحقيق أعلى المعايير والمحافظة عليها في جميع المنتجات والخدمات.',
    },
    bullets: [
      {
        en: 'Quality assurance: cost-effective, value-added services, regulatory compliance and continual improvement of management systems',
        ar: 'ضمان الجودة: خدمات فعّالة التكلفة ذات قيمة مضافة، والامتثال للمتطلبات التنظيمية، والتحسين المستمر لأنظمة الإدارة',
      },
      {
        en: 'Quality control: stringent inspections, testing protocols, and defect analysis with corrective actions',
        ar: 'ضبط الجودة: عمليات تفتيش صارمة وبروتوكولات اختبار وتحليل للعيوب مع إجراءات تصحيحية',
      },
      {
        en: 'In-house integrated soil (×2), concrete and asphalt laboratories',
        ar: 'مختبرات داخلية متكاملة للتربة (عدد 2) والخرسانة والأسفلت',
      },
    ],
  },
  {
    id: 'hse',
    icon: 'HardHat',
    short: { en: 'HSE — zero harm', ar: 'السلامة — صفر ضرر' },
    title: { en: 'Workplace Health & Safety', ar: 'الصحة والسلامة المهنية' },
    lead: {
      en: 'Committed to the occupational health and safety of every employee and subcontractor — no one works in an unsafe manner. Our target on every project is “zero harm”.',
      ar: 'نلتزم بالصحة والسلامة المهنية لجميع الموظفين والمقاولين من الباطن، فلا يعمل أحد بطريقة غير آمنة، وهدفنا في كل مشروع هو "صفر ضرر".',
    },
  },
  {
    id: 'environment',
    icon: 'Leaf',
    short: { en: 'Environmental management', ar: 'الإدارة البيئية' },
    title: { en: 'Environmental Management', ar: 'الإدارة البيئية' },
    lead: {
      en: 'All activities, operations and projects are carried out sustainably. Reducing environmental impact and continually improving environmental performance is part of our strategy.',
      ar: 'تُنفَّذ جميع الأنشطة والعمليات والمشاريع بأسلوب مستدام، ويُعدّ الحدّ من الأثر البيئي والتحسين المستمر للأداء البيئي جزءاً أصيلاً من استراتيجيتنا.',
    },
  },
  {
    id: 'eshs',
    icon: 'Recycle',
    short: { en: 'ESHS', ar: 'البيئة والسلامة والصحة والاستدامة' },
    title: { en: 'Environment, Safety, Health & Sustainability (ESHS)', ar: 'البيئة والسلامة والصحة والاستدامة (ESHS)' },
    lead: {
      en: 'Industry best practice, modern technology and experienced professionals combined to raise operational efficiency, reduce environmental impact and build a culture of safety and well-being.',
      ar: 'نجمع أفضل ممارسات القطاع والتقنيات الحديثة وكوادر متمرّسة لرفع الكفاءة التشغيلية والحدّ من الأثر البيئي وترسيخ ثقافة السلامة والرفاه.',
    },
  },
  {
    id: 'sustainability',
    icon: 'Globe2',
    short: { en: 'UN Global Compact principles', ar: 'مبادئ الميثاق العالمي للأمم المتحدة' },
    title: { en: 'Sustainability', ar: 'الاستدامة' },
    lead: {
      en: 'FCOM supports the principles of the UN Global Compact on human rights, labour, environment and anti-corruption, and aligns with the Paris Climate Agreement and the UN Sustainable Development Goals.',
      ar: 'تدعم الشركة مبادئ الميثاق العالمي للأمم المتحدة في مجالات حقوق الإنسان والعمل والبيئة ومكافحة الفساد، وتتوافق مع اتفاق باريس للمناخ وأهداف الأمم المتحدة للتنمية المستدامة.',
    },
  },
  {
    id: 'bim',
    icon: 'Boxes',
    short: { en: 'BIM', ar: 'نمذجة معلومات البناء' },
    title: { en: 'Building Information Modeling', ar: 'نمذجة معلومات البناء' },
    lead: {
      en: 'Intelligent digital models capture and manage facility information across the full life cycle, for informed, high-quality execution.',
      ar: 'نماذج رقمية ذكية تلتقط معلومات المنشأة وتديرها طوال دورة حياتها، لتنفيذ عالي الجودة قائم على المعلومات.',
    },
  },
];
