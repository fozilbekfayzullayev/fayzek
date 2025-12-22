import { Navigate } from "react-router";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  } else return children;
};

export default ProtectedRoute;
