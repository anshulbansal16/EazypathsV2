import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Heart, Shield, Star, FileText, Activity } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import HealthCheckupForm from "@/components/health-checkup-form"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="relative flex items-center justify-center">
              <Activity className="h-6 w-6 text-primary" />
              <Heart className="h-4 w-4 text-secondary absolute" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Eazypaths
            </span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Services
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-healthcare-light to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-primary">
                    Find the best health check-up packages tailored for you
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Fast, reliable, and AI-driven recommendations based on your specific health needs and preferences.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#health-form">
                    <Button size="lg" className="gap-1">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Personalized</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Trusted Providers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-primary" />
                    <span>Top Rated</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Previous Reports Analysis</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="h-4 w-4 text-primary" />
                    <span>AI Health Insights</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-xl border bg-white p-6 shadow-sm">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold text-primary" id="health-form">
                    Tell us about yourself
                  </h2>
                  <p className="text-muted-foreground">
                    We'll use this information to find the best health check-up packages for you.
                  </p>
                </div>
                <HealthCheckupForm />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-accent">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary">How it works</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Our AI-powered platform finds the best health check-up packages based on your needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-primary/20 bg-white">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary">Share your details</h3>
                    <p className="text-muted-foreground">
                      Fill out a simple form with your health concerns and preferences. Upload previous reports for
                      better recommendations.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-white">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary">AI Analysis</h3>
                    <p className="text-muted-foreground">
                      Our AI analyzes your inputs and previous reports to find the most suitable packages for your
                      health needs.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-white">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary">Get Recommendations</h3>
                    <p className="text-muted-foreground">
                      Review personalized health check-up packages and AI insights based on your health profile.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary">
                  Why Choose Eazypaths
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  We combine AI technology with healthcare expertise to provide you with the best recommendations.
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">AI-Powered Analysis</h3>
                <p className="text-muted-foreground">
                  Our advanced AI analyzes your health profile and previous reports to provide personalized
                  recommendations.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">Previous Reports Integration</h3>
                <p className="text-muted-foreground">
                  Upload your previous health check-up reports for more accurate and relevant package recommendations.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">Trusted Providers</h3>
                <p className="text-muted-foreground">
                  We partner with the most reputable healthcare providers to ensure quality service.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-healthcare-light">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary">
                  Get AI insights from your previous health reports
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Our AI analyzes your previous health check-up reports to identify trends, potential concerns, and
                  recommend the most suitable packages for your ongoing health needs.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span>Trend analysis of key health parameters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span>Identification of areas needing attention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span>Personalized recommendations based on your health history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span>Comparison with age and gender-specific health benchmarks</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="AI Health Insights"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex flex-col gap-2 md:gap-4 lg:flex-1">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Eazypaths</span>
            </Link>
            <p className="text-sm text-muted-foreground md:max-w-xs">
              Eazypaths helps you find the best health check-up packages tailored to your specific needs.
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-primary">Company</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-primary">Services</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Health Packages
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Providers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Locations
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-primary">Legal</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container flex flex-col items-center justify-between gap-4 border-t py-6 md:h-16 md:flex-row md:py-0">
          <p className="text-xs text-muted-foreground">© 2024 Eazypaths. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

