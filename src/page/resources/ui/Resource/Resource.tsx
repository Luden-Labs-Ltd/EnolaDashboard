import DropDownMenu, { DropDownMenuItemsType } from "@components/DropDownMenu";
import Row from "@components/Row";
import { DropdownMenuItem } from "@components/shadowCDN/dropdown-menu";
import { ResourcesType } from "entities/resources";
import CopyText from "features/copy-text";
import DeleteResourceModal from "features/delete-resource/ui/DeleteResourceModal";
import { EditResource } from "features/edit-resources";
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";
import ShareIcon from "shared/assets/ShareIcon";
import styles from "./resource.module.scss";
import { cn } from "@utils";

interface ResourceProps {
  resource: ResourcesType;
  isRTL: boolean;
}

export const Resource: React.FC<ResourceProps> = ({ resource, isRTL }) => {
  const t = useTranslations();
  EditResource;
  const resourceDropDownItems: DropDownMenuItemsType[] = [
    {
      id: `${resource.id}-edit`,
      label: t("Common.edit"),
      icon: "",
      href: ``,
      renderCustomComponent: (_, onClose) => {
        return (
          <EditResource
            callback={onClose}
            key={`${resource.id}-edit`}
            resource={resource}
          />
        );
      },
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
      icon: "",
      href: ``,
      renderCustomComponent: (_, onClose) => {
        return (
          <DeleteResourceModal
            callback={onClose}
            key={`${resource.id}-delete`}
            resourceId={resource.id}
          />
        );
      },
    },
  ];

  const renderLabel = useCallback((label: string) => isRTL? ":" + label : label + ":", [isRTL]);

  return (
    <div className={styles.wrapper}>
      <Row className="justify-between rtl:flex-row-reverse" alignItems="center">
        <span className={styles.title}>{resource.organization}</span>

        <DropDownMenu items={resourceDropDownItems} />
      </Row>
      {resource.organization && (
        <p className={cn(styles.light, styles.provider, 'rtl:text-right')}title={resource.organization}>
          {resource.serviceName}
        </p>
      )}
      {resource.contactPerson && (
        <Row className="rtl:flex-row-reverse gap-[4px] items-baseline">
          <span className={styles.label}>{renderLabel(t("Resources.contactPerson"))}</span>
          <span className={styles.light} title={resource.contactPerson}>
            {resource.contactPerson}
          </span>
        </Row>
      )}
      {resource.termsOfService && (
        <Row className="rtl:flex-row-reverse gap-[4px] items-baseline">
          <span className={styles.label}>{renderLabel(t("Resources.serviceNature"))}</span>
          <span className={styles.light} title={resource.termsOfService}>
            {resource.termsOfService}
          </span>
        </Row>
      )}
      {resource.phone && (
        <Row className="rtl:flex-row-reverse gap-[4px] items-baseline">
          <span className={styles.label}>{renderLabel(t("Common.phone"))}</span>
          <a href={`tel:${resource.phone}`} className={styles.light} title={resource.phone}>
            {resource.phone}
          </a>
        </Row>
      )}
      {resource.email && (
        <Row className="rtl:flex-row-reverse gap-[4px] items-baseline">
          <span className={styles.label}>{renderLabel(t("Common.email"))}</span>
          <a href={`mailto:${resource.email}`} className={styles.light} title={resource.email}>
            {resource.email}
          </a>
        </Row>
      )}
      {resource.site && (
        <Row className="rtl:flex-row-reverse gap-[4px] items-baseline">
          <span className={styles.label}>{renderLabel(t("Common.url"))}</span>
          <a href={resource.site} target="_blank" className={cn(styles.light, 'underline')} title={resource.site}>
            {resource.site}
          </a>
        </Row>
      )}
    </div>
  );
};
