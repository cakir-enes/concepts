import React, { useState, useRef } from 'react';
import { Rnd } from "react-rnd";

import { useStore, useContent } from "../stores"

export const Card = ({ val, index }) => {
    
    const sizePos = useContent(c => c.sizesAndPoses[index])
    const [pos, setPos] = useState({x: sizePos.x , y: sizePos.y});
    const [size, setSize] = useState({w: sizePos.w, h: sizePos.h});
    const maxWidth = useStore(s => s.maxWidth);
    const ref = useRef();
    
    return (<div>
        <Rnd default={{
            x: pos.x,
            y: pos.y,
            width: size.w,
            height: size.h
        }} onDrag={(e, data) => {
            // console.log( "max width " + maxWidth + " cur " + (e.clientX + size.w))
            // console.log("offsetleft" + ref.current)
            console.log("cc " + (e.clientX + size.w) + " Size: " + (size.w / 2));
            setPos(data);
            if (e.clientX + size.w - 150 > maxWidth) {
                document.getElementsByClassName("view")[0].scrollBy(2, 0);
                ref.current.updatePosition(data);
            }
            else if (e.clientX + size.w < (size.w / 2)) {
                document.getElementsByClassName("view")[0].scrollBy(-2, 0);
                ref.current.updatePosition(data);
            }
        }} onDragStop={(e, d) => {
            // setPos({x: d.x, y: d.y});
            // poses[index] = {x: d.x, y: d.y}
        }} minWidth={100} minHeight={100} ref={ref} enableUserSelectHack={false}>
            <div className="box" style={{ background: "blue", margin: 0, height: '100%', padding: '12px' }}>
                <textarea style={{ width: "100%", height: "100%" }} defaultValue={val} />
                <button onClick={() => ref.current.updatePosition({ x: pos.x + 5, y: pos.y })}>CLICK</button>
            </div>
        </Rnd>
    </div>);
};
