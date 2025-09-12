import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // Normal or admin user object
  const [token, setToken] = useState(null);

  // Load user and token from localStorage on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Login function (works for admin and normal user)
  const login = (userData, tokenValue) => {
    if (!userData || !tokenValue) return false;

    const fullUser = {
      id: userData.id || userData._id || null,       // admin may not have id
      name: userData.name || (userData.role === "admin" ? "Admin" : ""),
      email: userData.email,
      role: userData.role || "user",
    };

    setUser(fullUser);
    setToken(tokenValue);

    localStorage.setItem("user", JSON.stringify(fullUser));
    localStorage.setItem("token", tokenValue);

    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
