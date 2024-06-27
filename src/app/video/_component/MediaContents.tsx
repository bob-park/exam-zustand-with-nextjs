'use client';

import VideoPlayer from '@/components/VideoPlayer';
import VideoPlayerProvider from '@/components/VideoPlayerProvider';

import VideoContents from './VideoContents';

export default function MediaContents() {
  return (
    <div className="flex flex-col size-full gap-2 p-5">
      <div className="">
        <VideoPlayerProvider>
          <VideoContents />
        </VideoPlayerProvider>
      </div>
    </div>
  );
}
