const API_BASE_URL = 'http://ec2-15-165-25-231.ap-northeast-2.compute.amazonaws.com:8080'

export const getUserInfo = async () => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/user`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('사용자 정보를 가져오는데 실패했습니다.')
  }

  const data = await response.json()

  return data || []
}
