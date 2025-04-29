"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Filter,
  MapPin,
  Star,
  Heart,
  Activity,
  BarChart,
  PieChart,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  UploadIcon as FileUpload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for health packages
const mockPackages = [
  {
    id: 1,
    name: "Comprehensive Health Checkup",
    provider: "Apollo Hospitals",
    location: "Bangalore",
    price: 2999,
    rating: 4.8,
    tests: [
      "Complete Blood Count",
      "Liver Function Test",
      "Kidney Function Test",
      "Lipid Profile",
      "Blood Sugar (Fasting)",
      "Thyroid Profile",
      "Urine Routine",
      "Chest X-Ray",
      "ECG",
    ],
    image: "/placeholder.svg?height=100&width=200",
    recommended: true,
    matchReason: "Based on your age and health concerns",
  },
  {
    id: 2,
    name: "Basic Health Checkup",
    provider: "Manipal Hospitals",
    location: "Bangalore",
    price: 1499,
    rating: 4.5,
    tests: [
      "Complete Blood Count",
      "Liver Function Test",
      "Kidney Function Test",
      "Lipid Profile",
      "Blood Sugar (Fasting)",
      "Urine Routine",
    ],
    image: "/placeholder.svg?height=100&width=200",
    recommended: false,
    matchReason: "Affordable option covering essential tests",
  },
  {
    id: 3,
    name: "Executive Health Checkup",
    provider: "Fortis Healthcare",
    location: "Bangalore",
    price: 4999,
    rating: 4.7,
    tests: [
      "Complete Blood Count",
      "Liver Function Test",
      "Kidney Function Test",
      "Lipid Profile",
      "Blood Sugar (Fasting & PP)",
      "Thyroid Profile",
      "Urine Routine",
      "Chest X-Ray",
      "ECG",
      "Ultrasound Abdomen",
      "Vitamin B12",
      "Vitamin D",
    ],
    image: "/placeholder.svg?height=100&width=200",
    recommended: false,
    matchReason: "Comprehensive option with advanced diagnostics",
  },
  {
    id: 4,
    name: "Diabetes Screening Package",
    provider: "Medanta",
    location: "Delhi",
    price: 1999,
    rating: 4.6,
    tests: [
      "Fasting Blood Sugar",
      "Post Prandial Blood Sugar",
      "HbA1c",
      "Kidney Function Test",
      "Lipid Profile",
      "Urine Routine",
    ],
    image: "/placeholder.svg?height=100&width=200",
    recommended: false,
    matchReason: "Focused on diabetes monitoring and prevention",
  },
  {
    id: 5,
    name: "Heart Health Package",
    provider: "Max Healthcare",
    location: "Delhi",
    price: 3499,
    rating: 4.9,
    tests: ["Lipid Profile", "ECG", "2D Echo", "Treadmill Test (TMT)", "Chest X-Ray", "Complete Blood Count"],
    image: "/placeholder.svg?height=100&width=200",
    recommended: false,
    matchReason: "Specialized for cardiovascular health assessment",
  },
]

// Mock AI insights data
const mockAIInsights = {
  summary: "Based on your previous reports and profile, we've identified several key areas to monitor.",
  keyFindings: [
    {
      parameter: "Blood Glucose",
      status: "Elevated",
      recommendation: "Regular monitoring recommended",
      icon: <TrendingUp className="h-5 w-5 text-healthcare-blue" />,
    },
    {
      parameter: "Cholesterol",
      status: "Within normal range",
      recommendation: "Continue healthy diet",
      icon: <BarChart className="h-5 w-5 text-healthcare-green" />,
    },
    {
      parameter: "Vitamin D",
      status: "Below optimal",
      recommendation: "Supplementation may be beneficial",
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
    },
  ],
  recommendedTests: ["HbA1c", "Lipid Profile", "Vitamin D", "Thyroid Function", "Liver Function"],
  healthTrends: {
    improving: ["HDL Cholesterol"],
    stable: ["Hemoglobin", "WBC Count"],
    needsAttention: ["Fasting Glucose", "Vitamin D"],
  },
}

