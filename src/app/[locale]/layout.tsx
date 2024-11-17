import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link, routing } from "@/i18n/routing";
import { Github, House } from "lucide-react";
import LocaleSwitcher from "../components/locale-switcher";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <div className="w-full absolute top-0 right-0 z-10 p-4 flex gap-4 items-center justify-between">
          <Link href="/">
            <House />
          </Link>
          <div className="flex gap-4 items-center">
            <LocaleSwitcher />
            <Link href="https://github.com/SammuelChang" target="_blank">
              <Github />
            </Link>
          </div>
        </div>
        <main className="pt-4 max-w-dvw">{children}</main>
      </NextIntlClientProvider>
    </>
  );
}
