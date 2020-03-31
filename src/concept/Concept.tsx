import * as React from "react"
import { useStore, ICard, useDragnResize } from "../card"

export const Concept = () => {
    let cards = useStore(s => s.cards)
    React.useEffect(() => {
        console.log("CARDS CHANGED " + cards.length)
    }, [cards])
    return (
        <div className="concept" style={{ background: "blue" }}>
            {cards.map((c, i) => <Card card={{ ...c, location: "concept" }} key={i} />)}
        </div>
    )
}


const Card: React.FC<{ card: ICard }> = ({ card }) => {
    const ref = React.createRef<HTMLDivElement>()
    const pos = useDragnResize(ref, false, card)

    return (<div className="ZXC" ref={ref} style={{ background: "red", width: "100px", position: "absolute" }}>
        <h2>ASDASD</h2>
    </div>)
}