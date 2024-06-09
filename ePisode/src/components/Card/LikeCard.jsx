import React, { useState } from 'react'
import { MdLocationOn } from 'react-icons/md'
import { CgCloseR } from 'react-icons/cg'

import styles from './LikeCard.module.css'
import { useSelectedPlace } from '../../contexts/SelectedPlaceContext'
import { removeInterest } from '../../services/recommend'
import { useQueryClient } from '@tanstack/react-query'

export default function LikeCard({ index, place, place_name, category_name, road_address_name, address_name }) {
  const { setSelectedPlace } = useSelectedPlace()
  const queryClient = useQueryClient()

  const { placeName, categoryName, addressName, x, y, id } = place

  const newPlace = {
    place_name: placeName,
    category_name: categoryName,
    address_name: addressName,
    x: x,
    y: y,
  }

  const handleClick = () => {
    setSelectedPlace({ place: newPlace })
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    removeInterest(place.x, place.y)
      .then(() => {
        queryClient.invalidateQueries(['recommends'])
        queryClient.invalidateQueries(['interests'])
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div key={index} className={styles.card} onClick={handleClick}>
      <div className={styles.wrap}>
        <div>
          <p className={styles.card_category}>{category_name ? category_name.split(' > ').pop() : ''}</p>
          <p className={styles.card_title}>{place_name}</p>
        </div>
        <div className={styles.wrap_btn}>
          <button className={styles.btn} onClick={handleRemove}>
            <CgCloseR className={styles.icon_heart} />
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