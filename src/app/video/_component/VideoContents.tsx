'use client';

import { useContext, useEffect } from 'react';

import { toTimecode } from '@/utils/commonUtils';

import VideoPlayer from '@/components/VideoPlayer';
import { VideoPlayerContext } from '@/components/VideoPlayerProvider';

const DEFAULT_FPS = 29.97;

function parseFrameCount(currentTime: number, currentFps?: number) {
  const fps = currentFps || DEFAULT_FPS;

  return currentTime * fps;
}

export default function VideoContents() {
  const { currentTime, duration } = useContext(VideoPlayerContext);

  return (
    <div className="flex flex-col gap-2 p-2">
      <div>
        <VideoPlayer src="/api/dash/test.mpd" fps={DEFAULT_FPS} />
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
