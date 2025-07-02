import { Home, MapPin, DollarSign, Eye, Edit, Trash2, Bed, Bath, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { PropertyGridProps, Property } from "@/types/property"
import Link from "next/link"

type TranslationKey = 'property' | 'details' | 'location' | 'price' | 'status' | 'actions' | 'bedrooms' | 'bathrooms' | 'area' | 'available' | 'pending' | 'sold' | 'rented';

type Translations = {
  [key in TranslationKey]: string;
};

const translations: { en: Translations; ar: Translations } = {
  en: {
    property: "Property",
    details: "Details",
    location: "Location",
    price: "Price",
    status: "Status",
    actions: "Actions",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    area: "m²",
    available: "AVAILABLE",
    pending: "PENDING",
    sold: "SOLD",
    rented: "RENTED"
  },
  ar: {
    property: "العقار",
    details: "التفاصيل",
    location: "الموقع",
    price: "السعر",
    status: "الحالة",
    actions: "الإجراءات",
    bedrooms: "غرف النوم",
    bathrooms: "الحمامات",
    area: "متر مربع",
    available: "متاح",
    pending: "قيد الانتظار",
    sold: "تم البيع",
    rented: "مؤجر"
  }
}

const getStatusTranslation = (property: Property, t: Translations, locale: "en" | "ar"): string => {
  const statusKey = property.status?.toLowerCase() as TranslationKey;
  return property[`status${locale === "ar" ? "_ar" : ""}`] || 
         (statusKey && statusKey in t ? t[statusKey] : property.status);
}

export const PropertyGrid = ({ 
  loading, 
  properties, 
  onDelete, 
  onView,
  currentPage,
  totalPages,
  onPageChange,
  locale = "en"
}: PropertyGridProps) => {
  const t = translations[locale]
  const isRTL = locale === "ar"

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  if (!properties) {
    return null
  }

  return (
    <div className="space-y-4" dir={isRTL ? "rtl" : "ltr"}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.property}</TableHead>
            <TableHead>{t.details}</TableHead>
            <TableHead>{t.location}</TableHead>
            <TableHead>{t.price}</TableHead>
            <TableHead>{t.status}</TableHead>
            <TableHead>{t.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    {property.images && property.images.length > 0 ? (
                      <img 
                        src={property.images[0]} 
                        alt={property[`title${locale === "ar" ? "_ar" : ""}`] || property.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Home className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {property[`title${locale === "ar" ? "_ar" : ""}`] || property.title}
                    </div>
                    <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {property[`description${locale === "ar" ? "_ar" : ""}`] || property.description}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{property.bedrooms} {t.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms} {t.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span>{property.area ? property.area.toLocaleString(locale) : "0"} {t.area}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{property[`city${locale === "ar" ? "_ar" : ""}`] || property.city}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {property[`country${locale === "ar" ? "_ar" : ""}`] || property.country}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{property.price ? property.price.toLocaleString(locale) : "0"} {property.currency}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  property.status === "AVAILABLE" 
                    ? "bg-green-100 text-green-800" 
                    : property.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : property.status === "SOLD" || property.status === "RENTED"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {getStatusTranslation(property, t, locale)}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link href={`/properties/${property.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    // onClick={() => onView(property)}
                  >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/properties/${property.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onDelete(property.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination dir={isRTL ? "rtl" : "ltr"}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => onPageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
} 