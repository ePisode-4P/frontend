import React from 'react'
import { motion } from 'framer-motion'
import styles from './Bookmark.module.css'
import BookmarkCard from '../../components/Card/BookmarkCard'
import { useQuery } from '@tanstack/react-query'
import { getLikes } from '../../services/like'
import Lottie from 'react-lottie'
import noData from '../../assets/lotties/nothing.json'

export default function Bookmark() {
  const {
    data: likes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['likes'],
    queryFn: () => getLikes(),
    onError: (error) => {
      console.error(error)
    },
  })

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

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: noData,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <motion.div
      className={styles.wrap}
      style={{ zIndex: '2000', position: 'absolute', top: '0', left: '75px' }}
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={styles.category}>즐겨찾기</h2>
      <div className={styles.wrap_card}>
        {likes.length == 0 && (
          <div className={styles.lottie_wrap}>
            <Lottie style={{ pointerEvents: 'none', position: 'relative' }} options={defaultOptions1} height={200} width={200} />
            <div className={styles.noBookmark}>즐겨찾는 장소가 없습니다.</div>
          </div>
        )}
        {likes &&
          likes.length > 0 &&
          likes.map((place, index) => (
            <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible" key={index}>
              <BookmarkCard index={index} place={place} place_name={place.placeName} category_name={place.categoryName} road_address_name={place.addressName} address_name={place.addressName} />
            </motion.div>
          ))}
      </div>
    </motion.div>
  )
}
