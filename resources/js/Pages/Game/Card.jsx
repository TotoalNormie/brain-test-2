import css from "./game.module.css";

const Card = ({ id, onClick, isMatched, isFlipped, icon, popout}) => {
    const handleClick = () => {
        if (isMatched || isFlipped) return;
        onClick(id);
    };
    return (
        <div key={id} onClick={() => handleClick()} className={css.scene}>
            <div className={`${css.card} ${isFlipped || isMatched ? css.flipped : ''}`}>
                <div className={`${css.cardFace} ${css.front}`}></div>
                <div className={`${css.cardFace} ${css.back} ${isMatched ? css.matched : ''} ${popout ? css.popout : ''}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default Card;
