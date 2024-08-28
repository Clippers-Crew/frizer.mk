import styles from './Navbar.module.scss';
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

function Navbar() {
  let [menuState, setMenuState] = useState(false);
  let [rotation, setRotation] = useState(0);

  const showMenu = () => {
    window.innerWidth <= 650 ? setMenuState(false) : setMenuState(true);
  };

  const closeMenu = () => {
    if (window.innerWidth <= 650) setMenuState(false);
  };

  const handleClick = () => {
    setMenuState(!menuState);
    rotation === 0 ? setRotation(180) : setRotation(0);
  };

  useEffect(() => {
    showMenu();
  }, []);

  window.addEventListener("resize", showMenu);

  return (
    <nav className={styles.nav}>
      <Link to={"/"} className={styles.homeButton}>
        Frizer.mk
      </Link>
      <motion.button
        className={styles.toggleButton}
        onClick={handleClick}
        animate={{ rotate: rotation }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
          viewBox="0 0 50 50"
        >
          <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" />
        </svg>
      </motion.button>
      <AnimatePresence>
        {menuState && (
          <motion.ul
            className={styles.navlinks}
            initial={{ y: -25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "tween" }}
            exit={{ y: -25, opacity: 0 }}
          >
            <NavLink to="/" onClick={closeMenu}>
              <li className={styles.navlink}>Home</li>
            </NavLink>
            <NavLink to="/appointments" onClick={closeMenu}>
              <li className={styles.navlink}>Appointments</li>
            </NavLink>
            <NavLink to="/login" onClick={closeMenu}>
              <li className={styles.navlink}>Login</li>
            </NavLink>
            {/* <NavLink to={movieverseUser ? '/logout': '/login'} onClick={closeMenu}>
              <li className={styles.navlink}>{movieverseUser ? 'Logout' : <>Login <FaArrowRightLong/></>}</li>
            </NavLink> */}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
