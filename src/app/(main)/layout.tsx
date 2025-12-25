import type { Metadata } from "next";
import styles from "@styles/main.layout.module.scss";
import Header from "@widgets/Header/Header";
import NavBar from "@widgets/NavBar";
import { NAVIGATION_ITEMS } from "shared/constants/navbar";
import { getCurrentProfileApi } from "entities/auth";
import { getCurrentProgram } from "entities/program";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Tamar App",
  description: "Admin panel for family's",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getCurrentProfileApi()

  if (!profile) {
    console.log("[RootLayout] no profile found, redirecting to signin");
    return redirect("/signin");
  }

  const programs = profile?.company.programs ?? []
  const originCurrentProgram = await getCurrentProgram();
  const fullName = `${profile!.company!.name} | ${profile!.first_name} ${profile!.last_name}`

  return (
    <div>
      <div className={styles.layout}>
        <Header userName={fullName} />
        <nav className={styles.navbar}>
          <NavBar profile={profile} navigationItems={NAVIGATION_ITEMS} programs={programs} originCurrentProgram={originCurrentProgram} />
        </nav>
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
}
