import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import MySwal from "../services/swal";
import api from "@react-bombado-bucha/shared/api";

export interface AuthContextData {
  signed: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState<string>();
  const signed = useMemo(() => {
    return !!user;
  }, [user]);

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
      api.defaults.headers.common.Authorization = token!;
    }
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("auth:user", JSON.stringify(data.user));
      localStorage.setItem("auth:token", data.token.token);

      setUser(data.user);
      setToken(data.token.token);

      MySwal.fire("Logado", "Seja Bem-vindo(a)", "success");
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

  return (
    <AuthContext.Provider value={{ signed, login, register, logout }}>
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
