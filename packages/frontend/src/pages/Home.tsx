import { DarkThemeToggle, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { ITest } from "../../../shared/interfaces/ITest";
import api from "@react-bombado-bucha/shared/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import MySwal from "../services/swal";

const Home: React.FC = () => {
  const [list, setList] = useState<ITest[]>([]);
  const { logout } = useAuth();
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      MySwal.fire("Deslogado com Sucesso", "Volte Sempre!", "success");
    } catch (err) {
      MySwal.fire(
        "Deu PIPINHA HAHA",
        "HAHAHAHAHAHAHAHHAHHAHAHHAHAHAHAHAHHAH",
        "error"
      );
    }
    await logout();

    setTimeout(() => {
      navigate("/sign-in");
    }, 3000);
  };

  const handleFetch = async () => {
    try {
      const { data: lista } = await api.get<ITest[]>("/tests");
      setList(lista);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="bg-gray-100 text-black dark:bg-gray-800 dark:text-white ">
      <div id="darkmode" className="float-right">
        <DarkThemeToggle />
      </div>
      <Navbar />
      <h1>Consumindo:</h1>
      {list.length > 0 ? (
        <ul>
          {list.map((t) => {
            return (
              <li>
                {t.name} - {t.email}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Não foi possivel carregar a lista</p>
      )}
      <div>
        <button type="submit" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h2></h2>
    </div>
  );
};

export default Home;
