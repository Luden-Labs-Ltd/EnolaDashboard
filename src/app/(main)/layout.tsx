import type { Metadata } from "next";
import styles from "@styles/main.layout.module.scss";
import Header from "@components/Header/Header";
import NavBar from "@components/NavBar";
import { NAVIGATION_ITEMS } from "shared/constants/navbar";

export const metadata: Metadata = {
  title: "Enola App",
  description: "Admin panel for family's",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className={inter.className}>
      <div className={styles.layout}>
        <Header />
        <nav className={styles.navbar}>
          <NavBar navigationItems={NAVIGATION_ITEMS} />
        </nav>
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
}
