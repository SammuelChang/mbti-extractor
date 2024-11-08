"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

const LOCALES = [
  { value: "en", label: "🇺🇸\nEnglish" },
  { value: "zh-TW", label: "🇹🇼\n繁體中文" },
];

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const onChnageHandler = (value: string) => {
    router.replace(pathname, { locale: value });
  };

  return (
    <Select
      value={LOCALES.find((l) => l.value === locale)?.value}
      onValueChange={onChnageHandler}
    >
      <SelectTrigger className="h-8">
        <SelectValue>
          {LOCALES.find((l) => l.value === locale)?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {LOCALES.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            <div dangerouslySetInnerHTML={{ __html: label }} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
