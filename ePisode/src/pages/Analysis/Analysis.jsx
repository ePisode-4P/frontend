import React from 'react'
import { motion } from 'framer-motion'
import styles from './Analysis.module.css'
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import AnalysisCard from '../../components/Card/AnalysisCard'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from 'chart.js'
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";


export default function Analysis() {

  //NOTE - 배열 추후 삭제

  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

  const data = {
    labels: ['카페', '영화관', '미술관'],
    datasets: [
      {
        data: [68.34, 21.86, 10.46],
        label: false,
        backgroundColor: [
          'rgb(255, 112, 166)',
          'rgb(255, 156, 194)',
          'rgb(255, 205, 224)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false
      },
      legend: {
        display: false,
      },
      datalabels: {
        color: "black",
        labels: {
          title: {
            font: {
              weight: 'bold'
            }
          },
      value: {
        color: "black"
      },
        },

  formatter: function (value, context) {
    const label = context.chart.data.labels[context.dataIndex];

    const formattedVal = Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
        }).format(value);

          return `${label}\n` + Math.round(value) + '%';
        },
        
      },
    },
  };

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
        <h2 className={styles.category}>생활 패턴 분석 레포트</h2>
        <MdOutlineNavigateNext className={styles.btn_next} onClick={handlekNext} />
      </div>
      <ul className={styles.list_wrap}>
        <Pie className={styles.chart} data={data} options={options}/>
        <li className={styles.sub_title}>주요 활동 장소</li>
        <div className={styles.area_list}>
          <div className={styles.area_box}>
            <p className={styles.area_tags}>#</p>
            <p>구미</p>
          </div>
          <div className={styles.area_box}>
            <p className={styles.area_tags}>#</p>
            <p>대구</p>
          </div>
          <div className={styles.area_box}>
            <p className={styles.area_tags}>#</p>
            <p>부산</p>
          </div>
        </div>
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
