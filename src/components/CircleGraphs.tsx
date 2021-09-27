import React from 'react';

type CircleGraphArgs = {
    progress: number,
    color: string,
    lineWidth: number,
    className: string,
}

export function CircleGraph({progress, color = '#69c', lineWidth = 1, className = ''}: Partial<CircleGraphArgs>) {
    const cmds = [];
    const targetPos = {x: 0, y: 0};

    const circleRad = (Math.PI * 2);

    const ang = (circleRad * progress);
    const bigArcFlag = progress > .5;
    const line = lineWidth * 0.05;

    targetPos.x = Math.cos(ang) * 1;
    targetPos.y = Math.sin(ang) * 1;

    cmds.push('M 1 0');
    cmds.push(`A 1 1, 0, ${bigArcFlag ? 1 : 0}, 1, ${targetPos.x} ${targetPos.y}`);

    const viewBox = [-1 - line, -1 - line, 2 + (line * 2), 2 + (line * 2)];

    return (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox={viewBox.join(' ')} className={className}>
           <g>
               <path d={cmds.join('\n')} strokeWidth={line} stroke={color} fill='none' strokeLinecap='round' />
               <text>{progress}</text>
            </g> 
        </svg>
    );
}