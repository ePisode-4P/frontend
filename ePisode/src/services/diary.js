const API_BASE_URL = 'http://ec2-15-165-25-231.ap-northeast-2.compute.amazonaws.com:8080'

export const addNewEpisode = async (newEpisode) => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/diaries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(newEpisode),
  })

  if (!response.ok) {
    throw new Error('에피소드 작성 실패')
  }
}
