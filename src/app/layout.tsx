import { NextIntlClientProvider } from "next-intl";
import { Space_Grotesk, Rubik } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import "@styles/globals.css";
import "@styles/reset.scss";
import { Toaster } from "@components/shadowCDN/toaster";

const SpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesk",
});

const RubikFont = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "he" ? "rtl" : "ltr"}
      className={`${SpaceGrotesk.variable} ${RubikFont.variable} font-grotesk`}
    >
          <body>
            <NextIntlClientProvider messages={messages}>
              <main>{children}</main>
              <Toaster />
            </NextIntlClientProvider>
          </body>
    </html>
  );
}
