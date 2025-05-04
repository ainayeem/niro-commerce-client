/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getMyShop } from "@/services/ShopService";
import {
  Building2,
  Calendar,
  Clock,
  Edit,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Shield,
  ShoppingBag,
  Star,
  Twitter,
  User,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: "My Shop",
  description: "View your shop's profile",
};

const MyShop = async () => {
  const { data: shop } = await getMyShop();
  console.log("🚀 ~ MyShop ~ shop:", shop);

  return (
    <div className="container w-full py-10">
      {/* Header with background */}
      <div className="relative w-full h-48 md:h-64 bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl overflow-hidden mb-16">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTAtMTZjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTE2IDE2YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNG0tMTYgMTZjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTE2IDBjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTAtMTZjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00TTIwIDM0YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNG0wLTE2YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNG0tMTYgMTZjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTE2IDE2YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNG0tMTYgMGMwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTRtMC0xNmMwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTQiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>

        {/* Shop logo */}
        <div className="absolute bottom-2 left-8 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full shadow-lg p-1">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image src={shop?.logo || "/placeholder.svg"} alt={shop.shopName} fill className="object-cover" />
          </div>
        </div>

        {/* Edit button */}
        <Button variant="secondary" size="sm" className="absolute top-4 right-4 gap-1.5">
          <Edit className="w-4 h-4" />
          <span>Edit Shop</span>
        </Button>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Shop details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shop name and established year */}
          <div className="pl-8 md:pl-10">
            <h1 className="text-3xl font-bold text-gray-900">{shop.shopName}</h1>
            <div className="flex items-center gap-2 mt-1 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Established {shop.establishedYear}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="ml-1">{shop.ratings || "New Shop"}</span>
              </div>
            </div>
          </div>

          {/* Shop information card */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-green-600" />
                Shop Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Address</p>
                      <p className="text-gray-700">{shop.address}</p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Contact Number</p>
                      <p className="text-gray-700">{shop.contactNumber}</p>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex gap-3">
                    <Globe className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Website</p>
                      <a href={shop.website} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                        {shop.website.replace("https://www.", "")}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Business License */}
                  <div className="flex gap-3">
                    <Shield className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Business License</p>
                      <p className="text-gray-700">{shop.businessLicenseNumber}</p>
                    </div>
                  </div>

                  {/* Tax ID */}
                  <div className="flex gap-3">
                    <Shield className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Tax ID</p>
                      <p className="text-gray-700">{shop.taxIdentificationNumber}</p>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Last Updated</p>
                      <p className="text-gray-700">
                        {new Date(shop.updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Services Offered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {shop.servicesOffered.map((service: any, index: number) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 bg-green-50 text-green-700 hover:bg-green-100">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Links */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Social Media</h2>
              <div className="flex flex-wrap gap-3">
                <Link href={shop.socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Facebook className="w-5 h-5 text-green-600" />
                    <span>Facebook</span>
                  </Button>
                </Link>
                <Link href={shop.socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Twitter className="w-5 h-5 text-green-400" />
                    <span>Twitter</span>
                  </Button>
                </Link>
                <Link href={shop.socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Instagram className="w-5 h-5 text-green-600" />
                    <span>Instagram</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Owner info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" />
                Shop Owner
              </h2>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {shop.user.name
                    .split(" ")
                    .map((n: any) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-medium text-lg">{shop.user.name}</h3>
                  <p className="text-gray-500 text-sm">Shop Owner</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-gray-500 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <p className="text-gray-700">{shop.user.email}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-gray-500 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Last Login</p>
                    <p className="text-gray-700">
                      {new Date(shop.user.lastLogin).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-3">
                <Button className="w-full justify-start gap-2 bg-green-600 hover:bg-green-700">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Manage Products</span>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Edit className="w-5 h-5" />
                  <span>Edit Shop Profile</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyShop;
