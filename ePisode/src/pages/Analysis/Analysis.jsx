import React from 'react'
import { motion } from 'framer-motion'
import styles from './Analysis.module.css'
import { MdOutlineNavigateNext } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import AnalysisCard from '../../components/Card/AnalysisCard'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useQuery } from '@tanstack/react-query'
import { getAnalysisRecency } from '../../services/analysis'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

export default function Analysis() {
  const navigate = useNavigate()

  const {
    data: report = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['recencyReport'],
    queryFn: () => getAnalysisRecency(),
    onError: (error) => {
      console.error('최근 보고서를 가져오는데 실패했습니다.', error)
    },
  })

  const handleNext = () => {
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>
  }

  if (report.message === '기간 내 방문 장소 없음') {
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
          <MdOutlineNavigateNext className={styles.btn_next} onClick={handleNext} />
        </div>
        <div>방문한 장소가 없습니다.</div>
      </motion.div>
    )
  }

  const { graphData, bestPlaces, worstPlaces, activityArea } = report
  const data = {
    labels: graphData.labels,
    datasets: [
      {
        data: graphData.datasets[0].data,
        backgroundColor: ['rgb(255, 112, 166)', 'rgb(255, 156, 194)', 'rgb(255, 205, 224)'],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      datalabels: {
        color: 'black',
        labels: {
          title: {
            font: {
              weight: 'bold',
            },
          },
          value: {
            color: 'black',
          },
        },
        formatter: function (value, context) {
          const label = context.chart.data.labels[context.dataIndex]
          return `${label}\n${Math.round(value)}%`
        },
      },
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
      <div className={styles.top}>
        <h2 className={styles.category}>생활 패턴 분석 레포트</h2>
        <MdOutlineNavigateNext className={styles.btn_next} onClick={handleNext} />
      </div>
      <ul className={styles.list_wrap}>
        <Pie className={styles.chart} data={data} options={options} />
        <li className={styles.sub_title}>주요 활동 장소</li>
        <div className={styles.area_list}>
          {activityArea.map((area, index) => (
            <div className={styles.area_box} key={index}>
              <p className={styles.area_tags}>#</p>
              <p>{area}</p>
            </div>
          ))}
        </div>
        <li className={styles.sub_title}>좋았던 장소</li>
        <div>
          {bestPlaces.map((place, index) => (
            <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible" key={index}>
              <AnalysisCard place={place} place_name={place.placeName} category_name={place.categoryName} road_address_name={place.roadAddressName} address_name={place.addressName} />
            </motion.div>
          ))}
        </div>
        <li className={styles.sub_title}>별로였던 장소</li>
        <div>
          {worstPlaces.map((place, index) => (
            <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible" key={index}>
              <AnalysisCard place={place} place_name={place.placeName} category_name={place.categoryName} road_address_name={place.roadAddressName} address_name={place.addressName} />
            </motion.div>
          ))}
        </div>
      </ul>
    </motion.div>
  )
}
