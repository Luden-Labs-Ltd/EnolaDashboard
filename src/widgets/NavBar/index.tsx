import React from "react";
import styles from "./navigation.module.scss";
import Image from "next/image";
import { NavigationItemType } from "shared/constants/navbar";
import Logo from "../../../public/images/logo/medium-logo.png";
import Burger from "../../../public/images/icons/burger.svg";
import NavigationItem from "./NavigationItem";
import { Button } from "@components/shadowCDN/button";
import { logoutAction } from "entities/auth/action";
import { useTranslations } from "next-intl";

interface NavBarProps {
  navigationItems: Array<NavigationItemType>;
  // logOutComponent: {
  //   icon: string;
  //   label: string;
  //   clickHandler: () => void;
  // };
}

const NavBar: React.FC<NavBarProps> = ({
  navigationItems,
  // logOutComponent,
}) => {
  const t = useTranslations();

  return (
    <div className={styles.navbar}>
      <div className={styles.top}>
        <div className={styles.topLogoWrapper}>
          <Image alt="logo navbar" src={Logo} />
          <Image alt="burgerIcon" src={Burger} />
        </div>
        <div className={styles.programName}>{t("Common.programName")}</div>
      </div>
      <div className={styles.content}>
        <ul className={styles.itemList}>
          {navigationItems.map((item, index) => {
            const elementKey = `${index}-${item.translateKey}`;

            return <NavigationItem item={item} key={elementKey} />;
          })}
        </ul>

        <form
          action={async () => {
            "use server";
            await logoutAction();
          }}
        >
          <Button variant="ghost">
            <div className="hidden md:block">{t("Common.signOut")}</div>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NavBar;
