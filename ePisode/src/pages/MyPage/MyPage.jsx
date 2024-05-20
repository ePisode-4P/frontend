import React from 'react'
import style from './MyPage.module.css'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../services/auth'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../../services/user'

export default function MyPage() {
  const navigate = useNavigate()

  //TODO - user 정보 추가적인 연결 필요
  const {
    data: user = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
    onError: (error) => {
      console.error(error)
    },
  })

  //TODO - edit 이벤트 추가
  const editClick = () => {
    navigate('/map/profileedit')
  }

  const imgClick = () => {
    navigate('/')
  }

  const logoutClick = async () => {
    await logout()

    navigate('/')
  }

  const handleClick = () => {
    navigate('/map')
  }

  const handleInnerClick = (e) => {
    e.stopPropagation()
  }

  const bookmarkClick = (e) => {
    navigate('/map/bookmark')
  }

  const likesClick = (e) => {
    navigate('/map/likes')
  }

  return (
    <div className={style.filter} onClick={handleClick}>
      <div className={style.mywrap} onClick={handleInnerClick}>
        <div className={style.top}>
          <img
            className={style.image}
            src="https://images.unsplash.com/photo-1712574340322-aaeae2cbaa8f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ></img>
          <div className={style.pro}>
            <div className={style.proIn}>
              <div className={style.name}>{user.username}</div>
              <div className={style.mbti}>{user.mbti}</div>
              <button className={style.edit} onClick={editClick}>
                edit
              </button>
              <button className={style.logout} onClick={logoutClick}>
                Logout
              </button>
            </div>
            <div className={style.email}>{user.email}</div>
          </div>
        </div>

        <div
          className={style.line}
          style={{
            width: '60%',
            borderBottom: '1px solid #aaa',
            lineHeight: '0.1em',
            margin: '10px 0 20px',
          }}
        ></div>
        <div className={style.bottom}>
          <div className={style.back1}>
            <p className={style.favorite}>관심사</p>
            <p className={style.favDetail}>영화관, 카페, 도서관</p>
          </div>
          <div className={style.back1}>
            <p className={style.visit}>방문한 장소 수</p>
            <div className={style.num}>{user.numVisitPlace}개</div>
          </div>
          <div className={style.back2} onClick={bookmarkClick}>
            <p className={style.bookmark}>즐겨찾기</p>
            <div className={style.num}>{user.numBookmarkPlace}개</div>
          </div>
          <div className={style.back2} onClick={likesClick}>
            <p className={style.likes}>관심장소</p>
            <div className={style.num}>0개</div>
          </div>
        </div>
      </div>
    </div>
  )
}
