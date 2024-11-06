import { IIcon } from "@utils/interfaces.ts";
import { useState } from "react";
import Window from "./Window";

interface IconProps {
  content: IIcon;
}

export default function Icon({ content }: IconProps) {
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setMenuPosition({ x: event.pageX, y: event.pageY });
    // Logic to display the context menu will go here
  };

  const iconSize = {
    small: "w-20 h-20",
    medium: "w-32 h-32",
    large: "w-40 h-40",
    default: "w-14 h-14"
  };

  const sizeClass = iconSize[content.size!] || iconSize.default;

  return (
    <button
      className={`p-2 rounded-sm transition-transform transform flex flex-col items-center justify-center text-white text-lg font-semibold select-none
        hover:bg-white/10  ${sizeClass}`}
      onContextMenu={handleContextMenu}
    >
        <img
          src={content.img}
          alt={content.name}
          className={`object-contain ${content.type === "dt" ? "max-w-full max-h-full" : "max-w-14 max-h-14"}`}
        />
      {content.type === 'dt' && <p className="text-sm">{content.name}</p>}
    </button>
  );
}
