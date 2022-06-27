import { DarkThemeToggle, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { ITest } from "../../../shared/interfaces/ITest";
import api from "@react-bombado-bucha/shared/api";

const Home: React.FC = () => {
  const [list, setList] = useState<ITest[]>([]);

  const handleFetch = async () => {
    try {
      const { data: lista } = await api.get<ITest[]>("/tests")
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
      <Navbar/>
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

      <h2></h2>
    </div>
  );
};

export default Home;
