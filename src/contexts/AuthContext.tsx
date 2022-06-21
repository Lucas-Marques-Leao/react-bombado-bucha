import { useContext, useCallback, useState, createContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";

export interface AuthContextData {
  signed: boolean;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface AuthProviderProps {
  children: React.ReactNode;
}

const MySwal = withReactContent(Swal);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [signed, setSigned] = useState(false)

  return (
    <AuthContext.Provider value={{ signed }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context;
}
