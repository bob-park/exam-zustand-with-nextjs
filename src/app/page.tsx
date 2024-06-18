import Counter from './_component/Counter';
import VideoPlayer from './_component/VideoPlayer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {/* <Counter /> */}
      <VideoPlayer />
    </main>
  );
}
