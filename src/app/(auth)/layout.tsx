import type { Metadata } from "next";
import Image from 'next/image';
import ImageStub from '../../../public/images/logo/huge_logo.png';
import styles from '@styles/layouts/auth.module.scss'

export const metadata: Metadata = {
  title: "Enola App Auth",
  description: "Auth to app",
};

export default function LayoutsAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.container}>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col w-full h-full">
          <div className={styles.content}>
            <Image src={ImageStub} className={styles.logo} alt="Image Stub" />
            {children}
          </div>
        </div>
        <div className="flex flex-col items-center w-full mt-auto">
          <div className={`flex justify-center items-center w-full ${styles.footer}`}>
            <p className="text-center">
              © {new Date().getFullYear()} Enola Ltd
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}