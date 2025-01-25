import {useRef, useState} from 'react';

import {findBestMove} from './engine';
import './styles.css';
import Hand from './Hand/Hand';

export const Board = () => {
    const [gameState, setGameState] = useState([
        9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0,
    ]);
    const [turn, setTurn] = useState<'light' | 'dark'>('light');
    const [lightNotationValues] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const [darkNotationValues] = useState([17, 16, 15, 14, 13, 12, 11, 10, 9]);
    const [highlightComputerMove, setHighlightComputerMove] = useState(-1);
    const [rocksOnHand, setRocksOnHand] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [availablePlaces, setAvailablePlaces] = useState<number[]>([]);
    const [dif, setDif] = useState<Record<number, 1>>({});
    const [tempGameState, setTempGameState] = useState<number[]>([]);

    const handleClick = (index: number) => {
        const rocks = gameState[index];
        let tempState = [...gameState];
        let localIndex = index;
        const localAvailablePlaces = [];

        setRocksOnHand(rocks);

        if (rocks < 1) {
            return;
        }

        if (rocks === 1) {
            if (index === 17) {
                tempState = tempState.map((values, indexLocal) => {
                    if (indexLocal === 0) {
                        localAvailablePlaces.push(indexLocal);
                        return values + 1;
                    } else if (indexLocal === index) {
                        localAvailablePlaces.push(indexLocal);
                        return 0;
                    } else {
                        return values;
                    }
                });
            } else {
                tempState = tempState.map((values, indexLocal) => {
                    if (indexLocal === index) {
                        localAvailablePlaces.push(indexLocal);
                        return 0;
                    } else if (indexLocal === index + 1) {
                        localAvailablePlaces.push(indexLocal);
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
                localAvailablePlaces.push(localIndex);
                localIndex++;
            }
            localIndex--;
        }

        if (localIndex > 17) {
            localAvailablePlaces.push(localIndex);
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

        setAvailablePlaces(localAvailablePlaces);
        setTempGameState(tempState);
    };

    const updateGameState = () => {
        setGameState(tempGameState);
        setAvailablePlaces([]);
        setDif({});

        if (turn === 'light') {
            setTurn('dark');
            setHighlightComputerMove(findBestMove(tempGameState, 5));
        } else {
            setTurn('light');
            // setHighlightHumanMove(findBestMove(tempState, 3));
        }
    };

    const putRock = (index: number) => {
        setDif((prev) => ({...prev, [index]: 1}));
        setAvailablePlaces((prev) => prev.filter((item) => item !== index));

        if (rocksOnHand === 1) {
            updateGameState();
        }

        setRocksOnHand((prev) => prev - 1);
    };

    const pickUpRock = (index: number) => {
        setDif((prev) => {
            delete prev[index];

            return prev;
        });
        setAvailablePlaces((prev) => [...prev, index]);
        setRocksOnHand((prev) => prev + 1);
    };

    const onClickOtau = (color: 'light' | 'dark', index: number) => () => {
        if (availablePlaces.includes(index)) {
            return putRock(index);
        }

        if (dif[index]) {
            return pickUpRock(index);
        }

        return turn === color ? handleClick(index) : undefined;
    };

    const getOtauState = (index: number) => {
        const hasNewRock = Boolean(dif[index]);

        return gameState[index] + (hasNewRock ? 1 : 0);
    };

    return (
        <div ref={containerRef}>
            <Hand rocksOnHand={rocksOnHand} containerRef={containerRef} />
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
                                    className={`otau ${
                                        highlightComputerMove === index ? 'red' : ''
                                    } ${availablePlaces.includes(index) ? 'green' : ''}`}
                                    key={index}
                                    onClick={onClickOtau('dark', index)}
                                >
                                    {getOtauState(index)}
                                </div>
                            );
                        })}
                    </div>
                    <div className="rocks">
                        {lightNotationValues.map((index) => {
                            return (
                                <div
                                    className={`otau ${
                                        highlightComputerMove === index ? 'blue' : ''
                                    } ${availablePlaces.includes(index) ? 'green' : ''}`}
                                    key={index}
                                    onClick={onClickOtau('light', index)}
                                >
                                    {getOtauState(index)}
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
        </div>
    );
};
