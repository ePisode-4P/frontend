import React from 'react'
import { motion } from 'framer-motion'
import styles from './Analysis.module.css'
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import AnalysisCard from '../../components/Card/AnalysisCard'

export default function Analysis() {
  
  //TODO - 파이 그래프 추가하기!!!
  //NOTE - 배열 추후 삭제
  const likePlace = [
    {
      place_name: '카페 라떼',
      category_name: '카페',
      road_address_name: '서울시 강남구 테헤란로 123',
      address_name: '서울시 강남구 역삼동 456-789',
      x: '128.3928142',
      y: '36.1458862',
    },
    {
      place_name: '서점 북스',
      category_name: '서점',
      road_address_name: '서울시 종로구 종로 101',
      address_name: '서울시 종로구 이화동 102-103',
    },
    {
      place_name: '고기 천국',
      category_name: '한식',
      road_address_name: '서울시 마포구 홍익로 22',
      address_name: '서울시 마포구 서교동 345-678',
    },
  ]

  const dislikePlace = [
    {
      place_name: '산타 마을',
      category_name: '테마파크',
      road_address_name: '강원도 춘천시 산타로 1',
      address_name: '강원도 춘천시 석사동',
    },
    {
      place_name: '수제 맥주 공장',
      category_name: '바',
      road_address_name: '서울시 용산구 이태원로 54',
      address_name: '서울시 용산구 이태원동 345-678',
    },
    {
      place_name: '복합 문화공간 루프',
      category_name: '문화시설',
      road_address_name: '서울시 마포구 월드컵로 25',
      address_name: '서울시 마포구 성산동 123-45',
    },
  ]

  const navigate = useNavigate()
  
  const handlekNext = () => {
    navigate('/map/allanalysis')
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
      <div className={styles.top}>
        <h2 className={styles.category}>생활 패턴 분석 보고서</h2>
        <MdOutlineNavigateNext className={styles.btn_next} onClick={handlekNext} />
      </div>
      <ul className={styles.list_wrap}>
        <li>파이 그래프</li>
        <li className={styles.sub_title}>좋았던 장소</li>
        <div>
        {likePlace.map((place, index) => (
          <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible" key={index}>
            <AnalysisCard place={place} place_name={place.place_name} category_name={place.category_name} road_address_name={place.road_address_name} address_name={place.address_name} />
          </motion.div>
        ))}
      </div>
        <li className={styles.sub_title}>별로였던 장소</li>
        <div>
        {dislikePlace.map((place, index) => (
          <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible" key={index}>
            <AnalysisCard place={place} place_name={place.place_name} category_name={place.category_name} road_address_name={place.road_address_name} address_name={place.address_name} />
          </motion.div>
        ))}
      </div>
      </ul>
    </motion.div>
  )
}
