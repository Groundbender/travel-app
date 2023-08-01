import styles from "./Logo.module.css";
import { Link } from "react-router-dom";
function Logo() {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <div className={styles.logoContainer}>
        <img
          src="/public/travel-logo.png"
          alt="WorldWise logo"
          className={styles.logo}
        />
        <p>OVERWORLD</p>
      </div>
    </Link>
  );
}

export default Logo;
