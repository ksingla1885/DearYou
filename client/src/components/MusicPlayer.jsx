import React, { useEffect, useRef } from 'react';

const MusicPlayer = () => {
    const audioRef = useRef(null);

    useEffect(() => {
        const playAudio = async () => {
            if (audioRef.current) {
                audioRef.current.volume = 0.3; // Set volume to 30%

                try {
                    await audioRef.current.play();
                } catch (error) {
                    // If autoplay is blocked, try again on first user interaction
                    const playOnInteraction = async () => {
                        try {
                            await audioRef.current.play();
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

    return (
        <audio ref={audioRef} loop preload="auto">
            <source src="/music.mp3" type="audio/mpeg" />
        </audio>
    );
};

export default MusicPlayer;