export default function RecommendationsPage() {
  const searchParams = useSearchParams()
  const [packages, setPackages] = useState<typeof mockPackages>([])
  const [loading, setLoading] = useState(true)
  const [sortOption, setSortOption] = useState("recommended")
  const [aiInsights, setAiInsights] = useState(mockAIInsights)

  // Get user data from URL params
  const name = searchParams.get("name") || ""
  const age = searchParams.get("age") || ""
  const gender = searchParams.get("gender") || ""
  const location = searchParams.get("location") || ""
  const concerns = searchParams.get("concerns")?.split(",") || []
  const hasReports = searchParams.get("hasReports") === "true"

  const router = useRouter()

  useEffect(() => {
    // Simulate API call to get recommendations
    setTimeout(() => {
      // Filter packages based on concerns
      const filteredPackages = [...mockPackages]

      // If diabetes is a concern, prioritize diabetes package
      if (concerns.includes("diabetes")) {
        const diabetesPackage = filteredPackages.find((p) => p.id === 4)
        if (diabetesPackage) {
          diabetesPackage.recommended = true
        }
      }

      // If heart is a concern, prioritize heart package
      if (concerns.includes("heart")) {
        const heartPackage = filteredPackages.find((p) => p.id === 5)
        if (heartPackage) {
          heartPackage.recommended = true
        }
      }

      // If user has uploaded previous reports, prioritize comprehensive package
      if (hasReports) {
        const comprehensivePackage = filteredPackages.find((p) => p.id === 1)
        if (comprehensivePackage) {
          comprehensivePackage.recommended = true
          comprehensivePackage.matchReason = "Based on your previous reports and health profile"
        }
      }

      // Sort packages
      sortPackages(filteredPackages, sortOption)

      setPackages(filteredPackages)
      setLoading(false)
    }, 1000)
  }, [concerns, hasReports])

  // Function to sort packages
  const sortPackages = (packages: typeof mockPackages, option: string) => {
    const sortedPackages = [...packages]

    switch (option) {
      case "recommended":
        sortedPackages.sort((a, b) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0))
        break
      case "price-low":
        sortedPackages.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sortedPackages.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sortedPackages.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    // Always show only top 3
    return sortedPackages.slice(0, 3)
  }

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortOption(value)
    setPackages(sortPackages([...packages], value))
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <h2 className="text-xl font-semibold text-primary">Finding the best packages for you...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-healthcare-light">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">Eazypaths</span>
          </Link>
          <Link href="/" className="ml-8 flex items-center gap-2 text-sm">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="recommendations" className="w-full">
              <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-primary">Your Health Check-up Recommendations</h1>
                <p className="text-muted-foreground">
                  Based on your profile: {name}, {age} years, {gender}, {location}
                  {concerns.length > 0 && ` with concerns about ${concerns.join(", ")}`}
                  {hasReports && ` and your previous health reports`}
                </p>
                <TabsList className="w-full sm:w-auto mt-4">
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="ai-insights" disabled={!hasReports}>
                    AI Insights {!hasReports && "(Upload reports to unlock)"}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="recommendations" className="space-y-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Showing top 3 recommended packages</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Sort by
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuRadioGroup value={sortOption} onValueChange={handleSortChange}>
                        <DropdownMenuRadioItem value="recommended">Recommended</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="price-low">Price: Low to High</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="price-high">Price: High to Low</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="rating">Highest Rated</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {packages.slice(0, 3).map((pkg) => (
                    <Card key={pkg.id} className={`${pkg.recommended ? "border-primary" : ""} bg-white`}>
                      {pkg.recommended && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          Best Match
                        </div>
                      )}
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-primary">{pkg.name}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {pkg.provider}, {pkg.location}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded text-xs font-medium">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            {pkg.rating}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <p className="text-2xl font-bold text-primary">₹{pkg.price}</p>
                            <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>
                          </div>
                          <Image
                            src={pkg.image || "/placeholder.svg"}
                            alt={pkg.provider}
                            width={80}
                            height={40}
                            className="rounded object-contain"
                          />
                        </div>
                        <div className="mb-3">
                          <p className="text-xs text-muted-foreground mb-1">Why this package?</p>
                          <p className="text-sm">{pkg.matchReason}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Includes {pkg.tests.length} tests:</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {pkg.tests.slice(0, 5).map((test, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-accent text-primary">
                                {test}
                              </Badge>
                            ))}
                            {pkg.tests.length > 5 && (
                              <Badge variant="outline" className="text-xs bg-accent text-primary">
                                +{pkg.tests.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-primary hover:bg-primary/90">Book Now</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-4 mt-8 p-6 border rounded-lg bg-white">
                  <h3 className="text-xl font-semibold text-primary">Need more options?</h3>
                  <p className="text-center text-muted-foreground">
                    Our health experts can help you find the perfect health check-up package for your specific needs.
                  </p>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Talk to an Expert
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="ai-insights" className="space-y-8">
                {hasReports ? (
                  <>
                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="rounded-full bg-primary/10 p-3 mt-1">
                          <Activity className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-primary mb-2">AI Health Insights</h3>
                          <p className="text-muted-foreground">{aiInsights.summary}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-primary mb-4">Key Findings</h4>
                          <div className="space-y-4">
                            {aiInsights.keyFindings.map((finding, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent">
                                <div className="mt-1">{finding.icon}</div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-medium">{finding.parameter}</h5>
                                    <Badge variant="outline" className="text-xs">
                                      {finding.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{finding.recommendation}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-primary mb-4">Health Trends</h4>
                          <div className="space-y-4">
                            <div className="p-3 rounded-lg bg-accent">
                              <h5 className="text-sm font-medium flex items-center gap-2 mb-2">
                                <TrendingUp className="h-4 w-4 text-healthcare-green" />
                                Improving
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {aiInsights.healthTrends.improving.map((item, index) => (
                                  <Badge
                                    key={index}
                                    className="bg-healthcare-green/20 text-healthcare-green border-healthcare-green"
                                  >
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="p-3 rounded-lg bg-accent">
                              <h5 className="text-sm font-medium flex items-center gap-2 mb-2">
                                <BarChart className="h-4 w-4 text-healthcare-blue" />
                                Stable
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {aiInsights.healthTrends.stable.map((item, index) => (
                                  <Badge
                                    key={index}
                                    className="bg-healthcare-blue/20 text-healthcare-blue border-healthcare-blue"
                                  >
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="p-3 rounded-lg bg-accent">
                              <h5 className="text-sm font-medium flex items-center gap-2 mb-2">
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                                Needs Attention
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {aiInsights.healthTrends.needsAttention.map((item, index) => (
                                  <Badge key={index} className="bg-amber-500/20 text-amber-500 border-amber-500">
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                      <h3 className="text-xl font-bold text-primary mb-4">Recommended Tests Based on Your Reports</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-muted-foreground mb-4">
                            Based on your previous reports, our AI recommends the following tests for your next health
                            check-up:
                          </p>
                          <ul className="space-y-2">
                            {aiInsights.recommendedTests.map((test, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                <span>{test}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <div className="inline-block rounded-full bg-primary/10 p-4 mb-4">
                              <PieChart className="h-12 w-12 text-primary" />
                            </div>
                            <h4 className="font-medium text-primary mb-2">Health Score</h4>
                            <div className="text-3xl font-bold">78/100</div>
                            <p className="text-sm text-muted-foreground mt-2">Good, with room for improvement</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center mt-8">
                      <Button className="bg-primary hover:bg-primary/90">Download Full AI Health Report</Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                    <div className="rounded-full bg-primary/10 p-4">
                      <FileUpload className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Upload Your Previous Reports</h3>
                    <p className="text-muted-foreground max-w-md">
                      To get AI insights based on your health history, please upload your previous health check-up
                      reports.
                    </p>
                    <Button className="mt-2 bg-primary hover:bg-primary/90" onClick={() => router.push("/")}>
                      Go Back to Upload Reports
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center py-8">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <span className="text-xl font-bold text-primary">Eazypaths</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 Eazypaths. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

