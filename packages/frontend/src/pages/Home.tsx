import { DarkThemeToggle } from "flowbite-react";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 text-black dark:bg-gray-800 dark:text-white ">
      <div id="darkmode" className="float-right">
        <DarkThemeToggle />
      </div>

      <h1>Home</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, voluptatibus vitae culpa ab, dolorem fuga perferendis neque eum alias quibusdam cum. Quaerat voluptatem a nisi nostrum modi non minus omnis.</p>
    </div>
  );
};

export default Home;
