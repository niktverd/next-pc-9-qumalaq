import {useState} from 'react';

import './styles.css';

export const Board = () => {
    const [gameState, _setGameState] = useState([
        9, 9, 9, 9, 9, 9, 9, 8, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0,
    ]);
    const [bottomNotationValues] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const [topNotationValues] = useState([8, 7, 6, 5, 4, 3, 2, 1, 0]);

    return (
        <div className="container">
            <div className="kazan">{gameState[19]}</div>
            <div className="otaus">
                <div className="notations">
                    {topNotationValues.map((index) => (
                        <div className="notation" key={index}>
                            {index + 1}
                        </div>
                    ))}
                </div>
                <div className="rocks">
                    {topNotationValues.map((index) => {
                        const recalculatedIndex = index + 9;
                        return (
                            <div className="otau" key={recalculatedIndex}>
                                {gameState[recalculatedIndex]}
                            </div>
                        );
                    })}
                </div>
                <div className="rocks">
                    {bottomNotationValues.map((index) => {
                        const recalculatedIndex = index;
                        return (
                            <div className="otau" key={recalculatedIndex}>
                                {gameState[recalculatedIndex]}
                            </div>
                        );
                    })}
                </div>
                <div className="notations">
                    {bottomNotationValues.map((index) => (
                        <div className="notation" key={index}>
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>
            <div className="kazan">{gameState[18]}</div>
        </div>
    );
};
