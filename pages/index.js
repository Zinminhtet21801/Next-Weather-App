import Head from "next/head";
import Image from "next/image";
import { useContext, useState } from "react";
import DarkModeToggle from "../components/DarkModeToggle";
import FamousPlaces from "../components/FamousPlaces";
import SearchBar from "../components/SearchBar";
import { DarkModeContext } from "../contexts/DarkMode";

export default function Home() {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  return (
    <div>
      <Head>
        <title>Weather App-Next</title>
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className={` ${darkMode && "dark"}`}>
        <div className=" flex flex-col min-h-screen dark:bg-[#121212] ">
          <DarkModeToggle />
          <div className=" my-[10%] px-4  ">
            <SearchBar mWidth={`800px`} />
            <FamousPlaces />
          </div>
        </div>
      </div>
    </div>
  );
}
