type BoardState = number[];
type Turn = 'light' | 'dark';

const lightNotationValues = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const darkNotationValues = [17, 16, 15, 14, 13, 12, 11, 10, 9];

const evaluate = (boardState: BoardState) => {
    return boardState[19] - boardState[18];
};

const makeMove = (boardState: BoardState, turn: Turn, index: number) => {
    // console.log('makeMove inputs', {boardState, turn, index});
    const rocks = boardState[index];
    let tempState = [...boardState];
    let localIndex = index;

    if (rocks < 1) {
        return tempState;
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

    return tempState;
};

// Возвращает доступные ходы для стороны (игрок или компьютер)
const getAvailableMoves = (boardState: BoardState, turn: Turn) => {
    const currentSide = turn === 'light' ? boardState.slice(0, 9) : boardState.slice(9, 18);
    return (
        currentSide
            // eslint-disable-next-line no-nested-ternary
            .map((stones, index) => (stones > 0 ? (turn === 'light' ? index : index + 9) : -1))
            .filter((index) => index !== -1)
    );
};

// Проверяет, завершена ли игра (все лунки пусты)
function isGameOver(boardState: BoardState) {
    return (
        boardState.slice(0, 9).every((stones) => stones === 0) &&
        boardState.slice(9, 18).every((stones) => stones === 0)
    );
}

export const alphaBeta = (
    board: number[],
    depth: number,
    alpha: number,
    beta: number,
    maximizingPlayer: boolean,
) => {
    // Если достигнута максимальная глубина или игра окончена, возвращаем оценку
    if (depth === 0 || isGameOver(board)) {
        return evaluate(board);
    }

    if (maximizingPlayer) {
        let maxEval = -Infinity;
        const availableMoves = getAvailableMoves(board, 'dark');

        for (const move of availableMoves) {
            const newBoard = makeMove([...board], 'dark', move); // Создаём копию доски и делаем ход
            // console.log({maximizingPlayer, board, newBoard});
            const evaluation = alphaBeta(newBoard, depth - 1, alpha, beta, false);
            maxEval = Math.max(maxEval, evaluation);
            // eslint-disable-next-line no-param-reassign
            alpha = Math.max(alpha, evaluation);

            if (beta <= alpha) {
                break; // Отсечение
            }
        }

        return maxEval;
    } else {
        let minEval = Infinity;
        const availableMoves = getAvailableMoves(board, 'light');

        for (const move of availableMoves) {
            const newBoard = makeMove([...board], 'light', move); // Создаём копию доски и делаем ход
            // console.log({maximizingPlayer, board, newBoard});
            const evaluation = alphaBeta(newBoard, depth - 1, alpha, beta, true);
            minEval = Math.min(minEval, evaluation);
            // eslint-disable-next-line no-param-reassign
            beta = Math.min(beta, evaluation);

            if (beta <= alpha) {
                break; // Отсечение
            }
        }

        return minEval;
    }
};

export const findBestMove = (boardState: BoardState, depth: number) => {
    let bestMove = -1;
    let bestEval = -Infinity;
    const availableMoves = getAvailableMoves(boardState, 'dark');
    // console.log({availableMoves}, depth);

    for (const move of availableMoves) {
        const newBoard = makeMove([...boardState], 'dark', move); // Создаём копию доски и делаем ход
        const evaluation = alphaBeta(newBoard, depth - 1, -Infinity, Infinity, false);
        // console.log({evaluation, move});
        if (evaluation > bestEval) {
            bestEval = evaluation;
            bestMove = move;
        }
    }

    return bestMove;
};
