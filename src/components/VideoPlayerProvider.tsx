import { createContext, useState } from 'react';

export const VideoPlayerContext = createContext({
  currentTime: 0,
  duration: 0,
  onTimeUpdate: (currentTime: number) => {},
  setDuration: (duration: number) => {},
});

export default function VideoPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentTime, onTimeUpdate] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  return (
    <VideoPlayerContext.Provider
      value={{ currentTime, duration, onTimeUpdate, setDuration }}
    >
      {children}
    </VideoPlayerContext.Provider>
  );
}
