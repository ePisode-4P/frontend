import React from 'react';
import styles from './AnalysisAll.module.css'
import { motion } from 'framer-motion'
import AnalysisAllCard from '../../components/Card/AnalysisAllCard';


export default function AnalysisAll() {
    
    const analysis_list = [
        {
            date: '2024년 1월'
        },
        {
            date: '2024년 2월',
        },
        {
            date: '2024년 3월',
        }
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
        <motion.div className={styles.wrap}
            style={{ zIndex: '2000', position: 'absolute', top: '0', left: '75px' }}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
        <div className={styles.top}>
            <h2 className={styles.category}>지난 보고서</h2>
        </div>
        <div>
        {analysis_list.map((place, index) => (
          <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible" key={index}>
            <AnalysisAllCard place={place} date={place.date}/>
          </motion.div>
        ))}
        </div>

        </motion.div>

    );
}

