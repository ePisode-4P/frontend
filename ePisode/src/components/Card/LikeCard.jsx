import React, { useState } from 'react'
import { MdLocationOn } from 'react-icons/md'
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from 'react-icons/bi'

import styles from './LikeCard.module.css'
import { useSelectedPlace } from '../../contexts/SelectedPlaceContext'

export default function LikeCard({ index, place, place_name, category_name, road_address_name, address_name }) {
  const { setSelectedPlace } = useSelectedPlace()
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const handleClick = () => {
    setSelectedPlace({ place })
  }

  const handleLikeClick = (e) => {
    e.stopPropagation()
    setLiked(!liked)
  }

  const handleDislikeClick = (e) => {
    e.stopPropagation()
    setDisliked(!disliked)
  }

  return (
    <div key={index} className={styles.card} onClick={handleClick}>
      <div className={styles.wrap}>
        <div>
          <p className={styles.card_category}>{category_name.split(' > ').pop()}</p>
          <p className={styles.card_title}>{place_name}</p>
        </div>
        <div className={styles.wrap_btn}>
          <button className={styles.btn} onClick={handleLikeClick}>
            {liked ? <BiSolidLike className={styles.icon_heart} /> : <BiLike className={styles.icon_heart} />}
          </button>
        </div>
      </div>

      <p className={styles.address_name}>
        <MdLocationOn className={styles.icon_location} />
        {road_address_name || address_name}
      </p>
    </div>
  )
}