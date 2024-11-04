import Desktop from "@components/Desktop";
import Taskbar from "@components/Taskbar";
import { IIcon } from "@utils/interfaces";
import Background from "@assets/Backgrounds/Background1.svg";
import { useState, useEffect, useContext } from 'react';
import Loading from "./Loading";
import { GlobalValuesContext } from "@utils/GlobalValuesContext";
export default function Screen() {

  const [loading, setLoading] = useState(true);
  const [loadingCount, setLoadingCount] = useState(0);


  // Cuando el valor de loadingCount alcance 100, desactiva la pantalla de carga
  useEffect(() => {
    if (loadingCount >= 100) setLoading(false);
  }, [loadingCount]);

  // Incrementa el loadingCount por 1 cada 50ms
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingCount(prev => prev + 1);
    }, 50); // 50ms de intervalo
    return () => clearInterval(intervalId);
  }, []);

  const DesktopIcons: IIcon[] = [
    {
      id: 1,
      name: "My PC",
      size: "small",
      img: "https://img.icons8.com/fluency/256/workstation.png",
      appUrl: "",
      action: () => console.log("My PC"),
      type: 'dt'
    },
    {
      id: 2,
      name: "Google",
      size: "small",
      img: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      appUrl: "https://www.google.com",
      type: 'dt'
    },
    {
      id: 3,
      name: "Google",
      size: "small",
      img: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      appUrl: "https://www.google.com",
      type: 'dt'
    }
  ];

  const TaskbarIcons: IIcon[] = [
    {
      id: 1,
      name: "Google",
      size: "small",
      img: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      appUrl: "https://www.google.com",
      type: 'tb'
    },
  ];

  return (
    <>
      {/* Pantalla de carga */}
      <div className={`bg-black w-full h-full flex flex-col items-center justify-center absolute z-20 ${loading ? '' : 'hidden'}`}>
        <Loading />
        <div className="w-1/6 h-4 bg-gray-200 rounded-sm overflow-hidden mt-4">
          {/* Progreso */}
          <div
            className="h-full bg-gray-500"
            style={{ width: `${loadingCount}%` }}
          ></div>
        </div>
      </div>

      {/* Pantalla principal */}
      <div className="flex flex-col h-screen overflow-hidden bg-cover bg-no-repeat -z-20" style={{ backgroundImage: `url(${Background})` }}>
        <div className="flex-grow overflow-auto p-2">
          <Desktop Icons={DesktopIcons} />
        </div>
        <div className="w-full">
          <Taskbar Icons={TaskbarIcons} />
        </div>
      </div>
    </>
  );
}
