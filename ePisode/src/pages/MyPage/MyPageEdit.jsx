import React, { useState, useEffect } from 'react'
import style from './MyPageEdit.module.css'
import { useNavigate } from 'react-router-dom'
import { getUserInfo, removeUser, updateUser } from '../../services/user'

export default function MyPageEdit() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [userInfo, setUserInfo] = useState({
    name: '',
    mbti: '',
    favorites: [],
    address: '',
  })

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0]
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i

    if (!allowedExtensions.exec(imageFile.name)) {
      alert('올바른 파일 형식이 아닙니다. jpg, jpeg, png 파일만 업로드 가능합니다.')
      event.target.value = null // 파일 업로드 취소
      return
    }

    setSelectedImage(URL.createObjectURL(imageFile))
  }

  const mbtiList = ['ISTJ', 'ISJF', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ']

  const [selectedMBTI, setSelectedMBTI] = useState('')

  const favList = ['음식점', '카페', '문화시설', '숙박', '관광명소']

  const [favSelected, setFaveSelected] = useState([])

  const favClick = (selectedItem) => {
    if (favSelected.includes(selectedItem)) {
      setFaveSelected(favSelected.filter((fav) => fav !== selectedItem))
      return
    }
    setFaveSelected([...favSelected, selectedItem])
  }

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/map')
  }

  const handleInnerClick = (e) => {
    e.stopPropagation()
  }

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userData = await getUserInfo()
        setUserInfo(userData)
        setFaveSelected(userData.favorites || [])
      } catch (error) {
        console.error(error)
      }
    }
    loadUserInfo()
  }, [])

  const saveClick = async () => {
    try {
      const updatedUser = {
        ...userInfo,
        name: userInfo.name,
        mbti: selectedMBTI,
        favorites: favSelected,
        address: userInfo.address,
      }
      const updatedUserInfo = await updateUser(updatedUser)
      navigate('/map/mypage', { state: { user: updatedUserInfo } })
    } catch (error) {
      console.error(error)
      alert('사용자 정보 수정에 실패했습니다.')
    }
  }
  

  const deleteClick = () => {
    if (window.confirm('탈퇴하시겠습니까?')) {
      removeUser()
        .then(() => {
          console.log('탈퇴 성공')
          navigate('/')
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      alert('탈퇴 취소')
    }
  }

  return (
    <div className={style.filter} onClick={handleClick}>
      <div className={style.mywrap} onClick={handleInnerClick}>
        <p className={style.title}>사용자 정보 수정</p>
        <div className={style.proList}>
          <div className={style.imgGroup}>
            <p className={style.proHead}>프로필 사진</p>
            <input className={style.imgInput} type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className={style.group}>
            <p className={style.proHead}>이름</p>
            <input className={style.inputName}></input>
          </div>
          <div className={style.group}>
            <p className={style.proHead}>MBTI</p>
            <select className={style.selectMbti} onChange={(e) => setSelectedMBTI(e.target.value)}>
              <option selected disabled>
                MBTI
              </option>
              {mbtiList.map((mbtiList) => (
                <option selected={mbtiList == selectedMBTI} value={mbtiList}>
                  {mbtiList}
                </option>
              ))}
            </select>
          </div>

          <div className={style.favgroup}>
            <p className={style.favHead}>관심사</p>
            <div className={style.List}>
              <ul className={style.underGroup}>
                {favList.map((favList, idx) => (
                  <li className={favSelected.find((fav) => fav === favList) ? style.favSelectActive : style.favSelect} onClick={() => favClick(favList)} key={idx}>
                    {favList}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={style.group}>
            <p className={style.proHead}>주소</p>
            <input className={style.inputAddress}></input>
          </div>
        </div>
        <div className={style.bottom}>
          <button className={style.saveBtn} onClick={saveClick}>
            저장
          </button>
          <button className={style.deleteUser} onClick={deleteClick}>
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  )
}
