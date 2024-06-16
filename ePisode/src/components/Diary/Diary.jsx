import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Diary.module.css'
import { MdLocationOn } from 'react-icons/md'
import { IoCloseOutline, IoPeople, IoPerson } from 'react-icons/io5'
import { GoHeart, GoHeartFill } from 'react-icons/go'

import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getDiaries, getPublicDiaries } from '../../services/diary'
import { getCategoryStyle } from './categoryStyles'
import { addNewLike, removeLike } from '../../services/like'

export default function Diary({ selectedPlace, setSelectedPlace }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleAddEpisodeClick = () => {
    navigate('/map/new', {
      state: {
        x: selectedPlace.x,
        y: selectedPlace.y,
        selectedPlace: selectedPlace,
      },
    })
  }

  const {
    data: diaries = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['diaries', selectedPlace.x, selectedPlace.y],
    queryFn: () => getDiaries(selectedPlace.x, selectedPlace.y, 0),
    onError: (error) => {
      console.error(error)
    },
  })

  const {
    data: publicDiaries = [],
    isLoading1,
    isError1,
  } = useQuery({
    queryKey: ['publicDiaries', selectedPlace.x, selectedPlace.y],
    queryFn: () => getPublicDiaries(selectedPlace.x, selectedPlace.y, 0),
    onError: (error) => {
      console.error(error)
    },
  })

  const [loved, setLoved] = useState(false)
  const [viewMineOnly, setViewMineOnly] = useState(false)
  const categoryName = selectedPlace.category_name ? selectedPlace.category_name.split(' > ').pop() : ''

  const handleEpisodeClick = (id) => {
    navigate(`/map/episode/${id}`, {
      state: {
        id,
        selectedPlace,
        isPublic: false,
      },
    })
  }

  const handlePublicEpisodeClick = (id) => {
    navigate(`/map/episode/${id}`, {
      state: {
        id,
        selectedPlace,
        isPublic: true,
      },
    })
  }

  const handleCloseClick = () => {
    setSelectedPlace(null)
  }

  const handleSelectPlace = () => {
    setSelectedPlace((prevPlace) => ({ ...prevPlace }))
  }

  const { mutate } = useMutation({
    mutationFn: addNewLike,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['diaries'])
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const handleLoveClick = (e) => {
    e.stopPropagation()

    const placeInfo = {
      placeId: selectedPlace.id,
      placeName: selectedPlace.place_name,
      x: selectedPlace.x,
      y: selectedPlace.y,
      addressName: selectedPlace.address_name,
    }

    if (loved) {
      removeLike(placeInfo.x, placeInfo.y)
        .then(() => {
          setLoved(false)
          queryClient.invalidateQueries(['diaries'])
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      mutate(placeInfo, {
        onSuccess: () => {
          setLoved(true)
        },
      })
    }
  }

  const imageStyle = `${styles.image} ${getCategoryStyle(categoryName)} ${diaries.mainImage ? styles.hasImage : ''}`

  useEffect(() => {
    if (diaries.isLike !== undefined) {
      setLoved(diaries.isLike)
    }
  }, [diaries.isLike])

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
      <section className={imageStyle} style={diaries.mainImage ? { backgroundImage: `url(${diaries.mainImage})` } : {}}></section>
      <section className={styles.place_info}>
        <div className={styles.wrap}>
          <div className={styles.wrap_name}>
            <h2 className={styles.place_name} onClick={handleSelectPlace}>
              {selectedPlace.place_name}
            </h2>
            <p className={styles.category_name}>{categoryName}</p>
          </div>
          <button className={styles.btn} onClick={handleLoveClick}>
            {loved ? <GoHeartFill className={styles.icon_heart} /> : <GoHeart className={styles.icon_heart} />}
          </button>
        </div>
        <p className={styles.address_name}>
          <MdLocationOn className={styles.icon} />
          {selectedPlace.address_name || selectedPlace.road_address_name}
        </p>
      </section>
      <button className={styles.add_episode} onClick={handleAddEpisodeClick}>
        <span className={styles.plus_btn}>+</span>
      </button>
      <div className={styles.toggleWrapper}>
        <button className={`${styles.toggleButton} ${!viewMineOnly ? styles.active : ''}`} onClick={() => setViewMineOnly(false)}>
          내 글만 보기
        </button>
        <button className={`${styles.toggleButton} ${viewMineOnly ? styles.active : ''}`} onClick={() => setViewMineOnly(true)}>
          모든 글 보기
        </button>
      </div>

      <section className={styles.diary}>
        {isLoading || (isLoading1 && <p>로딩 중...</p>)}
        {isError || (isError1 && <p>작성된 에피소드가 없습니다!</p>)}
        <ul className={styles.episodes}>
          {!viewMineOnly
            ? diaries.list &&
              diaries.list.map((diary, index) => (
                <li key={index} className={styles.episode} onClick={() => handleEpisodeClick(diary.diaryId)}>
                  {diary.writeDate} - {diary.title && diary.title.length > 10 ? `${diary.title.substring(0, 10)}...` : diary.title || '무제'}
                </li>
              ))
            : publicDiaries &&
              publicDiaries.map((publicDiary, index) => (
                <li key={index} className={styles.episode} onClick={() => handlePublicEpisodeClick(publicDiary.diaryId)}>
                  <p>
                    {publicDiary.writeDate} - {publicDiary.title && publicDiary.title.length > 10 ? `${publicDiary.title.substring(0, 8)}...` : publicDiary.title || '무제'}
                  </p>
                  <div className={styles.wrap_username}>
                    <p className={styles.username}>write by.</p>
                    <p className={styles.username}>{publicDiary.username}</p>
                  </div>
                </li>
              ))}
        </ul>
      </section>
    </motion.div>
  )
}
