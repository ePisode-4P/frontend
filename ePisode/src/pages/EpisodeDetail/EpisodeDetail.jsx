import React, { useState } from 'react'
import { PiStarFill, PiStarLight } from 'react-icons/pi'
import { BsQuestion } from 'react-icons/bs'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { IoSunnyOutline } from 'react-icons/io5'
import styles from './EpisodeDetail.module.css'
import { useNavigate } from 'react-router-dom'

export default function EpisodeDetail() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState(4)
  const [date, setDate] = useState('')
  // const [weather, setWeather] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [photo, setPhoto] = useState(null)
  const [text, setText] = useState('')

  const handleClick = () => {
    navigate('/map')
  }

  const handleInnerClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div className={styles.filter} onClick={handleClick}>
      <div className={styles.episode} onClick={handleInnerClick}>
        <div className={styles.wrap_title}>
          <div className={styles.rating}>
            {[...Array(rating)].map((a, i) => (
              <PiStarFill className="star" key={i} onClick={() => setRating(i + 1)} />
            ))}
            {[...Array(5 - rating)].map((a, i) => (
              <PiStarLight className="star" key={i} onClick={() => setRating(rating + i + 1)} />
            ))}
          </div>
          <h2 className={styles.title}>왜 벌써 밤이지¿</h2>
          <div className={styles.wrap_date}>
            <p className={styles.date}>2024-05-12</p>
            <span className={styles.weather}>
              <IoSunnyOutline />
              {/* <BsQuestion /> */}
            </span>
          </div>
        </div>
        <div className={styles.wrap_content}>
          <div
            className={styles.wrap_photo}
            style={{
              backgroundImage: `url(${'https://res.cloudinary.com/dnbf7czsn/image/upload/v1713246079/KakaoTalk_20240416_143948205_rsg30g.jpg'})`,
              backgroundSize: 'cover',
            }}
          ></div>
          <p className={styles.content}>왜 주말에만 시간이 빨리 가지¿</p>
        </div>
        <div className={styles.wrap_btn}>
          <button className={styles.btn}>Edit</button>
          <button className={styles.btn}>Delete</button>
        </div>
      </div>
    </div>
  )
}
