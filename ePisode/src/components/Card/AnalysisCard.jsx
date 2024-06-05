import React from 'react'
import { MdLocationOn } from 'react-icons/md'

import styles from './AnalysisCard.module.css'

export default function AnalysisCard({ index, place, place_name, category_name, road_address_name, address_name }) {
  return (
    <div key={index} className={styles.card}>
      <div className={styles.wrap}>
        <div>
          {/* <p className={styles.card_category}>{category_name.split(' > ').pop()}</p> */}
          <p className={styles.card_title}>{place_name}</p>
          <p className={styles.address_name}>
            <MdLocationOn className={styles.icon_location} />
            {road_address_name || address_name}
          </p>
        </div>
      </div>
    </div>
  )
}
