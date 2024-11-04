import { createContext, Dispatch, SetStateAction } from "react";
import { IIcon } from "@utils/interfaces";

interface GlobalValuesProps {
  theme: string;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
  openApps: IIcon[];
  setOpenApps: Dispatch<SetStateAction<IIcon[]>>; // Tipo actualizado aquí
}

export const GlobalValuesContext = createContext<GlobalValuesProps>({
  theme: "light",
  volume: 80,
  setVolume: () => {},
  openApps: [],
  setOpenApps: () => {}, // Definición correcta para `setOpenApps`
});
