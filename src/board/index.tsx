import {useState} from 'react';

import {findBestMove} from './engine';
import './styles.css';

export const Board = () => {
    const [gameState, setGameState] = useState([
        9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0,
    ]);
    const [turn, setTurn] = useState<'light' | 'dark'>('light');
    const [lightNotationValues] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const [darkNotationValues] = useState([17, 16, 15, 14, 13, 12, 11, 10, 9]);
    const [highlightComputerMove, setHighlightComputerMove] = useState(-1);

    const handleClick = (index: number) => () => {
        const rocks = gameState[index];
        let tempState = [...gameState];
        let localIndex = index;

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
            localIndex++;
        } else {
            tempState[localIndex] = 0;
            for (let i = 0; i < rocks; i++) {
                if (localIndex > 17) {
                    localIndex = 0;
                }

                tempState[localIndex] = tempState[localIndex] + 1;
                localIndex++;
            }
            localIndex--;
        }

        if (localIndex > 17) {
            localIndex = 0;
        }

        if (turn === 'light') {
            if (darkNotationValues.includes(localIndex) && tempState[localIndex] % 2 === 0) {
                tempState[18] = tempState[18] + tempState[localIndex];
                tempState[localIndex] = 0;
            }
        } else if (lightNotationValues.includes(localIndex) && tempState[localIndex] % 2 === 0) {
            tempState[19] = tempState[19] + tempState[localIndex];
            tempState[localIndex] = 0;
        }

        setGameState(tempState);

        if (turn === 'light') {
            setTurn('dark');
            setHighlightComputerMove(findBestMove(tempState, 5));
        } else {
            setTurn('light');
            // setHighlightHumanMove(findBestMove(tempState, 3));
        }
    };

    return (
        <div className="container">
            <div className="kazan">{gameState[19]}</div>
            <div className="otaus">
                <div className="notations">
                    {darkNotationValues.map((index) => (
                        <div className="notation" key={index}>
                            {index - 8}
                        </div>
                    ))}
                </div>
                <div className="rocks">
                    {darkNotationValues.map((index) => {
                        return (
                            <div
                                className={`otau ${highlightComputerMove === index ? 'red' : ''}`}
                                key={index}
                                onClick={turn === 'dark' ? handleClick(index) : undefined}
                            >
                                {gameState[index]}
                            </div>
                        );
                    })}
                </div>
                <div className="rocks">
                    {lightNotationValues.map((index) => {
                        return (
                            <div
                                className={`otau ${highlightComputerMove === index ? 'blue' : ''}`}
                                key={index}
                                onClick={turn === 'light' ? handleClick(index) : undefined}
                            >
                                {gameState[index]}
                            </div>
                        );
                    })}
                </div>
                <div className="notations">
                    {lightNotationValues.map((index) => (
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
