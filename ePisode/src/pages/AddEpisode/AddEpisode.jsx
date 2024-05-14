import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PiStarFill, PiStarLight } from 'react-icons/pi'
import { BsQuestion } from 'react-icons/bs'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { IoSunnyOutline } from 'react-icons/io5'
import styles from './AddEpisode.module.css'
import { useDiaryCoordinates } from '../../contexts/DiaryCoordinatesContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNewEpisode } from '../../services/diary'

export default function AddEpisode() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const { x, y, selectedPlace } = location.state || {}
  const { diaryCoordinates, setDiaryCoordinates } = useDiaryCoordinates()

  const [title, setTitle] = useState('')
  const [rating, setRating] = useState(0)
  const [date, setDate] = useState('')
  // const [weather, setWeather] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [photo, setPhoto] = useState(null)
  const [content, setContent] = useState('')

  const { mutate } = useMutation({
    mutationFn: addNewEpisode,
    onSuccess: (data) => {
      navigate('/map')
      queryClient.invalidateQueries(['diaries'])
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const handleClick = () => {
    navigate('/map')
  }

  const handleInnerClick = (e) => {
    e.stopPropagation()
  }

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newPhoto = e.target.files[0]
      setPhoto(newPhoto)
      setPhotoUrl(URL.createObjectURL(newPhoto))
    }
  }

  const handleSave = async () => {
    const newCoordinates = { x, y, selectedPlace }
    setDiaryCoordinates([...diaryCoordinates, newCoordinates])

    mutate({
      placeId: selectedPlace.id, //
      placeName: selectedPlace.place_name,
      addressName: selectedPlace.address_name,
      x,
      y,
      visitDate: date,
      goPublic: false,
      rating,
      title,
      content,
      weather: 'Rain',
      image: [],
    })
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
          <input className={styles.title} type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className={styles.wrap_date}>
            <input className={styles.date} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <span className={styles.weather}>
              {/* <IoSunnyOutline /> */}
              <BsQuestion />
            </span>
          </div>
        </div>
        <div className={styles.wrap_content}>
          <div
            className={styles.wrap_photo}
            style={{
              backgroundImage: `url(${photoUrl})`,
              backgroundSize: 'cover',
              opacity: photoUrl ? 0.8 : 1,
            }}
          >
            <label htmlFor="photo-upload" className={styles.photo}>
              <MdAddPhotoAlternate />
            </label>
            <input id="photo-upload" type="file" multiple accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
          </div>
          <textarea className={styles.content} placeholder="여기에 글을 작성하세요..." value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div className={styles.wrap_btn}>
          <button className={styles.btn} onClick={handleSave}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  )
}
