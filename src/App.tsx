import Screen from "@components/Screen"
import { GlobalValuesContext } from "@utils/GlobalValuesContext";
import { useState } from "react";
function App() {
  const [theme, ] = useState<string>("light");
  const [volume, setVolume ] = useState<number>(90);

  return (
    <GlobalValuesContext.Provider value={{theme, volume, setVolume}}>

    <Screen/>
</GlobalValuesContext.Provider>
  )
}

export default App
