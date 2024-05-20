//FIXME - 임시 데이터!! 서버 연결로 고치기!!

const API_BASE_URL = 'http://localhost:4000'

export const getRecommends = async () => {
  //   const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/recommend`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`
    },
  })

  if (!response.ok) {
    throw new Error('추천 리스트를 가져오는데 실패했습니다.')
  }

  const data = await response.json()

  return data || []
}

export const addNewInterest = async (placeInfo) => {
  // const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/interests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(placeInfo),
  })

  if (!response.ok) {
    throw new Error('관심 장소 등록 실패')
  }
}

export const getInterests = async () => {
  //   const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/interests`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`
    },
  })

  if (!response.ok) {
    throw new Error('관심 장소 리스트를 가져오는데 실패했습니다.')
  }

  const data = await response.json()

  return data || []
}

export const removeInterest = async (id) => {
  // const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/interests/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`
    },
  })

  if (!response.ok) {
    throw new Error('관심 장소 삭제 실패')
  }
}
