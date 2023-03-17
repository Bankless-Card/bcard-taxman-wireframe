import React from "react";
import styles from "./styles.module.css";

const Footer = () => {
  const socialMedia = [
    { id: 1, img: "./img/mail.png", href: "", alt: "email" },

    { id: 2, img: "./img/lin.png", href: "", alt: "Linkedin" },
    { id: 3, img: "./img/yt.png", href: "", alt: "YouTube" },
    {
      id: 4,
      img: "./img/insta.png",
      href: "https://www.instagram.com/bankless_card/",
      alt: "Instagram",
    },
    {
      id: 5,
      img: "./img/tw.png",
      href: "https://twitter.com/BanklessCard",
      alt: "Twitter",
    },
  ];

  return (
    <div className={styles.footer_container}>
      <footer>
        <p>Made with 🤍 by Bankless Card</p>
        <ul className="socials">
          {socialMedia.map((item) => (
            <li>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <img src={item.img} alt={item.alt} />
              </a>
            </li>
          ))}
        </ul>
        <p>&copy; 2023 Bankless Card | All rights reserved</p>
      </footer>
    </div>
  );
};

export default Footer;
