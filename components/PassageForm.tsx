"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createReadingPassage } from "@/lib/actions/passage.actions";
import { redirect } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
  grade_level: z.string().min(1, { message: "Grade level is required." }),
  lesson_type: z.enum(
    ["Phonics", "Comprehension", "Sight Words", "Story", "Mixed"],
    {
      message: "Lesson type is required.",
    }
  ),
  subject: z.string().optional(),
  lexile_score: z.coerce.number().optional(),
});

const PassageForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      grade_level: "",
      lesson_type: "Comprehension",
      subject: "",
      lexile_score: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const passage = await createReadingPassage(values);

    if (passage) {
      redirect(`/passages/${passage.id}`);
    } else {
      console.log("Failed to create passage");
      redirect("/");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passage Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the passage title"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grade_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade Level</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pre-K">Pre-K</SelectItem>
                    <SelectItem value="K">Kindergarten</SelectItem>
                    {[...Array(12)].map((_, i) => (
                      <SelectItem key={i + 1} value={`${i + 1}`}>
                        {i + 1}st Grade
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lesson_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lesson Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select lesson type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Phonics">Phonics</SelectItem>
                    <SelectItem value="Comprehension">Comprehension</SelectItem>
                    <SelectItem value="Sight Words">Sight Words</SelectItem>
                    <SelectItem value="Story">Story</SelectItem>
                    <SelectItem value="Mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passage Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the reading passage text here..."
                  {...field}
                  className="input min-h-[200px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Science, History, Fiction"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lexile_score"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lexile Score (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 450"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          Create Reading Passage
        </Button>
      </form>
    </Form>
  );
};

export default PassageForm;
