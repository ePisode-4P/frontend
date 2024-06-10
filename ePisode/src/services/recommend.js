const API_BASE_URL = 'http://ec2-15-165-25-231.ap-northeast-2.compute.amazonaws.com:8080'

export const getRecommends = async () => {
  const token = localStorage.getItem('access-token')

  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported by your browser')
  }

  const getPosition = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })

  try {
    const position = await getPosition()
    const { latitude, longitude } = position.coords

    const response = await fetch(`${API_BASE_URL}/recommend?x=${longitude}&y=${latitude}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('추천 리스트를 가져오는데 실패했습니다.')
    }

    const data = await response.json()

    return data || []
  } catch (error) {
    throw new Error('위치를 가져오는데 실패했습니다: ' + error.message)
  }
}

export const addNewInterest = async (placeInfo) => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/interests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(placeInfo),
  })

  if (!response.ok) {
    throw new Error('관심 장소 등록 실패')
  }
}

export const getInterests = async () => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/interests`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('관심 장소 리스트를 가져오는데 실패했습니다.')
  }

  const data = await response.json()

  return data || []
}

export const removeInterest = async (x, y) => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/interests?x=${x}&y=${y}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('관심 장소 삭제 실패')
  }
}

export const markAsDisliked = async (placeId) => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/recommend/no/${placeId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })

  if (!response.ok) {
    throw new Error('추천 장소 싫어요 표시 실패')
  }
}