import React, { useState, useRef } from 'react';
import { Rnd } from "react-rnd";

import { useStore, useContent, useDraggingCard } from "../stores"

export const Card = ({ val, index }) => {

    const sizePos = useContent(c => c.sizesAndPoses[index])
    const updateSize = useContent(c => c.updateCardSize)
    const updatePos = useContent(c => c.updateCardPosition)
    const cardDragged = useDraggingCard(s => s.cardDragged)

    const maxWidth = useStore(s => s.maxWidth);
    const ref = useRef();

    return (<div>
        <Rnd default={{
            x: sizePos.x,
            y: sizePos.y,
            width: sizePos.w,
            height: sizePos.h
        }} onDrag={(e, data) => {

            ref.current.updatePosition(data);

        }}
            onResizeStop={(e, dir, ref, delta, pos) => updateSize(index, { w: ref.style.width, h: ref.style.height })}
            onDragStop={(e, d) => {
                cardDragged({index: index,  x: d.x, y: d.y, h: sizePos.h, w: sizePos.w })
                updatePos(index, { x: d.x, y: d.y })
            }
            }

            minWidth={100}
            minHeight={100}
            ref={ref}
            enableUserSelectHack={false}>

            <div className="box" style={{ background: "blue", margin: 0, height: '100%', padding: '12px' }}>
                <textarea style={{ width: "100%", height: "100%" }} defaultValue={val} />
                <button onClick={() => ref.current.updatePosition({ x: pos.x + 5, y: pos.y })}>CLICK</button>
            </div>

        </Rnd>
    </div>);
};
