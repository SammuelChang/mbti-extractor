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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocale, useTranslations } from "next-intl";
import { quizList } from "../../../../data/quiz";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import { ISimilarity } from "../../../../interface";
import LoadingButton from "@/app/components/loading-button";
import DOMPurify from "dompurify";
import { getSimilarity } from "@/app/services";
import { motion } from "framer-motion";

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

type IProgress = "idle" | "translating" | "extracting" | "success" | "error";

export default function CheckboxReactHookFormSingle() {
  const locale = useLocale();
  const t = useTranslations("Form");
  const [result, setResult] = useState<null | ISimilarity>(null);
  const [progress, setProgress] = useState<IProgress>("idle");
  const [tab, setTab] = useState<"quiz" | "result">("quiz");
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

  const loadingText = () => {
    switch (progress) {
      case "extracting":
        return t("extracting");
      case "translating":
        return t("translating");
      default:
        return t("submit");
    }
  };

  const allAnswered = form
    .watch("items")
    .every((item) => item.selectedOption !== null);

  const sortedResult = result?.similarResults?.sort(
    (a, b) => b.similarity - a.similarity
  );

  async function submitHandler(data: z.infer<typeof FormSchema>) {
    try {
      const formValues = data?.items;
      const concatAnswer = formValues
        .map((item) => item.selectedOption)
        .join(" ");

      if (!concatAnswer) {
        throw new Error("Input value is empty");
      }
      const sanitizedInputValue = DOMPurify.sanitize(concatAnswer);
      setProgress("extracting");
      const result = await getSimilarity(sanitizedInputValue);
      setTimeout(() => {
        setResult(result);
        setProgress("success");
        setTab("result");
      }, 500);
    } catch (error) {
      console.error(error);
      setProgress("error");
    }
  }

  return (
    <Tabs value={tab} className="flex flex-col items-center gap-4">
      <TabsList>
        <TabsTrigger value="quiz" onClick={() => setTab("quiz")}>
          {t("quiz")}
        </TabsTrigger>
        <TabsTrigger
          value="result"
          onClick={() => setTab("result")}
          disabled={progress !== "success"}
        >
          {t("result")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="quiz">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
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
                            form.setValue(
                              `items.${index}.selectedOption`,
                              option
                            );
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
              <LoadingButton
                type="submit"
                disabled={!allAnswered}
                isLoading={
                  progress === "extracting" || progress === "translating"
                }
                loadingText={loadingText()}
              >
                {t("submit")}
              </LoadingButton>
            </div>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="result">
        <div className="flex flex-col md:flex-row gap-4 pt-4 pb-8">
          {sortedResult?.slice(0, 3).map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial="hidden"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5 },
                },
              }}
              animate="visible"
              whileHover={{
                scale: 1,
                rotate: "5deg",
                zIndex: 10,
                transition: {
                  duration: 0.3,
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                },
              }}
            >
              <div className="rounded-md bg-white px-2 py-1 text-sm font-bold shadow-md">
                {item.type}&nbsp;({item.percentage}%)
              </div>
              <Image
                className="mt-2 size-24 rounded-2xl border-[6px] border-white object-cover shadow-xl md:size-36"
                src={`/mbti/${item.type.toUpperCase()}.png`}
                alt={item.type}
                width={150}
                height={150}
              />
            </motion.div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
