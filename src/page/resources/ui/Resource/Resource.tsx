import Row from "@components/Row";
import { ResourcesType } from "entities/resources";
import React from "react";
import styles from "./resource.module.scss";
import { Button } from "@components/shadowCDN/button";
import DotsIcon from "shared/assets/DotsIcon";

interface ResourceProps {
  resource: ResourcesType;
}

export const Resource: React.FC<ResourceProps> = ({ resource }) => {
  return (
    <div className={styles.wrapper}>
      <Row className="justify-between" alignItems="center">
        <span className={styles.title}>{resource.serviceName}</span>
        <Button variant={"ghost"} size={"icon"}>
          <DotsIcon />
        </Button>
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
        <span className={styles.light}>{resource.site}</span>
      </Row>
    </div>
  );
};
