import React, {useRef, useEffect} from "react";

export function useRequestAnimationFrame(callback: (delta: number) => void): void {
    const requestRef = useRef<number>();
    const prevTimeRef = useRef<number>();

    const animate = (time: number) => {
        if (prevTimeRef.current !== undefined) {
            const deltaTime = time - prevTimeRef.current;
            callback(deltaTime);
        }
        prevTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);
}