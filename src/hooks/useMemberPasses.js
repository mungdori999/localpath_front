import { useCallback, useEffect, useState } from 'react'
import { fetchMyPasses } from '../api/memberPassesApi'

export function useMemberPasses(enabled = true) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState(null)

  const reload = useCallback(() => {
    if (!enabled) {
      setData([])
      setLoading(false)
      return Promise.resolve([])
    }

    setLoading(true)
    setError(null)

    return fetchMyPasses()
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
