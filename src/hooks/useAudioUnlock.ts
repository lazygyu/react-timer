import { useEffect, useRef } from "react";

const audioMap: Map<string, AudioBuffer> = new Map();

export function useAudioUnlock(): [
  (key: string) => void,
  (key: string, url: string) => void
] {
  const contextRef = useRef<AudioContext>();
  let context = contextRef.current;

  useEffect(() => {
    const WindowAudioContext = (window.AudioContext ||
      (window as any).webkitAudioContext) as typeof window.AudioContext;
    contextRef.current = new WindowAudioContext(); // Make it crossbrowser
    context = contextRef.current;
    const gainNode = context.createGain();
    gainNode.gain.value = 1; // set volume to 100%
  }, []);

  const play = (key: string) => {
    if (!audioMap.has(key)) return;
    const audioBuffer = audioMap.get(key);
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
  };

  const load = (key: string, url: string): void => {
    if (audioMap.has(url)) return;
    fetch(url)
      .then((resp) => resp.arrayBuffer())
      .then((buff) => {
        context.decodeAudioData(buff, (audioBuffer) => {
          audioMap.set(key, audioBuffer);
        });
      });
  };

  useEffect(() => {
    const unlock = () => {
      const buffer = context.createBuffer(1, 1, 22050);
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);

      // play the file. noteOn is the older version of start()
      source.start ? source.start(0) : (source as any).noteOn(0);

      // by checking the play state after some time, we know if we're really unlocked
      setTimeout(function () {
        // Hide the unmute button if the context is unlocked.
        document.removeEventListener("click", unlock);
      }, 0);
    };
    document.addEventListener("click", unlock);
  }, []);
  return [play, load];
}
