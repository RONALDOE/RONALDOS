import React, { useState, useEffect, useContext } from 'react';
import { GlobalValuesContext } from '@utils/GlobalValuesContext';

export default function SoundSlider() {
  const { volume: globalVolume, setVolume: setGlobalVolume } = useContext(GlobalValuesContext);
  const [volume, setVolume] = useState(globalVolume || 100);
  const [mute, setMute] = useState(false);
  const [lastVolume, setLastVolume] = useState(volume);

  useEffect(() => {
    if (mute) {
      setLastVolume(volume); // Guarda el último volumen antes de silenciar
      setVolume(0); // Cambia el volumen local a 0
      setGlobalVolume(0); // Cambia el volumen global a 0
    } else if (volume === 0) { 
      // Restablece solo si el volumen está en 0 cuando se desactiva el mute
      setVolume(lastVolume);
      setGlobalVolume(lastVolume);
    }
  }, [mute]); // Mantiene las dependencias mínimas
  

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    setGlobalVolume(newVolume);

    if (newVolume > 0 && mute) {
      setMute(false);
    }
  };

  return (
    <div className='flex flex-row gap-2'>
      <button onClick={() => setMute(!mute)}>
        {volume === 0 ? (
          <img src="https://img.icons8.com/fluency/256/mute.png" className='w-8 h-8' alt="Mute" />
        ) : (
          <img src="https://img.icons8.com/fluency/256/speaker.png" className='w-8 h-8' alt="Speaker" />
        )}
      </button>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={volume} 
        className="slider" 
        id="myRange" 
        onChange={handleVolumeChange}
      />
    </div>
  );
}
