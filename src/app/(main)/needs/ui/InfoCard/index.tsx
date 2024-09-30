import React, { CSSProperties, PropsWithChildren } from 'react'
import styles from "./infoCard.module.scss"
interface InfoCardProps {
    step: number;
    maxWidth?: number;
}

const InfoCard : React.FC<PropsWithChildren<InfoCardProps>> = ({
    step,
    maxWidth,
    children
}) => {
  const inlineStyles: CSSProperties = {
    maxWidth: maxWidth ? maxWidth : 'unset'
  }
  return (
    <div className={styles.wrapper} >
        <div className={styles.step}>{step}</div>
        <div className={styles.outlet} style={inlineStyles}>{children}</div>
    </div>
  )
}

export default InfoCard