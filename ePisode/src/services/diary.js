const API_BASE_URL = 'http://ec2-15-165-25-231.ap-northeast-2.compute.amazonaws.com:8080'

export const addNewEpisode = async (newEpisode) => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/diaries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(newEpisode),
  })

  if (response.status === 400) {
    alert('고운 말을 쓰자')
  }
  if (!response.ok) {
    alert('에피소드 작성에 실패했습니다.')
    throw new Error('에피소드 작성 실패')
  }
}

export const editEpisode = async ({ editedEpisode, id }) => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/diaries/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(editedEpisode),
  })

  if (response.status === 400) {
    alert('고운 말을 쓰자')
  }
  if (!response.ok) {
    alert('에피소드 수정에 실패했습니다.')
    throw new Error('에피소드 수정 실패')
  }
}

export const getWeather = async (x, y, date) => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/weather?date=${date}&x=${x}&y=${y}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('날씨를 가져오는데 실패했습니다.')
  }

  const data = await response.json()

  return data || []
}

export const getMarkers = async () => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/diaries/map`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('마커를 가져오는데 실패했습니다.')
  }

  const data = await response.json()

  return data || []
}

export const getMyDiaries = async (offset) => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/diaries/mine?offset=${offset}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('내 다이어리를 가져오는데 실패했습니다.')
  }

  const data = await response.json()

  return data || []
}

export const getDiaries = async (x, y, offset) => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/diaries?x=${x}&y=${y}&offset=${offset}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('다이어리를 가져오는데 실패했습니다.')
  }

  const data = await response.json()

  return data || []
}

export const getPublicDiaries = async (x, y, offset) => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/diaries/public?x=${x}&y=${y}&offset=${offset}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('전체 다이어리를 가져오는데 실패했습니다.')
  }

  const data = await response.json()

  return data || []
}

export const getPublicEpisode = async (id) => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/diaries/public/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('에피소드를 가져오는데 실패했습니다.')
  }

  const data = await response.json()

  return data || []
}

export const getEpisode = async (id) => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/diaries/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('에피소드를 가져오는데 실패했습니다.')
  }

  const data = await response.json()

  return data || []
}

export const removeEpisode = async (id) => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/diaries/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    alert('에피소드 삭제에 실패했습니다.')
    throw new Error('에피소드 삭제 실패')
  }
}
