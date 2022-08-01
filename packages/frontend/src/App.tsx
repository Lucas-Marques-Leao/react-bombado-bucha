import * as React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./routes";
import "./styles/global.css";

const App: React.FC = () => {
  return (
    <div>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
};

export default App;
