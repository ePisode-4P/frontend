import React, { useEffect, useState } from 'react'
import Lottie from 'react-lottie'
import styles from './HomePage.module.css'
import animationData from '../../assets/lotties/lottie.json'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  const handleClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    if (isLoggedIn === 'true') {
      navigate('/map')
    } else {
      navigate('/login')
    }
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <section className={styles.wrap_home}>
      <article className={styles.intro}>
        <h1 className={styles.desc}>
          Capture <span className={styles.pinkfont}>freely</span>, your ePisodes.
        </h1>
        <h3 className={styles.desc2}>Daylife, memories, and adventures!</h3>
        <p className={styles.desc3}>Dive into the episodes of our everyday lives, writing and uncovering the essence of who we truly are.</p>
        <button className={styles.btn} onClick={handleClick}>
          <span className={styles.text}>LET'S GO</span>
        </button>
        <img className={styles.dot} src="https://res.cloudinary.com/dnbf7czsn/image/upload/v1712585378/dot2_l1kmgy.png"></img>
      </article>
      <article className={styles.wrap_lottie}>
        <Lottie style={{ position: 'absolute', top: '120px', left: '960px', rotate: '13deg' }} options={defaultOptions} height={670} width={580} />
        <img className={styles.dot2} src="https://res.cloudinary.com/dnbf7czsn/image/upload/v1712585378/dot3_ooh0jb.png" />
      </article>
    </section>
  )
}
