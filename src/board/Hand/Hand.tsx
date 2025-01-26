import {RefObject, useEffect, useMemo, useRef, useState} from 'react';
import './styles.css';

type Props = {
    rocksOnHand: number;
    containerRef: RefObject<HTMLDivElement>;
};

const OpenedHand = () => (
    <svg viewBox="-44 0 512 512.0001" xmlns="http://www.w3.org/2000/svg">
        <path d="m230.238281 460.800781h8.53125c4.714844 0 8.535157-3.820312 8.535157-8.535156 0-4.710937-3.820313-8.53125-8.535157-8.53125h-8.53125c-4.714843 0-8.535156 3.820313-8.535156 8.53125 0 4.714844 3.820313 8.535156 8.535156 8.535156zm0 0" />
        <path d="m136.371094 460.800781h59.734375c4.710937 0 8.53125-3.820312 8.53125-8.535156 0-4.710937-3.820313-8.53125-8.53125-8.53125h-59.734375c-4.710938 0-8.535156 3.820313-8.535156 8.53125 0 4.714844 3.824218 8.535156 8.535156 8.535156zm0 0" />
        <path d="m77.175781 409.464844c3.835938 10.246094 8.945313 19.96875 15.207031 28.945312.90625 1.40625 1.367188 3.054688 1.320313 4.726563v43.261719c0 14.140624 11.460937 25.601562 25.601563 25.601562h136.53125c14.140624 0 25.601562-11.460938 25.601562-25.601562v-3.15625c0-16.035157.769531-31.445313 10-43.902344 3.402344-4.347656 7.164062-8.398438 11.25-12.109375 28.253906-26.949219 44.167969-61.570313 59.535156-95.042969 14.882813-32.359375 28.917969-62.925781 53.214844-87.222656 8.589844-7.296875 11.683594-19.199219 7.730469-29.753906-5.671875-11.800782-17.707031-19.203126-30.796875-18.945313-23.328125 0-60.585938 41.378906-75.367188 63.53125-4.914062 7.453125-10.640625 14.34375-17.066406 20.539063-2.011719 1.902343-4.085938 3.730468-6.230469 5.453124-2.140625 1.726563-3.957031 2.996094-5.253906 3.839844-1.460937-.675781-2.722656-1.714844-3.671875-3.011718-2.824219-3.695313-6.867188-13.480469-2.335938-37.46875l40.71875-174.242188c3.226563-12.039062-.367187-24.875-9.367187-33.488281-9.003906-8.617188-21.984375-11.644531-33.867187-7.894531-11.886719 3.746093-20.78125 13.671874-23.214844 25.894531l-26.476563 113.894531v-137.769531c.386719-18.574219-13.855469-34.1875-32.382812-35.5000002-9.347657-.4687498-18.472657 2.9218752-25.25 9.3750002-6.773438 6.449219-10.601563 15.402343-10.589844 24.757812v195.472657l-25.730469-167.191407c-3.140625-18.332031-20.378906-30.769531-38.761718-27.980469-18.386719 2.789063-31.15625 19.78125-28.71875 38.21875l27.910156 184.644532-30.523438-89.164063v-.136719c-3.09375-8.964843-9.777344-16.238281-18.453125-20.078124-8.671875-3.835938-18.550781-3.894532-27.265625-.15625-16.605468 7.636718-24.589844 26.722656-18.363281 43.90625zm-49.996093-245.976563c4.539062-1.9375 9.695312-1.828125 14.148437.300781 4.027344 2.015626 7.128906 5.496094 8.675781 9.726563v.105469l30.535156 89.207031c2.234376 6.910156 8.675782 11.589844 15.9375 11.578125 1.4375-.003906 2.871094-.179688 4.269532-.519531 8.652344-1.992188 14.261718-10.375 12.796875-19.132813l-27.902344-184.609375c-1.414063-9.324219 4.996094-18.027343 14.320313-19.4375 9.320312-1.414062 18.023437 4.996094 19.4375 14.316407l25.703124 167.195312c1.347657 8.816406 9.257813 15.109375 18.152344 14.4375 8.894532-.671875 15.773438-8.078125 15.785156-17v-195.523438c-.023437-4.683593 1.894532-9.164062 5.296876-12.382812 3.402343-3.226562 7.980468-4.921875 12.664062-4.683594 9.40625.957032 16.476562 9.007813 16.214844 18.457032v193.535156c.007812 5.414062 4.070312 9.960937 9.449218 10.578125 5.378907.617187 10.367188-2.890625 11.601563-8.160157l39.089844-168.175781c1.03125-4.441406 3.796875-8.285156 7.679687-10.675781 5.867188-3.628906 13.335938-3.371094 18.9375.652344 5.601563 4.023437 8.230469 11.023437 6.664063 17.738281l-40.789063 174.503906v.179688c0 .0625-.058594.113281-.070312.171875-4.554688 24.003906-2.457032 41.496094 6.238281 52.054687.1875.210938.375.367188.566406.570313-3.78125 1.425781-7.683593 2.621094-11.726562 3.832031-12.992188 3.425781-24.246094 11.558594-31.574219 22.816406-4.804688 7.363281-7.433594 15.933594-7.578125 24.722657 0 4.710937 3.820313 8.53125 8.535156 8.53125 4.710938 0 8.53125-3.820313 8.53125-8.53125.132813-5.578126 1.832031-11.003907 4.910157-15.660157 5.132812-7.765625 12.992187-13.324219 22.023437-15.582031 9.078125-2.335938 17.808594-5.859375 25.964844-10.476562 3.21875-1.957032 6.300781-4.175782 9.335937-6.445313l.1875-.136719c1.160156-.851562 2.296875-1.757812 3.414063-2.667968 2.21875-1.777344 4.617187-3.824219 7.261719-6.367188.476562-.445312 1.007812-.851562 1.476562-1.289062.175781-.226563.335938-.464844.488281-.707032 6.472657-6.496094 12.285157-13.621094 17.355469-21.265625 18.140625-27.1875 49.578125-55.9375 61.183594-55.9375 6.1875-.1875 11.972656 3.042969 15.0625 8.40625 1.390625 3.34375 0 7.101563-4.027344 11.160157-26.453125 26.457031-41.816406 59.855468-56.644531 92.160156-15.359375 33.496094-29.925781 65.128906-55.816407 89.824218-4.808593 4.378907-9.234374 9.160157-13.226562 14.292969-12.316406 16.621094-13.347656 35.839844-13.347656 54.066407v3.15625c0 4.714843-3.820313 8.535156-8.535156 8.535156h-136.53125c-4.714844 0-8.535157-3.820313-8.535157-8.535156v-43.261719c.054688-5.125-1.453125-10.140625-4.316406-14.386719-5.367187-7.703125-9.769531-16.035156-13.117187-24.808594l-75.089844-217.753906c-3.257813-8.734375.59375-18.523438 8.933594-22.699219zm0 0" />
    </svg>
);

