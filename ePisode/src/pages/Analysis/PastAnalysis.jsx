import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAnalysisId } from '../../services/analysis'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './PastAnalysis.module.css'
import { MdOutlineNavigateNext } from 'react-icons/md'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import AnalysisCard from '../../components/Card/AnalysisCard'
import Lottie from 'react-lottie'
import noData from '../../assets/lotties/nothing.json'
import { MdOutlineFileDownload } from 'react-icons/md'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

//TODO - 엑셀 다운로드 기능 추가

export default function PastAnalysis() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data: analysis = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['analysis', id],
    queryFn: () => getAnalysisId(id),
    onError: (error) => {
      console.error(error)
    },
    enabled: !!id,
  })

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: noData,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

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

  if (!analysis || !Object.keys(analysis).length) {
    return <div>보고서를 찾을 수 없습니다.</div>
  }

  if (analysis.message == '기간 내 방문 장소 없음') {
    return (
      <motion.div
        className={styles.wrap}
        style={{ zIndex: '2000', position: 'absolute', top: '0', left: '75px' }}
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.top}>
          <div className={styles.title_wrap}>
            <h2 className={styles.category}>생활 패턴 분석 레포트</h2>
          </div>
          <MdOutlineNavigateNext className={styles.btn_next} onClick={handleNext} />
        </div>
        <div className={styles.lottie_wrap}>
          <Lottie style={{ pointerEvents: 'none', position: 'relative' }} options={defaultOptions1} height={200} width={200} />
          <div className={styles.noReport}>레포트가 존재하지 않습니다.</div>
        </div>
      </motion.div>
    )
  }

  const { graphData, bestPlaces, worstPlaces, activityArea } = analysis
  const data = {
    labels: graphData.labels,
    datasets: [
      {
        data: graphData.datasets[0].data,
        backgroundColor: ['rgb(255, 112, 166)', 'rgb(255, 161, 199)', 'rgb(255, 203, 225)', 'rgb(254, 229, 239)'],
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
          return `${label}\n${Math.round(value) * 10}%`
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
        <div className={styles.title_wrap}>
          <h2 className={styles.category}>생활 패턴 분석 레포트</h2>
          <MdOutlineFileDownload className={styles.btn_downLoad} />
        </div>
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
          {bestPlaces.length > 0 ? (
            bestPlaces.map((place, index) => (
              <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible" key={index}>
                <AnalysisCard place={place} place_name={place.placeName} category_name={place.categoryName} road_address_name={place.roadAddressName} address_name={place.addressName} />
              </motion.div>
            ))
          ) : (
            <div>
              <Lottie style={{ pointerEvents: 'none', position: 'relative' }} options={defaultOptions1} height={200} width={200} />
            </div>
          )}
        </div>
        <li className={styles.sub_title}>별로였던 장소</li>
        <div>
          {worstPlaces.length > 0 ? (
            worstPlaces.map((place, index) => (
              <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible" key={index}>
                <AnalysisCard place={place} place_name={place.placeName} category_name={place.categoryName} road_address_name={place.roadAddressName} address_name={place.addressName} />
              </motion.div>
            ))
          ) : (
            <div>
              <Lottie style={{ pointerEvents: 'none', position: 'relative' }} options={defaultOptions1} height={200} width={200} />
            </div>
          )}
        </div>
      </ul>
    </motion.div>
  )
}
