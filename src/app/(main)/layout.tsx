import type { Metadata } from "next";
import styles from "@styles/main.layout.module.scss";
import Header from "@widgets/Header/Header";
import NavBar from "@widgets/NavBar";
import { NAVIGATION_ITEMS } from "shared/constants/navbar";
import { getCurrentProfileApi } from "entities/auth";

export const metadata: Metadata = {
  title: "Enola App",
  description: "Admin panel for family's",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getCurrentProfileApi()
  const fullName = `${profile?.first_name} ${profile?.last_name}`

  return (
    <div>
      <div className={styles.layout}>
        <Header userName={fullName} />
        <nav className={styles.navbar}>
          <NavBar navigationItems={NAVIGATION_ITEMS} />
        </nav>
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
}
