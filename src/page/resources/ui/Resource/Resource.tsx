import Row from "@components/Row";
import { ResourcesType } from "entities/resources";
import React from "react";
import styles from "./resource.module.scss";
import DropDownMenu, { DropDownMenuItemsType } from "@components/DropDownMenu";
import EditIcon from "shared/assets/EditIcon";
import ShareIcon from "shared/assets/ShareIcon";
import DeleteIcon from "shared/assets/DeleteIcon";
import { useTranslations } from "next-intl";

interface ResourceProps {
  resource: ResourcesType;
}

export const Resource: React.FC<ResourceProps> = ({ resource }) => {
  const t = useTranslations();

  const resourceDropDownItems: DropDownMenuItemsType[] = [
    {
      id: `${resource.id}-view`,
      label: t('Common.edit'),
      icon: <EditIcon />,
      href: ``,
    },
    {
      id: `${resource.id}-share`,
      label: t('Common.share'),
      icon: <ShareIcon />,
      href: ``,
    },
    {
      id: `${resource.id}-delete`,
      label: t('Common.delete'),
      icon: <DeleteIcon />,
      href: ``,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Row className="justify-between" alignItems="center">
        <span className={styles.title}>{resource.serviceName}</span>
        
        <DropDownMenu items={resourceDropDownItems}/>
      </Row>
      <p className={styles.light}>{resource.organization}</p>
      <Row>
        <span className={styles.label}>Contact person:</span>
        <span className={styles.light}>{resource.contactPerson}</span>
      </Row>
      <Row>
        <span className={styles.label}>Terms of service:</span>
        <span className={styles.light}>{resource.termsOfService}</span>
      </Row>
      <Row>
        <span className={styles.label}>Phone:</span>
        <span className={styles.light}>{resource.phone}</span>
      </Row>
      <Row>
        <span className={styles.label}>Email:</span>
        <span className={styles.light}>{resource.email}</span>
      </Row>
      <Row>
        <span className={styles.label}>URL:</span>
        <a href={resource.site} className={styles.light}>{resource.site}</a>
      </Row>
    </div>
  );
};
