import { useEffect, useState } from 'react'

/**
 * @param {() => Promise<T>} loader
 * @param {unknown[]} deps
 * @returns {{ data: T | null, loading: boolean, error: unknown }}
 */
export function useAsync(loader, deps) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    setLoading(true)
    setError(null)

    loader()
      .then((result) => {
        if (!mounted) return
        setData(result)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err)
        console.error(err)
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, deps)

  return { data, loading, error }
}
