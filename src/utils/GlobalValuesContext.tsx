import { createContext, Dispatch, SetStateAction } from "react";
import {IIcon} from "@utils/interfaces"

interface GlobalValuesProps {
  theme: string;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>; // Function to update volume
  openApps: IIcon[],
  
}



export const GlobalValuesContext = createContext<GlobalValuesProps>({
  theme: "light",
  volume: 80,
  setVolume: () => {}, // Default implementation
  openApps: []
});
