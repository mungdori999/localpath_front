import { useCallback, useEffect, useState } from 'react'
import { fetchMyVisits } from '../api/badgesApi'

export function useVisits(enabled = true) {
  const [visits, setVisits] = useState([])
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState(null)

  const reload = useCallback(() => {
    if (!enabled) {
      setVisits([])
      setLoading(false)
      return Promise.resolve([])
    }

    setLoading(true)
    setError(null)

    return fetchMyVisits()
      .then((data) => {
        setVisits(data)
        return data
      })
      .catch((err) => {
        setError(err)
        console.error(err)
        throw err
      })
      .finally(() => setLoading(false))
  }, [enabled])

  useEffect(() => {
    reload()
  }, [reload])

  const visitedSpotNames = new Set(visits.map((v) => v.spotName))

  return { visits, visitedSpotNames, loading, error, reload }
}
