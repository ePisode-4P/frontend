import React from 'react'
import { motion } from 'framer-motion'
import styles from './Like.module.css'
import LikeCard from '../../components/Card/LikeCard'

export default function Like() {
  //NOTE - 임시 배열 나중에 지우기!!
  const recommendedPlaces = [
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
    {
      place_name: '영화의 전당',
      category_name: '영화관',
      road_address_name: '부산시 해운대구 APEC로 55',
      address_name: '부산시 해운대구 우동 123-456',
    },
    {
      place_name: '피자 헤븐',
      category_name: '피자',
      road_address_name: '대구시 중구 달구벌대로 333',
      address_name: '대구시 중구 동성로 123',
    },
    {
      place_name: '책방 코지',
      category_name: '서점',
      road_address_name: '인천시 부평구 부평대로 112',
      address_name: '인천시 부평구 부평동 456-789',
    },
    {
      place_name: '비건 파라다이스',
      category_name: '비건 식당',
      road_address_name: '광주시 남구 효덕로 77',
      address_name: '광주시 남구 봉선동 234-567',
    },
    {
      place_name: '갤러리 아트',
      category_name: '미술관',
      road_address_name: '대전시 서구 둔산대로 155',
      address_name: '대전시 서구 둔산동 1234-56',
    },
    {
      place_name: '해변 산책로',
      category_name: '관광지',
      road_address_name: '부산시 해운대구 해운대해변로 264',
      address_name: '부산시 해운대구 중1동',
    },
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
        {recommendedPlaces.map((place, index) => (
          <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible" key={index}>
            <LikeCard place={place} place_name={place.place_name} category_name={place.category_name} road_address_name={place.road_address_name} address_name={place.address_name} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
