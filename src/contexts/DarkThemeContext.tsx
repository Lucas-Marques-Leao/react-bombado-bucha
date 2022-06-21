import { createContext, useCallback, useContext, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import api from "../services/api";

export interface DarkThemeContextData {
    darkMode: boolean
}

export const DarkThemeContext = createContext<DarkThemeContextData>(
    {} as DarkThemeContextData
)

interface DarkThemeProviderProps {
    children: React.ReactNode

}

const MySwal = withReactContent(Swal);

export const DarkThemeProvider: React.FC<DarkThemeProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false)
    
    const toggleDarkMode = useCallback(async (darkMode: boolean) => {
        try {
           await api.post('/dark-theme', {
              darkMode,
           })
           setDarkMode(true)
            
        } catch(err) {
            MySwal.fire(
                "Erro",
                "Ocorreu um erro ao modificar o tema",
                "error"
            )
        }
    }, [])


    return (
        <DarkThemeContext.Provider value={{ darkMode }}>
            {children}
        </DarkThemeContext.Provider>
    )
}


export const useDarkTheme = () => {
    const context = useContext(DarkThemeContext);
    if (!context) {
      throw new Error("useDarkTheme must be used within an DarkThemeProvider");
    }
    return context;
  };
