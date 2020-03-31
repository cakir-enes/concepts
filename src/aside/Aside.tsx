import * as React from "react"
import interact from "interactjs"
import { useStore, ICard, useDragnResize } from "../card"

export const Aside = () => {
    const [dropzone, drop, moving] = useStore(s => [s.dropzone, s.drop, s.moving])
    const [inside, setInside] = React.useState(false)

    React.useEffect(() => {
        interact('.drophere').dropzone({
            overlap: 0.2,
            ondrop: () => drop("aside"),
            // ondropactivate: () => console.log("ACTIVATED"),
            ondropdeactivate: () => drop("concept"),
            ondragenter: () => console.log("DRAG ENTER"),
            ondragleave: () => {
                console.count("LEFT")
                // drop("concept")
            },
        })
        return () => interact('.drophere').unset()
    }, [])

    return (
        <div id="aside" className="drophere" style={{ height: "100%", width: "100%", background: "lightblue" }}>
            {dropzone.map((i, v) => (<Card key={v} card={{ ...i, location: "aside" }} />))}
        </div>)
}

const Card: React.FC<{ card: ICard }> = ({ card }) => {
    const ref = React.createRef<HTMLDivElement>()
    const pos = useDragnResize(ref, false, card)
    React.useEffect(() => {
        if (!ref.current) return
        ref.current.style.width = "80px"
        ref.current.style.height = "80px"
        let left = document.getElementById("aside")?.style.left || ref.current.style.left
        let top = ref.current.style.top
        ref.current.style.transform = `translate(${left}px, ${top}px)`
    }, [ref.current])
    return <div className="ZXC" ref={ref} style={{ background: "gray" }}>
        <h2>ASDASDADSASDASDASDAS</h2>
    </div>
}  