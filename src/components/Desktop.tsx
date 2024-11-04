import React, { useContext } from 'react';
import Icon from './Icon';
import Window from './Window';
import { IIcon } from '@utils/interfaces';
import { GlobalValuesContext } from '@utils/GlobalValuesContext';

interface DesktopProps {
  Icons: IIcon[];
}

export default function Desktop({ Icons }: DesktopProps) {
  const { openApps, setOpenApps } = useContext(GlobalValuesContext);

  const handleIconClick = (icon: IIcon) => {
    // Agrega la nueva ventana solo si no está ya abierta
    setOpenApps((prevApps) => {
      if (!prevApps.find((app) => app.id === icon.id)) {
        return [...prevApps, { ...icon, instanceId: Date.now() }];
      }
      return prevApps;
    });
  };

  return (
    <div className="container flex flex-col gap-4 m-4">
      {Icons.length > 0 &&
        Icons.map((icon) => (
          <div key={icon.id} onClick={() => handleIconClick(icon)}>
            <Icon content={icon} />
          </div>
        ))}

      {openApps.map((app) => (
        <Window key={app.id} icon={app} id={app.id! | 0} />
      ))}
    </div>
  );
}