const ClosedHand = () => (
    <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 368.001 368.001"
        // style="enable-background:new 0 0 368.001 368.001;"
        xmlSpace="preserve"
    >
        <g>
            <g>
                <path d="M144.073,336.001h-16c-4.418,0-8,3.582-8,8s3.582,8,8,8h16c4.418,0,8-3.582,8-8S148.492,336.001,144.073,336.001z" />
            </g>
        </g>
        <g>
            <g>
                <path d="M85.673,144.001c-4.267-0.005-7.787,3.339-8,7.6l-0.8,16c-0.005,4.267,3.339,7.787,7.6,8h0.4c4.418,0,8-3.582,8-8l0.8-16 C93.46,147.34,89.94,143.996,85.673,144.001z" />
            </g>
        </g>
        <g>
            <g>
                <path d="M299.753,290.641v-32.8c-0.028-6.014,0.698-12.007,2.16-17.84l6.88-27.44c4.711-18.814,6.118-38.304,4.16-57.6l-8.88-80.4 c-2.779-24.365-23.477-42.718-48-42.56h-4.32c-0.959,0.017-1.908,0.207-2.8,0.56c-7.436-10.284-19.31-16.429-32-16.56h-5.2 c-3.57-0.004-7.095,0.789-10.32,2.32c-7.316-11.345-19.861-18.234-33.36-18.32h-4.32c-12.046-0.119-22.314,8.712-24,20.64 c-4.83-2.932-10.351-4.533-16-4.64h-1.6c-21.333-0.027-38.933,16.693-40,38l-1.04,20.32l-2.88-0.72 c-8.108-1.626-16.119,3.195-18.48,11.12l-17.44,58.08c-3.41,11.308-3.158,23.404,0.72,34.56l9.84,28.24 c7.25,20.953,21.05,39.017,39.36,51.52l10.48,6.88c4.355,2.982,6.96,7.921,6.96,13.2v16c-14.24,7.52-21.6,21.6-21.6,42.8v24 c0,4.418,3.582,8,8,8s8-3.582,8-8v-24c0-23.04,8.96-32,32-32h144c24,0,32,8,32,32h-136c-4.418,0-8,3.582-8,8s3.582,8,8,8h136v8 c0,4.418,3.582,8,8,8s8-3.582,8-8v-24C328.073,311.201,318.713,296.001,299.753,290.641z M293.513,209.121l-6.88,27.44 c-1.751,6.985-2.637,14.159-2.64,21.36v30.08c-1.28,0-2.32,0-3.68,0h-144.24c-3.505,0.006-7.007,0.246-10.48,0.72v-11.44 c0.064-10.455-4.984-20.282-13.52-26.32l-10.24-7.04c-15.686-10.607-27.505-26.019-33.68-43.92l-9.84-28.24 c-2.775-7.95-2.971-16.572-0.56-24.64l18.16-58c1.522,0.32,3.019,0.747,4.48,1.28l-1.92,37.6c-0.005,4.267,3.339,7.787,7.6,8h0.4 c4.418,0,8-3.582,8-8l3.68-73.6c0.64-12.784,11.2-22.816,24-22.8h1.6c8.837,0,16,7.163,16,16v24c0,4.418,3.582,8,8,8s8-3.582,8-8 v-47.6c0-4.418,3.582-8,8-8h4.32c12.046-0.119,22.314,8.712,24,20.64l4.08,28.56c0.562,3.976,3.984,6.919,8,6.88h0.72 c4.374-0.619,7.418-4.666,6.8-9.04l-4.08-28.56c0,0,0-0.56,0-0.88c1.207-0.917,2.65-1.472,4.16-1.6h4.88 c11.864-0.159,22.063,8.374,24,20.08l3.52,21.28c0.669,3.881,4.063,6.697,8,6.64h1.36c4.349-0.734,7.283-4.849,6.56-9.2l-4-21.36 c0-0.48,0-0.96,0-1.44c16.358-0.104,30.16,12.146,32,28.4l9.2,80.72C299.034,174.542,297.762,192.135,293.513,209.121z" />
            </g>
        </g>
    </svg>
);

const Hand = ({rocksOnHand, containerRef}: Props) => {
    const handRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const rocks = useMemo(
        () =>
            new Array(rocksOnHand)
                .fill(1)
                .map((_item, index) => <div key={index} className={`rock rock_number_${index}`} />),
        [rocksOnHand],
    );

    useEffect(() => {
        const followCursor = (e: MouseEvent) => {
            if (containerRef.current && handRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                if (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                ) {
                    setIsVisible(true);

                    const width = handRef.current.getBoundingClientRect().width;
                    const height = handRef.current.getBoundingClientRect().height;

                    const x = e.clientX - rect.left - width / 2;
                    const y = e.clientY - rect.top + height / 2;

                    handRef.current.style.top = `${y}px`;
                    handRef.current.style.left = `${x}px`;
                } else {
                    setIsVisible(false);
                }
            }
        };

        document.addEventListener('mousemove', followCursor);

        return () => document.removeEventListener('mousemove', followCursor);
    });

    return (
        <div className={`hand ${isVisible ? '' : 'hand_unvisible'}`} ref={handRef}>
            {rocksOnHand === 0 ? <OpenedHand /> : <ClosedHand />}
            <div className="rocks-on-hand">{rocks}</div>
        </div>
    );
};

export default Hand;
