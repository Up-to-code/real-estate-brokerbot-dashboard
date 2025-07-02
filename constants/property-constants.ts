import { PropertyOption } from '@/types/property';
import { PropertyType, PropertyStatus } from '@/store/property-store';

export const PROPERTY_TYPES: PropertyOption[] = [
  { value: PropertyType.APARTMENT, label: 'شقة' },
  { value: PropertyType.VILLA, label: 'فيلا' },
  { value: PropertyType.STUDIO, label: 'استوديو' },
  { value: PropertyType.PENTHOUSE, label: 'بنتهاوس' },
  { value: PropertyType.TOWNHOUSE, label: 'تاون هاوس' },
  { value: PropertyType.OFFICE, label: 'مكتب' },
  { value: PropertyType.SHOP, label: 'محل تجاري' },
  { value: PropertyType.WAREHOUSE, label: 'مستودع' },
  { value: PropertyType.LAND, label: 'أرض' },
  { value: PropertyType.BUILDING, label: 'مبنى' }
];

export const SAUDI_CITIES: string[] = [
  'الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'الدمام', 'الخبر',
  'الظهران', 'الأحساء', 'الطائف', 'بريدة', 'تبوك', 'خميس مشيط',
  'الجبيل', 'حائل', 'نجران', 'جازان', 'ينبع', 'أبها',
  'عرعر', 'الباحة', 'سكاكا', 'القطيف', 'الخرج', 'حفر الباطن',
  'الخفجي', 'بيشة', 'الرس', 'عنيزة', 'القريات', 'صبيا'
];

export const COMMON_AMENITIES: string[] = [
  'موقف سيارات', 'مسبح', 'حديقة', 'شرفة', 'مصعد',
  'أمن وحراسة', 'تكييف مركزي', 'تدفئة مركزية', 'مفروش', 'إطلالة بحرية',
  'غرفة سائق', 'غرفة خادمة', 'مطبخ مجهز', 'ملحق خارجي', 'مدخل خاص',
  'نظام تحكم ذكي', 'مجلس رجال', 'مجلس نساء', 'مصلى', 'مخزن',
  'قبو', 'مصعد طعام', 'نظام أمن', 'كاميرات مراقبة', 'مدخل سيارات'
];

export const COMMON_FEATURES: string[] = [
  'إطلالة مميزة', 'تشطيب فاخر', 'نوافذ كبيرة', 'سقف عالي', 'إضاءة طبيعية',
  'عزل حراري', 'عزل صوتي', 'نظام إطفاء حريق', 'نظام إنذار', 'أرضيات رخام',
  'أرضيات خشبية', 'أبواب خشب صلب', 'شبابيك ألمنيوم', 'تأسيس مكيفات', 'خزان مياه',
  'بئر ماء', 'طاقة شمسية', 'تمديدات انترنت', 'تمديدات تلفاز', 'عداد كهرباء مستقل'
];

export const STATUS_OPTIONS: PropertyOption[] = [
  { value: PropertyStatus.AVAILABLE, label: 'متاح' },
  { value: PropertyStatus.RENTED, label: 'مؤجر' },
  { value: PropertyStatus.SOLD, label: 'مباع' },
  { value: PropertyStatus.RESERVED, label: 'محجوز' },
  { value: PropertyStatus.OFF_MARKET, label: 'غير متاح' }
]; 