import React, { useRef, useState } from 'react'
import useMap from '../../hooks/useMap'
import styles from './MapPage.module.css'
import SideBar from '../../components/SideBar/SideBar'
import Diary from '../../components/Diary/Diary'
import { Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useSelectedPlace } from '../../contexts/SelectedPlaceContext'
import { useDiaryCoordinates } from '../../contexts/DiaryCoordinatesContext'

export default function MapPage() {
  const { selectedPlace } = useSelectedPlace()
  const { diaryCoordinates } = useDiaryCoordinates()
  const mapRef = useRef(null)
  const apiKey = import.meta.env.VITE_KAKAO_API_KEY
  const [userSelectedPlace, setUserSelectedPlace] = useState(null)

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
