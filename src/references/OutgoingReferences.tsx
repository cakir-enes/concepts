import * as React from "react"
import { useSelector } from "react-redux";
import { AppState } from "../store/Cards";
import { motion, AnimatePresence } from "framer-motion";
import { openSpring } from "../Springs"
import { RefCards, Reference } from "./index"

export const OutgoingReferences: React.FC<{}> = (props) => {
    let cardId = useSelector((s: AppState) => s.editing?.cardId)
    let refIds = useSelector((s: AppState) => s.references[cardId ?? ""] ?? {}).outgoing || []

    return (
        <>
            <Reference position="right">
                <SideCards />
                <RefCards cardIds={refIds} />
            </Reference>

        </>

    )
}

const SideCards: React.FC<{}> = (props) => {

    let lastTouchedIds = useSelector((s: AppState) => s.lastTouched)

    return (

        <motion.div
            animate={{ height: "350px", top: "30%", width: 400, right: -300, }}
            style={{ position: "fixed", background: "yellow", display: "flex", alignItems: "center" }}>
            {lastTouchedIds.map((id, i) => (<SideCard key={id} id={id} i={i} />))}
        </motion.div>

    )
}



const SideCard: React.FC<{ i: number, id: string }> = ({ i, id }) => {

    let ref = React.useRef<HTMLDivElement>(null)
    let card = useSelector((s: AppState) => s.cards.byId[id])
    return (
        <motion.div
            transition={{ type: "spring", stiffness: 600, damping: 150 }}
            ref={ref}
            whileHover={{ translateX: -300, zIndex: 3 }}
            className="card"
            style={{ position: "absolute", left: i * 25, height: "100%", zIndex: 2, display: "grid", gridTemplateRows: "1fr 35px" }}
        >
            {/* // <motion.div ref={ref} whileHover={{ scale: 1.1 }} className="card" style={{ width: "300px", height: "80%" }}> */}
            {card.content}
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                <button>EDIT</button>
                <button>REF</button>
            </div>
        </motion.div>
    )
}