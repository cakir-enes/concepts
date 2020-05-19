import * as React from "react"
import { useSelector } from "react-redux";
import { AppState } from "../store/Cards";
import { motion } from "framer-motion";
import { openSpring } from "../Springs"

export const IncomingReferences: React.FC<{}> = (props) => {
    return (
        <div style={{ background: "blue", display: "grid", gridTemplateColumns: "20% 1fr", alignItems: "center", overflow: "hidden" }}>
            <SideCards />
            <RefCards />
        </div>
    )
}

const SideCards: React.FC<{}> = (props) => {
    let lastTouchedIds = useSelector((s: AppState) => s.lastTouched)

    return (
        <ul style={{ listStyle: "none", height: "80%", background: "black", position: "relative" }}>
            {lastTouchedIds.map((id, i) => (<li key={id}><SideCard id={id} i={i} /></li>))}
        </ul>
    )
}

const RefCards: React.FC<{}> = (props) => {
    let cardId = useSelector((s: AppState) => s.editing?.cardId)
    let refIds = useSelector((s: AppState) => s.references[cardId ?? ""] ?? {}).incoming || []

    return (
        <div style={{ overflow: "auto", height: "80%", background: "yellow" }}>
            <ul style={{ listStyle: "none", height: "90%", width: "fit-content", background: "yellow", padding: 0, display: "flex", margin: 0 }}>
                {refIds.map(id => (
                    <li key={id} style={{ display: "inline-block", width: "300px", marginRight: "30px", marginLeft: "10px" }}>
                        <RefCard id={id} />
                    </li>))}
            </ul>
        </div>
    )
}


const RefCard: React.FC<{ id: string }> = ({ id }) => {

    let card = useSelector((s: AppState) => s.cards.byId[id])

    return (
        <div className="card" style={{ height: "100%", width: "100%" }}>
            <p>
                {card.content}
            </p>
        </div>
    )
}

const SideCard: React.FC<{ i: number, id: string }> = ({ i, id }) => {

    let ref = React.useRef<HTMLDivElement>(null)
    let card = useSelector((s: AppState) => s.cards.byId[id])
    return (
        <motion.div transition={openSpring} ref={ref} whileHover={{ translateX: (30 * (5 - i)) }} className="card" style={{ width: "300px", height: "90%", position: "absolute", marginLeft: "14px", translateX: -300 + (30 * (5 - i)) }}>
            {/* // <motion.div ref={ref} whileHover={{ scale: 1.1 }} className="card" style={{ width: "300px", height: "80%" }}> */}
        </motion.div>
    )
}