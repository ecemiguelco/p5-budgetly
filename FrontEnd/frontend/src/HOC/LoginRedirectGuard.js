import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginRedirectGuard({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token-auth");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);

  return <>{children}</>;
}

export default LoginRedirectGuard;
