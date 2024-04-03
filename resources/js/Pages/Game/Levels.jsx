import { useEffect, useState } from "react";
import Game, { randomArray } from "./Game";
import css from "./game.module.css";
import GameInbetween from "./GameInbetween";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { router } from "@inertiajs/react";
import { Popup } from "@/Components/Popup";
import { Pause } from "@phosphor-icons/react";

const Stats = ({ level, score, coins }) => (
    <div className={`flex flex-col gap-2 align-center`}>
        <p>Level: {level}</p>
        <p>Score: {score}</p>
        <p>Coins earned: {coins}</p>
    </div>
);

const Levels = ({ auth, cards, themes }) => {
    const initialTimer = 100;
    const [level, setLevel] = useState(0);
    const [isGamePaused, setIsGamePaused] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(initialTimer);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [gameIcons, setGameIcons] = useState(randomArray(15, 15));
    const [showInbetveen, setShowInbetveen] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [hasLost, setHasLost] = useState(false);
    const [score, setScore] = useState(0);
    const [coins, setCoins] = useState(0);
    const { props } = usePage();

    const postGameData = () => {
        // console.log("works");
        router.post(route("score.add"), { level, score, gameWon });
        router.post(route("coins.add"), { coins });
    };

    console.log(cards, themes, props);

    function startTimer() {
        return setIsTimerActive(true);
    }

    const pauseTimer = () => setIsTimerActive(false);

    const resetTimer = () => {
        setTimeRemaining(initialTimer);
        startTimer();
    };

    const advanceLevel = () => {
        startTimer();
        setShowInbetveen(false);
        setLevel((prevLevel) => prevLevel + 1);
    };

    const toggleGamePause = () => setIsGamePaused((prevState) => !prevState);

    const resetGame = () => {
        setLevel(0);
        setIsGamePaused(false);
        setHasLost(false);
        setGameWon(false);
        resetTimer();
        setGameIcons(randomArray(15, 15));
        setShowInbetveen(true);
        setGameStarted(false);
    };

    useEffect(() => {
        if (isGamePaused && !hasLost && level) {
            pauseTimer();
            // setIsPauseScreenHidden(false);
        } else {
            if (!level || showInbetveen) return;
            startTimer();
            // setTimeout(() => setIsPauseScreenHidden(true), 300);
        }
    }, [isGamePaused, hasLost, level]);

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === "Escape") toggleGamePause();
        };

        window.addEventListener("keydown", handleEscapeKey);
        return () => window.removeEventListener("keydown", handleEscapeKey);
    }, []);

    useEffect(() => {
        if (hasLost) postGameData();
    }, [hasLost]);

    useEffect(() => {
        if (gameWon) postGameData();
    }, [gameWon]);

    useEffect(() => {
        let intervalId;

        // console.log(isTimerActive, timeRemaining);
        if (isTimerActive && timeRemaining > 0) {
            intervalId = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            pauseTimer();
            setHasLost(true);
            // setTimeout(() => setIsLostScreenHidden(false), 300);
        }

        return () => clearInterval(intervalId);
    }, [isTimerActive, timeRemaining]);

    return (
        <Authenticated user={auth.user}>
            <Head title="Memory Game" />
            {/* <SecondaryButton onClick={postGameData}>Send data</SecondaryButton> */}
            {gameStarted ? (
                <>
                    <div className="flex gap-4 justify-between w-[min(100%,_60rem)] mx-auto mt-6">
                        <button
                            onClick={toggleGamePause}
                            className="rounded-[100%] hover:bg-primary p-2"
                        >
                            <Pause size={24} />
                        </button>
                        <div>Level {level}</div>
                        <div>Time left: {timeRemaining}</div>
                        <div>Score: {score}</div>
                    </div>
                    {/* <div>
                        <PrimaryButton
                            onClick={() =>
                                setLevel((prevLevel) => prevLevel - 1)
                            }
                        >
                            Last
                        </PrimaryButton>
                        <PrimaryButton onClick={advanceLevel}>
                            Next
                        </PrimaryButton>
                    </div> */}
                    <div className="p-4 mt-12 bg-accent w-fit m-auto rounded-xl border-4 border-text">
                        {showInbetveen && !gameWon ? (
                            <GameInbetween
                                isStart={level === 0}
                                isPaused={isGamePaused}
                                onComplete={advanceLevel}
                            />
                        ) : (
                            <Game
                                level={level}
                                onComplete={() => {
                                    pauseTimer();
                                    setScore((prevScore) => prevScore + 50);
                                    setCoins((prevCoins) => prevCoins + 100);
                                    if (level === 20) {
                                        setGameWon(true);
                                        return;
                                    }
                                    setShowInbetveen(true);
                                }}
                                isLoss={hasLost}
                                icons={gameIcons}
                                onMatch={() => {
                                    setTimeRemaining(
                                        (prevTime) => prevTime + 5
                                    );
                                    setScore((prevScore) => prevScore + 10);
                                }}
                                onIncorrectMatch={() =>
                                    setScore((prevScore) => prevScore - 5)
                                }
                            />
                        )}
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-full gap-10 flex-col">
                    <div>
                        <h1 className="text-6xl text-center">Memory Game</h1>
                        <p className="text-center">
                            Match cards and get as far as you can!
                        </p>
                    </div>
                    <PrimaryButton
                        className={css.button}
                        onClick={() => {
                            setGameStarted(true);
                        }}
                    >
                        Play
                    </PrimaryButton>
                </div>
            )}
            <Popup isSeen={hasLost} name="lost">
                <h2>Game over :(</h2>
                <Stats {...{ level, score, coins }} />
                <button
                    className={`${css.button} px-4 text-center`}
                    onClick={resetGame}
                >
                    try again
                </button>
            </Popup>
            <Popup isSeen={isGamePaused} name="pause">
                <h2>Game paused</h2>
                <PrimaryButton
                    className={`${css.button} px-4 text-center`}
                    onClick={toggleGamePause}
                >
                    return to game
                </PrimaryButton>
            </Popup>
            <Popup isSeen={gameWon} name="win">
                <h2>You won!</h2>
                <Stats {...{ level, score, coins }} />
                <div className="flex flex-wrap gap-2">
                    <PrimaryButton
                        className={`${css.button} px-4 text-center`}
                        onClick={resetGame}
                    >
                        try again
                    </PrimaryButton>
                    <PrimaryButton className={`${css.button} px-4 text-center`}>
                        <Link href="/stats">Stats</Link>
                    </PrimaryButton>
                </div>
            </Popup>
        </Authenticated>
    );
};

export default Levels;
