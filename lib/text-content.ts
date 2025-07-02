// Centralized text content management system
export const textContent = {
  // التطبيق
  app: {
    title: "لوحة التحكم",
    description: "نظام إدارة إداري مركزي",
  },

  // التنقل
  navigation: {
    dashboard: "لوحة التحكم",
    analytics: "التحليلات",
    users: "المستخدمون",
    products: "المنتجات",
    orders: "الطلبات",
    settings: "الإعدادات",
    profile: "الملف الشخصي",
    logout: "تسجيل الخروج",
  },

  // الإجراءات الشائعة
  actions: {
    add: "إضافة",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    search: "بحث",
    filter: "تصفية",
    export: "تصدير",
    import: "استيراد",
    refresh: "تحديث",
    view: "عرض",
    close: "إغلاق",
    back: "رجوع",
    next: "التالي",
    previous: "السابق",
    submit: "إرسال",
    reset: "إعادة تعيين",
  },

  // الحالة
  status: {
    active: "نشط",
    inactive: "غير نشط",
    pending: "قيد الانتظار",
    completed: "مكتمل",
    cancelled: "ملغي",
    draft: "مسودة",
    published: "منشور",
    archived: "مؤرشف",
  },

  // لوحة التحكم
  dashboard: {
    title: "لوحة التحكم",
    subtitle: "نظرة عامة على النظام",
    welcomeMessage: "مرحبًا بك في لوحة التحكم الإدارية الخاصة بك",
    totalUsers: "إجمالي المستخدمين",
    totalProducts: "إجمالي المنتجات",
    totalOrders: "إجمالي الطلبات",
    revenue: "الإيرادات",
    recentActivity: "النشاطات الأخيرة",
    quickActions: "إجراءات سريعة",
    viewAll: "عرض الكل",
    noData: "لا توجد بيانات متاحة",
  },
}

// Text content access function
export function getText(key: string): string {
  const keys = key.split(".")
  let value: any = textContent

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k]
    } else {
      console.warn(`Text key not found: ${key}`)
      return key
    }
  }

  return typeof value === "string" ? value : key
}

// Utility function for pluralization
export function getPlural(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}

// Utility function for formatting numbers
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("pt-BR").format(num)
}

// Utility function for formatting currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount)
}

// Utility function for formatting dates
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleDateString("pt-BR")
}

// Utility function for formatting relative time
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return getText("time.justNow")
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} ${getText("time.minutesAgo")}`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} ${getText("time.hoursAgo")}`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} ${getText("time.daysAgo")}`
  }
}
