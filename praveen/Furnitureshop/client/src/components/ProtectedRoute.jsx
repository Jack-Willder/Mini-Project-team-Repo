import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  // ✅ If not logged in → redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ If a role is specified and user doesn’t match → redirect to home
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // ✅ Otherwise allow access
  return children;
};

export default ProtectedRoute;
