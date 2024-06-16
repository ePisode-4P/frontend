import React, { useEffect, useRef } from 'react'

const useMap = (mapRef, apiKey, setSelectedPlace, selectedPlace, diaryCoordinates) => {
  const mapInstance = useRef(null)
  const markerInstance = useRef(null)

  useEffect(() => {
    const mapScript = document.createElement('script')

    mapScript.async = true
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`

    document.head.appendChild(mapScript)

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        let currentOverlay = null

        const defaultLat = 36.1458862
        const defaultLon = 128.3928142

        const showMap = (lat, lon) => {
          const locPosition = new window.kakao.maps.LatLng(lat, lon)
          const mapContainer = mapRef.current
          const mapOption = {
            center: locPosition,
            level: 3,
          }

          const map = new window.kakao.maps.Map(mapContainer, mapOption)
          const zoomControl = new window.kakao.maps.ZoomControl()
          map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)

          var marker = new window.kakao.maps.Marker({})

          kakao.maps.event.addListener(marker, 'click', function () {
            const latlng = marker.getPosition()

            geocoder.coord2Address(latlng.getLng(), latlng.getLat(), function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                var detailAddr = !!result[0].road_address ? result[0].address.address_name : result[0].address.address_name

                places.keywordSearch(detailAddr, function (data, status, pagination) {
                  if (status === kakao.maps.services.Status.OK) {
                    var place = data[0]
                    setSelectedPlace({ ...place, x: latlng.getLng(), y: latlng.getLat() })
                  } else {
                    const placeFallback = {
                      place_name: detailAddr,
                      address_name: detailAddr,
                      category_name: '',
                      x: latlng.getLng(),
                      y: latlng.getLat(),
                    }
                    setSelectedPlace(placeFallback)
                  }
                })
              } else {
                const placeFallback = {
                  place_name: '알 수 없는 장소',
                  address_name: '알려지지 않음',
                  category_name: '',
                  x: latlng.getLng(),
                  y: latlng.getLat(),
                }
                setSelectedPlace(placeFallback)
              }
            })
          })

          if (selectedPlace) {
            console.log(selectedPlace)
            const selectedLocation = new window.kakao.maps.LatLng(selectedPlace.place.y, selectedPlace.place.x)

            marker.setPosition(selectedLocation)
            marker.setMap(map)
            map.setCenter(selectedLocation)

            const placeFallback = {
              place_name: selectedPlace.place.place_name,
              address_name: selectedPlace.place.address_name || selectedPlace.place.road_address_name,
              category_name: selectedPlace.place.category_name,
              id: selectedPlace.place.id,
              x: selectedPlace.place.x,
              y: selectedPlace.place.y,
            }

            setSelectedPlace(placeFallback)
          }

          marker.setMap(map)

          mapInstance.current = map
          markerInstance.current = marker

          const geocoder = new window.kakao.maps.services.Geocoder()
          const places = new window.kakao.maps.services.Places()

          kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            var latlng = mouseEvent.latLng

            if (currentOverlay !== null) {
              currentOverlay.setMap(null)
            }

            geocoder.coord2Address(latlng.getLng(), latlng.getLat(), function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                var detailAddr = !!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name

                places.keywordSearch(detailAddr, function (data, status, pagination) {
                  if (status === kakao.maps.services.Status.OK) {
                    var place = data[0]
                    setSelectedPlace({ ...place, x: latlng.getLng(), y: latlng.getLat() })
                    marker.setPosition(latlng)
                    marker.setMap(map)
                  } else {
                    // 장소 검색 실패 or 결과 없을 때 사용자가 클릭한 위치 기본 정보 설정!
                    const placeFallback = {
                      place_name: detailAddr,
                      address_name: detailAddr,
                      category_name: '',
                      x: latlng.getLng(),
                      y: latlng.getLat(),
                    }
                    setSelectedPlace(placeFallback)

                    marker.setPosition(latlng)
                    marker.setMap(map)
                  }
                })
              } else {
                // 좌표를 주소로 변환할 수 없는 경우
                const placeFallback = {
                  place_name: '알 수 없는 장소',
                  address_name: '알려지지 않음',
                  category_name: '',
                  x: latlng.getLng(),
                  y: latlng.getLat(),
                }
                setSelectedPlace(placeFallback)

                marker.setPosition(latlng)
                marker.setMap(map)
              }
            })
          })

          diaryCoordinates.forEach((coord) => {
            const imageSrc = 'https://res.cloudinary.com/dnbf7czsn/image/upload/v1715837810/Group_12_nvubcl.svg'
            const imageSize = new kakao.maps.Size(100, 100)
            const imageOption = { offset: new kakao.maps.Point(27, 69) }
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

            const diaryMarker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(coord.y, coord.x),
              image: markerImage,
            })

            kakao.maps.event.addListener(diaryMarker, 'click', function () {
              setSelectedPlace({
                x: coord.x,
                y: coord.y,
                place_name: coord.placeName,
                address_name: coord.addressName,
                category_name: coord.categoryName || '',
              })
            })

            diaryMarker.setMap(map)
          })
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude
              const lon = position.coords.longitude

              showMap(lat, lon)
            },
            (error) => {
              console.error(error)
              showMap(defaultLat, defaultLon)
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 0,
            },
          )
        } else {
          console.error('이 브라우저에서는 현재 위치 표시 기능을 지원하지 않습니다.')
          showMap(defaultLat, defaultLon)
        }
      })
    }

    mapScript.onload = onLoadKakaoMap

    return () => {
      mapScript.onload = null
    }
  }, [mapRef, apiKey, setSelectedPlace, selectedPlace, diaryCoordinates])

  useEffect(() => {
    if (mapInstance.current && markerInstance.current && selectedPlace) {
      const selectedLocation = new window.kakao.maps.LatLng(selectedPlace.y, selectedPlace.x)
      markerInstance.current.setPosition(selectedLocation)
      markerInstance.current.setMap(mapInstance.current)
      mapInstance.current.setCenter(selectedLocation)
    }
  }, [selectedPlace])
}

export default useMap
