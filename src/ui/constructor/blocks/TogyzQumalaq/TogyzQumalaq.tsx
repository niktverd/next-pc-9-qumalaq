import React from 'react';
import {block} from '../../../utils/cn';

import {Title} from '@gravity-ui/page-constructor';

import './TogyzQumalaq.scss';
import {Button} from '@gravity-ui/uikit';
import {Board} from 'src/board';

import {TogyzQumalaq as TQ} from '../../../../game/togyz-qumalak';
import {Side} from 'src/game/types';

export interface TogyzQumalaqProps {
    title: string;
    text: string;
}

const b = block('togyz-qumalaq-block');

// const tq = new TQ({side: Side.A, tqn: '8,9,9,9,9,9,9,9,9/9,9,9,9,9,9,9,9,9 a b6-0 12-0'});
const tq = new TQ({side: Side.A});
// console.log(tq.tqn());
tq.move('a2');
// console.log(tq.tqn());
tq.move('b3');
// console.log(tq.tqn());

const TogyzQumalaq: React.FC<TogyzQumalaqProps> = ({title, text}) => (
    <div>
        <Title className={b()} title={title} subtitle={text} />
        <Button
            onClick={async () => {
                const response = await fetch('/api/9-qumalaq');
                const responseText = await response.text();
                alert(responseText);
            }}
        >
            API Call
        </Button>
        <div></div>
        <Board />
    </div>
);

export default TogyzQumalaq;
