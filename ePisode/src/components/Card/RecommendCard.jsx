import React, { useEffect, useState } from 'react'
import { MdLocationOn } from 'react-icons/md'
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from 'react-icons/bi'

import styles from './RecommendCard.module.css'
import { useSelectedPlace } from '../../contexts/SelectedPlaceContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNewInterest, removeInterest, markAsDisliked } from '../../services/recommend'

export default function RecommendCard({ index, place, isLike, place_name, category_name, road_address_name, address_name }) {
  const queryClient = useQueryClient()
  const { setSelectedPlace } = useSelectedPlace()
  const [liked, setLiked] = useState(isLike)
  const [disliked, setDisliked] = useState(false)

  const { placeName, categoryName, addressName, x, y, placeId } = place

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

  const handleLikeClick = (e) => {
    e.stopPropagation()

    const placeInfo = {
      placeId,
      placeName,
      x,
      y,
      addressName,
    }

    if (liked) {
      removeInterest(place.x, place.y)
        .then(() => {
          queryClient.invalidateQueries(['recommends'])
          queryClient.invalidateQueries(['interests'])
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      addNewInterest(placeInfo)
        .then(() => {
          queryClient.invalidateQueries(['recommends'])
          queryClient.invalidateQueries(['interests'])
        })
        .catch((error) => {
          console.error(error)
        })
    }

    if (disliked && !liked) {
      setDisliked(false)
      setLiked(true)
    } else {
      setLiked(!liked)
    }
  }

  const handleDislikeClick = (e) => {
    e.stopPropagation()
    markAsDisliked(placeId)
      .then(() => {
        setDisliked(true)
        queryClient.invalidateQueries(['recommends'])
        queryClient.invalidateQueries(['interests'])
        setDisliked(false)
      })
      .then(() => {
        if (liked) {
          removeInterest(place.x, place.y)
        }
      })
      .catch((error) => {
        console.error('Failed to mark as disliked:', error)
      })
  }

  useEffect(() => {
    setLiked(isLike)
  }, [isLike])

  return (
    <div key={index} className={styles.card} onClick={handleClick}>
      <div className={styles.wrap}>
        <div>
          {<p className={styles.card_category}>{category_name.split(' > ').pop()}</p>}
          <p className={styles.card_title}>{place_name}</p>
        </div>
        <div className={styles.wrap_btn}>
          <button className={styles.btn} onClick={handleLikeClick}>
            {liked ? <BiSolidLike className={styles.icon_heart} /> : <BiLike className={styles.icon_heart} />}
          </button>
          <button className={styles.btn} onClick={handleDislikeClick}>
            {disliked ? <BiSolidDislike className={styles.icon_heart} /> : <BiDislike className={styles.icon_heart} />}
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
