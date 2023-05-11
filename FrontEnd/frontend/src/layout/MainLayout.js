import { Outlet } from "react-router-dom";
import NavigationBar from "../component/NavigationBar/NavigationBar";
import { useState } from "react";

function MainLayout() {
  const [token, setToken] = useState(localStorage.getItem("token-auth"));
  return (
    <>
      {token ? <NavigationBar /> : null}

      <Outlet />
    </>
  );
}

export default MainLayout;
