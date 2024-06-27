'use client';

import VideoPlayer from '@/components/VideoPlayer';

const DEFAULT_FPS = 29.97;

function parseFrameCount(currentTime: number, currentFps?: number) {
  const fps = currentFps || DEFAULT_FPS;

  return currentTime * fps;
}

export default function VideoContents() {
  return <div></div>;
}
