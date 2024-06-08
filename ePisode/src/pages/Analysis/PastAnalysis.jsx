import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAnalysisId } from '../../services/analysis'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './Analysis.module.css'

export default function PastAnalysis() {
  const { id } = useParams()

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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>
  }

  if (!analysis || !Object.keys(analysis).length) {
    return <div>보고서를 찾을 수 없습니다.</div>
  }

  return (
    <motion.div
      className={styles.wrap}
      style={{ zIndex: '2000', position: 'absolute', top: '0', left: '75px' }}
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    ></motion.div>
  )
}
