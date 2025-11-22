import React, { useEffect, useRef, useState } from 'react';

const MusicPlayer = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const playAudio = async () => {
            if (audioRef.current) {
                audioRef.current.volume = 0.3; // Set volume to 30%

                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (error) {
                    // If autoplay is blocked, try again on first user interaction
                    const playOnInteraction = async () => {
                        try {
                            await audioRef.current.play();
                            setIsPlaying(true);
                            // Remove listener after successful play
                            document.removeEventListener('click', playOnInteraction);
                            document.removeEventListener('touchstart', playOnInteraction);
                            document.removeEventListener('keydown', playOnInteraction);
                        } catch (e) {
                            console.log('Play failed:', e);
                        }
                    };

                    // Add multiple event listeners for different interaction types
                    document.addEventListener('click', playOnInteraction, { once: true });
                    document.addEventListener('touchstart', playOnInteraction, { once: true });
                    document.addEventListener('keydown', playOnInteraction, { once: true });
                }
            }
        };

        // Small delay to ensure DOM is ready
        const timer = setTimeout(playAudio, 500);

        return () => clearTimeout(timer);
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio ref={audioRef} loop preload="auto">
                <source src="/music.mp3" type="audio/mpeg" />
            </audio>

            <button
                onClick={togglePlay}
                className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-romantic-200 text-romantic-500 hover:bg-romantic-50 transition-all duration-300 hover:scale-110"
                title={isPlaying ? "Pause Music" : "Play Music"}
            >
                {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default MusicPlayer;
