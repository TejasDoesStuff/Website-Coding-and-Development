"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Edit } from "lucide-react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from 'date-fns';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Application {
    listingId: string;
    listingName: string;
    message: string;
    appliedAt: string;
    status: number; // 0: pending, 1: accepted, -1: rejected
}

export default function OptionsUser() {
  const [name, setName] = useState<string | null>("username");
  const [userId, setUserId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [editingMessage, setEditingMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    axios.get("https://connexting.ineshd.com/api/user", { withCredentials: true })
      .then(response => {
        setName(response.data.name);
        setUserId(response.data._id);
      })
      .catch(error => {
        setName("username");
      });
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
        try {
            const response = await axios.get(
                'https://connexting.ineshd.com/api/user/applications',
                { withCredentials: true }
            );
            setApplications(response.data.applications);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    fetchApplications();
  }, []);

  // Function to fetch the resume URL
  const fetchResumeUrl = async () => {
    if (!userId) return;
    const response = await axios.get(`/api/upload/resume/${userId}`);
    setResumeUrl(response.data.url);
  };

  // Call fetchResumeUrl after the component mounts and userId changes
  useEffect(() => {
    if (userId) {
      fetchResumeUrl();
    }
  }, [userId]);

  // Form schemas
  const usernameSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." }),
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

  async function handleSubmit(formName: string, data: any) {
    if (formName === "Username") {
      try {
        const response = await axios.patch(
          'https://connexting.ineshd.com/api/user',
          { name: data.username },
          { withCredentials: true }
        );
        // Update the displayed name after successful update
        setName(response.data.name);
        usernameMethod.reset(); // Reset form after successful submission
      } catch (error) {
        console.error('Error updating username:', error);
        // You may want to show an error message to the user here
      }
    } else if (formName === "Resume") {
      try {
        const formData = new FormData();
        formData.append('file', data.resume);

        const response = await axios.post(
          'https://connexting.ineshd.com/api/upload/resume',
          formData,
          { withCredentials: true }
        );

        // Fetch the resume URL after successful upload
        if (response.status === 200) {
          fetchResumeUrl(); // Update the resume URL state
          setAlertMessage(response.data.message); // Set the success message
          setAlertOpen(true); // Open the alert dialog
        }
      } catch (error) {
        console.error('Error uploading resume:', error);
        setAlertMessage('Failed to upload resume.');
        setAlertOpen(true);
      }
    } else {
      // Handle other form submissions
      console.log(`${formName} form submitted:`, data);
    }
  }

  const handleWithdraw = async (listingId: string) => {
    if (!confirm('Are you sure you want to withdraw this application?')) return;

    try {
        await axios.delete('https://connexting.ineshd.com/api/user/applications', {
            data: { listingId },
            withCredentials: true
        });
        setApplications(applications.filter(app => app.listingId !== listingId));
    } catch (error) {
        console.error('Error withdrawing application:', error);
        alert('Failed to withdraw application');
    }
  };

  const handleDeleteAccount = async () => {
    try {
        const response = await axios.delete(
            'https://connexting.ineshd.com/api/user',
            { withCredentials: true }
        );
        if (response.status === 200) {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account');
    }
  };

  return (
    <div className="w-full flex flex-col right-0 flex-1 overflow-y-scroll scroll-smooth">
      {/* Header */}
      <div className="mx-16 mt-8">
        <h1 className="text-5xl font-bold flex flex-col md:flex-row items-center text-center md:text-left">
          Welcome&nbsp;
          <span className="underline underline-offset-4">{name}</span>
        </h1>
      </div>

      {/* Profile Section */}
      <div className="md:m-16 flex flex-col" id="profile">
        <h3 className="text-2xl sticky top-0 backdrop-blur border-b border-gray-500 p-6 text-center md:text-left">
          Profile
        </h3>
        <div className="m-6 text-md md:w-1/2 space-y-6">
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

          <div className="mt-8 border-t pt-8">
            <h4 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h4>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Account</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete your account? This action cannot be undone.
                            All your applications and data will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteAccount}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            Delete Account
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Resume Section */}
      <div className="md:m-16 flex flex-col" id="resume">
        <h3 className="text-2xl sticky top-0 backdrop-blur border-b border-gray-500 p-6 text-center md:text-left">
          Resume
        </h3>
        <div className="m-6 text-md md:w-1/2 space-y-6">
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

          {/* Display the resume link if it exists */}
          {resumeUrl && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Your Resume:</h4>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Download Resume
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Applications Section */}
      <div className="md:m-16 flex flex-col" id="applications">
        <h3 className="text-2xl sticky top-0 backdrop-blur border-b border-gray-500 p-6 text-center md:text-left">
          My Applications
        </h3>
        <ScrollArea className="h-[500px] rounded-md border p-4">
            {applications.length === 0 ? (
                <p className="text-center text-muted-foreground">No applications yet</p>
            ) : (
                <div className="space-y-6">
                    {applications.map((application) => (
                        <div key={application.listingId} className="p-4 border rounded-lg space-y-2">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold">{application.listingName}</h4>
                                <time className="text-sm text-muted-foreground">
                                    {format(new Date(application.appliedAt), 'PPp')}
                                </time>
                            </div>
                            <div className="rounded-md bg-muted p-3">
                                <p className="text-sm">{application.message}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-sm">
                                    Status: {' '}
                                    <span className={
                                        application.status === 1 ? 'text-green-600' :
                                        application.status === -1 ? 'text-red-600' :
                                        'text-yellow-600'
                                    }>
                                        {application.status === 1 ? 'Accepted' :
                                         application.status === -1 ? 'Rejected' :
                                         'Pending'}
                                    </span>
                                </div>
                                <div className="space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => router.push(`/listing/${application.listingId}`)}
                                    >
                                        View Listing
                                    </Button>
                                    {application.status === 0 && ( // Only show withdraw button for pending applications
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleWithdraw(application.listingId)}
                                        >
                                            Withdraw
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ScrollArea>
      </div>

      {/* Alert Dialog for confirmation */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Successfully uploaded resume!</AlertDialogTitle>
          <AlertDialogCancel onClick={() => setAlertOpen(false)}>Close</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
