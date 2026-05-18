import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PassSelectPage from './pages/PassSelectPage'
import PassPurchasePage from './pages/PassPurchasePage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="passes" element={<PassSelectPage />} />
            <Route path="passes/:passId/purchase" element={<PassPurchasePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
