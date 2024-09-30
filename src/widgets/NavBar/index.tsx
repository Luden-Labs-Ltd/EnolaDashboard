import React from "react";
import styles from "./navigation.module.scss";
import Image from "next/image";
import { NavigationItemType } from "shared/constants/navbar";
import Logo from "../../../public/images/logo/medium-logo.png";
import Burger from "../../../public/images/icons/burger.svg";
import NavigationItem from "./NavigationItem";
import { logoutAction } from "auth/action";

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
  return (
    <div className={styles.navbar}>
      <div className={styles.top}>
        <div className={styles.topLogoWrapper}>
          <Image alt="logo navbar" src={Logo} />
          <Image alt="burgerIcon" src={Burger} />
        </div>
        <div className={styles.programName}>Program_name</div>
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
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NavBar;
