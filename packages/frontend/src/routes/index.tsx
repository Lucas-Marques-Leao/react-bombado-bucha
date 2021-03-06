import { Flowbite } from "flowbite-react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import AuthRoutes from "./AuthRoutes";
import "../styles/global.css";
import { useAuth } from "../contexts/AuthContext";

function Routes() {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      <Flowbite theme={{ dark: false }}>
        <div>{signed ? <AppRoutes /> : <AuthRoutes />}</div>
      </Flowbite>
    </BrowserRouter>
  );
}

export default Routes;
