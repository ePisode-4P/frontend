import React from 'react'
import { motion } from 'framer-motion'
import styles from './Recommend.module.css'
import RecommendCard from '../../components/Card/RecommendCard'
import { getRecommends, markAsDisliked } from '../../services/recommend'
import { useQuery, useQueryClient} from '@tanstack/react-query'

export default function Recommend() {
  const queryClient = useQueryClient()

  const {
    data: recommends = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['recommends'],
    queryFn: () => getRecommends(),
    onError: (error) => {
      console.error(error)
    },
  })

  const handleDislike = async (placeId) => {
    try {
      await markAsDisliked(placeId)
      queryClient.invalidateQueries(['recommends'])
    } catch (error) {
      console.error('Failed to mark as disliked:', error)
    }
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
    <motion.div
      className={styles.wrap}
      style={{ zIndex: '2000', position: 'absolute', top: '0', left: '75px' }}
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={styles.category}>추천 장소</h2>
      <div className={styles.wrap_card}>
        {recommends &&
          recommends.length > 0 &&
          recommends.map((place, index) => (
            <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible" key={place.id}>
              <RecommendCard place={place} place_name={place.placeName} category_name={place.categoryName} road_address_name={place.addressName} address_name={place.addressName} onDislike={handleDislike} />
            </motion.div>
          ))}
      </div>
    </motion.div>
  )
}
