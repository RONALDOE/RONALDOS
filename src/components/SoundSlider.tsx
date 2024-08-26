import React, { useState, useEffect, useContext } from 'react';
import { GlobalValuesContext } from '@utils/GlobalValuesContext';

export default function SoundSlider() {
  const { volume: globalVolume, setVolume: setGlobalVolume } = useContext(GlobalValuesContext);
  const [volume, setVolume] = useState(globalVolume || 50);
  const [mute, setMute] = useState(false);
  const [lastVolume, setLastVolume] = useState(volume);

  useEffect(() => {
    if (mute ) {
      setLastVolume(volume); // Save the last volume before muting
      setVolume(0); // Mute the volume
      setGlobalVolume(0); // Update the global volume to 0
    } else {
      setVolume(lastVolume); // Restore the last saved volume
      setGlobalVolume(lastVolume); // Update the global volume to the last saved volume
    }
  }, [mute]);




  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    setGlobalVolume(newVolume); // Update the global volume as well

    if (newVolume > 0 && mute) {
      setMute(false); // Deactivate mute if the user adjusts the volume while it's muted
    }
  };

  return (
    <div className=' flex flex-row gap-2'>
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
