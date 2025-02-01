export enum Side {
    A = 'a',
    B = 'b',
}

export type OtauName =
    | 'a1'
    | 'a2'
    | 'a3'
    | 'a4'
    | 'a5'
    | 'a6'
    | 'a7'
    | 'a8'
    | 'a9'
    | 'b1'
    | 'b2'
    | 'b3'
    | 'b4'
    | 'b5'
    | 'b6'
    | 'b7'
    | 'b8'
    | 'b9';

export type NewGameConstructor = {
    side: Side;
    board?: number[];
    tqn?: string;
};

export type Tuzdyk = 'tuzdyk';

export type Otau = number | Tuzdyk;

export type Altybakan = Record<OtauName, Otau>;
