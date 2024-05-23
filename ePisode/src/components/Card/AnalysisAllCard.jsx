import React from 'react';
import styles from './AnalysisAllCard.module.css'

export default function AnalysisAllCard({date}) {

    return (
      <div className={styles.card}>
        <div className={styles.wrap}>
          <div>
            <p className={styles.card_title}>{date}</p>
          </div>
        </div>
      </div>
    )
  }
