import { IIcon } from "@utils/interfaces.ts";
import {useState} from "react"

interface IconProps{
    content: IIcon;
}

export default function Icon({ content }: IconProps) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setMenuPosition({ x: event.pageX, y: event.pageY });
      // Logic to display the context menu will go here
      //CREAR COMPONENTE CONTEXT MENU QUE LE PASEMOS UN ARRAY DE FUNCIONES 
    };
  
  return (
    <button
    className={
      (content.size === "small"
        ? "w-20 h-20"
        : content.size === "medium"
        ? "w-32 h-32"
        : content.size === "large"
        ? "w-40 h-40"
        : "w-14 h-14") + 
      " p-1 rounded-sm transition-all flex flex-col  hover:bg-white/5  items-center justify-center text-white fonty-semibold select-none"
    }
  >
    <img
      src={content.img}
      alt={content.name}
      className="  object-contain w-full h-full "
    />
    <p>{content.type === 'dt' ? content?.name : ""}</p>
  </button>
  );
}


