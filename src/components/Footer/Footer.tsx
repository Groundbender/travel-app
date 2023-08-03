import styles from "./Footer.module.css";
const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {date} by Overworld Inc.
      </p>
    </footer>
  );
};

export default Footer;
