import React, { useEffect } from "react"
import { useDraggingCard, useAsideStore } from "../stores"

export const Aside = () => {
    
    const draggedCardInfo = useDraggingCard(s => s.info)
    const {cards} = useAsideStore()

    useEffect(() => {
        console.log("DROPPED CARD " + draggedCardInfo)
    }, [draggedCardInfo])
    
return <div className="aside">{cards.map(i => <Card index={i} />)}</div>
}