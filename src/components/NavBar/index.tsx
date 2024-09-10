import React from "react";
import styles from "./navigation.module.scss";
import Image from "next/image";
import { NavigationItemType } from "shared/constants/navbar";
import Logo from "../../../public/images/logo/medium-logo.png";
import Burger from "../../../public/images/icons/burger.svg";
import NavigationItem from "./NavigationItem";

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
          <Image
            alt="logo navbar"
            src={Logo}
          />
          <Image
            alt="burgerIcon"
            src={Burger}
          />
        </div>
        <div className={styles.programName}>Program_name</div>
      </div>
      <ul className={styles.itemList}>
        {navigationItems.map((item, index) => {
          const elementKey = `${index}-${item.translateKey}`;

          return <NavigationItem item={item} key={elementKey} />;
        })}
      </ul>
      {/* <a
        className={styles.item}
        onClick={logOutComponent.clickHandler}
        href="#"
      >
        <div className={styles.itemIcon}>{logOutComponent.icon}</div>
        <div className={styles.itemLabel}>{logOutComponent.label}</div>
      </a> */}
    </div>
  );
};

export default NavBar;
