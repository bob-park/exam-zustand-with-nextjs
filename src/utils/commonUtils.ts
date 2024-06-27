export function toTimecode(
  currentTime: number,
  fps: number,
  isTimecode: boolean,
): string {
  const currentFrameCount = Math.floor(currentTime * fps);

  const totalSeconds = currentFrameCount / fps;
  const frame = Math.floor(currentFrameCount % fps);
  const seconds = Math.floor(totalSeconds % 60);
  const minute = Math.floor((totalSeconds / 60) % 60);
  let hour = Math.floor(totalSeconds / 3600);

  return `${pad(hour, 2)}:${pad(minute, 2)}:${pad(seconds, 2)}${
    isTimecode ? `;${pad(frame, 2)}` : ''
  }`;
}

const pad = (num: number, size: number) => num.toString().padStart(size, '0');
