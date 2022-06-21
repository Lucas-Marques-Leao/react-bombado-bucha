import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./routes";
import "./styles/global.css";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes />;
      </AuthProvider>
    </div>
  );
}

export default App;
