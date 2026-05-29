import { useAsync } from './useAsync'
import { fetchSurveyQuestions } from '../api/surveyApi'

export function useSurveyQuestions() {
  return useAsync(() => fetchSurveyQuestions(), [])
}
