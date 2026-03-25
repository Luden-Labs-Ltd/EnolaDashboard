import { NextIntlClientProvider } from "next-intl";
import { Space_Grotesk, Rubik } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import "@styles/reset.scss";
import "@styles/globals.css";
import { Toaster } from "@components/shadowCDN/sonner";

// Font configuration with optimized preloading
const SpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesk",
  preload: true, // Enable preload for better font loading
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const RubikFont = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
  preload: true, // Enable preload for better font loading
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
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
      style={{
        fontFamily: 'var(--font-grotesk), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}
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
