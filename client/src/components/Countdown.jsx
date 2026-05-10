import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={interval} className="mx-1">
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    return (
        <div className="flex gap-2 text-sm font-medium text-gray-500 bg-gray-100/50 px-3 py-1 rounded-full backdrop-blur-sm border border-gray-200">
            {timerComponents.length ? (
                <>
                    <span className="animate-pulse text-rose-400">⏳</span>
                    {timerComponents}
                </>
            ) : (
                <span>Unlocked!</span>
            )}
        </div>
    );
};

export default Countdown;
