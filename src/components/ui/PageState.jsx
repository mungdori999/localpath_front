import { MSG } from '../../constants/messages'

export default function PageState({ loading, error, errorMessage, children }) {
  if (loading) return <p>{MSG.LOADING}</p>
  if (error) return <p>{errorMessage ?? MSG.PASS_FETCH_ERROR}</p>
  return children
}
