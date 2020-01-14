import React, { useEffect, useRef, useCallback } from 'react';
import { Collection } from "react-virtualized";
import { useWindowSize } from "../hooks"
import { useStore,  useConceptStore, useDraggingCard} from "../stores"
import { Aside } from './Aside';
import { Rnd } from "react-rnd";


export const Concept = () => {
    
    const listRef = useRef();
    const [w, _] = useWindowSize();
    const updateWidth = useStore(s => s.updateWidth);
    
    const cards = useConceptStore(s => s.cards)
    
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
        const card = cards[index]
         return <div key={key} style={style}><Card val={card.content} index={index} /> </div>
    }, [])

    const cellSizeAndPositionGetter = ({index}) => {
        const card = cards[index]
        return {height: card.h, width: card.w, x: card.x, y: card.y}
    }
    
    return (
    <div className="view" ref={listRef} onWheel={e => {listRef.current.scrollBy(e.deltaY * 2, 0)}}>
        <Collection className="List" cellCount={cards.length} cellRenderer={cellRenderer} cellSizeAndPositionGetter={cellSizeAndPositionGetter} height={800} width={3400} />
        <Aside />
    </div>);
};


const Card = ({ index }) => {

    const card = useConceptStore(c => c.cards[index])
    const updateSize = useConceptStore(c => c.updateCardSize)
    const updatePos = useConceptStore(c => c.updateCardPosition)
    const cardDragged = useDraggingCard(s => s.cardDragged)

    const ref = useRef();

    return (<div>
        <Rnd default={{
            x: card.x,
            y: card.y,
            width: card.w,
            height: card.h
        }} onDrag={(e, data) => {
            ref.current.updatePosition(data);
        }}
            onResizeStop={(e, dir, ref, delta, pos) => updateSize(index, { w: ref.style.width, h: ref.style.height })}
            onDragStop={(e, d) => {
                cardDragged({ index: index, x: d.x, y: d.y, h: card.h, w: card.w })
                updatePos(index, { x: d.x, y: d.y })
            }}

            minWidth={100}
            minHeight={100}
            ref={ref}
            enableUserSelectHack={false}>

            <div className="box" style={{ background: "blue", margin: 0, height: '100%', padding: '12px' }}>
                <textarea style={{ width: "100%", height: "100%" }} defaultValue={card.content} />
                <button onClick={() => ref.current.updatePosition({ x: pos.x + 5, y: pos.y })}>CLICK</button>
            </div>

        </Rnd>
    </div>);
};
