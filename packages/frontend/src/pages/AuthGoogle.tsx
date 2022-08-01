import * as React from "react";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthGoogle: React.FC = () => {
  const { googleOauth } = useAuth();
  const navigate = useNavigate();
  let authenticated = false;

  const handleGoogleAuth = async () => {
    await googleOauth()
      .then(() => navigate("/home"))
      .catch((err) => console.log(err));
  };

  useLayoutEffect(() => {
    if (!authenticated) {
      handleGoogleAuth();
      authenticated = true;
    }
  }, []);

  return <div className="dark:text-white">Olá Redirecionado</div>;
};

export default AuthGoogle;
