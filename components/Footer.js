import React from 'react';
import styles from '../styles/components/_footer.module.scss'

export default function Footer() {
  return <footer className={styles["footer"]}>

      <p>Powered by <a href='https://rawg.io/apidocs' target={"_blank"} rel={"noreferrer"}>RAWG</a>
      </p>

      <div className={styles['footer-sign']}>

        <img className={styles['footer-logo']} alt='myLogo' src='../../images/logo.jpg'></img>
        <a href='https://www.mostafatawfik.com/' target={"_blank"} rel={"noreferrer"}>
          <p>Copyright <span>Mostafa Tawfik</span> © 2022</p>
        </a>

      </div>

  </footer>
}
