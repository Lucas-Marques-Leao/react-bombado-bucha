import api from "@react-bombado-bucha/shared/api";
import { useEffect } from "react";

const AuthGoogle: React.FC = () => {
  const handleCallback = async () => {
    const { headers } = await api.get("/google/callback");
    console.log(headers);
  };

  useEffect(() => {
    handleCallback();
  }, []);
  return <div className="dark:text-white">Olá Redirecionado</div>;
};

export default AuthGoogle;
