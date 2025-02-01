import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router DOM
import styles from "./404.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.noise}></div>
      <div className={styles.overlay}></div>
      <div className={styles.terminal}>
        <h1>
          Error <span className={styles.errorcode}>404</span>
        </h1>
        <p className={styles.output}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <p className={styles.output}>
          Please try to <Link to={-1}>go back</Link> or <Link to="/">return to the homepage</Link>.
        </p>
        <p className={styles.output}>Good luck.</p>
      </div>
    </div>
  );
};

export default NotFound;
