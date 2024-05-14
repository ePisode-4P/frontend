import React, { useState } from 'react'
import { PiStarFill, PiStarLight } from 'react-icons/pi'
import { BsQuestion } from 'react-icons/bs'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { IoSunnyOutline } from 'react-icons/io5'
import styles from './EpisodeDetail.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { getEpisode, removeEpisode } from '../../services/diary'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function EpisodeDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const { id } = location.state || {}

  const {
    data: episode = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['episode', id],
    queryFn: () => getEpisode(id),
    onError: (error) => {
      console.error(error)
    },
    enabled: !!id,
  })

  const { mutate: mutateDelete } = useMutation({
    mutationFn: () => removeEpisode(id),
    onSuccess: (data) => {
      navigate('/map')
      queryClient.invalidateQueries(['diaries'])
    },
    onError: (error) => {
      console.error(error)
    },
  })

  // const [title, setTitle] = useState('')
  // const [rating, setRating] = useState(4)
  // const [date, setDate] = useState('')
  // const [weather, setWeather] = useState('')
  // const [photoUrl, setPhotoUrl] = useState('')
  // const [photo, setPhoto] = useState(null)
  // const [text, setText] = useState('')

  const handleClick = () => {
    navigate('/map')
  }

  const handleInnerClick = (e) => {
    e.stopPropagation()
  }

  const handleRemove = () => {
    mutateDelete()
  }

  return (
    <div className={styles.filter} onClick={handleClick}>
      <div className={styles.episode} onClick={handleInnerClick}>
        <div className={styles.wrap_title}>
          <div className={styles.rating}>
            {[...Array(episode.rating || 0)].map((_, i) => (
              <PiStarFill className="star" key={i} />
            ))}
            {[...Array(5 - (episode.rating || 0))].map((_, i) => (
              <PiStarLight className="star" key={i} />
            ))}
          </div>
          <h2 className={styles.title}>{episode.title || '무제'}</h2>
          <div className={styles.wrap_date}>
            <p className={styles.date}>{episode.date || '언젠가 들렀음'}</p>
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
          <p className={styles.content}>{episode.content}</p>
        </div>
        <div className={styles.wrap_btn}>
          <button className={styles.btn}>Edit</button>
          <button className={styles.btn} onClick={handleRemove}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
