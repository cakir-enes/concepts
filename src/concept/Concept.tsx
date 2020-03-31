import * as React from "react"
import { useStore, ICard, useDragnResize } from "../card"

export const Concept = () => {
    let cards = useStore(s => s.cards)

    return (
        <div className="concept">
            {cards.map((c, i) => <Card card={c} key={i} />)}
        </div>
    )
}


const Card: React.FC<{ card: ICard }> = ({ card }) => {
    const ref = React.createRef<HTMLDivElement>()
    const pos = useDragnResize(ref, true, card)


    return <div className="ZXC" ref={ref} style={{ background: "red" }}>
        <h2>ASDASD</h2>
    </div>
}