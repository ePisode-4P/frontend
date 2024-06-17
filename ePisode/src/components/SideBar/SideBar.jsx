import React from 'react'
import styles from './SideBar.module.css'
import { Link, useLocation } from 'react-router-dom'

import { MdLocalParking } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { TbLocationPin } from 'react-icons/tb'
import { FiTable } from 'react-icons/fi'
import { HiSearch } from 'react-icons/hi'
import { LuFileHeart } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { TbFileLike } from 'react-icons/tb'

export default function SideBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const profileClick = () => {
    navigate('/map/mypage')
  }

  const handleSearch = () => {
    if (location.pathname === '/map/search') {
      navigate('/map')
    } else {
      navigate('/map/search')
    }
  }

  const handleRecommend = () => {
    if (location.pathname === '/map/recommend') {
      navigate('/map')
    } else {
      navigate('/map/recommend')
    }
  }

  const handleLike = () => {
    if (location.pathname === '/map/likes') {
      navigate('/map')
    } else {
      navigate('/map/likes')
    }
  }

  const handleBookmark = () => {
    if (location.pathname === '/map/bookmark') {
      navigate('/map')
    } else {
      navigate('/map/bookmark')
    }
  }

  const handleAnalysis = () => {
    if (location.pathname === '/map/analysis' || location.pathname === '/map/allanalysis' || location.pathname.startsWith('/map/analysis/')) {
      navigate('/map')
    } else {
      navigate('/map/analysis')
    }
  }

  const style = {
    color: '#ff70a6',
    filter: 'drop-shadow(1px 1px 0.5px #ff70a7dd)',
    transform: 'scale(1.1)',
  }

  const searchIconStyle = location.pathname === '/map/search' ? style : {}
  const recommendIconStyle = location.pathname === '/map/recommend' ? style : {}
  const analysisIconStyle = location.pathname === '/map/analysis' || location.pathname === '/map/allanalysis' || location.pathname.startsWith('/map/analysis/') ? style : {}
  const likeIconStyle = location.pathname === '/map/likes' ? style : {}
  const heartIconStyle = location.pathname === '/map/bookmark' ? style : {}

  return (
    <div className={styles.sidebar}>
      <div>
        <div className={styles.wrap_home}>
          <Link to={'/'}>
            <MdLocalParking className={styles.home} />
          </Link>
        </div>
        <button className={styles.btn} onClick={handleSearch}>
          <HiSearch className={styles.btn_icon} style={searchIconStyle} />
        </button>
        <button className={styles.btn} onClick={handleRecommend}>
          <TbLocationPin className={styles.btn_icon} style={recommendIconStyle} />
        </button>
        <button className={styles.btn} onClick={handleLike}>
          <TbFileLike className={styles.btn_icon} style={likeIconStyle} />
        </button>
        <button className={styles.btn} onClick={handleBookmark}>
          <LuFileHeart className={styles.btn_icon} style={heartIconStyle} />
        </button>

        <button className={styles.btn} onClick={handleAnalysis}>
          <FiTable className={styles.btn_icon} style={analysisIconStyle} />
        </button>
      </div>
      <button className={styles.btn_profile} onClick={profileClick}>
        <CgProfile className={styles.btn_icon} />
      </button>
    </div>
  )
}
