import React, { useEffect, useRef, useState } from 'react'
import useMap from '../../hooks/useMap'
import styles from './MapPage.module.css'
import SideBar from '../../components/SideBar/SideBar'
import Diary from '../../components/Diary/Diary'
import { Outlet, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useSelectedPlace } from '../../contexts/SelectedPlaceContext'
import { useDiaryCoordinates } from '../../contexts/DiaryCoordinatesContext'
import { useQuery } from '@tanstack/react-query'
import { getMarkers } from '../../services/diary'
import { validateToken } from '../../services/auth'

export default function MapPage() {
  const navigate = useNavigate()
  const { selectedPlace } = useSelectedPlace()
  const { diaryCoordinates, setDiaryCoordinates } = useDiaryCoordinates()
  const mapRef = useRef(null)
  const apiKey = import.meta.env.VITE_KAKAO_API_KEY
  const [userSelectedPlace, setUserSelectedPlace] = useState(null)

  const {
    data: markers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['markers'],
    queryFn: () => getMarkers(),
    onError: (error) => {
      console.error(error)
    },
  })

  useEffect(() => {
    const checkToken = async () => {
      const isValidToken = await validateToken()
      if (!isValidToken) {
        navigate('/login')
      }
    }
    checkToken()
  }, [navigate])

  useEffect(() => {
    if (markers.length > 0) {
      setDiaryCoordinates(markers)
    }
  }, [markers, setDiaryCoordinates])

  useMap(mapRef, apiKey, setUserSelectedPlace, selectedPlace, diaryCoordinates)

  return (
    <>
      <SideBar />
      <div className={styles.mapContainer}>
        <div ref={mapRef} className={styles.map} id="map"></div>
        <AnimatePresence>{userSelectedPlace && <Diary selectedPlace={userSelectedPlace} setSelectedPlace={setUserSelectedPlace} />}</AnimatePresence>
        <Outlet />
      </div>
    </>
  )
}
