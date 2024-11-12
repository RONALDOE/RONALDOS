import Desktop from "@components/Desktop";
import Taskbar from "@components/Taskbar";
import { IIcon } from "@utils/interfaces";
import Background from "@assets/Backgrounds/Background1.svg";
import{ useState, useEffect, useContext } from 'react';
import Loading from "./Loading";
import { GlobalValuesContext } from "@utils/GlobalValuesContext";

export default function Screen() {

  const [loading, setLoading] = useState(true);
  const [loadingCount, setLoadingCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { openApps } = useContext(GlobalValuesContext);

  useEffect(() => {
    // Detectar si es un dispositivo móvil en base al ancho de pantalla
    setIsMobile(window.innerWidth <= 768);
    
    // Listener para cambiar el valor si la pantalla cambia de tamaño
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      appUrl: "https://ronaldoe.github.io/",
      type: 'dt'
    },
    {
      id: 2,
      name: "Gobernanzas Digital",
      size: "small",
      img: "https://gobernanzasdigital.com/wp-content/uploads/2024/11/LogoGobernanzas.png",
      appUrl: "https://gobernanzasdigital.com/",  
      type: 'dt'
    },
    {
      id: 3,
      name: "SDSSG",
      size: "small",
      img: "https://img.icons8.com/fluency/256/snake.png",
      appUrl: "https://ronaldoe.github.io/SuperDuperSimpleSnakeGame/",
      type: 'dt',
      windowSize: { width: 400, height: 400 }
    }
  ];

  const TaskbarIcons: IIcon[] = openApps;

  return (
    <>
      {isMobile ? (
        <div className="w-screen h-screen bg-black absolute z-100 flex justify-center items-center">
          <h1 className="text-white text-2xl text-center font-bold">STILL WORKING ON MOBILE VERSION</h1>
        </div>
      ) : (
        <>
          <div className={`bg-black w-full h-full flex flex-col items-center justify-center absolute z-20 ${loading ? '' : 'hidden'}`}>
            <Loading />
            <div className="w-1/6 h-4 bg-gray-200 rounded-md overflow-hidden mt-4">
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
      )}
    </>
  );
}
