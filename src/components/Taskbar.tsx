import { IIcon } from "@utils/interfaces.ts";
import { useState, useEffect, useRef, useContext } from "react";
import Icon from "@components/Icon";
import MyInfo from "@components/MyInfo";
import Modal from "@components/Modal";
import SoundSlider from "@components/SoundSlider";
import { GlobalValuesContext } from "@utils/GlobalValuesContext";

interface TaskbarProps {
  Icons: IIcon[];
}

export default function Taskbar({ Icons }: TaskbarProps) {
  const [infoMenu, setInfoMenu] = useState<boolean>(false);
  const [soundSlider, setSoundSlider] = useState<boolean>(false);
  const [languageMenu, setlanguageMenu] = useState<boolean>(false);
  const [ctime, setTime] = useState(formatTime());
  const [infoPosition, setInfoPosition] = useState({ top: 0, left: 0 });
  const [soundPosition, setSoundPosition] = useState({ top: 0, left: 0 });
  const infoButtonRef = useRef<HTMLButtonElement>(null);
  const soundButtonRef = useRef<HTMLButtonElement>(null);
  const { volume } = useContext(GlobalValuesContext);

  console.log(volume)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(formatTime());
    }, 60000); // Update every minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  

  useEffect(() => {
    // Posicionamiento dinámico del SoundSlider
    if (soundSlider && soundButtonRef.current) {
      const rect = soundButtonRef.current.getBoundingClientRect();
      setSoundPosition({ top: rect.top - 92, left: rect.left });
    }
  }, [soundSlider]);
  
  useEffect(() => {
    // Posicionamiento dinámico del InfoMenu
    if (infoMenu && infoButtonRef.current) {
      const rect = infoButtonRef.current.getBoundingClientRect();
      setInfoPosition({ top: rect.top - 520, left: rect.left });
    }
  }, [infoMenu]);
  

  return (
    <div className='relative '>
      <div className='flex flex-row gap-4 h-16 w-full items-center justify-around border-t border-gray-500 bg-gray-800 text-white'>
        <div className=' flex flex-row gap-4'>
          <Icon
            content={{
              name: "Windows Start",
              img: "https://img.icons8.com/fluency/256/windows-11.png",
              type: "tb",
            }}
          />

          <button className=' w-28 h-14 p-2 hover:bg-white/5'>
            <a
              href="javascript:console.log('aun')"
              className=' font-semibold text-center text-md'
            >
              Encuentrame
            </a>
          </button>
        </div>
        <div className='flex flex-row max-h-16 items-center justify-around overflow-hidden '>
          {Icons.length > 0 &&
            Icons.map((icon, index) => {
              return (
                <div key={index}>
                  <Icon content={icon} />
                </div>
              );
            })}
        </div>
        <div className=' flex flex-row gap-4 select-none items-center'>
          <button
            className='w-8 h-8  hover:bg-white/5 rounded-md text-center px-6  flex items-center justify-center'
            onClick={() => {
              setlanguageMenu(!languageMenu);
              console.log(languageMenu);
            }}
          >
            <p className='text-center text-md font-light'>ENG</p>{" "}
          </button>
          <button
            ref={infoButtonRef}
            className={`w-11 h-10  p-2 transition-transform ${
              infoMenu ? "upsidedown" : ""
            }`}
            onClick={() => {
              setInfoMenu(!infoMenu);
        if (!infoMenu) setSoundSlider(false); // Si soundSlider se abre, cierra infoMenu

              console.log(infoMenu);
            }}
          >
            <img
              src='https://img.icons8.com/metro/256/000000/chevron-up.png'
              className='size-full rounded-sm invert'
            />
          </button>
          <button className=' w-8 h-8 p-1   hover:bg-white/5 rounded-md '>
            <img
              src='https://img.icons8.com/fluency/256/wifi.png'
              id='wifi'
              className='size-full '
            />
          </button>
          <button
      ref={soundButtonRef}
      className="w-8 h-8 p-1 hover:bg-white/5 rounded-md"
      onClick={() => {
        setSoundSlider(!soundSlider); // Abre/cierra el soundSlider
        if (!soundSlider) setInfoMenu(false); // Si soundSlider se abre, cierra infoMenu
      }}
    >
      {volume > 0 ? (
        <img src="https://img.icons8.com/fluency/256/speaker.png" className="size-full" />
      ) : (
        <img src="https://img.icons8.com/fluency/256/mute.png" className="size-full" />
      )}
    </button>

          <div className='flex flex-col gap-0 text-sm text-right '>
            <p>{ctime}</p>
            <p>{getDate()}</p>
          </div>
        </div>
      </div>

      <Modal
        isVisible={infoMenu}
        position={infoPosition}
        element={<MyInfo />}
      />
      <Modal
        isVisible={soundSlider}
        position={soundPosition}
        element={<SoundSlider />}
      />
    </div>
  );
}

function formatTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}
