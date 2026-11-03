/**
 * Equipment capacity. PDF chapter "Equipment Capacity" (36-row table, pp. 31–33)
 * and plant photo pages (pp. 33–38). Quantities are exactly as printed.
 */
import type { L } from './types';

export type GroupId =
  | 'crushing'
  | 'concrete'
  | 'asphalt'
  | 'earthmoving'
  | 'transport'
  | 'lifting'
  | 'workshops'
  | 'power'
  | 'labs';

export interface EquipmentItem {
  /** Row number in the PDF table (1–36). */
  no: number;
  name: L;
  qty: number;
  group: GroupId;
}

export const groups: { id: GroupId; title: L; icon: string }[] = [
  { id: 'crushing', title: { en: 'Crushing & Aggregates', ar: 'الكسّارات والركام' }, icon: 'Mountain' },
  { id: 'concrete', title: { en: 'Concrete', ar: 'الخرسانة' }, icon: 'Cylinder' },
  { id: 'asphalt', title: { en: 'Asphalt', ar: 'الأسفلت' }, icon: 'Layers' },
  { id: 'earthmoving', title: { en: 'Earthmoving', ar: 'أعمال الحفر والتسوية' }, icon: 'Shovel' },
  { id: 'transport', title: { en: 'Transport & Service', ar: 'النقل والخدمات' }, icon: 'Truck' },
  { id: 'lifting', title: { en: 'Lifting', ar: 'الرفع' }, icon: 'Construction' },
  { id: 'workshops', title: { en: 'Workshops & Fuel', ar: 'الورش والوقود' }, icon: 'Wrench' },
  { id: 'power', title: { en: 'Power', ar: 'الطاقة' }, icon: 'PlugZap' },
  { id: 'labs', title: { en: 'Labs & Survey', ar: 'المختبرات والمساحة' }, icon: 'FlaskConical' },
];

const E = (no: number, en: string, ar: string, qty: number, group: GroupId): EquipmentItem => ({
  no,
  name: { en, ar },
  qty,
  group,
});

export const equipment: EquipmentItem[] = [
  E(1, 'Stationary crushers', 'كسّارات ثابتة', 2, 'crushing'),
  E(2, 'Mobile mechanical crusher', 'كسّارة ميكانيكية متنقلة', 1, 'crushing'),
  E(3, 'Mobile mechanical screen', 'غربال ميكانيكي متنقل', 2, 'crushing'),
  E(4, 'Mechanical sand washer', 'غسّالة رمل ميكانيكية', 1, 'crushing'),
  E(5, 'Concrete mixing plants', 'محطات خلط الخرسانة', 2, 'concrete'),
  E(6, 'Concrete pump trucks', 'شاحنات ضخ الخرسانة', 4, 'concrete'),
  E(7, 'Concrete pumps (stationary)', 'مضخات خرسانة ثابتة', 3, 'concrete'),
  E(8, 'Concrete mixer trucks', 'شاحنات خلط الخرسانة', 13, 'concrete'),
  E(9, 'Bulk cement trucks', 'شاحنات نقل الإسمنت السائب', 2, 'concrete'),
  E(10, 'Asphalt concrete plants', 'محطات الخرسانة الأسفلتية', 2, 'asphalt'),
  E(11, 'Asphalt pavers', 'فرّادات الأسفلت', 3, 'asphalt'),
  E(12, 'Asphalt milling machine', 'آلة كشط الأسفلت', 1, 'asphalt'),
  E(13, 'Asphalt rollers', 'مداحل الأسفلت', 4, 'asphalt'),
  // "M.c Truck" in the source. Abbreviation not expanded in the PDF; kept verbatim pending client confirmation.
  E(14, 'M.C. truck', 'شاحنة M.C.', 1, 'asphalt'),
  E(15, 'Bulldozers', 'جرّافات (بلدوزرات)', 7, 'earthmoving'),
  E(16, 'Graders', 'آليات تسوية (جريدرات)', 8, 'earthmoving'),
  E(17, 'Excavators and breakers', 'حفّارات وكسّارات هيدروليكية', 20, 'earthmoving'),
  E(18, 'Loaders', 'شيولات (لوادر)', 33, 'earthmoving'),
  E(19, 'Rollers', 'مداحل', 8, 'earthmoving'),
  E(20, 'Transportation dumpers', 'قلابات نقل', 32, 'transport'),
  E(21, 'Water tanker trucks', 'صهاريج مياه', 5, 'transport'),
  E(22, 'Service trucks', 'شاحنات خدمة', 13, 'transport'),
  E(23, 'Service and transport cars', 'سيارات خدمة ونقل', 25, 'transport'),
  E(24, 'Tower cranes', 'رافعات برجية', 2, 'lifting'),
  E(25, 'Mobile cranes', 'رافعات متحركة', 3, 'lifting'),
  E(26, 'Grouting machine', 'آلة حقن (تحشية)', 1, 'concrete'),
  E(27, 'Comprehensive maintenance workshop equipment', 'تجهيزات ورشة صيانة متكاملة', 2, 'workshops'),
  E(28, 'Comprehensive workshop equipment', 'تجهيزات ورشة متكاملة', 1, 'workshops'),
  E(29, 'Comprehensive aluminium workshop', 'ورشة ألمنيوم متكاملة', 1, 'workshops'),
  E(30, 'Comprehensive steel workshop', 'ورشة حدادة متكاملة', 1, 'workshops'),
  E(31, 'Fuel supply stations, fully equipped', 'محطات تزويد وقود مجهّزة بالكامل', 3, 'workshops'),
  E(32, 'Power generators', 'مولدات كهربائية', 14, 'power'),
  E(33, 'Integrated soil laboratories', 'مختبرات تربة متكاملة', 2, 'labs'),
  E(34, 'Integrated concrete laboratory', 'مختبر خرسانة متكامل', 1, 'labs'),
  E(35, 'Integrated asphalt laboratory', 'مختبر أسفلت متكامل', 1, 'labs'),
  E(36, 'Survey instruments', 'أجهزة مساحة', 10, 'labs'),
];

