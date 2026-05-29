import { useEffect, useRef, useState } from 'react'
import { getKakaoMapPlaceUrl, loadKakaoMap } from '../../lib/loadKakaoMap'
import './CourseMap.css'

export default function CourseMap({ spots, courseName, active = true }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const overlaysRef = useRef([])
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!active || !spots?.length) return undefined

    let cancelled = false

    loadKakaoMap()
      .then((maps) => {
        if (cancelled || !containerRef.current) return

        overlaysRef.current.forEach((o) => o.setMap(null))
        overlaysRef.current = []

        const path = spots.map((s) => new maps.LatLng(s.lat, s.lng))

        const map =
          mapRef.current ??
          new maps.Map(containerRef.current, {
            center: path[0],
            level: 4,
          })
        mapRef.current = map

        const bounds = new maps.LatLngBounds()
        path.forEach((p) => bounds.extend(p))

        new maps.Polyline({
          map,
          path,
          strokeWeight: 5,
          strokeColor: '#1a6b4a',
          strokeOpacity: 0.9,
          strokeStyle: 'solid',
        })

        spots.forEach((spot, index) => {
          const position = path[index]
          const marker = new maps.Marker({
            map,
            position,
            title: `${index + 1}. ${spot.name}`,
          })

          const info = new maps.InfoWindow({
            content: `<div class="course-map-iw"><strong>${index + 1}. ${spot.name}</strong><br/><span>${spot.category}</span></div>`,
          })

          maps.event.addListener(marker, 'click', () => {
            info.open(map, marker)
          })

          overlaysRef.current.push(marker, info)
        })

        map.setBounds(bounds, 48, 48, 48, 48)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [active, spots, courseName])

  const hasKey = !!import.meta.env.VITE_KAKAO_KEY

  if (!hasKey) {
    return (
      <div className="course-map course-map--fallback">
        <p>.env에 VITE_KAKAO_KEY를 설정하면 지도에서 동선을 볼 수 있어요</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="course-map course-map--fallback">
        <p>지도를 불러오지 못했어요. 카카오 개발자 콘솔에서 「지도」 플랫폼이 활성화됐는지 확인해 주세요.</p>
      </div>
    )
  }

  return (
    <div className="course-map">
      <div
        ref={containerRef}
        className="course-map__canvas"
        role="img"
        aria-label={`${courseName} 동선 지도`}
      />
      {status === 'idle' && (
        <div className="course-map__loading">지도 불러오는 중…</div>
      )}
      <div className="course-map__legend">
        <span className="course-map__route" aria-hidden />
        추천 동선 ({spots.length}곳)
      </div>
      <div className="course-map__links">
        {spots.map((spot, index) => (
          <a
            key={spot.name}
            href={getKakaoMapPlaceUrl(spot)}
            target="_blank"
            rel="noopener noreferrer"
            className="course-map__link"
          >
            {index + 1}. {spot.name}
          </a>
        ))}
      </div>
    </div>
  )
}
