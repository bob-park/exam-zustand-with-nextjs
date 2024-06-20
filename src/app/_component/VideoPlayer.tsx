'use client';

import { SyntheticEvent, useEffect, useRef, useState } from 'react';

const FPS = 29.97;
const VIDEO_TAG_ID = 'my_video';

function toTimecode(currentFrameCount: number, fps: number): string {
  const totalSeconds = currentFrameCount / fps;
  const frame = Math.floor(currentFrameCount % fps);
  const seconds = Math.floor(totalSeconds % 60);
  const minute = Math.floor((totalSeconds / 3600) % 60);
  let hour = Math.floor(totalSeconds / 3600);

  return `${pad(hour, 2)}:${pad(minute, 2)}:${pad(seconds, 2)};${pad(
    frame,
    2,
  )}`;
}

const pad = (num: number, size: number) => num.toString().padStart(size, '0');

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [play, setPlay] = useState<boolean>(false);
  const [oneFrameDuration, setOneFrameDuration] = useState<number>(0);
  const [currentFrameCount, setCurrentFrameCount] = useState<number>(0);
  const [totalFrameCount, setTotalFrameCount] = useState<number>(0);

  // useEffect
  useEffect(() => {
    videoRef.current?.load();
  }, []);

  useEffect(() => {
    let intervalId = null;

    if (play) {
      intervalId = setInterval(() => {
        const curremtTime = videoRef.current?.currentTime || 0;

        setCurrentFrameCount(curremtTime * FPS);
      }, 1_000 / 120);
    } else {
      const curremtTime = videoRef.current?.currentTime || 0;

      setCurrentFrameCount(curremtTime * FPS);
    }

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [play]);

  useEffect(() => {
    console.log(currentFrameCount);
  }, [currentFrameCount]);

  // handle
  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const result = e.currentTarget.duration * FPS;

    setTotalFrameCount(result);
    setCurrentFrameCount(0);
    setOneFrameDuration(1 / FPS);
  };

  const handleTimeUpdate = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    const currentTime = e.currentTarget.currentTime;

    setCurrentFrameCount(currentTime * FPS);
  };

  const handlePlayerKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault();

    if (videoRef.current) {
      if (e.key === 'ArrowRight') {
        videoRef.current.pause();
        videoRef.current.currentTime += oneFrameDuration;

        setCurrentFrameCount(currentFrameCount + 1);
      } else if (e.key === 'ArrowLeft') {
        videoRef.current.pause();
        videoRef.current.currentTime -= oneFrameDuration;

        setCurrentFrameCount(currentFrameCount - 1);
      } else if (e.key === ' ') {
        const paused = videoRef.current.paused;
        paused ? videoRef.current.play() : videoRef.current.pause();
      }
    }
  };

  return (
    <div
      className="flex flex-col gap-2"
      tabIndex={-1}
      onKeyDown={handlePlayerKeyDown}
    >
      <div className="h-96">
        <video
          className="size-full"
          ref={videoRef}
          id={VIDEO_TAG_ID}
          src="/test.mp4"
          onLoadedMetadataCapture={handleLoadedMetadata}
          // onTimeUpdate={handleTimeUpdate}
          onPlay={() => setPlay(true)}
          onPause={() => setPlay(false)}
        />
      </div>

      <div>
        <div className="flex flex-row items-center justify-center">
          <span className="mr-3 counter">
            {toTimecode(currentFrameCount, FPS)}
          </span>{' '}
          /<span className="ml-3"> {toTimecode(totalFrameCount, FPS)}</span>
        </div>
      </div>
    </div>
  );
}
