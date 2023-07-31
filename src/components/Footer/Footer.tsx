import React from "react";
import styles from "./Footer.module.css";
const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {date} by WorldWise Inc.
      </p>
    </footer>
  );
};

export default Footer;
