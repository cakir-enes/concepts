import React, { useEffect, useRef } from 'react';
import { Collection } from "react-virtualized";
import { Card } from './index';
import {poses, dims} from "../stores"
import { useWindowSize } from "../hooks"
import { useStore } from "../stores"


const cellRenderer = ({ index, key, style }) => <div key={key} style={style}><Card index={index} val={index} /></div>;
const cellSizeAndPositionGetter = ({ index }) => ({ height: dims[index].h, width: dims[index].w, x: poses[index].x, y: poses[index].y });

export const Concept = () => {
    
    const listRef = useRef();
    const [w, _] = useWindowSize();
    const updateWidth = useStore(s => s.updateWidth);
    
    useEffect(() => {
        updateWidth(w);
    }, []);
    
    useEffect(() => {
        console.log("WW: " + w);
        updateWidth(w);
    }, [w]);
    
    return (<div className="view" ref={listRef}>

        <Collection className="List" cellCount={poses.length} cellRenderer={cellRenderer} cellSizeAndPositionGetter={cellSizeAndPositionGetter} height={800} width={3400} />

    </div>);
};
