import React, { useEffect, useRef, useCallback } from 'react';
import { Collection } from "react-virtualized";
import { useWindowSize } from "../hooks"
import { useStore, useContent } from "../stores"
import {Card} from "./index"
import { Aside } from './Aside';


export const Concept = () => {
    
    const listRef = useRef();
    const [w, _] = useWindowSize();
    const updateWidth = useStore(s => s.updateWidth);
    
    const contentStore = useContent()
    
    useEffect(() => {
        updateWidth(w);
    }, []);
    
    useEffect(() => {
        updateWidth(w);
    }, [w]);

    useEffect(() => {
        console.log("READY")
        return () => console.log("GONE")
    }, [])

    const cellRenderer = useCallback(({index, key, style}) => {
        const content = contentStore.content[index]
         return <div key={key} style={style}><Card index={index} val={content} /> </div>
    }, [])

    const cellSizeAndPositionGetter = ({index}) => {
        const card = contentStore.sizesAndPoses[index]
        return {height: card.h, width: card.w, x: card.x, y: card.y}
    }
    
    return (
    <div className="view" ref={listRef} onWheel={e => {listRef.current.scrollBy(e.deltaY * 2, 0)}}>
        <Collection className="List" cellCount={contentStore.content.length} cellRenderer={cellRenderer} cellSizeAndPositionGetter={cellSizeAndPositionGetter} height={800} width={3400} />
        <Aside />
    </div>);
};
