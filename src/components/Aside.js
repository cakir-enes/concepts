import React, { useEffect, useRef, useReducer } from "react"
import { useDraggingCard, useAsideStore, useConceptStore } from "../stores"
import { Rnd } from "react-rnd";

export const Aside = () => {
    
    const ref = useRef()
    const draggedCard = useDraggingCard(s => s.info)
    const {cards, aside} = useAsideStore()
    const remCardWithIndex = useConceptStore(s => s.remCardWithIndex)
    useEffect(() => {
        console.log(cards)
    }, [cards])
    useEffect(() => {
        if (draggedCard.card) {
            const rect = ref.current.getBoundingClientRect()
            const intersects = draggedCard.card.y + draggedCard.card.h - 5 >  rect.y 
            if (intersects) {
                aside(draggedCard.card)
                remCardWithIndex(draggedCard.index)
            }
        }
    }, [draggedCard])

    
return <div ref={ref} className="aside">{cards.map((e, i) => <Card key={i} index={i} />)}</div>
}

const Card = ({index}) => {
    
    const card = useAsideStore(s => s.cards[index])
    const ref = useRef()
    return (
        <div style={{color: "black", opacity: "100%"}}>{JSON.stringify(card)}</div>
        // <Rnd default={{
        //     x: card.x,
        //     y: card.y,
        //     width: card.w,
        //     height: card.h
        // }} onDrag={(e, data) => {
        //     ref.current.updatePosition(data);
        // }}
        //     onResizeStop={(e, dir, ref, delta, pos) => updateSize(index, { w: ref.style.width, h: ref.style.height })}
        //     onDragStop={(e, d) => {
        //         cardDragged({ index: index, x: d.x, y: d.y, h: card.h, w: card.w })
        //         updatePos(index, { x: d.x, y: d.y })
        //     }}

        //     minWidth={100}
        //     minHeight={100}
        //     ref={ref}>

        //     <div className="box" style={{ background: "blue", margin: 0, height: '100%', padding: '12px' }}>
        //         <textarea style={{ width: "100%", height: "100%" }} defaultValue={card.content} />
        //         <button onClick={() => ref.current.updatePosition({ x: pos.x + 5, y: pos.y })}>CLICK</button>
        //     </div>

        // </Rnd>
    )
}