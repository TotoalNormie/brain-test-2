import { useEffect, useRef, useState } from "react";

const GameInbetween = ({ isStart = false, isPaused, onComplete }) => {
    const [countdown, setCountdown] = useState(3);
    let intervalRef = useRef(null);

    const startCountdown = () => {
        if (intervalRef.current !== null) return;
        intervalRef.current = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 0) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 500);
    };

    // console.log(isPaused)

    const stopCountdown = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    useEffect(() => {
        startCountdown();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (isPaused) {
            stopCountdown();
        } else {
            startCountdown();
        }
    }, [isPaused]);

    // Call onComplete when countdown reaches 0
    useEffect(() => {
        if (countdown === 0 && onComplete) {
            onComplete();
        }
    }, [countdown, onComplete]);

    // Rest of your component...
    return (
        <div className="text-center flex flex-col align-center">
            {isStart ? <h3>Game starts in...</h3> : <h3>Next Level in...</h3>}
            <h3 className="text-5xl">{countdown}</h3>
        </div>
    );
};

export default GameInbetween;
