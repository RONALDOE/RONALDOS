import { IIcon } from "@utils/interfaces.ts";
import { useState } from "react";

interface IconProps {
  content: IIcon;
}

export default function Icon({ content }: IconProps) {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setMenuPosition({ x: event.pageX, y: event.pageY });
    // Logic to display the context menu will go here
    // CREATE COMPONENT CONTEXT MENU THAT TAKES AN ARRAY OF FUNCTIONS
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
        " p-1 rounded-sm transition-all flex flex-col hover:bg-white/5 items-center justify-center text-white font-semibold select-none"
      }
      onContextMenu={handleContextMenu}
    >
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={content.img}
          alt={content.name}
          className="object-contain max-w-full max-h-full"
        />
      </div>
      <p>{content.type === 'dt' ? content?.name : ""}</p>
    </button>
  );
}
