import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "@styles/main.layout.module.css";
import Header from "@components/Header/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enola App",
  description: "Admin panel for family's",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.layout}>
          <Header />
          <nav className={styles.navbar}>Nav</nav>
          <div className={styles.main}>{children}</div>
        </div>
      </body>
    </html>
  );
}
