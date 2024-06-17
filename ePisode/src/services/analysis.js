const API_BASE_URL = 'http://ec2-15-165-25-231.ap-northeast-2.compute.amazonaws.com:8080'

export const getAnalysisRecency = async () => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/reports/recency`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('최근 레포트를 가져오는데 실패했습니다.')
  }

  const data = await response.json()

  return data || []
}

export const getAnalysisList = async () => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/reports`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('레포트 리스트를 가져오는데 실패했습니다.')
  }

  const data = await response.json()

  return data || []
}

export const getAnalysisId = async (id) => {
  const token = localStorage.getItem('access-token')

  const response = await fetch(`${API_BASE_URL}/reports/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('레포트를 가져오는데 실패했습니다.')
  }

  const data = await response.json()
  return data || {}
}
