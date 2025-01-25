import React from 'react';
import {block} from '../../../utils/cn';

import {Title} from '@gravity-ui/page-constructor';

import './TogyzQumalaq.scss';
import {Button} from '@gravity-ui/uikit';
import {Board} from 'src/board';

export interface TogyzQumalaqProps {
    title: string;
    text: string;
}

const b = block('togyz-qumalaq-block');

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
        <Board />
    </div>
);

export default TogyzQumalaq;
