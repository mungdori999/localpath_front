import { useAsync } from './useAsync'
import { fetchPasses } from '../api/passesApi'

export function usePasses() {
  return useAsync(
    () => fetchPasses().then((data) => (Array.isArray(data) ? data : [])),
    [],
  )
}
