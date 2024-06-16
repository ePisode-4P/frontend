import React, { useState, useEffect } from 'react'
import style from './MyPageEdit.module.css'
import { useNavigate } from 'react-router-dom'
import { getUserInfo, removeUser, updateUser } from '../../services/user'
import { useQuery } from '@tanstack/react-query'
import DaumPostcode from 'react-daum-postcode'

import { addProfileImage } from '../../services/image'
import { FaSearch } from 'react-icons/fa'

export default function MyPageEdit() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [username, setUsername] = useState('')
  const [address, setAddress] = useState('')
  const [showPostcode, setShowPostcode] = useState(false)

  const navigate = useNavigate()

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0]
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i

    if (!allowedExtensions.exec(imageFile.name)) {
      alert('올바른 파일 형식이 아닙니다. jpg, jpeg, png 파일만 업로드 가능합니다.')
      event.target.value = null // 파일 업로드 취소
      return
    }

    setSelectedImage(imageFile)

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result)
    }
    reader.readAsDataURL(imageFile)
  }

  const mbtiList = ['ESTP', 'ESTJ', 'ESFP', 'ESFJ', 'ENTP', 'ENTJ', 'ENFP', 'ENFJ', 'ISTP', 'ISTJ', 'ISFP', 'ISFJ', 'INTP', 'INTJ', 'INFP', 'INFJ']

  const [selectedMBTI, setSelectedMBTI] = useState('')

  const favList = ['영화관', '카페', '문화시설', '캠핑', '도서관']

  const [favSelected, setFavSelected] = useState([])

  const favClick = (selectedItem) => {
    if (favSelected.includes(selectedItem)) {
      setFavSelected(favSelected.filter((fav) => fav !== selectedItem))
      return
    }
    setFavSelected([...favSelected, selectedItem])
  }

  const handleClick = () => {
    navigate('/map')
  }

  const handleInnerClick = (e) => {
    e.stopPropagation()
  }

  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  }

  const handleAddressSearch = () => {
    setShowPostcode(true)
  }

  const handleAddressComplete = (data) => {
    setAddress(data.address)
    setShowPostcode(false)
  }

  const { data: userData, error } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  })

  useEffect(() => {
    if (userData) {
      setFavSelected(userData.favorite || [])
      setUsername(userData.username || '')
      setSelectedMBTI(userData.mbti || '')
      setAddress(userData.address || '')
      setPreviewImage(userData.userImage || '')
    }
  }, [userData])

  const saveClick = async () => {
    let imageUrl = selectedImage

    if (imageUrl) {
      try {
        const uploadResponse = await addProfileImage(imageUrl)
        imageUrl = uploadResponse.imageUrl
      } catch (error) {
        console.error('이미지 업로드 실패:', error)
        alert('이미지 업로드에 실패했습니다.')
        return
      }
    } else {
      imageUrl = userData.userImage
    }

    try {
      const updatedUser = {
        username: username,
        mbti: selectedMBTI,
        userImage: imageUrl,
        favorite: favSelected,
        address: address,
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
            <div className={style.wrap}>
              {previewImage && <img src={previewImage} alt="미리보기" className={style.previewImage} />}
              <input className={style.imgInput} type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>
          <div className={style.group}>
            <p className={style.proHead}>이름</p>
            <input
              className={style.inputName}
              value={username}
              onChange={(e) => {
                if (e.target.value.length <= 15) {
                  setUsername(e.target.value)
                }
              }}
            ></input>
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
                  <li className={favSelected.find((fav) => fav === favList) ? style.favSelectActive : style.favSelect} selected={favList} onClick={() => favClick(favList)} key={idx}>
                    {favList}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={style.addressGroup}>
            <p className={style.proHead}>주소</p>
            <div className={style.addressContainer}>
              <div>
                <input className={style.inputAddress} type="text" name="address" placeholder="Address" value={address} onChange={handleAddressChange} />
                <button className={style.searchButton} type="button" onClick={handleAddressSearch}>
                  <FaSearch style={{ fontSize: '24px', marginLeft: '5px', color: '#979797' }} />
                </button>
              </div>
              {showPostcode && (
                <div>
                  <DaumPostcode onComplete={handleAddressComplete} className={style.postcode} />
                </div>
              )}
            </div>
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
