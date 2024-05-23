import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '../../components/Header/Header'
import HomePage from '../HomePage/HomePage'
import styles from './MainPage.module.css'

import { RxGithubLogo } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import { validateToken } from '../../services/auth'

export default function MainPage() {
  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    const checkToken = async () => {
      await validateToken()
    }
    checkToken()
  }, [])

  return (
    <div
      style={{
        WebkitUserSelect: 'none' /* Safari */,
        msUserSelect: 'none' /* Internet Explorer/Edge */,
        userSelect: 'none' /* Non-prefixed version, currently supported by Chrome, Firefox, and Opera */,
      }}
    >
      <div ref={homeRef}>
        <Header homeRef={homeRef} aboutRef={aboutRef} contactRef={contactRef} />
        <HomePage />
      </div>
      <section className={styles.wrap_about} ref={aboutRef}>
        <motion.article className={styles.about1} initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>
          <article className={styles.about1}>
            <div className={styles.image}></div>
            <div className={styles.desc}>
              <h2 className={styles.title}>ePisodes</h2>
              <p className={styles.tag}>#에피소드 #모험 #추억 #발견</p>
              <p className={styles.explain}>당신의 발자취를 지도 위에 표시하고, 글이나 사진을 통해 당신의 여정을 기록하세요. 모든 에피소드를 한눈에 보며 나만의 이야기를 완성해 보세요.</p>
            </div>
          </article>
        </motion.article>
        <motion.article className={styles.about2} initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>
          <article className={styles.about2}>
            <div className={styles.desc2}>
              <h2 className={styles.title2}>Diary</h2>
              <p className={styles.tag2}>#일상 #다이어리 #소중한순간 #감성</p>
              <p className={styles.explain2}>
                특별한 순간들을 기록하고, 감성적인 사진으로 당신의 일상을 아름답게 담아내세요. 다이어리를 통해 소중한 추억들을 한눈에 볼 때, 각각의 순간들이 어우러져 당신만의 독특한 여정을 만들어내는
                것을 경험할 수 있습니다.
              </p>
            </div>
            <div className={styles.image2}></div>
          </article>
        </motion.article>
      </section>
      <footer className={styles.wrap_contact} ref={contactRef}>
        <div className={styles.info}>
          <p>2024;Team 4P</p>
          <p>Project ePisode</p>
        </div>
        <p className={styles.message}>
          Do you want to contact us?
          <Link to={'/'} className={styles.email}>
            Send Email
          </Link>
        </p>
        <Link to={'https://github.com/ePisode-4P'} className={styles.github}>
          <RxGithubLogo />
        </Link>
      </footer>
    </div>
  )
}
