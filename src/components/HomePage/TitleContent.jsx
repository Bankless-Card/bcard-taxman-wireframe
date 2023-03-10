import React from "react";
import styles from "./styles.module.css";

const TitleContent = () => {
  return (
    <div style={{ position: "relative" }}>
      <div className={styles.title_container}>
        <h1>Taxman</h1>
        <div>
          <h2>DAO Income</h2>
          <h2>Tax Helper</h2>
        </div>
      </div>
      <p className={styles.title_paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id
        pellentesque augue. Nam semper nisi vitae pulvinar faucibus. Suspendisse
        tempor ultrices sodales.
      </p>
    </div>
  );
};

export default TitleContent;
