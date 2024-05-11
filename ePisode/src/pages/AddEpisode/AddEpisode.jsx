import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './AddEpisode.module.css'

export default function AddEpisode() {
  const navigate = useNavigate()
  const location = useLocation()
  const { x, y } = location.state || {}

  console.log(x, y)

  const handleClick = () => {
    navigate('/map')
  }

  const handleInnerClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div className={styles.filter} onClick={handleClick}>
      <div className={styles.episode} onClick={handleInnerClick}>
        <div style={{ width: '85%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p>대충 이쯤 날짜</p>
          <h2>에피소드 추가하는 창</h2>
          <button style={{ width: '40px', height: '30px' }} onClick={handleClick}>
            x
          </button>
        </div>
        <section style={{ marginTop: '10px', backgroundColor: 'rgba(255, 255, 255, 0.45)', width: '85%', height: '70%', border: '1px solid #e8e8e8', borderRadius: '10px' }}></section>
      </div>
    </div>
  )
}
