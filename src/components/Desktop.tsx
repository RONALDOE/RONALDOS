import { IIcon } from "@utils/interfaces.ts";
import Icon from "./Icon";

interface DesktopProps {
  Icons: IIcon[];
}

export default function Desktop({ Icons }: DesktopProps) {

  return (
    <div className="grid-flow-col grid grid-cols-12 grid-rows-10 p-4 gap-2 max-h-full ">
      {Icons.length > 0 &&
        Icons.map((icon, index) => {
          const gridSizeClass = {
            small: "col-span-1 row-span-1",
            medium: "col-span-1 row-span-2",
            large: "col-span-1 row-span-3",
          }[icon.size || "small"]; 

          return(
            <div
              key={index}
              className={`${gridSizeClass} flex items-center justify-center`}
              style={{ margin: 'auto' }} // Añade un margin auto para centrar
            >
              <Icon content={icon} />
            </div>
          );
        })}
    </div>
  );
}
