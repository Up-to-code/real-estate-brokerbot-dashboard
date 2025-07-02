// Internationalization configuration and translations
export const translations = {
  en: {
    app: {
      title: "Dashboard Admin",
      description: "Admin management system",
    },
    navigation: {
      dashboard: "Dashboard",
      aiTraining: "AI Training",
      templates: "Templates",
      campaigns: "Campaigns",
      clients: "Clients",
      properties: "Properties",
      analytics: "Analytics",
      users: "Users",
      products: "Products",
      orders: "Orders",
      settings: "Settings",
      backToProperties: "Back to Properties",
    },
    actions: {
      add: "Add",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      share: "Share",
      generateQR: "Generate QR",
      view: "View Details",
    },
    hello: "Hello!",
    property: {
      title: "Title",
      description: "Description",
      noDescription: "No description available",
      price: "Price",
      priceDetails: "Price Details",
      propertyDetails: "Property Details",
      propertyId: "Property ID",
      dateCreated: "Date Created",
      lastUpdated: "Last Updated",
      type: "Type",
      status: "Status",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      area: "Area",
      location: "Location",
      features: "Features",
      amenities: "Amenities",
      featuresAmenities: "Features & Amenities",
      contact: "Contact",
      contactInfo: "Contact Information",
      share: "Share",
      qr: "QR Code",
      untitled: "Untitled Property",
      checkOut: "Check out this property",
      view: "View Details",
      viewDetails: "View Property Details",
      details: "Property Details",
      status: {
        available: "Available",
        sold: "Sold",
        rented: "Rented",
        pending: "Pending",
        inactive: "Inactive",
        active: "Active",
      },
    },
    qr: {
      title: "Property QR Code",
      generate: "Generate QR",
      download: "Download",
      share: "Share",
    },
    success: {
      copiedToClipboard: "Copied to Clipboard",
      linkCopied: "Link copied to clipboard",
      propertyDeleted: "Property Deleted",
      propertyDeletedDescription: "Property has been successfully deleted",
    },
    errors: {
      copyFailed: "Copy Failed",
      copyNotSupported: "Copy not supported in your browser",
      fetchFailed: "Failed to fetch data",
      deleteFailed: "Failed to delete property",
      propertyNotFound: "Property Not Found",
      propertyNotFoundDescription: "The requested property could not be found",
    },
    confirmations: {
      deleteProperty: "Are you sure you want to delete this property?",
    },
  },
  ar: {
    app: {
      title: "لوحة التحكم",
      description: "نظام الإدارة للمسؤول",
    },
    navigation: {
      dashboard: "الرئيسية",
      aiTraining: "تدريب الذكاء الاصطناعي",
      templates: "القوالب",
      campaigns: "الحملات",
      clients: "العملاء",
      properties: "العقارات",
      analytics: "التحليلات",
      users: "المستخدمون",
      products: "المنتجات",
      orders: "الطلبات",
      settings: "الإعدادات",
      backToProperties: "العودة إلى العقارات",
    },
    actions: {
      add: "إضافة",
      edit: "تعديل",
      delete: "حذف",
      save: "حفظ",
      cancel: "إلغاء",
      share: "مشاركة",
      generateQR: "إنشاء رمز QR",
      view: "عرض التفاصيل",
    },
    hello: "مرحباً!",
    common: {
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      success: "تم بنجاح",
      save: "حفظ",
      cancel: "إلغاء",
      delete: "حذف",
      edit: "تعديل",
      view: "عرض",
      search: "بحث",
      filter: "تصفية",
      sort: "ترتيب",
      create: "إنشاء",
      update: "تحديث",
      submit: "إرسال",
      confirm: "تأكيد",
      back: "رجوع",
      next: "التالي",
      previous: "السابق",
      all: "الكل",
      none: "لا شيء",
      select: "اختر",
      upload: "رفع",
      download: "تحميل",
      copy: "نسخ",
      paste: "لصق",
      cut: "قص",
      undo: "تراجع",
      redo: "إعادة",
      refresh: "تحديث",
      close: "إغلاق",
      open: "فتح",
      more: "المزيد",
      less: "أقل",
      show: "عرض",
      hide: "إخفاء",
      add: "إضافة",
      remove: "إزالة",
      clear: "مسح",
      reset: "إعادة تعيين",
      apply: "تطبيق",
      done: "تم",
      finish: "إنهاء",
      start: "بدء",
      stop: "إيقاف",
      pause: "إيقاف مؤقت",
      resume: "استئناف",
      skip: "تخطي",
      continue: "متابعة",
      proceed: "متابعة",
      goBack: "رجوع",
      tryAgain: "حاول مرة أخرى",
    },
    properties: {
      title: "العقارات",
      subtitle: "العقارات المعروضة",
      addProperty: "إضافة عقار جديد",
      searchPlaceholder: "بحث عن عقار...",
      noPropertiesFound: "لم يتم العثور على عقارات مطابقة لبحثك حالياً.",
      status: {
        AVAILABLE: "متاح",
        SOLD: "مباع",
        RENTED: "مؤجر",
        RESERVED: "محجوز",
        OFF_MARKET: "غير متاح",
      },
      allStatus: "الكل",
      featured: "مميز",
      inactive: "غير نشط",
      type: {
        APARTMENT: "شقة",
        VILLA: "فيلا",
        TOWNHOUSE: "تاون هاوس",
        PENTHOUSE: "بنتهاوس",
        STUDIO: "استوديو",
        OFFICE: "مكتب",
        SHOP: "محل تجاري",
        WAREHOUSE: "مستودع",
        LAND: "أرض",
        BUILDING: "مبنى",
      },
    },
    confirmations: {
      deleteProperty: "هل أنت متأكد من حذف العقار؟",
    },
    actions: {
      edit: "تعديل",
      delete: "حذف",
    },
    property: {
      title: "العنوان",
      description: "الوصف",
      noDescription: "لا يوجد وصف متاح",
      price: "السعر",
      priceDetails: "تفاصيل السعر",
      propertyDetails: "تفاصيل العقار",
      propertyId: "رقم العقار",
      dateCreated: "تاريخ الإنشاء",
      lastUpdated: "آخر تحديث",
      type: "النوع",
      status: "الحالة",
      bedrooms: "غرف النوم",
      bathrooms: "الحمامات",
      area: "المساحة",
      location: "الموقع",
      features: "المميزات",
      amenities: "المرافق",
      featuresAmenities: "المميزات والمرافق",
      contact: "معلومات الاتصال",
      contactInfo: "معلومات الاتصال",
      share: "مشاركة",
      qr: "رمز QR",
      untitled: "عقار بدون عنوان",
      checkOut: "تفقد هذا العقار",
      view: "عرض التفاصيل",
      viewDetails: "عرض تفاصيل العقار",
      details: "تفاصيل العقار",
      status: {
        available: "متاح",
        sold: "مباع",
        rented: "مؤجر",
        pending: "قيد الانتظار",
        inactive: "غير نشط",
        active: "نشط",
      },
    },
    qr: {
      title: "رمز QR للعقار",
      generate: "إنشاء رمز QR",
      download: "تحميل",
      share: "مشاركة",
    },
    success: {
      copiedToClipboard: "تم النسخ",
      linkCopied: "تم نسخ الرابط إلى الحافظة",
      propertyDeleted: "تم حذف العقار",
      propertyDeletedDescription: "تم حذف العقار بنجاح",
    },
    errors: {
      copyFailed: "فشل النسخ",
      copyNotSupported: "نسخ الرابط غير مدعوم في متصفحك",
      fetchFailed: "فشل جلب البيانات",
      deleteFailed: "فشل حذف العقار",
      propertyNotFound: "العقار غير موجود",
      propertyNotFoundDescription: "لم يتم العثور على العقار المطلوب",
    },
    confirmations: {
      deleteProperty: "هل أنت متأكد من حذف هذا العقار؟",
    },
  },
}

