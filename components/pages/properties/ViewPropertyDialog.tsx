import { Home, MapPin, DollarSign, Calendar, Clock, Bed, Bath, Square, Check, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ViewPropertyDialogProps } from "@/types/property"

const translations = {
  en: {
    basicInfo: "Basic Information",
    propertyDetails: "Property Details",
    additionalInfo: "Additional Information",
    description: "Description",
    amenities: "Amenities",
    features: "Features",
    status: "Status",
    created: "Created",
    updated: "Updated",
    views: "Views",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    area: "m²",
    builtIn: "Built in",
    furnished: "Furnished",
    petFriendly: "Pet Friendly",
    parkingSpaces: "Parking Spaces",
    available: "AVAILABLE",
    pending: "PENDING",
    sold: "SOLD",
    rented: "RENTED"
  },
  ar: {
    basicInfo: "معلومات أساسية",
    propertyDetails: "تفاصيل العقار",
    additionalInfo: "معلومات إضافية",
    description: "الوصف",
    amenities: "المرافق",
    features: "المميزات",
    status: "الحالة",
    created: "تاريخ الإنشاء",
    updated: "تاريخ التحديث",
    views: "المشاهدات",
    bedrooms: "غرف النوم",
    bathrooms: "الحمامات",
    area: "متر مربع",
    builtIn: "تم البناء في",
    furnished: "مفروش",
    petFriendly: "يسمح بالحيوانات الأليفة",
    parkingSpaces: "مواقف السيارات",
    available: "متاح",
    pending: "قيد الانتظار",
    sold: "تم البيع",
    rented: "مؤجر"
  }
}

export const ViewPropertyDialog = ({
  property,
  isOpen,
  onOpenChange,
  locale = "en"
}: ViewPropertyDialogProps) => {
  if (!property) return null

  const t = translations[locale]
  const isRTL = locale === "ar"

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto" dir={isRTL ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {property[`title${locale === "ar" ? "_ar" : ""}`] || property.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Property Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {property.images.map((image, index) => (
              <div key={index} className="aspect-video rounded-lg overflow-hidden bg-muted">
                <img 
                  src={image} 
                  alt={`${property[`title${locale === "ar" ? "_ar" : ""}`] || property.title} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">{t.basicInfo}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{property.price.toLocaleString(locale)} {property.currency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span>{property[`type${locale === "ar" ? "_ar" : ""}`] || property.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {property[`address${locale === "ar" ? "_ar" : ""}`] || property.address}, 
                    {property[`city${locale === "ar" ? "_ar" : ""}`] || property.city}, 
                    {property[`country${locale === "ar" ? "_ar" : ""}`] || property.country}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">{t.propertyDetails}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span>{property.bedrooms} {t.bedrooms}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span>{property.bathrooms} {t.bathrooms}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  <span>{property.area.toLocaleString(locale)} {t.area}</span>
                </div>
                {property.yearBuilt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{t.builtIn} {property.yearBuilt}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">{t.additionalInfo}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {property.furnished ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <span>{t.furnished}</span>
                </div>
                <div className="flex items-center gap-2">
                  {property.petFriendly ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <span>{t.petFriendly}</span>
                </div>
                {property.parking && (
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>{property.parking} {t.parkingSpaces}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-medium mb-2">{t.description}</h3>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {property[`description${locale === "ar" ? "_ar" : ""}`] || property.description}
            </p>
          </div>

          {/* Amenities & Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {property.amenities.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">{t.amenities}</h3>
                <ul className="list-disc list-inside space-y-1">
                  {(locale === "ar" && property.amenities_ar ? property.amenities_ar : property.amenities).map((amenity, index) => (
                    <li key={index} className="text-sm">{amenity}</li>
                  ))}
                </ul>
              </div>
            )}
            {property.features.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">{t.features}</h3>
                <ul className="list-disc list-inside space-y-1">
                  {(locale === "ar" && property.features_ar ? property.features_ar : property.features).map((feature, index) => (
                    <li key={index} className="text-sm">{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Status Information */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div>
              {t.status}: 
              <span className={`mx-2 px-2 py-1 rounded-full text-xs font-medium ${
                property.status === "AVAILABLE" 
                  ? "bg-green-100 text-green-800" 
                  : property.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-800"
                  : property.status === "SOLD" || property.status === "RENTED"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}>
                {property[`status${locale === "ar" ? "_ar" : ""}`] || t[property.status.toLowerCase()] || property.status}
              </span>
            </div>
            <div>{t.created}: {formatDate(property.createdAt)}</div>
            <div>{t.updated}: {formatDate(property.updatedAt)}</div>
            <div>{t.views}: {property.viewCount}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 