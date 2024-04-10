import React, { useState } from "react";

import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";
import MenuMobile from "./MenuMobile";

const Navbar = () => {
  const [, { setIsCTAclicked }] = useUI();

  const twitterShare = (<a 
          target="_blank"
          href="https://twitter.com/intent/tweet?text=I%20just%20did%20my%20DAO%20Income%20Taxes%20with%20TaxMan%20from%20@GetBCard%20in%20about%20five%20minutes!%20https://taxman.getbcard.io"
          >
            <div>
              Share
              <img src="img/twitter-logo.png" alt="twitter-logo" style={{ width:"15px", margin: "0 5px 0 5px"}} /> 
            </div>
        </a>);

  const MenuLinks = [
    { id: 1, href: "https://banklesscard.mirror.xyz/", title: "Blog" },
    { id: 2, href: "https://getbcard.io", title: "About Us" },
  ];

  //  methods for controlling menu icon
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive(!isActive);
  }

  return (
    <header className={styles.nav_container}>
      <img
        src="./img/bc_logo_new.png"
        className={styles.logo}
        alt="BCard Logo"
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
        <li>{twitterShare}</li>
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
