import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import RequireAuth from './components/auth/RequireAuth'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PassSelectPage from './pages/PassSelectPage'
import PassPurchasePage from './pages/PassPurchasePage'
import MyPage from './pages/MyPage'
import SurveyPage from './pages/SurveyPage'
import { ROUTES } from './constants/routes'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="passes" element={<PassSelectPage />} />
            <Route path="passes/:passId/purchase" element={<PassPurchasePage />} />
            <Route
              path="mypage"
              element={
                <RequireAuth>
                  <MyPage />
                </RequireAuth>
              }
            />
            <Route
              path="survey"
              element={
                <RequireAuth>
                  <SurveyPage />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
