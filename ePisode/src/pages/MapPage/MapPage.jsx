import React, { useRef } from 'react'
import useMap from '../../hooks/useMap'
import styles from './MapPage.module.css'

export default function MapPage() {
  const mapRef = useRef(null)
  const apiKey = import.meta.env.VITE_KAKAO_API_KEY

  useMap(mapRef, apiKey)

  return <div ref={mapRef} className={styles.map} id="map"></div>
}
