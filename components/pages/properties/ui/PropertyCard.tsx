"use client"

import * as React from "react"
import { InfoIcon, MapPin, Bed, Bath, Square, Car, Calendar, Eye, Heart, Share2 } from "lucide-react"
import { motion, useInView, Variants } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Utility function for className merging
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Property types based on the Prisma schema
enum PropertyType {
  APARTMENT = "APARTMENT",
  VILLA = "VILLA",
  TOWNHOUSE = "TOWNHOUSE",
  PENTHOUSE = "PENTHOUSE",
  STUDIO = "STUDIO",
  OFFICE = "OFFICE",
  SHOP = "SHOP",
  WAREHOUSE = "WAREHOUSE",
  LAND = "LAND",
  BUILDING = "BUILDING"
}

enum PropertyStatus {
  AVAILABLE = "AVAILABLE",
  SOLD = "SOLD",
  RENTED = "RENTED",
  RESERVED = "RESERVED",
  OFF_MARKET = "OFF_MARKET"
}

interface Property {
  id: string
  title: string
  description: string
  price: number
  currency: string
  type: PropertyType
  status: PropertyStatus
  bedrooms?: number
  bathrooms?: number
  area?: number
  location: string
  address: string
  city: string
  country: string
  latitude?: number
  longitude?: number
  images: string[]
  features: string[]
  amenities: string[]
  yearBuilt?: number
  parking?: number
  furnished: boolean
  petFriendly: boolean
  utilities?: string
  contactInfo?: string
  agentId?: string
  isActive: boolean
  isFeatured: boolean
  viewCount: number
  createdAt: Date
  updatedAt: Date
}

interface PropertyCardProps {
  property: Property
  onContact?: (property: Property) => void
  onFavorite?: (property: Property) => void
  onShare?: (property: Property) => void
  className?: string
}

function Info({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-auto p-1">
          <InfoIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[400px] min-w-[220px] max-w-[400px] overflow-auto text-sm">
        {children}
      </PopoverContent>
    </Popover>
  )
}

function PropertyCard({
  property,
  onContact,
  onFavorite,
  onShare,
  className
}: PropertyCardProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const getStatusColor = (status: PropertyStatus) => {
    switch (status) {
      case PropertyStatus.AVAILABLE:
        return "bg-green-500"
      case PropertyStatus.SOLD:
        return "bg-red-500"
      case PropertyStatus.RENTED:
        return "bg-primary  0"
      case PropertyStatus.RESERVED:
        return "bg-yellow-500"
      case PropertyStatus.OFF_MARKET:
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatPropertyType = (type: PropertyType) => {
    return type.charAt(0) + type.slice(1).toLowerCase()
  }

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={containerVariants as Variants}
      className={cn("w-full max-w-md mx-auto", className)}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          {property.images.length > 0 ? (
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No Image</span>
            </div>
          )}
          
          {/* Status Badge */}
          <Badge 
            className={cn(
              "absolute top-3 left-3 text-white",
              getStatusColor(property.status)
            )}
          >
            {property.status}
          </Badge>

          {/* Featured Badge */}
          {property.isFeatured && (
            <Badge className="absolute top-3 right-3 bg-primary  ">
              Featured
            </Badge>
          )}

          {/* Action Buttons */}
          <div className="absolute bottom-3 right-3 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0"
              onClick={() => onFavorite?.(property)}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0"
              onClick={() => onShare?.(property)}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Image Navigation */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-3 flex gap-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  )}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold line-clamp-1">
                {property.title}
              </CardTitle>
              <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{property.city}, {property.country}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {formatPrice(property.price, property.currency)}
              </div>
              <Badge variant="outline" className="text-xs">
                {formatPropertyType(property.type)}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {property.description}
          </p>

          {/* Property Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {property.bedrooms && (
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-2">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{property.bathrooms} Baths</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center gap-2">
                <Square className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{property.area} m²</span>
              </div>
            )}
            {property.parking && (
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{property.parking} Parking</span>
              </div>
            )}
          </div>

          {/* Features */}
          {property.features.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-sm font-medium">Features</span>
                <Info>
                  <div>
                    <h4 className="font-medium mb-2">Property Features:</h4>
                    <ul className="space-y-1">
                      {property.features.map((feature, index) => (
                        <li key={index} className="text-sm">• {feature}</li>
                      ))}
                    </ul>
                  </div>
                </Info>
              </div>
              <div className="flex flex-wrap gap-1">
                {property.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {property.features.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{property.features.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          <Separator className="my-4" />

          {/* Additional Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{property.viewCount} views</span>
            </div>
            {property.yearBuilt && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Built {property.yearBuilt}</span>
              </div>
            )}
          </div>

          {/* Contact Button */}
          <Button 
            className="w-full" 
            onClick={() => onContact?.(property)}
            disabled={property.status === PropertyStatus.SOLD}
          >
            {property.status === PropertyStatus.SOLD ? 'Sold' : 'Contact Agent'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Demo component with default property data
function PropertyCardDemo() {
  const sampleProperty: Property = {
    id: "1",
    title: "Luxury Waterfront Villa",
    description: "Stunning 4-bedroom villa with panoramic ocean views, private pool, and modern amenities. Perfect for luxury living in a prime location.",
    price: 2500000,
    currency: "USD",
    type: PropertyType.VILLA,
    status: PropertyStatus.AVAILABLE,
    bedrooms: 4,
    bathrooms: 3,
    area: 450,
    location: "Dubai Marina",
    address: "123 Marina Walk",
    city: "Dubai",
    country: "UAE",
    latitude: 25.0772,
    longitude: 55.1395,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
    ],
    features: ["Ocean View", "Private Pool", "Garage", "Garden", "Balcony", "Modern Kitchen"],
    amenities: ["Gym", "Spa", "Concierge", "Security"],
    yearBuilt: 2020,
    parking: 2,
    furnished: true,
    petFriendly: false,
    utilities: "All included",
    contactInfo: "agent@example.com",
    agentId: "agent1",
    isActive: true,
    isFeatured: true,
    viewCount: 245,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const handleContact = (property: Property) => {
    console.log("Contact agent for property:", property.title)
  }

  const handleFavorite = (property: Property) => {
    console.log("Added to favorites:", property.title)
  }

  const handleShare = (property: Property) => {
    console.log("Share property:", property.title)
  }

  return (
    <div className="container py-12">
      <PropertyCard
        property={sampleProperty}
        onContact={handleContact}
        onFavorite={handleFavorite}
        onShare={handleShare}
      />
    </div>
  )
}

export default PropertyCardDemo
