import React, { useState } from 'react'
import style from './Login.module.css'
import { useNavigate } from 'react-router-dom'

//추후 삭제
const User = {
  Email: '1234@gmail.com',
  Password: '1234',
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const imgClick = () => {
    navigate('/')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (email === User.Email && password === User.Password) {
      navigate('/map')
    } else if (email === '' || password === '') {
      alert('아이디와 비밀번호를 입력해주세요.')
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.')
    }
  }

  const noidClick = () => {
    navigate('/signup')
  }

  return (
    <div className={style.wrap}>
      <img className={style.logo} src="https://res.cloudinary.com/dnbf7czsn/image/upload/v1712585378/logo_on0pc8.png" onClick={imgClick} alt="logo"></img>
      <section className={style.wrap_login}>
        <h2 className={style.Login}>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <input className={style.email} type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
