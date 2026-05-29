const MAP_SCRIPT_ID = 'kakao-map-sdk'

export function loadKakaoMap() {
  const key = import.meta.env.VITE_KAKAO_KEY
  if (!key) {
    return Promise.reject(new Error('VITE_KAKAO_KEY가 설정되지 않았습니다'))
  }

  if (window.kakao?.maps?.LatLng) {
    return Promise.resolve(window.kakao.maps)
  }

  return new Promise((resolve, reject) => {
    const existing = document.getElementById(MAP_SCRIPT_ID)
    if (existing) {
      existing.addEventListener('load', () => {
        window.kakao.maps.load(() => resolve(window.kakao.maps))
      })
      return
    }

    const script = document.createElement('script')
    script.id = MAP_SCRIPT_ID
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`
    script.async = true
    script.onload = () => {
      window.kakao.maps.load(() => resolve(window.kakao.maps))
    }
    script.onerror = () => reject(new Error('카카오맵 SDK 로드 실패'))
    document.head.appendChild(script)
  })
}

export function getKakaoMapPlaceUrl(spot) {
  return `https://map.kakao.com/link/map/${encodeURIComponent(spot.name)},${spot.lat},${spot.lng}`
}
