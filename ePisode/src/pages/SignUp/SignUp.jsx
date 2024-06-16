import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import style from './Signup.module.css'
import { useNavigate } from 'react-router-dom'
import DaumPostcode from 'react-daum-postcode'
import { signup } from '../../services/auth'
import { useMutation } from '@tanstack/react-query'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mbti, setMbti] = useState('')
  const [favorite, setFavorite] = useState([])
  const [address, setAddress] = useState('')

  const [isRequiredEmpty, setIsRequiredEmpty] = useState(false)
  const [showPostcode, setShowPostcode] = useState(false)

  const { mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      navigate('/login')
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const navigate = useNavigate()

  const handleAddressSearch = () => {
    setShowPostcode(true)
  }

  const handleAddressComplete = (data) => {
    setAddress(data.address)
    setShowPostcode(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'name') {
      if (value.length <= 15) {
        setName(value)
      }
    } else if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      if (value.length <= 20) {
        setPassword(value)
      }
    } else if (name === 'mbti') {
      setMbti(value)
    }
  }

  const handleFavoriteChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setFavorite([...favorite, value])
    } else {
      setFavorite(favorite.filter((item) => item !== value))
    }
  }

  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (name === '' || email === '' || password === '') {
      alert('이름, 이메일, 비밀번호를 입력하세요.')
      setIsRequiredEmpty(true)
      return
    }
    setIsRequiredEmpty(false)

    mutate({ username: name, email, password, favorite, address, mbti })
  }

  const imgClick = () => {
    navigate('/')
  }

  const loginClick = () => {
    navigate('/login')
  }

  return (
    <div className={style.wrap}>
      <img className={style.logo} src="https://res.cloudinary.com/dnbf7czsn/image/upload/v1712585378/logo_on0pc8.png" onClick={imgClick} alt="logo"></img>
      <section className={style.wrap_Signup}>
        <h2 className={style.Signup}>SIGN UP</h2>
        <div className={style.signupInfo}>
          <p className={style.signupInfoText}>Hello, new friend! I’m ePisode - your map-based</p>
          <p className={style.signupInfoText}>diary, where every entry marks a new episode. Give me a try!</p>
        </div>
        <div>
          <input className={style.name} type="text" name="name" placeholder="Name *" value={name} onChange={handleChange} />
          <input className={style.email} type="email" name="email" placeholder="Email *" value={email} onChange={handleChange} />
        </div>
        <div>
          <input className={style.password} type="password" name="password" placeholder="Password *" value={password} onChange={handleChange} />
          <select className={style.mbti} name="mbti" value={mbti} onChange={handleChange}>
            <option value="">MBTI</option>
            <option value="ESTP">ESTP</option>
            <option value="ESTJ">ESTJ</option>
            <option value="ESFP">ESFP</option>
            <option value="ESFJ">ESFJ</option>
            <option value="ENTP">ENTP</option>
            <option value="ENTJ">ENTJ</option>
            <option value="ENFP">ENFP</option>
            <option value="ENFJ">ENFJ</option>
            <option value="ISTP">ISTP</option>
            <option value="ISTJ">ISTJ</option>
            <option value="ISFP">ISFP</option>
            <option value="ISFJ">ISFJ</option>
            <option value="INTP">INTP</option>
            <option value="INTJ">INTJ</option>
            <option value="INFP">INFP</option>
            <option value="INFJ">INFJ</option>
          </select>
        </div>
        <p className={style.favoriteLabel}>
          Favorite
          <br />
          <br />
          <input type="checkbox" name="favorite" id="영화관" value="영화관" onChange={handleFavoriteChange} />
          <label htmlFor="영화관">영화관</label>
          <input type="checkbox" name="favorite" id="카페" value="카페" onChange={handleFavoriteChange} />
          <label htmlFor="카페">카페</label>
          <input type="checkbox" name="favorite" id="문화시설" value="문화시설" onChange={handleFavoriteChange} />
          <label htmlFor="문화시설">문화시설</label>
          <input type="checkbox" name="favorite" id="캠핑" value="캠핑" onChange={handleFavoriteChange} />
          <label htmlFor="캠핑">캠핑</label>
          <input type="checkbox" name="favorite" id="도서관" value="도서관" onChange={handleFavoriteChange} />
          <label htmlFor="도서관">도서관</label>
        </p>
        <div className={style.addressContainer}>
          <input className={style.address} type="text" name="address" placeholder="Address" value={address} onChange={handleAddressChange} />
          <button className={style.searchButton} type="button" onClick={handleAddressSearch}>
            <FaSearch style={{ fontSize: '24px', marginLeft: '5px', color: '#979797' }} />
          </button>
          {showPostcode && (
            <div>
              <DaumPostcode onComplete={handleAddressComplete} className={style.postcode} />
            </div>
          )}
        </div>
        <button className={style.button} type="submit" onClick={handleSubmit}>
          sign up
        </button>
        <p className={style.haveAccount} onClick={loginClick}>
          Already have an account? Login
        </p>
      </section>
    </div>
  )
}

export default Signup
