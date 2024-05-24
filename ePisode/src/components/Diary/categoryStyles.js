import styles from './Diary.module.css'

export const categoryGroups = {
  학교: ['초등학교', '중학교', '고등학교', '대학교', '전문대학', '특수학교', '특목고등학교', '특성화고등학교'],
  영화관: ['CGV', '메가박스', '롯데시네마', '아파트', '어린이집', '유치원'],
  카페: ['카페', '커피전문점', '디저트카페', '갤러리카페', '제과,베이커리', '스타벅스'],
  역: ['기차역', 'KTX,SRT정차역', 'KTX정차역', '공항'],
  병원: ['병원', '대학병원', '종합병원', '외과', '내과', '약국', '피부과'],
  마트: ['이마트', '롯데마트', '홈플러스', 'GS25', 'CU'],
  백화점: ['백화점', '롯데백화점', '현대백화점'],
  공원: ['공원', '도시근린공원'],
  정류장: ['고속,시외버스정류장'],
  박물관: ['박물관', '미술관'],
}

export function getCategoryStyle(categoryName) {
  const category = categoryName.trim()

  if (categoryGroups['학교'].includes(category)) {
    return styles.school
  } else if (categoryGroups['영화관'].includes(category)) {
    return styles.movie
  } else if (categoryGroups['카페'].includes(category)) {
    return styles.cafe
  } else if (categoryGroups['역'].includes(category)) {
    return styles.station
  } else if (categoryGroups['병원'].includes(category)) {
    return styles.hospital
  } else if (categoryGroups['마트'].includes(category)) {
    return styles.mart
  } else if (categoryGroups['백화점'].includes(category)) {
    return styles.department
  } else if (categoryGroups['공원'].includes(category)) {
    return styles.park
  } else if (categoryGroups['정류장'].includes(category)) {
    return styles.busstop
  } else if (categoryGroups['박물관'].includes(category)) {
    return styles.museum
  } else {
    return styles.default
  }
}
