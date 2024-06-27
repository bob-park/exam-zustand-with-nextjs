'use client';

import VideoPlayer from "@/components/VideoPlayer";

const DEFAULT_FPS = 29.97;

function parseFrameCount(currentTime: number, currentFps?: number) {
  const fps = currentFps || DEFAULT_FPS;

  return currentTime * fps;
}

export default function VideoContents() {

    const

  return (
    <div>
      <div className="">
        <VideoPlayer src="/api/dash/test.mpd" />
      </div>
      <div>
        <div className="flex flex-row items-center justify-center">
          <span className="mr-3 counter">
            {Math.floor(parseFrameCount(currentTime))}
          </span>
          /<span className="ml-3">{Math.floor(parseFrameCount(duration))}</span>
        </div>
      </div>
      {/* <div>
        <div className="flex flex-row items-center justify-center">
          <span className="mr-3 counter">
            {toTimecode(currentFrameCount, FPS, true)}
          </span>
          /
          <span className="ml-3">{toTimecode(totalFrameCount, FPS, true)}</span>
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center justify-center">
          <span className="mr-3 counter">
            {toTimecode(currentFrameCount, FPS, false)}
          </span>
          /
          <span className="ml-3">
            {toTimecode(totalFrameCount, FPS, false)}
          </span>
        </div>
      </div> */}
    </div>
  );
}
