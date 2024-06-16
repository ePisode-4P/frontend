const API_BASE_URL = 'http://ec2-15-165-25-231.ap-northeast-2.compute.amazonaws.com:8080'

export const login = async (loginInfo) => {
  const response = await fetch(`${API_BASE_URL}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginInfo),
  })

  if (!response.ok) {
    alert('로그인에 실패했습니다.')
    throw new Error('로그인 실패')
  }

  const accessToken = response.headers.get('Access-Token')
  const refreshToken = response.headers.get('Refresh-Token')

  localStorage.setItem('access-token', accessToken)
  localStorage.setItem('refresh-token', refreshToken)
  localStorage.setItem('isLoggedIn', true)
}

export const signup = async (SignupInfo) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(SignupInfo),
  })

  if (response.status == 409) {
    alert('이미 가입된 이메일입니다.')
  } else if (!response.ok) {
    alert('회원가입에 실패했습니다.')
    throw new Error('회원가입 실패')
  }
}

export const logout = async () => {
  const token = localStorage.getItem('access-token')

  if (!token) {
    console.error('로그아웃 실패: 토큰이 존재하지 않습니다.')
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      localStorage.removeItem('access-token')
      localStorage.removeItem('refresh-token')
      localStorage.setItem('isLoggedIn', false)
    } else {
      throw new Error('로그아웃 실패')
    }
  } catch (error) {
    console.error(error.message)
  }
}

export const validateToken = async () => {
  const token = localStorage.getItem('access-token')

  if (!token) {
    return false
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      console.log('토큰이 만료되었습니다.')
      localStorage.removeItem('access-token')
      localStorage.removeItem('refresh-token')
      localStorage.setItem('isLoggedIn', false)
      return false
    }

    return true
  } catch (error) {
    console.error('토큰 검증 실패:', error.message)
    return false
  }
}
