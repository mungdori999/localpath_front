import { useCallback, useEffect, useState } from 'react'
import { fetchBadges } from '../api/badgesApi'

export function useBadges(enabled = true) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState(null)

  const reload = useCallback(() => {
    if (!enabled) {
      setData(null)
      setLoading(false)
      return Promise.resolve([])
    }

    setLoading(true)
    setError(null)

    return fetchBadges()
      .then((result) => {
        setData(result)
        return result
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

  return { data, loading, error, reload }
}
