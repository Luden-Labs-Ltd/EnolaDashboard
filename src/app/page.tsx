"use client";

import Image from "next/image";
import ImageStub from "../../public/images/logo/huge_logo.png";
import styles from "../page/singin/styles/auth.module.scss";
import { Button } from "@components/shadowCDN/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageSwitch } from "features/language-switch";

export default function Main() {

  const t = useTranslations();

  return (
    <main className="">
      <div className={styles.container}>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col w-full h-full ">
            <div className={styles.content}>
              <Image
                src={ImageStub}
                className={styles.logo}
                alt="Image Stub"
                priority
              />

              <div className="flex flex-col items-center gap-[50px] mt-6">
                <Button>
                  <Link href={"/dashboard"}>{t("Common.start")}</Link>
                </Button>

                <LanguageSwitch showLabel />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-full mt-auto">
            <div
              className={`flex justify-center items-center w-full ${styles.footer}`}
            >
              <p className="text-center">
                © {new Date().getFullYear()} Tamar Ltd
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
