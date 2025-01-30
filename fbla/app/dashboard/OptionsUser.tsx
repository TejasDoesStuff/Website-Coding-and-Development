"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UserInfo from "./forms/user/UserInfo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OptionsUser() {
  const [preview, setPreview] = useState<string | null>(null);

  // Form schemas
  const usernameSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." }),
  });

  const gpaSchema = z.object({
    gpa: z
      .string()
      .regex(
        /^\d(\.\d{1,2})?$/,
        "GPA must be a valid number with up to two decimal places"
      )
      .optional(),
  });

  const courseworkSchema = z.object({
    coursework: z
      .string()
      .min(5, "Coursework should be at least 5 characters")
      .optional(),
  });

  const experienceSchema = z.object({
    experience: z
      .string()
      .min(10, "Experience description should be at least 10 characters")
      .optional(),
  });

  const resumeSchema = z.object({
    resume: z
      .instanceof(File)
      .refine((file) => file?.type === "application/pdf", {
        message: "Only PDF files are allowed.",
      }),
  });

  // Form instances
  const usernameMethod = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {},
  });

  const gpaForm = useForm<z.infer<typeof gpaSchema>>({
    resolver: zodResolver(gpaSchema),
    defaultValues: { gpa: "" },
  });

  const courseworkForm = useForm<z.infer<typeof courseworkSchema>>({
    resolver: zodResolver(courseworkSchema),
    defaultValues: { coursework: "" },
  });

  const experienceForm = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: { experience: "" },
  });

  const resumeUploadForm = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: { resume: undefined },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }

  function handleSubmit(formName: string, data: any) {
    console.log(`${formName} form submitted:`, data);
  }

  return (
    <div className="w-4/5 h-full flex flex-col absolute right-0 overflow-y-scroll scroll-smooth">
      {/* Header */}
      <div className="mx-16 mt-8">
        <h1 className="text-5xl font-bold">
          Welcome{" "}
          <span className="underline underline-offset-4">username.</span>
        </h1>
      </div>

      {/* Profile Section */}
      <div className="m-16 flex flex-col" id="profile">
        <h3 className="text-2xl sticky top-0 backdrop-blur border-b border-gray-500 p-6 z-10">
          Profile
        </h3>
        <div className="m-6 text-md w-1/2">
          {/* Username Form */}
          <FormProvider {...usernameMethod}>
            <form
              onSubmit={usernameMethod.handleSubmit((data) =>
                handleSubmit("Username", data)
              )}
              className="space-y-4 my-4"
            >
              <FormField
                control={usernameMethod.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="secondary" className="mt-4 mb-6">
                Update Username
              </Button>
            </form>
          </FormProvider>


        </div>
      </div>

      {/* Resume Section */}
      <div className="m-16 flex w-1/2 flex-col" id="resume">
        <h3 className="text-2xl sticky top-0 backdrop-blur-sm p-6 border-b border-gray-500 z-10">
          Resume
        </h3>
        <div className="m-6 text-md space-y-6">
          {/* Resume Upload Form */}
          <FormProvider {...resumeUploadForm}>
            <form
              onSubmit={resumeUploadForm.handleSubmit((data) =>
                handleSubmit("Resume", data)
              )}
              className="space-y-4"
            >
              <FormField
  control={resumeUploadForm.control}
  name="resume"
  render={({ field: { onChange, onBlur, ref, ...rest } }) => (
    <FormItem>
      <FormLabel>Resume</FormLabel>
      <FormControl>
        <Input 
          type="file" 
          accept="application/pdf" 
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              onChange(file);
            }
          }} 
          onBlur={onBlur}
          ref={ref}
        />
      </FormControl>
      <FormDescription>Upload your resume (PDF only).</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>

              <Button type="submit" variant="secondary">
                Upload Resume
              </Button>
            </form>
          </FormProvider>

          {/* GPA Form */}
          <FormProvider {...gpaForm}>
            <form
              onSubmit={gpaForm.handleSubmit((data) =>
                handleSubmit("GPA", data)
              )}
              className="space-y-4"
            >
              <FormField
                control={gpaForm.control}
                name="gpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GPA</FormLabel>
                    <FormControl>
                      <Input placeholder="4.0" {...field} />
                    </FormControl>
                    <FormDescription>Your current GPA.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="secondary">
                Save GPA
              </Button>
            </form>
          </FormProvider>

          {/* Coursework Form */}
          <FormProvider {...courseworkForm}>
            <form
              onSubmit={courseworkForm.handleSubmit((data) =>
                handleSubmit("Coursework", data)
              )}
              className="space-y-4"
            >
              <FormField
                control={courseworkForm.control}
                name="coursework"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coursework</FormLabel>
                    <FormControl>
                      <Input placeholder="Coursework" {...field} />
                    </FormControl>
                    <FormDescription>Relevant coursework.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="secondary">
                Save Coursework
              </Button>
            </form>
          </FormProvider>

          {/* Experience Form */}
          <FormProvider {...experienceForm}>
            <form
              onSubmit={experienceForm.handleSubmit((data) =>
                handleSubmit("Experience", data)
              )}
              className="space-y-4"
            >
              <FormField
                control={experienceForm.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience</FormLabel>
                    <FormControl>
                      <Input placeholder="Experience" {...field} />
                    </FormControl>
                    <FormDescription>Work experience.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="secondary">
                Save Experience
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
