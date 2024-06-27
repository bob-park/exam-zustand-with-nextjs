import { useContext, useEffect, useRef, useState } from 'react';

import { toTimecode } from '@/utils/commonUtils';

import { LogLevel } from 'dashjs';

import { VideoPlayerContext } from './VideoPlayerProvider';

type VideoPlayerProps = {
  src: string;
};

const DEFAULT_FPS = 29.97;

function parseFrameCount(currentTime: number, currentFps?: number) {
  const fps = currentFps || DEFAULT_FPS;

  return currentTime * fps;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  // ref
  const videoRef = useRef<HTMLVideoElement>(null);

  // state
  const [play, setPlay] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // useEffect
  useEffect(() => {
    const setDashPlayer = async () => {
      if (!videoRef.current) {
        return;
      }

      const dashjs = await import('dashjs');

      const dashPlayer = dashjs.MediaPlayer().create();

      dashPlayer.initialize(videoRef.current, src, true);
      dashPlayer.updateSettings({
        debug: { logLevel: 0 },
      });
    };

    setDashPlayer();

    videoRef.current?.load();

    return () => {};
  }, [src]);

  useEffect(() => {
    let intervalId = null;

    if (play) {
      intervalId = setInterval(() => {
        const curremtTime = videoRef.current?.currentTime || 0;

        setCurrentTime(curremtTime);
      }, 10);
    }

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [play]);

  // handle
  const handleLoadMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setDuration(e.currentTarget.duration);
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    // setCurrentTime(e.currentTarget.currentTime);
  };

  const handlePlayerKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault();

    const oneFrameDuration = 1 / DEFAULT_FPS;

    if (videoRef.current) {
      if (e.key === 'ArrowRight') {
        videoRef.current.pause();
        videoRef.current.currentTime += oneFrameDuration;

        setCurrentTime(currentTime + oneFrameDuration);
      } else if (e.key === 'ArrowLeft') {
        videoRef.current.pause();
        videoRef.current.currentTime -= oneFrameDuration;

        setCurrentTime(currentTime - oneFrameDuration);
      } else if (e.key === ' ') {
        const paused = videoRef.current.paused;
        paused ? videoRef.current.play() : videoRef.current.pause();
      }
    }
  };

  return (
    <div
      className="flex flex-col gap-2 p-2 size-full"
      tabIndex={-1}
      onKeyDownCapture={handlePlayerKeyDown}
    >
      <div className="">
        <video
          className="size-full rounded-2xl"
          ref={videoRef}
          controls
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadataCapture={handleLoadMetadata}
          onPlay={() => setPlay(true)}
          onPause={() => setPlay(false)}
        />
      </div>
      <div>
        <div className="flex flex-row items-center justify-center">
          <span className="mr-3 counter">
            {Math.floor(parseFrameCount(currentTime))}
          </span>
          /<span className="ml-3">{Math.floor(parseFrameCount(duration))}</span>
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center justify-center">
          <span className="mr-3 counter">
            {toTimecode(currentTime, DEFAULT_FPS, true)}
          </span>
          /
          <span className="ml-3">
            {toTimecode(currentTime, DEFAULT_FPS, true)}
          </span>
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center justify-center">
          <span className="mr-3 counter">
            {toTimecode(currentTime, DEFAULT_FPS, false)}
          </span>
          /
          <span className="ml-3">
            {toTimecode(currentTime, DEFAULT_FPS, false)}
          </span>
        </div>
      </div>
    </div>
  );
}
