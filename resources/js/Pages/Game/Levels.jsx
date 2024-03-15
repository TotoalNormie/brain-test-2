import { useEffect, useState } from "react";
import Game from "./Game";
import { Flag } from "@phosphor-icons/react";

const Levels = () => {
    const timerStart = 30;
    const [level, setLevel] = useState(0);
    const [popuSeen, setPopupSeen] = useState(false);
    const [lost, setLost] = useState(false);
    const [seconds, setSeconds] = useState(timerStart);
    const [isActive, setIsActive] = useState(false);

    const startTimer = () => {
        setIsActive(true);
    };

    const pauseTimer = () => {
        console.log("timer paused");
        setIsActive(false);
    };

    const resetTimer = () => {
        setSeconds(timerStart);
        setIsActive(false);
    };

    const nextLevel = () => {
        setLevel(level + 1);
        setPopupSeen(false);
        // setIsActive(true);
    };

    useEffect(() => {
        let intervalId;

        if (isActive && seconds > 0) {
            console.log("timer worked");
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        }
        if (seconds === 0) {
            setIsActive(false);
            setLost(true);
        }
        if (!isActive) {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isActive, seconds]);

    return (
        <>
            {level ? (
                <>
                    <h1>Level {level}</h1>
                    <div>
                        <Game
                            currentLevel={level}
                            onComplete={() => {
                                // setPopupSeen(true);
                                nextLevel();
                            }}
                            isLoss={lost}
                            onMatch={() =>
                                setSeconds((prevSeconds) => prevSeconds + 3)
                            }
                        />
                    </div>
                    <div>Time left: {seconds}</div>
                    {lost && <div>You lost :(</div>}
                </>
            ) : (
                <>
                    <h1>Welcome to the game</h1>
                    <button
                        onClick={() => {
                            setLevel(1);
                            // startTimer();
                        }}
                    >
                        Start game
                    </button>
                </>
            )}

            {/* {popuSeen && (
                <button type="button" onClick={() => nextLevel()}>
                    Next level
                </button>
            )} */}
        </>
    );
};

export default Levels;
