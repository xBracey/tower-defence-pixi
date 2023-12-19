import React, { useEffect } from "react";
import { Music } from "../Icons";

interface AudioProps {}

let hasPlayed = false;

export const Audio = ({}: AudioProps) => {
  const [muted, setMuted] = React.useState(true);
  // const [volume, setVolume] = React.useState(0.5);

  const audioPlayerRef = React.useRef<HTMLAudioElement>(null);

  const onVolumeClick = () => {
    if (!hasPlayed && audioPlayerRef.current) {
      audioPlayerRef.current.play();
      hasPlayed = true;
    }

    setMuted(!muted);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.muted = !muted;
    }
  };

  return (
    <div className="text-white">
      <button onClick={onVolumeClick} className="relative">
        {muted && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -left-0 -right-1.5 bg-current rounded-full rotate-45"
            style={{
              height: "3px",
            }}
          />
        )}
        <Music className="w-8 h-8" />
      </button>

      <audio ref={audioPlayerRef}>
        <source src="theme.ogg" type="audio/ogg" />
      </audio>
    </div>
  );
};
