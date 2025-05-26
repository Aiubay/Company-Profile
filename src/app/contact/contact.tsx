"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button"; 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; 
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea"; 
import { cn } from "@/lib/utils"; 
import { Card } from "@/components/ui/card";

const generateCaptcha = (length: number = 6): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};


const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  phoneNumber: z.string().optional(), 
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
  company: z.string().optional(), 
  subject: z.string().min(1, { message: "Subject is required." }),
  question: z.string().min(1, { message: "Question is required." }),
  captcha: z.string().min(1, { message: "CAPTCHA is required." }), 
});


type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [submissionAttemptedAndFailed, setSubmissionAttemptedAndFailed] =
    useState(false);
  const [currentCaptcha, setCurrentCaptcha] = useState<string>("");

  const refreshCaptcha = useCallback(() => {
    const newCaptcha = generateCaptcha();
    setCurrentCaptcha(newCaptcha);
    if (form) {
      
      form.setValue("captcha", ""); 
      form.clearErrors("captcha"); 
    }
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(
      formSchema.refine(
        (data) => data.captcha === currentCaptcha, 
        {
          message: "CAPTCHA does not match.",
          path: ["captcha"], 
        }
      )
    ),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      company: "",
      subject: "",
      question: "",
      captcha: "",
    },
    mode: "onTouched", 
  });

  useEffect(() => {
    refreshCaptcha();
    
    
  }, [refreshCaptcha, form]); 

  async function onSubmit(values: FormData) {
    
    console.log("Form submitted successfully:", values);
    setSubmissionAttemptedAndFailed(false); 
    
    form.reset(); 
    refreshCaptcha(); 
  }

  
  function onInvalid(errors: any) {
    console.log("Form submission failed due to validation errors:", errors);
    setSubmissionAttemptedAndFailed(true);
  }

  const getInputBorderClass = (fieldName: keyof FormData) => {
    if (form.formState.isSubmitted && form.formState.errors[fieldName]) {
      return "border-red-500 focus-visible:ring-red-500";
    }
    return "";
  };

  return (
    <div className="flex justify-center items-start py-8 px-4">
      <Card>
        <div className="w-full max-w-2xl p-6 md:p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-center text-primary mb-6 ">
            Contact Us
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onInvalid)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 md:items-center md:gap-x-4 md:gap-y-2">
                    <FormLabel className="md:text-left md:col-span-1 mb-1 md:mb-0 font-medium">
                      Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl className="md:col-span-3">
                      <Input
                        placeholder="Your Name"
                        {...field}
                        className={cn(getInputBorderClass("name"))}
                      />
                    </FormControl>
                    <FormMessage className="md:col-span-3 md:col-start-2 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 md:items-center md:gap-x-4 md:gap-y-2">
                    <FormLabel className="md:text-left md:col-span-1 mb-1 md:mb-0 font-medium">
                      Phone Number
                    </FormLabel>
                    <FormControl className="md:col-span-3">
                      <Input
                        placeholder="Your Phone Number (Optional)"
                        {...field}
                        className={cn(getInputBorderClass("phoneNumber"))}
                      />
                    </FormControl>
                    <FormMessage className="md:col-span-3 md:col-start-2 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 md:items-center md:gap-x-4 md:gap-y-2">
                    <FormLabel className="md:text-left md:col-span-1 mb-1 md:mb-0 font-medium">
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl className="md:col-span-3">
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                        className={cn(getInputBorderClass("email"))}
                      />
                    </FormControl>
                    <FormMessage className="md:col-span-3 md:col-start-2 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 md:items-center md:gap-x-4 md:gap-y-2">
                    <FormLabel className="md:text-left md:col-span-1 mb-1 md:mb-0 font-medium">
                      Subject <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl className="md:col-span-3">
                      <Input
                        placeholder="Regarding..."
                        {...field}
                        className={cn(getInputBorderClass("subject"))}
                      />
                    </FormControl>
                    <FormMessage className="md:col-span-3 md:col-start-2 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 md:items-start md:gap-x-4 md:gap-y-2">
                    {" "}
                    <FormLabel className="md:text-left md:col-span-1 mb-1 md:mb-0 pt-2 font-medium">
                      {" "}
                      Question <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl className="md:col-span-3">
                      <Textarea
                        placeholder="Type your question here..."
                        {...field}
                        className={cn(
                          "min-h-[100px] resize-y",
                          getInputBorderClass("question")
                        )} 
                      />
                    </FormControl>
                    <FormMessage className="md:col-span-3 md:col-start-2 text-sm" />
                  </FormItem>
                )}
              />
              <div className="border-t border-gray-200 pt-6">
                <FormLabel className="block text-sm font-medium mb-2">
                  Security Check <span className="text-red-500">*</span>
                </FormLabel>
                <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-md border border-gray-300">
                  <span
                    className="text-lg font-bold tracking-wider select-none text-gray-800"
                    style={{ fontFamily: "monospace" }}
                  >
                    {currentCaptcha}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={refreshCaptcha}
                    aria-label="Refresh CAPTCHA"
                    className="border-gray-400 hover:bg-gray-200"
                  >
                    <RefreshCw className="h-5 w-5 text-gray-600" />
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name="captcha"
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormControl>
                        <Input
                          placeholder="Enter the text above"
                          {...field}
                          className={cn(
                            "text-base",
                            getInputBorderClass("captcha")
                          )}
                          aria-label="CAPTCHA input"
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center">
                {submissionAttemptedAndFailed && !form.formState.isValid && (
                  <p className="text-sm text-red-600 flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Please fill in the form correctly.
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 pt-2">
                <Button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-md font-semibold"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}
