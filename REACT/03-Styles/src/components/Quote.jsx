import React from "react";
import styles from "../styles/Quote.module.css";

const Quote = () => {
  return (
    <div className={styles.card}>
      <p className={styles.title}>Quote of the Day</p>
      <p className={styles.quote}>
        The only way to do great work is to love what you do.
      </p>
      <p className={styles.author}>- Steve Jobs</p>
    </div>
  );
};

export default Quote;
