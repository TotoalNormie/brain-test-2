import { useState, useEffect } from "react";
import css from "./game.module.css";
import Card from "./Card";
import { getCards } from "@/selectCards";

const shuffle = (array) => {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};

export const randomArray = (count, maxLength) => {
    const array = [];
    while (array.length < count) {
        const randomNumber = Math.floor(Math.random() * maxLength) + 1;
        if (!array.includes(randomNumber)) {
            array.push(randomNumber);
        }
    }
    return array;
};

const getIcons = (level, icons) => {
    const baseCount = Math.ceil((level / 20) * 15);
    const count = Math.max(baseCount, 2);
    return icons
        .slice(0, count)
        .map((number) => (
            <img
                className={css.cardImage}
                key={number}
                src={`./icons/${getCards()}/icon-${number}.png`}
            />
        ));
};
const separateRows = (array) => {
    console.log("length", array.length);
    let columnCount;
    if (array.length == 28) {
        columnCount = 5;
    } else if (array.length % 4 === 0 || array.length % 7 === 0) {
        columnCount = Math.ceil(Math.sqrt(array.length));
    } else {
        columnCount = Math.floor(Math.sqrt(array.length));
    }
    const rows = [];

    for (let i = 0; i < array.length; i += columnCount) {
        rows.push(array.slice(i, i + columnCount));
    }

    if (rows.length % 2 === 0) {
        return rows;
    }

    const shortArray = rows.pop();
    const topArray = shortArray.slice(0, Math.ceil(shortArray.length / 2));
    const bottomArray = shortArray.slice(Math.ceil(shortArray.length / 2));

    rows.unshift(topArray);
    rows.push(bottomArray);

    return rows;
};

const Game = ({
    level,
    onComplete,
    isLoss,
    onMatch,
    onIncorrectMatch,
    icons,
}) => {
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [gameBoard, setGameBoard] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [lost, setLost] = useState(false);

    const startGame = () => {
        const gameIcons = getIcons(level, icons);
        const cards = [];

        let i = 1;
        gameIcons.forEach((icon) => {
            cards.push({ id: i, icon: icon });
            i++;
            cards.push({ id: i, icon: icon });
            i++;
        });

        const shuffledBoard = shuffle(cards);
        setGameBoard(shuffledBoard);
    };

    useEffect(() => {
        setLost(isLoss);
        if (isLoss) {
            setFlippedCards([]);
            setMatchedCards([]);
        }
    }, [isLoss]);

    const quickShow = () => {
        if (gameBoard.length === 0) return;
        const timeout = 200;

        setTimeout(() => {
            setShowAll(true);
        }, timeout);
        setTimeout(() => {
            setShowAll(false);
            // console.log(gameBoard, gameBoard.length);
        }, Math.ceil(timeout * 2 + 120 * 1.15 ** gameBoard.length));

        console.log(
            "timeout: ",
            Math.ceil(timeout * 2 + 120 * 1.15 ** gameBoard.length)
        );
        // console.log('timeout old: ', timeout * 2 + 100 * gameBoard.length);
    };

    useEffect(() => {
        const timeout = 0;
        setTimeout(() => {
            startGame();
            // quickShow();
        }, timeout);

        return () => {
            setMatchedCards([]);
        };
    }, [level]);

    useEffect(quickShow, [gameBoard]);

    useEffect(() => {
        if (flippedCards.length >= 2) {
            const [id1, id2] = flippedCards;
            const card1 = gameBoard.filter((card) => card.id === id1).pop();
            const card2 = gameBoard.filter((card) => card.id === id2).pop();
            if (card1?.icon === card2?.icon) {
                setMatchedCards((prevMatchedCards) => [
                    ...prevMatchedCards,
                    id1,
                    id2,
                ]);
                setFlippedCards([]);
                onMatch();
                return;
            }
            onIncorrectMatch();

            setTimeout(() => {
                setFlippedCards([]);
            }, 400);
        }
    }, [flippedCards]);

    useEffect(() => {
        if (matchedCards.length === gameBoard.length && gameBoard.length > 0) {
            setTimeout(() => {
                onComplete();
            }, 1200);
        }
    }, [matchedCards]);

    const flipCard = (id) => {
        if (lost) return;
        if (flippedCards.length >= 2) return;
        setFlippedCards((prevFlippedCards) => [...prevFlippedCards, id]);
    };

    const rows = separateRows(gameBoard);
    if (!level) return "no level selected";
    return (
        <>
            {/* <button onClick={onComplete}>Complete</button> */}
            <div className={css.gameGrid}>
                {rows?.map((row, i) => (
                    <div className={css.gameRow} key={i}>
                        {row.map((elem) => (
                            <Card
                                {...elem}
                                onClick={flipCard}
                                key={elem.id}
                                isFlipped={
                                    flippedCards.includes(elem.id) || showAll
                                }
                                isMatched={matchedCards.includes(elem.id)}
                                popout={matchedCards.length == gameBoard.length}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Game;
