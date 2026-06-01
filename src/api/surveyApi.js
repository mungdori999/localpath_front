import api from './axios'
import { URL } from '../data/url'

export function fetchSurveyQuestions() {
  return api.get(URL.SURVEY_QUESTIONS).then((res) => res.data)
}

export function submitSurvey(answers) {
  return api.post(URL.SURVEY_ME, { answers }).then((res) => res.data)
}

export function fetchHomeSurvey() {
  return api.get(URL.SURVEY_HOME).then((res) => res.data)
}
