import { Rnd } from "react-rnd";
import { IIcon } from '@utils/interfaces';
import React, { useEffect, useState } from 'react';

interface WindowProps {
  icon: IIcon;
  id: number;
  defaults ? :{ x: number, y: number, width: number, height: number}
}

export default function Window({ icon, id, defaults }: WindowProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);  // Nueva bandera para evitar render hasta que se obtenga el tamaño

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsReady(true);  // Una vez que se actualiza el tamaño, permitimos que el componente se renderice
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const defaultWidth = 700;
  const defaultHeight = 400;

  const defaultX = (windowSize.width - defaultWidth) / 2;
  const defaultY = (windowSize.height - defaultHeight) / 2;

  // No renderizamos el componente hasta que isReady sea true
  if (!isReady) return null;

  return (
    <Rnd
      className="w-96 h-96 absolute bg-gray-100/50 rounded shadow-lg flex flex-col"
      dragHandleClassName="drag-handle"
      default={{
        x: defaults?.x || defaultX,
        y: defaults?.y || defaultY,
        width: defaults?.width || defaultWidth,
        height: defaults?.height ||defaultHeight,
      }}
      enableResizing={{
        top: false,
        right: true,
        bottom: true,
        left: true,
        topRight: false,
        bottomRight: true,
        bottomLeft: true,
        topLeft: false,
      }}
      bounds={"body"}
    >
      {/* Barra de arrastre */}
      <div className="drag-handle w-full bg-gray-800 h-8 -translate-y-8 absolute cursor-move rounded-t-md flex flex-row items-center justify-between px-8">
        <div className="flex flex-row gap-4">
          <img src={icon?.img} className="w-4"  />
          <p className="text-white text-sm">{icon?.name}</p>
        </div>
        <div className="flex flex-row gap-4">
          <button>
            <img src="https://img.icons8.com/fluency/256/minimize-window--v2.png" className="w-7" alt="Minimize Button" />
          </button>
          <button>
            <img src="https://img.icons8.com/fluency/256/maximize-window.png" className="w-7" alt="Maximize Button" />
          </button>
          <button>
            <img src="https://img.icons8.com/fluency/256/close-window--v1.png" className="w-7" alt="Close Button" />
          </button>
        </div>
      </div>

      {/* Contenido (iframe) */}  
      <div className="w-full max-h-max flex-grow flex">
        <iframe
          src={icon?.appUrl}
          className="w-full h-full border-none"
          title={icon?.name}
        />
      </div>
    </Rnd>
  );
}
