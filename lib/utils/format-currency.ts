export function formatCurrency(
  amount: number,
  currency: string = "SAR", // ✅ رمز العملة الصحيح
  locale: string = "ar-EG"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
