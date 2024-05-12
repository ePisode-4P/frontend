import React, { createContext, useContext, useState } from 'react'

const DiaryCoordinatesContext = createContext()

export const useDiaryCoordinates = () => useContext(DiaryCoordinatesContext)

export const DiaryCoordinatesProvider = ({ children }) => {
  const [diaryCoordinates, setDiaryCoordinates] = useState([])

  return <DiaryCoordinatesContext.Provider value={{ diaryCoordinates, setDiaryCoordinates }}>{children}</DiaryCoordinatesContext.Provider>
}
