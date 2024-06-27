import React, { useContext, useEffect, useRef, useState } from 'react';

import { VideoPlayerContext } from './VideoPlayerProvider';

type VideoPlayerProps = {
  src: string;
  fps: number;
  onPlay?: () => void;
  onStop?: () => void;
  onForward?: () => void;
  onBackward?: () => void;
};

export default function VideoPlayer({ src, fps }: VideoPlayerProps) {
  // ref
  const videoRef = useRef<HTMLVideoElement>(null);

  // context
  const { play, currentTime, setCurrentTime, setDuration, setPlay } =
    useContext(VideoPlayerContext);

  // useEffect
  useEffect(() => {
    const setDashPlayer = async () => {
      if (!videoRef.current) {
        return;
      }

      const dashjs = await import('dashjs');

      const dashPlayer = dashjs.MediaPlayer().create();

      dashPlayer.initialize(videoRef.current, src, false);
      dashPlayer.updateSettings({
        debug: { logLevel: 0 },
      });
    };

    setDashPlayer();

    videoRef.current?.load();

    return () => {};
  }, [src]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    // videoRef.current.currentTime = currentTime;
  }, [currentTime]);

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
    setCurrentTime(e.currentTarget.currentTime);
  };

  const handlePlayerKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault();

    const oneFrameDuration = 1 / fps;

    if (videoRef.current) {
      if (e.key === 'ArrowRight') {
        videoRef.current.pause();
        videoRef.current.currentTime += oneFrameDuration;

        setCurrentTime(videoRef.current.currentTime);
      } else if (e.key === 'ArrowLeft') {
        videoRef.current.pause();
        videoRef.current.currentTime -= oneFrameDuration;

        setCurrentTime(videoRef.current.currentTime);
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
    </div>
  );
}
