import React from 'react';
import styles from './AnalysisAll.module.css'
import { motion } from 'framer-motion'


export default function AnalysisAll() {
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

        </motion.div>

    );
}

