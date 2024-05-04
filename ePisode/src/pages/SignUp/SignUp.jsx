import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import style from './Signup.module.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mbti: '',
    favorite: [],
    address: ''
  });

  const [isRequiredEmpty, setIsRequiredEmpty] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleFavoriteChange = (e) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      favorite: [...prevState.favorite, value]
    }));
  };

  const handleAddressChange = (e) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      address: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.name === '' || formData.email === '' || formData.password === '') {
      alert('이름, 이메일, 비밀번호를 입력하세요.');
      setIsRequiredEmpty(true);
      return;
    }
    setIsRequiredEmpty(false);
    navigate('/map');
  };

  const imgClick = () => {
    navigate('/');
  };

  const loginClick = () => {
    navigate('/login');
  };

  return (
    <div className={style.wrap}>
      <img className={style.logo} src="https://res.cloudinary.com/dnbf7czsn/image/upload/v1712585378/logo_on0pc8.png" onClick={imgClick} alt="logo"></img>
      <section className={style.wrap_Signup}>
        <h2 className={style.Signup}>SIGN UP</h2>
        <p className={style.signupInfo}>
          <span className={style.signupInfoText}>Hello, new friend!</span><br/>
          <span className={style.signupInfoText}>I’m ePisode - your map-based diary, where every entry marks a new episode. Give me a try!</span><br/>
        </p>
          <p>
            <input className={style.name} type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} />
            <input className={style.email} type="text" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} />
          </p>
          <p>
            <input className={style.password} type="password" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} />
            <select className={style.mbti} name="mbti" value={formData.mbti} onChange={handleChange}>
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
          </p>
          <p className={style.favoriteLabel}>
            Favorite<br/><br/>
            <input type="checkbox" name="favorite" id="음식점" value="음식점" onChange={handleFavoriteChange} />
            <label htmlFor="음식점">음식점</label>
            <input type="checkbox" name="favorite" id="카페" value="카페" onChange={handleFavoriteChange} />
            <label htmlFor="카페">카페</label>
            <input type="checkbox" name="favorite" id="문화시설" value="문화시설" onChange={handleFavoriteChange} />
            <label htmlFor="문화시설">문화시설</label>
            <input type="checkbox" name="favorite" id="숙박" value="숙박" onChange={handleFavoriteChange} />
            <label htmlFor="숙박">숙박</label>
            <input type="checkbox" name="favorite" id="관광명소" value="관광명소" onChange={handleFavoriteChange} />
            <label htmlFor="관광명소">관광명소</label>
          </p>
          <p className={style.addressContainer}>
            <input className={style.address} type="text" name="address" placeholder="Address" value={formData.address} onChange={handleAddressChange} />
            <button className={style.searchButton} type="button">
            <FaSearch style={{ fontSize: '24px', marginLeft: '5px', color: '#979797' }} />
            </button>
          </p>
          <button className={style.button} type="submit" onClick={handleSubmit}>
            sign up
          </button>
        <p className={style.haveAccount} onClick={loginClick}>
          Already have an account? Login
        </p>
      </section>
    </div>
  );
};

export default Signup;
