"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadIcon as FileUpload } from "lucide-react"
import { CheckCircle2 } from "lucide-react"

const healthConcerns = [
  { id: "general", label: "General Health" },
  { id: "heart", label: "Heart Health" },
  { id: "diabetes", label: "Diabetes" },
  { id: "thyroid", label: "Thyroid" },
  { id: "liver", label: "Liver Function" },
  { id: "kidney", label: "Kidney Function" },
  { id: "bone", label: "Bone Health" },
  { id: "vitamin", label: "Vitamin Deficiency" },
]

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z.string().refine(
    (val) => {
      const age = Number.parseInt(val, 10)
      return !isNaN(age) && age > 0 && age < 120
    },
    {
      message: "Please enter a valid age between 1-120.",
    },
  ),
  gender: z.string({
    required_error: "Please select a gender.",
  }),
  location: z.string({
    required_error: "Please select your location.",
  }),
  concerns: z.array(z.string()).optional(),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit phone number.",
  }),
  hasReports: z.boolean().optional(),
})

export default function HealthCheckupForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [fileUploaded, setFileUploaded] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      location: "Noida",
      concerns: [],
      phone: "",
      hasReports: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    // In a real app, you would send this data to your backend
    console.log(values)

    // For demo purposes, we'll just navigate to the results page with query params
    const queryParams = new URLSearchParams({
      name: values.name,
      age: values.age,
      gender: values.gender,
      location: values.location,
      concerns: values.concerns?.join(",") || "",
      phone: values.phone,
      hasReports: values.hasReports ? "true" : "false",
    }).toString()

    // Simulate API call delay
    setTimeout(() => {
      router.push(`/recommendations?${queryParams}`)
    }, 1000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setFileUploaded(true)
      form.setValue("hasReports", true)
    }
  }

  return (
    <Tabs defaultValue="basic" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="reports">Previous Reports</TabsTrigger>
      </TabsList>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <TabsContent value="basic" className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter your age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Noida">Noida</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Gurgaon">Gurgaon</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="concerns"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Health Concerns</FormLabel>
                    <FormDescription>Select all that apply to you</FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {healthConcerns.map((concern) => (
                      <FormField
                        key={concern.id}
                        control={form.control}
                        name="concerns"
                        render={({ field }) => {
                          return (
                            <FormItem key={concern.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(concern.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), concern.id])
                                      : field.onChange(field.value?.filter((value) => value !== concern.id))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{concern.label}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your 10-digit phone number" {...field} />
                  </FormControl>
                  <FormDescription>We'll send your recommendations via SMS</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between gap-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab("reports")}>
                Next: Upload Reports
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? "Finding packages..." : "Submit"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-primary">Previous Health Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your previous health check-up reports for more accurate recommendations and AI insights.
                </p>
              </div>

              <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <FileUpload className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Drag and drop your files here</h4>
                    <p className="text-xs text-muted-foreground">Supported formats: PDF, JPG, PNG (Max size: 10MB)</p>
                  </div>
                  <div>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium">
                        Browse Files
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {fileUploaded && (
                <div className="bg-accent p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Files uploaded successfully!</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Our AI will analyze your reports to provide personalized recommendations.
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                  Back to Basic Info
                </Button>
                <Button type="submit" className="bg-primary" disabled={loading}>
                  {loading ? "Finding packages..." : "Find My Packages"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </form>
      </Form>
    </Tabs>
  )
}

