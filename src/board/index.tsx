import {useState} from 'react';

import './styles.css';

export const Board = () => {
    const [gameState, setGameState] = useState([
        9, 9, 9, 9, 9, 9, 9, 9, 1, 10, 9, 9, 9, 9, 9, 9, 9, 1, 0, 0,
    ]);
    const [turn, setTurn] = useState<'light' | 'dark'>('light');
    const [bottomNotationValues] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const [topNotationValues] = useState([8, 7, 6, 5, 4, 3, 2, 1, 0]);

    const handleClick = (index: number) => () => {
        const rocks = gameState[index];
        let tempState = [...gameState];

        if (rocks < 1) {
            return;
        }

        if (rocks === 1) {
            if (index === 17) {
                tempState = tempState.map((values, indexLocal) => {
                    if (indexLocal === 0) {
                        return values + 1;
                    } else if (indexLocal === index) {
                        return 0;
                    } else {
                        return values;
                    }
                });
            } else {
                tempState = tempState.map((values, indexLocal) => {
                    if (indexLocal === index) {
                        return 0;
                    } else if (indexLocal === index + 1) {
                        return values + 1;
                    } else {
                        return values;
                    }
                });
            }
        } else {
            let localIndex = index;
            tempState[localIndex] = 0;
            for (let i = 0; i < rocks; i++) {
                if (localIndex > 17) {
                    localIndex = 0;
                }

                tempState[localIndex] = tempState[localIndex] + 1;
                localIndex++;
            }
        }

        setGameState(tempState);

        if (turn === 'light') {
            setTurn('dark');
        } else {
            setTurn('light');
        }
    };

    console.log(turn);

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
                            <div
                                className="otau"
                                key={recalculatedIndex}
                                onClick={
                                    turn === 'dark' ? handleClick(recalculatedIndex) : undefined
                                }
                            >
                                {gameState[recalculatedIndex]}
                            </div>
                        );
                    })}
                </div>
                <div className="rocks">
                    {bottomNotationValues.map((index) => {
                        const recalculatedIndex = index;
                        return (
                            <div
                                className="otau"
                                key={recalculatedIndex}
                                onClick={
                                    turn === 'light' ? handleClick(recalculatedIndex) : undefined
                                }
                            >
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
