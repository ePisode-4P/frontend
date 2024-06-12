import React from 'react'
import styles from './AnalysisAll.module.css'
import { motion } from 'framer-motion'
import AnalysisAllCard from '../../components/Card/AnalysisAllCard'
import { useQuery } from '@tanstack/react-query'
import { getAnalysisList } from '../../services/analysis'
import { useNavigate } from 'react-router-dom'

export default function AnalysisAll() {
  const navigate = useNavigate()

  const {
    data: analysisList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['analysisList'],
    queryFn: () => getAnalysisList(),
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>
  }

  const handleAnalysisClick = (id) => {
    navigate(`/map/analysis/${id}`)
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
        <h2 className={styles.category}>지난 보고서</h2>
      </div>
      <div className={styles.wrap_card}>
        {analysisList.map((analysis, index) => (
          <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible" key={index}>
            <AnalysisAllCard title={analysis.title} onClick={() => handleAnalysisClick(analysis.reportId)} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
