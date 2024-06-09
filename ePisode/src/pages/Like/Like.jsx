import React from 'react'
import { motion } from 'framer-motion'
import styles from './Like.module.css'
import LikeCard from '../../components/Card/LikeCard'
import { useQuery } from '@tanstack/react-query'
import { getInterests } from '../../services/recommend'

export default function Like() {
  const {
    data: interests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['interests'],
    queryFn: () => getInterests(),
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

  return (
    <motion.div
      className={styles.wrap}
      style={{ zIndex: '2000', position: 'absolute', top: '0', left: '75px' }}
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={styles.category}>관심 장소</h2>
      <div className={styles.wrap_card}>
        {interests &&
          interests.length > 0 &&
          interests.map((place, index) => (
            <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible" key={index}>
              <LikeCard place={place} place_name={place.placeName} category_name={place.categoryName} road_address_name={place.addressName} address_name={place.addressName} />
            </motion.div>
          ))}
      </div>
    </motion.div>
  )
}