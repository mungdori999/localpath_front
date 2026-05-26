import { useCallback, useState, useEffect } from "react";
import { AuthContext } from "./auth-state";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const STORAGE_KEY = "localpath_user";

function loadStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser);
  const [loading, setLoading] = useState(false);

  const persistUser = useCallback((nextUser) => {
    setUser(nextUser);

    if (nextUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access");

    if (!accessToken) return;

    localStorage.setItem("accessToken", accessToken);

    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const decodedUser = jwtDecode(accessToken);
    persistUser({
      ...decodedUser,
    });

    window.history.replaceState({}, document.title, "/");
  }, [persistUser]);

  const loginWithKakao = useCallback(() => {
    setLoading(true);

    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("accessToken");
    persistUser(null);
    setLoading(false);
  }, [persistUser]);

  return (
    <AuthContext.Provider
      value={{ user, loading, loginWithKakao, logout, isLoggedIn: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
