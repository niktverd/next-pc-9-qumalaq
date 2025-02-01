import {Side, NewGameConstructor, Altybakan, OtauName, Otau} from './types';

type TuzdyksType = {a: OtauName | null; b: OtauName | null};

export class TogyzQumalaq {
    private side: Side;
    private turn: Side;
    private altybakan: Altybakan;
    private tuzdyks: TuzdyksType;
    private kazans: {a: number; b: number};

    constructor({side, tqn}: NewGameConstructor) {
        const uy = new Array(9).fill(9);
        this.altybakan = this.createBoard([...uy], [...uy]);
        this.side = side;
        this.turn = Side.A;
        this.tuzdyks = {a: null, b: null};
        this.kazans = {a: 0, b: 0};

        if (tqn) {
            this.update(tqn);
        }
    }

    getMySide() {
        return this.side;
    }

    update(tqn: string) {
        const [boardStr, side, tuzdyksStr, kazanStr] = tqn.split(' ');
        const [aSide, bSide] = boardStr.split('/');

        const aBoard = aSide.split(',').map(Number);
        const bBoard = bSide.split(',').map(Number);

        this.altybakan = this.createBoard(aBoard, bBoard);
        this.turn = side as Side;
        this.tuzdyks = this.parseTuzdyks(tuzdyksStr);
        this.kazans = this.parseKazan(kazanStr);
    }

    tqn(): string {
        const aBoard = Array.from(
            {length: 9},
            (_, i) => this.altybakan[`a${i + 1}` as keyof Altybakan],
        ).join(',');
        const bBoard = Array.from(
            {length: 9},
            (_, i) => this.altybakan[`b${i + 1}` as keyof Altybakan],
        ).join(',');
        const boardStr = `${aBoard}/${bBoard}`;

        const tuzdyksStr = `${this.tuzdyks.a || 0}-${this.tuzdyks.b || 0}`;

        const kazanStr = `${this.kazans.a}-${this.kazans.b}`;

        return `${boardStr} ${this.turn} ${tuzdyksStr} ${kazanStr}`;
    }

    // Метод для выполнения хода
    move(cell: OtauName): void {
        const {player, hole} = this.getOtauInfo(cell);
        let kumalaks = this.altybakan[cell];

        if (player !== this.turn) {
            throw new Error('Не ваш ход!');
        }

        if (kumalaks === 0) {
            throw new Error('Лунка пуста!');
        }

        if (kumalaks === 'tuzdyk') {
            throw new Error('Нельзя ходить! Туздык');
        }

        kumalaks--;
        this.altybakan[cell] = 1;

        let currentPlayer = player;
        let currentHole = hole;

        while (kumalaks > 0) {
            currentHole++;
            if (currentHole >= 9) {
                currentHole = 0;
                currentPlayer = this.switchPlayer(currentPlayer);
            }

            const currentCell = `${currentPlayer}${currentHole + 1}` as OtauName;
            let otauVal = this.altybakan[currentCell];
            // Если лунка является туздыком, пропускаем её
            if (otauVal === 'tuzdyk') {
                const selectedKazan = currentCell[0] as Side;
                this.kazans[selectedKazan] = this.kazans[selectedKazan] + 1;
                kumalaks--;
                continue;
            }

            if (typeof otauVal === 'number' && currentCell !== cell) {
                // Пропускаем начальную лунку
                this.altybakan[currentCell] = otauVal++;
                kumalaks--;
            }
        }

        const nextOtau = `${currentPlayer}${currentHole + 1}` as OtauName;
        const nextOtauVal = this.altybakan[nextOtau];
        // Проверка на захват камней
        if (typeof nextOtauVal === 'number' && currentPlayer !== player && nextOtauVal % 2 === 0) {
            this.kazans[player] += nextOtauVal;
            this.altybakan[nextOtau] = 0;
        }

        // Переключение текущего игрока
        this.turn = this.switchPlayer(this.turn);
    }

    // Метод для получения доступных ходов
    availableMoves(): string[] {
        const moves: string[] = [];
        for (let i = 1; i <= 9; i++) {
            const cell = `${this.turn}${i}` as OtauName;
            if (typeof this.altybakan[cell] === 'number' && this.altybakan[cell] > 0) {
                moves.push(cell);
            }
        }
        return moves;
    }

    private createBoard(aUyi: Otau[], bUyi: Otau[]): Altybakan {
        const altybakan: Partial<Altybakan> = {};

        for (let i = 0; i < 9; i++) {
            altybakan[`a${i + 1}` as keyof Altybakan] = aUyi[i];
            altybakan[`b${i + 1}` as keyof Altybakan] = bUyi[i];
        }

        return altybakan as Altybakan;
    }

    private parseTuzdyks(tuzdyksStr: string): TuzdyksType {
        const [a, b] = tuzdyksStr.split('-') as (OtauName | '0')[];

        return {
            a: a === '0' ? null : a,
            b: b === '0' ? null : b,
        };
    }

    private parseKazan(kazanStr: string): {a: number; b: number} {
        const [a, b] = kazanStr.split('-').map(Number);

        return {a, b};
    }

    // Вспомогательный метод для переключения игрока
    private switchPlayer(turn: Side): Side {
        return turn === Side.A ? Side.B : Side.A;
    }

    // Вспомогательный метод для получения информации о ячейке
    private getOtauInfo(otau: string): {player: Side; hole: number} {
        const player = otau[0] as Side;
        const hole = parseInt(otau.slice(1), 10) - 1;
        return {player, hole};
    }
}
