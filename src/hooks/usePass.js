import { useAsync } from './useAsync'
import { fetchPassById } from '../api/passesApi'

export function usePass(passId) {
  return useAsync(() => fetchPassById(passId), [passId])
}
