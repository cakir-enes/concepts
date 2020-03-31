import * as React from "react"
import interact from "interactjs"
import { useStore, ICard, useDragnResize } from "../card"

export const Aside = () => {
    const [dropzone, drop, moving] = useStore(s => [s.dropzone, s.drop, s.moving])

    React.useEffect(() => {
        interact('.drophere').dropzone({
            ondrop: drop
        })
    }, [])

    return (
        <div className="drophere" style={{ height: "100%", width: "100%", background: "black" }}>
            <ul>
                {dropzone.map((i, v) => (<Card key={v} card={i} />))}
            </ul>

        </div>)
}

const Card: React.FC<{ card: ICard }> = ({ card }) => {
    const ref = React.createRef<HTMLDivElement>()
    const pos = useDragnResize(ref, true, card)

    return <div className="ZXC" ref={ref} style={{ background: "gray" }}>
        <h2>ASDASD</h2>
    </div>
}  