export type Language = 'ar' | 'en'
export let currentLanguage: Language = 'ar'

export function setLanguage(lang: Language) {
  currentLanguage = lang
}

export function t(key: string): string {
  const keys = key.split('.')
  let value: any = translations[currentLanguage]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
      if (typeof value === 'string') return value
    }
  }
  
  // If not found in current language, try English as fallback
  if (currentLanguage !== 'en') {
    value = translations['en']
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
        if (typeof value === 'string') return value
      }
    }
  }
  
  return key
}

// Format date in Brazilian Portuguese
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }

  return dateObj.toLocaleDateString("pt-BR", defaultOptions)
}

// Format date and time in Brazilian Portuguese
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  return dateObj.toLocaleString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Format time in Brazilian Portuguese
export function formatTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  return dateObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Format currency
export function formatCurrency(amount: number, currency: string = "SAR"): string {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format number in Brazilian Portuguese
export function formatNumber(number: number): string {
  return new Intl.NumberFormat("pt-BR").format(number)
}

// Relative time formatting
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "agora mesmo"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `há ${minutes} minuto${minutes > 1 ? "s" : ""}`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `há ${hours} hora${hours > 1 ? "s" : ""}`
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    return `há ${days} dia${days > 1 ? "s" : ""}`
  } else {
    return formatDate(dateObj, { month: "short", day: "numeric" })
  }
}
