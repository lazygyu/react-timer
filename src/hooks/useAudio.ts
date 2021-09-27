import React, {useEffect} from 'react';

const audioMap = new Map<string, HTMLAudioElement>();

function getAudio(audioUrl: string): HTMLAudioElement {
    if (!audioMap.has(audioUrl)) {
        const audioElem = document.createElement('audio') as HTMLAudioElement;
        audioElem.src = audioUrl;
        audioMap.set(audioUrl, audioElem);
    }

    const elem = audioMap.get(audioUrl);

    useEffect(() => {
        document.body.appendChild(elem);
    });

    return elem;
}

export function useAudio(audioUrl: string) {
    const audioElem = getAudio(audioUrl);
    const play = () => {
        audioElem.currentTime = 0;
        audioElem.play();
    };

    const stop = () => {
        audioElem.pause();
        audioElem.currentTime = 0;
    };
    return [play, stop];
}