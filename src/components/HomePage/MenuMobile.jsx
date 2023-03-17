import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";

const MenuMobile = ({ menuLinks }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        exit={{ opacity: 0 }}
        className={styles.mobile_menu_container}
      >
        <ul className={styles.mobile_menu_list}>
          {menuLinks.map((item) => (
            <li key={item.id} className={styles.mobile_menu_list_item}>
              <a href={item.href}>{item.title}</a>
            </li>
          ))}
        </ul>
      </motion.div>
      ;
    </AnimatePresence>
  );
};

export default MenuMobile;
