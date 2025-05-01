"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Activity, Calendar, CheckCircle2, Clock, Edit, Globe, Mail, Monitor, Server, Settings, Shield, Smartphone, Store } from "lucide-react";
import { useState } from "react";
import ChangePasswordForm from "../../auth/changePassword/ChangePasswordForm";

interface ClientInfo {
  browser?: string;
  device?: string;
  ipAddress?: string;
  os?: string;
  pcName?: string;
  userAgent?: string;
}

interface UserProfile {
  _id?: string;
  gender?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: string;
  __v?: number;
}

interface UserProfileData {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
  hasShop?: boolean;
  createdAt?: string;
  lastLogin?: string;
  profile?: UserProfile;
  clientInfo?: ClientInfo;
  __v?: number;
}

interface UserProfileProps {
  user?: UserProfileData;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Early return with loading state if user data is not available
  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-8 flex justify-center items-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading user profile...</p>
        </div>
      </div>
    );
  }

  // Format dates for better readability with fallbacks
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "PPP");
    } catch (error) {
      console.error("Invalid date format:", error);
      return "Invalid date";
    }
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "PPp");
    } catch (error) {
      console.error("Invalid date format:", error);
      return "Invalid date";
    }
  };

  // Calculate account age with proper error handling
  const accountAge = () => {
    if (!user.createdAt) return "N/A";

    try {
      const createdDate = new Date(user.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - createdDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 30) return `${diffDays} days`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
      return `${Math.floor(diffDays / 365)} years`;
    } catch (error) {
      console.error("Error calculating account age:", error);
      return "N/A";
    }
  };

  // Get initials for avatar fallback with proper error handling
  const getInitials = (name?: string) => {
    if (!name) return "U";

    return name
      .split(" ")
      ?.map((part) => part[0] || "")
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  const userName = user.name || "User";
  const userEmail = user.email || "No email provided";
  const userRole = user.role || "user";
  const userIsActive = user.isActive ?? false;
  const userHasShop = user.hasShop ?? false;
  const userCreatedAt = user.createdAt;
  const userLastLogin = user.lastLogin;
  const userGender = user.profile?.gender || "Not specified";
  const profileUpdatedAt = user.profile?.updatedAt;
  const clientDevice = user.clientInfo?.device || "Unknown";
  const clientBrowser = user.clientInfo?.browser || "Unknown";
  const clientIpAddress = user.clientInfo?.ipAddress || "Unknown";
  const clientOs = user.clientInfo?.os || "Unknown";

  return (
    <div className="w-full container mx-auto">
      {/* Profile Header */}
      <div className="relative mb-8">
        {/* Cover Image */}
        <div className="h-48 md:h-64 w-full rounded-xl overflow-hidden bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent h-48 md:h-64" />
        </div>

        {/* Profile Info */}
        <div className="relative px-4 sm:px-6 lg:px-8 -mt-24">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-end">
            <Avatar className="h-32 w-32 border-4 border-background rounded-full shadow-lg">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt={userName} />
              <AvatarFallback className="text-3xl">{getInitials(userName)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">{userName}</h1>
                {userIsActive && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                <Mail className="h-4 w-4" />
                <span>{userEmail}</span>
              </div>

              <div className="flex flex-wrap gap-3 mt-3">
                <Badge variant="secondary" className="rounded-full">
                  <Shield className="h-3.5 w-3.5 mr-1" />
                  {userRole === "admin" ? "Administrator" : "User"}
                </Badge>
                {userCreatedAt && (
                  <Badge variant="secondary" className="rounded-full">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    Member since {formatDate(userCreatedAt).split(",")[0]}
                  </Badge>
                )}
                {userHasShop && (
                  <Badge variant="secondary" className="rounded-full">
                    <Store className="h-3.5 w-3.5 mr-1" />
                    Shop Owner
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-2 md:ml-auto mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="rounded-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <div className="border-b">
          <div className="px-4 sm:px-6 lg:px-8">
            <TabsList className="h-12 bg-transparent border-b-0 p-0 w-full justify-start gap-6">
              <TabsTrigger
                value="overview"
                className={`h-12 px-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none ${
                  activeTab === "overview" ? "text-primary" : ""
                }`}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className={`h-12 px-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none ${
                  activeTab === "activity" ? "text-primary" : ""
                }`}
              >
                Activity
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className={`h-12 px-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none ${
                  activeTab === "security" ? "text-primary" : ""
                }`}
              >
                Security
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardDescription>Account Age</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{accountAge()}</div>
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardDescription>Last Login</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{userLastLogin ? formatDate(userLastLogin).split(",")[0] : "N/A"}</div>
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardDescription>Role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold capitalize">{userRole}</div>
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardDescription>Status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{userIsActive ? "Active" : "Inactive"}</div>
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Personal Information */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic account details and personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Full Name</div>
                      <div className="font-medium">{userName}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Email Address</div>
                      <div className="font-medium">{userEmail}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Gender</div>
                      <div className="font-medium">{userGender}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Member Since</div>
                      <div className="font-medium">{formatDate(userCreatedAt)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Device Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Device Information</CardTitle>
                  <CardDescription>Your current device and connection details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Monitor className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Device</div>
                        <div className="font-medium">{clientDevice}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Browser</div>
                        <div className="font-medium">{clientBrowser}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Server className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">IP Address</div>
                        <div className="font-medium">{clientIpAddress}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Operating System</div>
                        <div className="font-medium">{clientOs}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent account activity and login history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {userLastLogin && (
                    <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-muted">
                      <div className="absolute left-0 top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-primary"></div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Logged in successfully</div>
                        <div className="text-xs text-muted-foreground">{formatDateTime(userLastLogin)}</div>
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Device:</span> {clientDevice} •
                          <span className="text-muted-foreground ml-1">IP:</span> {clientIpAddress}
                        </div>
                      </div>
                    </div>
                  )}

                  {profileUpdatedAt && (
                    <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-muted">
                      <div className="absolute left-0 top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-primary"></div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Profile updated</div>
                        <div className="text-xs text-muted-foreground">{formatDateTime(profileUpdatedAt)}</div>
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Updated profile information</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {userCreatedAt && (
                    <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-muted">
                      <div className="absolute left-0 top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-primary"></div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Account created</div>
                        <div className="text-xs text-muted-foreground">{formatDateTime(userCreatedAt)}</div>
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Welcome to our platform!</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {!userLastLogin && !profileUpdatedAt && !userCreatedAt && (
                    <div className="py-8 text-center text-muted-foreground">No activity records found</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Update your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChangePasswordForm />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Active Sessions</div>
                      <div className="text-sm text-muted-foreground">Manage your active sessions</div>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Delete Account</div>
                      <div className="text-sm text-muted-foreground">Permanently delete your account and all data</div>
                    </div>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default UserProfile;
