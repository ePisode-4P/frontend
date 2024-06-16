import React from 'react'
import styles from './MyDiaries.module.css'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { getMyDiaries } from '../../services/diary'
import { useQuery } from '@tanstack/react-query'
import { useSelectedPlace } from '../../contexts/SelectedPlaceContext'

export default function MyDiaries() {
  const navigate = useNavigate()
  const { setSelectedPlace } = useSelectedPlace()

  const {
    data: mine = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['mine'],
    queryFn: () => getMyDiaries(0),
    onError: (error) => {
      console.error(error)
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: Infinity,
    cacheTime: 0,
  })

  const handleClick = () => {
    navigate('/map')
  }

  const handleInnerClick = (e) => {
    e.stopPropagation()
  }

  const handleEpisodeClick = (id, selectedPlace) => {
    navigate(`/map/episode/${id}`, {
      state: {
        id,
        selectedPlace,
        isPublic: false,
      },
    })

    const newPlace = {
      place_name: selectedPlace.place_name,
      category_name: selectedPlace.category_name,
      address_name: selectedPlace.address_name,
      x: selectedPlace.x,
      y: selectedPlace.y,
    }
    setSelectedPlace({ place: newPlace })
  }

  const cardVariants = {
    hidden: (index) => ({
      opacity: 0,
      y: 20 * index,
    }),
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
      },
    }),
  }

  return (
    <div className={styles.filter} onClick={handleClick}>
      <div className={styles.mywrap} onClick={handleInnerClick}>
        <h2 className={styles.category}>내가 쓴 글</h2>
        <div className={styles.wrap_card}>
          {mine.length == 0 && <p>내가 쓴 글이 없습니다.</p>}
          {mine.map((diary, index) => (
            <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible" key={index}>
              <div
                className={styles.card}
                onClick={() =>
                  handleEpisodeClick(diary.diaryId, {
                    place_name: diary.placeName,
                    address_name: diary.addressName,
                    category_name: diary.categoryName,
                    x: diary.x,
                    y: diary.y,
                  })
                }
              >
                <p>
                  {diary.writeDate} - {diary.title || '무제'}
                </p>
                <p className={styles.location}>{diary.placeName}에서</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
