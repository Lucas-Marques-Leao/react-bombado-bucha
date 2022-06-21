import { Flowbite } from "flowbite-react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import "./styles/global.css";

function App() {
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Flowbite theme={{ dark: false }}>
        <div>{isAuthenticated ? <AppRoutes /> : <AuthRoutes />}</div>
      </Flowbite>
    </BrowserRouter>
  );
}

export default App;
