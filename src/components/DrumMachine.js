import React, { useEffect, useState } from 'react';
import '../css/DrumMachine.css'

const DrumMachine = () => {
  const [activeKey, setActiveKey] = useState('');
  const buttons = [
    { id: 'heater-1', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3', key: 'Q' },
    { id: 'heater-2', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3', key: 'W' },
    { id: 'heater-3', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3', key: 'E' },
    { id: 'heater-4', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3', key: 'A' },
    { id: 'clap', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3', key: 'S' },
    { id: 'open-hh', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3', key: 'D' },
    { id: 'kick-n-hat', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3', key: 'Z' },
    { id: 'kick', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3', key: 'X' },
    { id: 'closed-hh', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3', key: 'C' },
  ];

  const playAudio = (key) => {
    const audioElement = document.getElementById(key);
    if (audioElement) {
      try {
        if (!audioElement.paused) {

          audioElement.pause();
          audioElement.currentTime = 0; 
        }
        audioElement
          .play()
          .then(() => {
            setActiveKey(key); 
            setTimeout(() => setActiveKey(''), 200);
          })
          .catch((error) => {
            console.error('Error playing audio:', error);
          });
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    }
  };
  
  useEffect(() => {
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    if (buttons.some((button) => button.key === key)) {
      playAudio(key);
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [buttons]);
  const activeButton = buttons.find((btn) => btn.key === activeKey)
  return (
    <div id="drum-machine">
      <div id="display">{ activeButton ? activeButton.id : '' }
      </div>
      {buttons.map((audio) => (
        <button
          key={audio.key}
          id={audio.id}
          className={`drum-pad ${activeKey === audio.key ? 'active' : ''}`}
          onClick={() => playAudio(audio.key)}
        >
          {audio.key}
          <audio src={audio.url} id={audio.key} className="clip" />
        </button>
      ))}
    </div>
  );
};

export default DrumMachine;
