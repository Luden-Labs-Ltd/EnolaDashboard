import React from "react";
import styles from "./navigation.module.scss";
import { NavigationItemType } from "shared/constants/navbar";
import Logo from "../../../public/images/logo/medium-logo.png";
import NavigationItem from "./NavigationItem";
import { Button } from "@components/shadowCDN/button";
import { logoutAction } from "entities/auth/action";
import { useTranslations } from "next-intl";
import ChangeProgram from "features/change-program";
import { ProfileApi, Program } from "entities/auth/api/types";
import LogOutIcon from "shared/assets/LogOutIcon";
import Row from "@components/Row";

interface NavBarProps {
  navigationItems: Array<NavigationItemType>;
  profile: ProfileApi | null | undefined;
  programs: Program[];
  originCurrentProgram: Program | null;
}

const NavBar: React.FC<NavBarProps> = ({
  navigationItems,
  profile,
  programs,
  originCurrentProgram,
}) => {
  const t = useTranslations();
  const isUserAdmin = profile?.role === 'admin'

  return (
    <div className={styles.navbar}>
      <div className={styles.top}>
        <ChangeProgram
          programs={programs}
          logo={Logo}
          originCurrentProgram={originCurrentProgram}
        />
      </div>
      <div className={styles.content}>
        <ul className={styles.itemList}>
          {navigationItems.map((item, index) => {
            const elementKey = `${index}-${item.translateKey}`;

            if (!isUserAdmin && item.isForAdmin) {
              return null
            }

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
            <Row alignItems="center" className="gap-[4px]">
              <LogOutIcon />
              <div className="hidden md:block">{t("Common.signOut")}</div>
            </Row>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NavBar;
