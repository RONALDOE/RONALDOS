import Screen from "@components/Screen";
import { GlobalValuesContext } from "@utils/GlobalValuesContext";
import React, { useState } from "react";
import { IIcon } from "@utils/interfaces";

function App() {
  const [volume, setVolume] = useState<number>(100); // Real state for volume
  const [theme, ] = useState<string>("light"); // Real state for theme
  const [openApps, setOpenApps] = useState<IIcon[]>([]); // State for open applications

  return (
    <GlobalValuesContext.Provider value={{ theme, volume, setVolume, openApps, setOpenApps }}>
      <Screen />
    </GlobalValuesContext.Provider>
  );
}

export default App;
