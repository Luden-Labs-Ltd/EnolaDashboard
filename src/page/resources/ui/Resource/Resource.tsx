import Row from "@components/Row";
import { ResourcesType } from "entities/resources";
import React from "react";
import styles from "./resource.module.scss";
import DropDownMenu, { DropDownMenuItemsType } from "@components/DropDownMenu";
import EditIcon from "shared/assets/EditIcon";
import ShareIcon from "shared/assets/ShareIcon";
import DeleteIcon from "shared/assets/DeleteIcon";
import { useTranslations } from "next-intl";
import CopyText from "features/copy-text";
import { DropdownMenuItem } from "@components/shadowCDN/dropdown-menu";

interface ResourceProps {
  resource: ResourcesType;
}

export const Resource: React.FC<ResourceProps> = ({ resource }) => {
  const t = useTranslations();

  const resourceDropDownItems: DropDownMenuItemsType[] = [
    {
      id: `${resource.id}-edit`,
      label: t("Common.edit"),
      icon: <EditIcon />,
      href: ``,
    },
    {
      id: `${resource.id}-share`,
      label: t("Common.share"),
      icon: <ShareIcon />,
      renderCustomComponent: (_, onClose) => {
        const currentLinkToResource = resource.site;
        return (
          <CopyText
            key={`${resource.id}-share`}
            callback={onClose}
            textToCopy={currentLinkToResource}
          >
            <DropdownMenuItem className={"DropdownMenuItem"}>
              <Row alignItems="center" className="gap-[8px]">
                <ShareIcon />
                <span>{t("Common.copyLink")}</span>
              </Row>
            </DropdownMenuItem>
          </CopyText>
        );
      },
      href: ``,
    },
    {
      id: `${resource.id}-delete`,
      label: t("Common.delete"),
      icon: <DeleteIcon />,
      href: ``,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Row className="justify-between" alignItems="center">
        <span className={styles.title}>{resource.serviceName}</span>

        <DropDownMenu items={resourceDropDownItems} />
      </Row>
      <p className={styles.light}>{resource.organization}</p>
      <Row>
        <span className={styles.label}>{t("Resources.contactPerson")}:</span>
        <span className={styles.light}>{resource.contactPerson}</span>
      </Row>
      <Row>
        <span className={styles.label}>{t("Resources.termOfService")}:</span>
        <span className={styles.light}>{resource.termsOfService}</span>
      </Row>
      <Row>
        <span className={styles.label}>{t("Common.phone")}:</span>
        <span className={styles.light}>{resource.phone}</span>
      </Row>
      <Row>
        <span className={styles.label}>{t("Common.email")}:</span>
        <span className={styles.light}>{resource.email}</span>
      </Row>
      <Row>
        <span className={styles.label}>{t("Common.url")}:</span>
        <a href={resource.site} className={styles.light}>
          {resource.site}
        </a>
      </Row>
    </div>
  );
};
