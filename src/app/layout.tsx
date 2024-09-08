import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import "@styles/utils/reset.scss";
import styles from "@styles/main.layout.module.scss";
import Header from "@components/Header/Header";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enola App",
  description: "Admin panel for family's",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const locale = await getLocale();
 
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <div className={styles.layout}>
            <Header />
            <nav className={styles.navbar}>Nav</nav>
            <div className={styles.main}>{children}</div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
