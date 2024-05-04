import React, { createContext, useContext, useState } from 'react'

const SelectedPlaceContext = createContext()

export const useSelectedPlace = () => useContext(SelectedPlaceContext)

export const SelectedPlaceProvider = ({ children }) => {
  const [selectedPlace, setSelectedPlace] = useState(null)

  return <SelectedPlaceContext.Provider value={{ selectedPlace, setSelectedPlace }}>{children}</SelectedPlaceContext.Provider>
}
