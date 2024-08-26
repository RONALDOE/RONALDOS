import { createContext, Dispatch, SetStateAction } from "react";

interface GlobalValuesProps {
  theme: string;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>; // Function to update volume
}

export const GlobalValuesContext = createContext<GlobalValuesProps>({
  theme: "light",
  volume: 80,
  setVolume: () => {}, // Default implementation
});
