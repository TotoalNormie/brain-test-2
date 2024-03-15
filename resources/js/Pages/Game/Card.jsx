import css from "./game.module.css";
console.log(css);
const Card = ({ id, onClick, isMatched, isFlipped, icon }) => {
    // console.log(isFlipped, id);
    // if (isMatched) console.log("matched", { id, icon });
    const handleClick = () => {
        if (isMatched || isFlipped) return;
        onClick(id);
    };
    return (
        <div key={id} onClick={() => handleClick()} className={css.scene}>
            <div className={`${css.card} ${isFlipped || isMatched ? css.flipped : ""}`}>
                <div className={`${css.cardFace} ${css.front}`}></div>
                <div className={`${css.cardFace} ${css.back} ${isMatched ? css.matched : ''}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default Card;
