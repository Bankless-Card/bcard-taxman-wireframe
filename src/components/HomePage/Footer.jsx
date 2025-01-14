import React from "react";
import styles from "./styles.module.css";

const Footer = () => {

  return (
    <div className={styles.footer_container}>
      <footer>
        <p>Made with 🤍 by BCard</p>
        <p>&copy; 2024 BCard | <a href="https://defillama.com/docs/api">Blocks by Llama.fi</a></p>
      </footer>
    </div>
  );
};

export default Footer;
