"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useLocale, useTranslations } from "next-intl";
import { quizList } from "../../../../data/quiz";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  items: z.array(
    z.object({
      question: z.string(),
      selectedOption: z.string().nullable(),
    })
  ),
});

const optionLabels = ["A", "B", "C", "D"];

function getLocaleQuizList(locale: string) {
  return quizList[locale] || quizList["en"];
}

export default function CheckboxReactHookFormSingle() {
  const locale = useLocale();
  const t = useTranslations("Form");
  const quizs = getLocaleQuizList(locale);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: quizs.map((quiz) => ({
        question: quiz.question,
        selectedOption: null,
      })),
    },
  });

  const allAnswered = form
    .watch("items")
    .every((item) => item.selectedOption !== null);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.items.map((item) => item.selectedOption));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "space-y-8 pb-12",
          "md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 md:space-y-0"
        )}
      >
        {form.getValues("items").map((item, index) => (
          <FormField
            key={item.question}
            control={form.control}
            name={`items.${index}.selectedOption`}
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">
                    {index + 1}.&nbsp;{item.question}
                  </FormLabel>
                </div>
                <div className="flex flex-col space-y-2">
                  {quizs[index].options.map((option, optionIndex) => (
                    <Button
                      key={`${item.question}-${optionIndex}`}
                      type="button"
                      className={`text-wrap md:text-nowrap text-left h-12 md:h-fit px-4 py-2 rounded-md transition-colors duration-300 w-full flex justify-start ${
                        form.getValues(`items.${index}.selectedOption`) ===
                        option
                          ? "bg-primary text-white hover:bg-primary-600"
                          : "bg-secondary text-gray-600 hover:bg-secondary-600"
                      }`}
                      onClick={() => {
                        form.setValue(`items.${index}.selectedOption`, option);
                      }}
                    >
                      {optionLabels[optionIndex]}.&nbsp;{option}
                    </Button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="flex justify-center md:col-span-2">
          <Button type="submit" disabled={!allAnswered}>
            {t("submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
