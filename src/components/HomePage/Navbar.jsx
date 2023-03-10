import React from "react";
import styles from "./styles.module.css";

const Navbar = () => {
  const MenuLinks = [
    { id: 1, href: "#", title: "Blog" },
    { id: 2, href: "https://banklesscard.xyz", title: "About Us" },
    { id: 3, href: "https://banklesscard.xyz", title: "Visit Us" },
  ];

  return (
    <header className={styles.nav_container}>
      <img
        src="./src/img/bc_logo.png"
        className={styles.logo}
        alt="BanklessCard Logo"
      />
      <ul className={styles.menu_container}>
        {MenuLinks.map((item) => (
          <li key={item.id}>
            <a href={item.href} className={item.id === 3 && styles.menu_button}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Navbar;
