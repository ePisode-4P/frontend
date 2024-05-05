import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import style from './Login.module.css'
import { login } from '../../services/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      navigate('/map')
    },
    onError: (error) => {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.')
    },
  })

  const imgClick = () => {
    navigate('/')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (email === '' || password === '') {
      alert('아이디와 비밀번호를 입력해주세요.')
    } else {
      mutate({ email, password })
    }
  }

  const noidClick = () => {
    navigate('/signup')
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn === 'true') {
      navigate('/map')
    }
  }, [navigate])

  return (
    <div className={style.wrap}>
      <img className={style.logo} src="https://res.cloudinary.com/dnbf7czsn/image/upload/v1712585378/logo_on0pc8.png" onClick={imgClick} alt="logo"></img>
      <section className={style.wrap_login}>
        <h2 className={style.Login}>LOGIN</h2>
        <p className={style.loginInfo}>
          <p className={style.loginInfoText}>Hello, new friend! I’m ePisode - your map-based</p>
          <p className={style.loginInfoText}> diary, where every entry marks a new episode. Give me a try!</p>
        </p>
        <form onSubmit={handleSubmit}>
          <p>
            <input className={style.email} type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </p>
          <p></p>
          <p>
            <input className={style.password} type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </p>
          <button className={style.button} type="submit">
            Login
          </button>
        </form>
        <p className={style.noId} onClick={noidClick}>
          Don't have an account?
        </p>
      </section>
    </div>
  )
}
