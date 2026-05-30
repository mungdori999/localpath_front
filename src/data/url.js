const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
const API_URL = `${API_BASE}/api`;

export const URL = {
  API_BASE,
  API_URL,
  KAKAO_LOGIN: `${API_URL}/auth/kakao/member`,
  KAKAO_OAUTH: `${API_BASE}/oauth2/authorization/kakao`,

  REISSUE: `${API_URL}/reissue`,
  PASSES: `${API_URL}/passes`,
  LOGOUT: `${API_URL}/logout`,
  SURVEY_QUESTIONS: `${API_URL}/survey/questions`,
  SURVEY_ME: `${API_URL}/survey/me`,
  SURVEY_HOME: `${API_URL}/survey/home`,
  BADGES: `${API_URL}/badges`,
  VISITS: `${API_URL}/visits`,
  VISITS_ME: `${API_URL}/visits/me`,
};
