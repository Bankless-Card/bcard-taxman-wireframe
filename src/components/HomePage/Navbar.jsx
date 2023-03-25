import React, { useState } from "react";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";
import MenuMobile from "./MenuMobile";

const Navbar = () => {
  const [, { setIsCTAclicked }] = useUI();

  const MenuLinks = [
    { id: 1, href: "https://banklesscard.mirror.xyz/", title: "Blog" },
    { id: 2, href: "https://banklesscard.xyz/", title: "About Us" },
  ];

  //  methods for controlling menu icon
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive(!isActive);
  }

  return (
    <header className={styles.nav_container}>
      <img
        src="./img/bc_logo.png"
        className={styles.logo}
        alt="BanklessCard Logo"
        onClick={() => setIsCTAclicked(false)}
      />
      <ul className={styles.menu_container}>
        {MenuLinks.map((item) => (
          <li key={item.id}>
            <a href={item.href} rel="nofollow noopener noreferrer">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      {/* Menu icon */}
      <div className={styles.menu_mobile_icon_container} onClick={handleClick}>
        <div
          className={`${styles.menu_mobile_icon_row} ${
            isActive ? styles.active : ""
          }`}
        ></div>
        <div
          className={`${styles.menu_mobile_icon_row} ${
            isActive ? styles.active : ""
          }`}
        ></div>
        <div
          className={`${styles.menu_mobile_icon_row} ${
            isActive ? styles.active : ""
          }`}
        ></div>
      </div>
      {isActive && <MenuMobile menuLinks={MenuLinks} />}
    </header>
  );
};

export default Navbar;
