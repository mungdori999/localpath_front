import { useAsync } from './useAsync'
import { fetchHomeSurvey } from '../api/surveyApi'

/** 로그인된 경우에만 호출 (설문 API는 인증 필요) */
export function useHomeSurvey(enabled) {
  return useAsync(
    () => (enabled ? fetchHomeSurvey() : Promise.resolve(null)),
    [enabled],
  )
}
