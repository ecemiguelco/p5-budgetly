import axios from "axios";

function RouteGuard({ children }) {
  const token = localStorage.getItem("token-auth");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return <>{token ? children : <h2>Unauthorized Access</h2>}</>;
}

export default RouteGuard;
