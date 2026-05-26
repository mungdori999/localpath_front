import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CharacterProvider } from "./context/CharacterContext.jsx";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PassSelectPage from "./pages/PassSelectPage";
import PassPurchasePage from "./pages/PassPurchasePage";
import CharacterPage from "./pages/CharacterPage";

export default function App() {
  return (
    <AuthProvider>
      <CharacterProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="passes" element={<PassSelectPage />} />
              <Route
                path="passes/:passId/purchase"
                element={<PassPurchasePage />}
              />
              <Route path="character" element={<CharacterPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CharacterProvider>
    </AuthProvider>
  );
}
