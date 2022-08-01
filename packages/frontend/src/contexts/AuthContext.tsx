import api from "@react-bombado-bucha/shared/api";
import IUser from "@react-bombado-bucha/shared/interfaces/IUser";
import * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import MySwal from "../services/swal";

export interface AuthContextData {
  signed: boolean;
  user?: IUser;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  googleOauth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>();
  const [token, setToken] = useState<string>();
  const signed = useMemo(() => {
    return !!user;
  }, [user]);

  const handleLogin = useCallback((data: any) => {
    localStorage.setItem("auth:user", JSON.stringify(data.user));
    localStorage.setItem("auth:token", data.token.token);

    setUser(data.user);
    setToken(data.token.token);

    MySwal.fire("Logado", "Seja Bem-vindo(a)", "success");
  }, []);

  const handleRehydrateUserData = () => {
    const user = localStorage.getItem("auth:user");
    const token = localStorage.getItem("auth:token");

    if (user) {
      setUser(JSON.parse(user));
    }

    if (token) {
      setToken(token);
    }
  };

  useEffect(() => {
    handleRehydrateUserData();
  }, []);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await api.post("/login", {
        email,
        password,
      });

      handleLogin(data);
    } catch (error) {
      MySwal.fire(
        "Erro",
        "Ocorreu um erro ao fazer login, verifique suas credenciais",
        "error"
      );
    }
  }, []);

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      passwordConfirmation: string
    ) => {
      try {
        await api.post("/users", {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        });
        MySwal.fire(
          "Usuário Registrado com Sucesso",
          `Seja bem-vindo ${name}`,
          "success"
        );
      } catch (error) {
        MySwal.fire(
          "Erro",
          `Erro ao criar o usuário verifique os dados: ${error.message}`,
          "error"
        );
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("auth:user");
      localStorage.removeItem("auth:token");
    } catch (err) {
      localStorage.removeItem("auth:user");
      localStorage.removeItem("auth:token");
    }
  }, []);

  const googleOauth = useCallback(async () => {
    try {
      const url = new URL("http://localhost:3333/google/callback");

      url.search = window.location.search;
      const { data } = await api.get(url.toString());

      handleLogin(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signed, login, register, logout, googleOauth, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
