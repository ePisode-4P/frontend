import React, { useState } from 'react'
import { PiStarFill, PiStarLight } from 'react-icons/pi'
import { BsCloudFog2 } from 'react-icons/bs'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { IoSunnyOutline, IoRainyOutline, IoCloudOutline, IoSnowOutline, IoThunderstormOutline } from 'react-icons/io5'
import styles from './EpisodeDetail.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { getEpisode, getPublicDiaries, getPublicEpisode, removeEpisode } from '../../services/diary'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function EpisodeDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const { id, selectedPlace, isPublic } = location.state || {}

  const weatherIcons = {
    Clear: <IoSunnyOutline />,
    Rain: <IoRainyOutline />,
    Clouds: <IoCloudOutline />,
    Snow: <IoSnowOutline />,
    Thunderstorm: <IoThunderstormOutline />,
    Drizzle: <IoRainyOutline />,
    Atmosphere: <BsCloudFog2 />,
  }

  const fetchEpisodeDetails = isPublic ? getPublicEpisode : getEpisode

  const {
    data: episode = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['episode', id],
    queryFn: () => fetchEpisodeDetails(id),
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

  const [photoIndex, setPhotoIndex] = useState(0)

  const handleClick = () => {
    navigate('/map')
  }

  const handleInnerClick = (e) => {
    e.stopPropagation()
  }

  const handleEdit = () => {
    navigate('../episode/edit', {
      state: {
        id,
        episode,
        selectedPlace,
      },
    })
  }

  const handleRemove = () => {
    const isConfirmed = confirm('정말 삭제하시겠습니까?')

    if (isConfirmed) {
      mutateDelete()
    }
  }

  const handlePrevPhoto = () => {
    setPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
  }

  const handleNextPhoto = () => {
    setPhotoIndex((prevIndex) => (prevIndex < episode.diaryImage.length - 1 ? prevIndex + 1 : episode.diaryImage.length - 1))
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
            <p className={styles.date}>{episode.visitDate || '언젠가 들렀음'}</p>
            <span className={styles.weather}>{weatherIcons[episode.weather]}</span>
          </div>
        </div>
        <div className={styles.wrap_content}>
          <div
            className={styles.wrap_photo}
            style={{
              backgroundImage: `url(${
                episode.diaryImage && episode.diaryImage.length > 0 ? episode.diaryImage[photoIndex] : 'https://res.cloudinary.com/dnbf7czsn/image/upload/v1715768138/3129545_mcze7g.jpg'
              })`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className={styles.wrap_slider}>
              {episode.diaryImage && episode.diaryImage.length > 1 && (
                <button className={styles.slider} onClick={handlePrevPhoto}>
                  <GrFormPrevious />
                </button>
              )}
              {episode.diaryImage && episode.diaryImage.length > 1 && (
                <button className={styles.slider} onClick={handleNextPhoto}>
                  <GrFormNext />
                </button>
              )}
            </div>
          </div>
          <p className={styles.content} style={{ whiteSpace: 'pre-wrap' }}>
            {episode.content}
          </p>
        </div>
        {episode.isMe !== false && (
          <div className={styles.wrap_btn}>
            <button className={styles.btn} onClick={handleEdit}>
              Edit
            </button>
            <button className={styles.btn} onClick={handleRemove}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
