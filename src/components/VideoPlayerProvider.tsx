import { createContext, useState } from 'react';

export const VideoPlayerContext = createContext({
  play: false,
  currentTime: 0,
  duration: 0,
  setPlay: (flag: boolean) => {},
  setCurrentTime: (currentTime: number) => {},
  setDuration: (duration: number) => {},
});

export default function VideoPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [play, setPlay] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  return (
    <VideoPlayerContext.Provider
      value={{
        play,
        currentTime,
        duration,
        setCurrentTime,
        setDuration,
        setPlay,
      }}
    >
      {children}
    </VideoPlayerContext.Provider>
  );
}
