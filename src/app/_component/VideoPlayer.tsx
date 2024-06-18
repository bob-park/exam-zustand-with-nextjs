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

  const [currentFrameCount, setCurrentFrameCount] = useState<number>(0);
  const [totalFrameCount, setTotalFrameCount] = useState<number>(0);

  // useEffect
  useEffect(() => {
    const video = document.getElementById(VIDEO_TAG_ID) as HTMLVideoElement;

    if (!video) {
      return;
    }

    videoRef.current?.load();
  }, []);

  // handle
  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setTotalFrameCount(e.currentTarget.duration * FPS);
    setCurrentFrameCount(0);
  };

  const handleTimeUpdate = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    const currentTime = e.currentTarget.currentTime;

    setCurrentFrameCount(currentTime * FPS);
  };

  const handlePlayerKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault();

    if (videoRef.current) {
      const duration = videoRef.current.duration;

      const oneFrameDuration = duration * (1 / totalFrameCount);

      if (e.key === 'ArrowRight') {
        videoRef.current.pause();
        videoRef.current.currentTime += oneFrameDuration;
      } else if (e.key === 'ArrowLeft') {
        videoRef.current.pause();
        videoRef.current.currentTime -= oneFrameDuration;
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
          onTimeUpdate={handleTimeUpdate}
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
