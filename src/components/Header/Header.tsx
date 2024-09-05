import Image from "next/image";
import React from "react";
import styles from "@styles/main.layout.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Image
        alt="logo"
        src={"/images/logo/medium-logo.png"}
        width={107}
        height={50}
      />
    </header>
  );
}
