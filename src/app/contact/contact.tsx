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
import { Card } from "@/components/ui/card"; // Assuming Card is imported

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
    // Ensure `form` is initialized before trying to use it
    if (form) {
      // This check is important as `refreshCaptcha` is called in `useEffect` before `form` is fully initialized
      form.setValue("captcha", "");
      form.clearErrors("captcha");
    }
  }, []); // Depend on nothing if form is always initialized, or add form to dependency if `form` is a ref

  const form = useForm<FormData>({
    resolver: zodResolver(
      formSchema.refine((data) => data.captcha === currentCaptcha, {
        message: "CAPTCHA does not match.",
        path: ["captcha"],
      })
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
  }, [refreshCaptcha]);

  async function onSubmit(values: FormData) {
    console.log("Form submitted successfully:", values);
    setSubmissionAttemptedAndFailed(false);
    form.reset();
    refreshCaptcha(); // Refresh CAPTCHA after successful submission
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
    <section className="py-20 bg-background text-foreground">
      {" "}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {" "}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Contact Us
        </h2>
        <Card className="flex flex-col md:flex-row gap-8 p-6 md:p-8 rounded-lg shadow-lg">
          {" "}
          <div className="w-full md:w-1/2">
            {" "}
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
                  name="company" // Ensure this field exists in your formSchema
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-1 md:grid-cols-4 md:items-center md:gap-x-4 md:gap-y-2">
                      <FormLabel className="md:text-left md:col-span-1 mb-1 md:mb-0 font-medium">
                        Company
                      </FormLabel>
                      <FormControl className="md:col-span-3">
                        <Input
                          placeholder="Your Company (Optional)"
                          {...field}
                          className={cn(getInputBorderClass("company"))}
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
                      <FormLabel className="md:text-left md:col-span-1 mb-1 md:mb-0 pt-2 font-medium">
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

                <div className="border-t border-border pt-6">
                  {" "}
                  <FormLabel className="block text-sm font-medium mb-2">
                    Security Check <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-md border border-border">
                    {" "}
                    <span
                      className="text-lg font-bold tracking-wider select-none text-foreground" // Use text-foreground
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
                      className="border-border hover:bg-accent hover:text-accent-foreground" // Use theme-aware classes
                    >
                      <RefreshCw className="h-5 w-5 text-foreground/70" />{" "}
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
                    <p className="text-sm text-destructive flex items-center gap-1.5">
                      {" "}
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
          <div className="w-full md:w-1/2 min-h-[400px] md:min-h-[550px] flex items-center justify-center text-muted-foreground overflow-hidden rounded-lg">
            {" "}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d247.20500373199818!2d112.67806421105576!3d-7.544406708309457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1748331621546!5m2!1sid!2sid"
              width="100%"
              height="100%" // Ensure it fills the parent div's height
              style={{ border: 0, borderRadius: "8px" }} // Border radius for iframe
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Card>
      </div>
    </section>
  );
}