export const totalUnits = equipment.reduce((s, i) => s + i.qty, 0); // 234
export const groupTotal = (g: GroupId) => equipment.filter((i) => i.group === g).reduce((s, i) => s + i.qty, 0);
export const labCount = equipment.filter((i) => i.no >= 33 && i.no <= 35).reduce((s, i) => s + i.qty, 0); // 4

/** Key plants with photo + rated capacity (plant photo pages). */
export interface Plant {
  id: string;
  name: L;
  capacity?: { value: string; unit: L };
  origin?: L;
  image: string;
  alt: L;
}

export const plants: Plant[] = [
  {
    id: 'crusher-300',
    name: { en: 'Stationary Crusher', ar: 'كسّارة ثابتة' },
    capacity: { value: '300', unit: { en: 't/h', ar: 'طن/ساعة' } },
    image: 'stationary-crusher-300',
    alt: { en: 'Aerial view of the 300 t/h stationary crusher and aggregate stockpiles', ar: 'منظر جوي للكسّارة الثابتة بطاقة 300 طن/ساعة ومخزونات الركام' },
  },
  {
    id: 'crusher-250',
    name: { en: 'Stationary Crusher', ar: 'كسّارة ثابتة' },
    capacity: { value: '250', unit: { en: 't/h', ar: 'طن/ساعة' } },
    image: 'stationary-crusher-250',
    alt: { en: 'The 250 t/h stationary crusher with conveyors', ar: 'الكسّارة الثابتة بطاقة 250 طن/ساعة مع السيور الناقلة' },
  },
  {
    id: 'asphalt-180',
    name: { en: 'Environmental Asphalt Plant', ar: 'محطة أسفلت صديقة للبيئة' },
    capacity: { value: '180', unit: { en: 't/h', ar: 'طن/ساعة' } },
    image: 'asphalt-plant-180',
    alt: { en: 'The 180 t/h environmental asphalt plant', ar: 'محطة الأسفلت الصديقة للبيئة بطاقة 180 طن/ساعة' },
  },
  {
    id: 'concrete-120',
    name: { en: 'Concrete Mixing Plant', ar: 'محطة خلط خرسانة' },
    capacity: { value: '120', unit: { en: 'm³/h', ar: 'م³/ساعة' } },
    origin: { en: 'Turkish', ar: 'تركية الصنع' },
    image: 'concrete-plant-120-turkish',
    alt: { en: 'The 120 m³/h Turkish concrete mixing plant', ar: 'محطة خلط الخرسانة التركية بطاقة 120 م³/ساعة' },
  },
  {
    id: 'concrete-90',
    name: { en: 'Concrete Mixing Plant', ar: 'محطة خلط خرسانة' },
    capacity: { value: '90', unit: { en: 'm³/h', ar: 'م³/ساعة' } },
    origin: { en: 'Italian', ar: 'إيطالية الصنع' },
    image: 'concrete-plant-90-italian',
    alt: { en: 'The 90 m³/h Italian concrete mixing plant with twin silos', ar: 'محطة خلط الخرسانة الإيطالية بطاقة 90 م³/ساعة بصومعتين' },
  },
  {
    id: 'mobile-crusher',
    name: { en: 'Mobile Crusher', ar: 'كسّارة متنقلة' },
    image: 'mobile-crusher',
    alt: { en: 'Tracked mobile crusher fed by a loader', ar: 'كسّارة متنقلة على جنازير تُغذّى بواسطة شيول' },
  },
  {
    id: 'mobile-screen',
    name: { en: 'Mobile Screen', ar: 'غربال متنقل' },
    image: 'mobile-screen',
    alt: { en: 'Mobile mechanical screen grading aggregate', ar: 'غربال ميكانيكي متنقل لتدريج الركام' },
  },
];

/** Fleet photo strip (pp. 36–38). */
export const fleetPhotos: { image: string; alt: L }[] = [
  { image: 'concrete-fleet', alt: { en: 'Concrete mixer and pump trucks', ar: 'شاحنات خلط وضخ الخرسانة' } },
  { image: 'graders-fleet', alt: { en: 'Graders', ar: 'آليات التسوية (الجريدرات)' } },
  { image: 'rollers-fleet', alt: { en: 'Rollers', ar: 'المداحل' } },
  { image: 'excavators-fleet', alt: { en: 'Excavators and breakers', ar: 'الحفّارات والكسّارات الهيدروليكية' } },
  { image: 'loaders-fleet', alt: { en: 'Loaders', ar: 'الشيولات' } },
  { image: 'transport-trucks-fleet', alt: { en: 'Transport trucks', ar: 'شاحنات النقل' } },
  { image: 'heavy-equipment-yard', alt: { en: 'Part of the heavy equipment fleet at the yard', ar: 'جزء من أسطول المعدات الثقيلة في الساحة' } },
];
