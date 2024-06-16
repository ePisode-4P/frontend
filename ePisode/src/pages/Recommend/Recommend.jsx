import React from 'react'
import Lottie from 'react-lottie'
import animationData2 from '../../assets/lotties/loading.json'
import { motion } from 'framer-motion'
import styles from './Recommend.module.css'
import RecommendCard from '../../components/Card/RecommendCard'
import { getRecommends } from '../../services/recommend'
import { useQuery } from '@tanstack/react-query'

export default function Recommend() {
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

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
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
      <h2 className={styles.category}>추천 장소</h2>
      <div className={styles.wrap_card}>
        {isLoading && <Lottie style={{ pointerEvents: 'none', position: 'relative' }} options={defaultOptions2} height={200} width={200} />}
        {recommends.length == 0 && <p>추천 장소가 없습니다.</p>}
        {recommends &&
          recommends.length > 0 &&
          recommends.map((place, index) => (
            <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible" key={place.id}>
              <RecommendCard
                place={place}
                isLike={place.isLike}
                place_name={place.placeName}
                category_name={place.categoryName}
                road_address_name={place.addressName}
                address_name={place.addressName}
              />
            </motion.div>
          ))}
      </div>
    </motion.div>
  )
}
