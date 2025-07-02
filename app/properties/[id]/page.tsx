"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowLeft,
  Edit,
  Trash2,
  QrCode,
  Share2,
  MapPin,
  Calendar,
  DollarSign,
  Home,
  Bed,
  Bath,
  Square,
  Phone,
  Mail,
  User,
} from "lucide-react"
import { Property } from "@/types/property"
import { getErrorMessage } from "@/lib/api"
import { t, formatCurrency, formatDate } from "@/lib/i18n"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { QRCodeSVG } from 'qrcode.react'

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/${params.id}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
         const data = await response.json()
         console.log(data.data)
        setProperty(data.data)
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        setError(errorMessage)
        console.error("Property fetch error:", error)
        toast({
          title: t("errors.fetchFailed"),
          description: errorMessage,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProperty()
    }
  }, [params.id])

  const handleDelete = async () => {
    if (!property) return
    
    if (confirm(t("confirmations.deleteProperty"))) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/${property.id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        toast({
          title: t("success.propertyDeleted"),
          description: t("success.propertyDeletedDescription"),
        })
        
        router.push('/properties')
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        console.error("Property delete error:", error)
        toast({
          title: t("errors.deleteFailed"),
          description: errorMessage,
          variant: "destructive",
        })
      }
    }
  }

  const generatePropertyUrl = (property: Property) => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    return `${baseUrl}/properties/${property.id}`
  }

  const shareProperty = async () => {
    if (!property) return
    
    const url = generatePropertyUrl(property)
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title || t("property.untitled"),
          text: property.description || t("property.checkOut"),
          url: url,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        toast({
          title: t("success.copiedToClipboard"),
          description: t("success.linkCopied"),
        })
      } catch (error) {
        console.error("Error copying to clipboard:", error)
        toast({
          title: t("errors.copyFailed"),
          description: t("errors.copyNotSupported"),
          variant: "destructive",
        })
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800"
      case "sold":
        return "bg-red-100 text-red-800"
      case "rented":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatPrice = (price: number) => {
    return formatCurrency(price)
  }

  const formatPropertyDate = (dateString: string) => {
    return formatDate(dateString)
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="aspect-video w-full" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !property) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-96 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {t("errors.propertyNotFound")}
          </h2>
          <p className="text-gray-600">{error || t("errors.propertyNotFoundDescription")}</p>
          <Button asChild>
            <Link href="/properties">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("navigation.backToProperties")}
            </Link>
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/properties">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("navigation.backToProperties")}
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                {property.title || t("property.untitled")}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={getStatusColor(property.status || "inactive")}>
                  {t(`property.status.${property.status?.toLowerCase()}`) || t("property.status.inactive")}
                </Badge>
                {property.type && (
                  <Badge variant="outline">{property.type}</Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setQrDialogOpen(true)}>
              <QrCode className="h-4 w-4 mr-2" />
              {t("actions.generateQR")}
            </Button>
            <Button variant="outline" size="sm" onClick={shareProperty}>
              <Share2 className="h-4 w-4 mr-2" />
              {t("actions.share")}
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/properties/${property.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                {t("actions.edit")}
              </Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              {t("actions.delete")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            {property.images && property.images.length > 0 && (
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden rounded-lg">
                    <Image
                      src={property.images[0]}
                      alt={property.title || t("property.untitled")}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {property.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2 p-4">
                      {property.images.slice(1, 5).map((image, index) => (
                        <div key={index} className="aspect-square relative overflow-hidden rounded-md">
                          <Image
                            src={image}
                            alt={`${property.title} ${index + 2}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>{t("property.description")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {property.description || t("property.noDescription")}
                </p>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            {((property.features && property.features.length > 0) || 
              (property.amenities && property.amenities.length > 0)) && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("property.featuresAmenities")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.features?.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {property.amenities?.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary  0 rounded-full" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  {t("property.priceDetails")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {property.price && (
                  <div className="text-3xl font-bold text-green-600">
                    {formatPrice(property.price)}
                  </div>
                )}
                
                <Separator />
                
                <div className="space-y-3">
                  {property.bedrooms && (
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        {property.bedrooms} {t("property.bedrooms")}
                      </span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center gap-2">
                      <Bath className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        {property.bathrooms} {t("property.bathrooms")}
                      </span>
                    </div>
                  )}
                  {property.area && (
                    <div className="flex items-center gap-2">
                      <Square className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        {property.area} {property.area_unit || "sq ft"}
                      </span>
                    </div>
                  )}
                  {property.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            {(property.contact_name || property.contact_email || property.contact_phone) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {t("property.contactInfo")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {property.contact_name && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{property.contact_name}</span>
                    </div>
                  )}
                  {property.contact_email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a 
                        href={`mailto:${property.contact_email}`}
                        className="text-sm bg-primary hover:underline"
                      >
                        {property.contact_email}
                      </a>
                    </div>
                  )}
                  {property.contact_phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <a 
                        href={`tel:${property.contact_phone}`}
                        className="text-sm bg-primary hover:underline"
                      >
                        {property.contact_phone}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>{t("property.propertyDetails")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">{t("property.propertyId")}</span>
                  <span className="text-sm font-medium">{property.id}</span>
                </div>
                {property.created_at && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">{t("property.dateCreated")}</span>
                    <span className="text-sm font-medium">{formatPropertyDate(property.created_at)}</span>
                  </div>
                )}
                {property.updated_at && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">{t("property.lastUpdated")}</span>
                    <span className="text-sm font-medium">{formatPropertyDate(property.updated_at)}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* QR Code Dialog */}
        <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                {t("qr.title")} - {property.title || t("property.untitled")}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <QRCodeSVG
                  value={generatePropertyUrl(property)}
                  size={200}
                  level="M"
                  includeMargin={true}
                />
              </div>
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    // Download QR code logic here
                  }}
                >
                  {t("qr.download")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={shareProperty}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  {t("qr.share")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}