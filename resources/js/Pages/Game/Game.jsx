import { useState, useEffect } from "react";
import css from "./game.module.css";
import Card from "./Card";

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

const randomArray = (count, maxLength) => {
    const array = [];
    while (array.length < count) {
        const randomNumber = Math.floor(Math.random() * maxLength) + 1;
        if (!array.includes(randomNumber)) {
            array.push(randomNumber);
        }
    }
    return array;
};

const getIcons = (level) => {
    const count = level === 1 ? 2 : 2 + Math.ceil(level / 2);
    const numbers = randomArray(count, 10);
    return numbers.map((number) => (
        <img
            className={css.cardImage}
            key={number}
            src={`./icons/programming/icon-${number}.png`}
        />
    ));
};
const separateRows = (array) => {
    const columnCount =
        array.length % 4 === 0 || array.length % 7 === 0
            ? Math.ceil(Math.sqrt(array.length))
            : Math.floor(Math.sqrt(array.length));
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

const Game = ({ currentLevel, onComplete, onLoss, isLoss, onMatch }) => {
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [gameBoard, setGameBoard] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [level, setLevel] = useState(currentLevel);
    const [lost, setLost] = useState(false);

    const startGame = () => {
        const gameIcons = getIcons(level);
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
        if(isLoss) {
            setFlippedCards([]);
            setMatchedCards([]);
        }
    }, [isLoss]);

    const quickShow = () => {
        setTimeout(() => {
            setShowAll(true);
        }, 200);
        setTimeout(() => {
            setShowAll(false);
            console.log(gameBoard, gameBoard.length);
        }, 400 + 30 * (gameBoard.length > 0 ? gameBoard.length : 4));
    };

    useEffect(() => {
        setLevel(currentLevel);
        const timeout = currentLevel === 1 ? 0 : 400;
        setTimeout(() => {
            startGame();
            quickShow();
        }, timeout);

        return () => {
            setMatchedCards([]);
        };
    }, [currentLevel]);

    useEffect(() => {
        // console.log(flippedCards);

        if (flippedCards.length >= 2) {
            const [id1, id2] = flippedCards;
            const card1 = gameBoard.filter((card) => card.id === id1).pop();
            const card2 = gameBoard.filter((card) => card.id === id2).pop();
            // console.log("cards: ", card1, card2);
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
            // console.log("should work");

            setTimeout(() => {
                // console.log("works");
                setFlippedCards([]);
            }, 400);
        }
    }, [flippedCards]);

    useEffect(() => {
        console.log("matchedCards: ", matchedCards, "game board", gameBoard);
        if (matchedCards.length === gameBoard.length && gameBoard.length > 0) {
            setTimeout(() => {
                onComplete();
            }, 1000);
        }
    }, [matchedCards]);

    const flipCard = (id) => {
        // console.log('works', flippedCards)
        if (lost) return;
        if (flippedCards.length >= 2) return;

        // console.log(id, flippedCards, matchedCards, gameBoard)

        setFlippedCards((prevFlippedCards) => [...prevFlippedCards, id]);
    };

    const rows = separateRows(gameBoard);
    // console.log(rows);
    if (!level) return "no level selected";
    return (
        <>
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
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Game;
