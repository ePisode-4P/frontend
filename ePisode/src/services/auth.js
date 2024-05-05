const API_BASE_URL = 'http://ec2-15-165-25-231.ap-northeast-2.compute.amazonaws.com:8080'

export const login = async (loginInfo) => {
  const response = await fetch(`${API_BASE_URL}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginInfo),
  })

  if (!response.ok) {
    throw new Error('로그인 실패')
  }

  const accessToken = response.headers.get('Access-Token')
  const refreshToken = response.headers.get('Refresh-Token')

  localStorage.setItem('access-token', accessToken)
  localStorage.setItem('refresh-token', refreshToken)
  localStorage.setItem('isLoggedIn', true)

  return response.json()
}

export const signup = async (SignupInfo) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(SignupInfo),
  })

  if (!response.ok) {
    throw new Error('회원가입 실패')
  }

  return response.json()
}
