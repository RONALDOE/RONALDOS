import { IIcon } from "@utils/interfaces.ts";
import { useState, useEffect } from "react";
import Icon from "@components/Icon";

interface TaskbarProps {
  Icons: IIcon[];
}

export default function Taskbar({ Icons }: TaskbarProps) {
  const [infoMenu, setInfoMenu] = useState<boolean>(false);

  const [languageMenu, setlanguageMenu] = useState<boolean>(false);
  // Format the time to exclude seconds
  const formatTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const [ctime, setTime] = useState(formatTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(formatTime());
    }, 60000); // Update every minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    //PONER AQUI MI INFORMACION
  }, [infoMenu]);

  return (
    <div className='flex flex-row gap-4 h-16 w-full items-center justify-around border-t border-gray-500 bg-gray-800 text-white     	 '>
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
      <div className='flex flex-row max-h-16 items-center justify-around '>
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
          className='w-8 h-8   hover:bg-white/5 rounded-md text-center '
          onClick={() => {
            setlanguageMenu(!languageMenu);
            console.log(languageMenu);
          }}
        >
          <p className='text-center text-md font-light  '>ENG</p>{" "}
        </button>
        <button
          className={`w-11 h-10  p-2 transition-transform  ${
            infoMenu ? "upsidedown" : ""
          }`}
          onClick={() => {
            setInfoMenu(!infoMenu);
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
        <button className=' w-8 h-8 p-1 hover:bg-white/5 rounded-md '>
          <img
            src='https://img.icons8.com/fluency/256/speaker.png'
            id='sound'
            className='size-full '
          />
        </button>

        <div className='flex flex-col gap-0 text-sm text-right '>
          <p>{ctime}</p>
          <p>{getDate()}</p>
        </div>
      </div>
    </div>
  );
}

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

