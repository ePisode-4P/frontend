import React from 'react'
import styles from './AnalysisAllCard.module.css'

export default function AnalysisAllCard({ title, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.wrap}>
        <div>
          <p className={styles.card_title}>{title}</p>
        </div>
      </div>
    </div>
  )
}
