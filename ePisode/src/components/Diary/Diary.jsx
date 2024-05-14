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
        selectedPlace: selectedPlace,
      },
    })
  }

  const handleEpisodeClick = () => {
    navigate('/map/episode/1')
  }

  const handleCloseClick = () => {
    setSelectedPlace(null)
  }

  const handleLoveClick = (e) => {
    e.stopPropagation()
    setLoved(!loved)
  }

  const categoryGroups = {
    학교: ['초등학교', '중학교', '고등학교', '대학교', '전문대학', '특수학교', '특목고등학교', '특성화고등학교'],
    영화관: ['CGV', '메가박스', '롯데시네마', '아파트', '어린이집', '유치원'],
    카페: ['카페', '커피전문점', '디저트카페', '갤러리카페', '제과,베이커리', '스타벅스'],
    역: ['기차역', 'KTX,SRT정차역', '공항'],
    병원: ['병원', '대학병원', '종합병원', '외과', '내과', '약국', '피부과'],
    마트: ['이마트', '롯데마트', '홈플러스', 'GS25', 'CU'],
    백화점: ['백화점', '롯데백화점', '현대백화점'],
    공원: ['공원', '도시근린공원'],
    정류장: ['고속,시외버스정류장'],
    박물관: ['박물관', '미술관'],
  };

  const getCategoryStyle = () => {
    const category = categoryName.trim();

    if (categoryGroups['학교'].includes(category)) {
      return styles.school;
    }
    else if (categoryGroups['영화관'].includes(category)) {
      return styles.movie;
    }
    else if (categoryGroups['카페'].includes(category)) {
      return styles.cafe;
    }
    else if (categoryGroups['역'].includes(category)) {
      return styles.station;
    }
    else if (categoryGroups['병원'].includes(category)) {
      return styles.hospital;
    }
    else if (categoryGroups['마트'].includes(category)) {
      return styles.mart;
    }
    else if (categoryGroups['백화점'].includes(category)) {
      return styles.department;
    }
    else if (categoryGroups['공원'].includes(category)) {
      return styles.park;
    }
    else if (categoryGroups['정류장'].includes(category)) {
      return styles.busstop;
    }
    else if (categoryGroups['박물관'].includes(category)) {
      return styles.museum;
    }
    else {
      return styles.default;
    }
  };

  const imageStyle = `${styles.image} ${getCategoryStyle()}`;

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
      <section className={imageStyle}></section>
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
          <li className={styles.episode} onClick={handleEpisodeClick}>
            2024/03/21 - 3월 전시 '분재'
          </li>
          <li className={styles.episode}>2024/04/05 - 4월 전시</li>
          <li className={styles.episode}>2023/6/13 - 6월 전시 '마지막 그리고...</li>
          <li className={styles.episode}>2023/10/10 - 10월 전시 '자연'</li>
          <li className={styles.episode}>2023/12/18 - 10월 전시 '불타는 생각'</li>
        </ul>
      </section>
    </motion.div>
  )
}
