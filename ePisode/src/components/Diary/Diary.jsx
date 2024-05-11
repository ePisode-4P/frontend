import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Diary.module.css'
import { MdLocationOn } from 'react-icons/md'
import { IoCloseOutline } from 'react-icons/io5'
import { GoHeart, GoHeartFill } from 'react-icons/go'

import { useNavigate } from 'react-router-dom'

export default function Diary({ selectedPlace, setSelectedPlace }) {
  const [loved, setLoved] = useState(false)

  const categoryName = selectedPlace.category_name.split(' > ').pop()

  const navigate = useNavigate()

  const handleAddEpisodeClick = () => {
    navigate('/map/new', {
      state: {
        x: selectedPlace.x,
        y: selectedPlace.y,
      },
    })
  }

  const handleCloseClick = () => {
    setSelectedPlace(null)
  }

  const handleLoveClick = (e) => {
    e.stopPropagation()
    setLoved(!loved)
  }

  return (
    <motion.div
      style={{
        WebkitUserSelect: 'none' /* Safari */,
        msUserSelect: 'none' /* Internet Explorer/Edge */,
        userSelect: 'none' /* Non-prefixed version, currently supported by Chrome, Firefox, and Opera */,
      }}
      className={styles.selectedPlaceInfo}
      initial={{ opacity: 0, x: 500 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 500 }}
      transition={{
        duration: 0.5,
      }}
    >
      <button className={styles.close_diary} onClick={handleCloseClick}>
        <IoCloseOutline />
      </button>
      <section className={styles.image}></section>
      <section className={styles.place_info}>
        <div className={styles.wrap}>
          <div className={styles.wrap_name}>
            <h2 className={styles.place_name}>{selectedPlace.place_name}</h2>
            <p className={styles.category_name}>{categoryName}</p>
          </div>
          <button className={styles.btn} onClick={handleLoveClick}>
            {loved ? <GoHeartFill className={styles.icon_heart} /> : <GoHeart className={styles.icon_heart} />}
          </button>
        </div>
        <p className={styles.address_name}>
          <MdLocationOn className={styles.icon} />
          {selectedPlace.road_address_name || selectedPlace.address_name}
        </p>
      </section>
      <button className={styles.add_episode} onClick={handleAddEpisodeClick}>
        <span className={styles.plus_btn}>+</span>
      </button>
      <section className={styles.diary}>
        <ul className={styles.episodes}>
          <li className={styles.episode}>2024/03/21 - 3월 전시 '분재'</li>
          <li className={styles.episode}>2024/04/05 - 4월 전시</li>
          <li className={styles.episode}>2023/6/13 - 6월 전시 '마지막 그리고...</li>
          <li className={styles.episode}>2023/10/10 - 10월 전시 '자연'</li>
          <li className={styles.episode}>2023/12/18 - 10월 전시 '불타는 생각'</li>
        </ul>
      </section>
    </motion.div>
  )
}
