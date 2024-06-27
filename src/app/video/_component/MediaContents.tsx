'use client';

import VideoPlayer from '@/components/VideoPlayer';

export default function MediaContents() {
  return (
    <div className="flex flex-col size-full gap-2 p-5">
      <div className="">
        <VideoPlayer src="/api/dash/test.mpd" />
      </div>
    </div>
  );
}
