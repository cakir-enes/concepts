import * as React from "react"
import { useSelector } from "react-redux";
import { AppState, ICard } from "../store/Cards";
import { motion, AnimatePresence } from "framer-motion";
import { closeSpring, openSpring } from "../Springs";
import { OutgoingReferences } from "./OutgoingReferences";
import { IncomingReferences } from "./IncomingReferences";


const References: React.FC<{}> = (props) => {

    return <>
        <IncomingReferences />
        <OutgoingReferences />
    </>
}


export const Reference: React.FC<{ position: "left" | "right" }> = ({ position, children }) => {
    let editing = useSelector((s: AppState) => s.editing);
    let p = React.useMemo(() => position === "left" ? -1 : 1, [position])
    return <AnimatePresence>
        {editing &&
            <motion.div
                initial={{ opacity: 0, translateX: -400 * p }}
                layoutTransition={{ ...closeSpring, delay: 0, duration: 0.4 }}
                transition={{ ...closeSpring, delay: 0 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0 }}
                style={{
                    position: "absolute", zIndex: 4, [position]: 0, paddingLeft: 32, top: "30px", bottom: "40px", width: "32%", padding: "8px",
                    background: "red", display: "flex", overflow: "hidden"
                }}>
                {children}
            </motion.div>}
    </AnimatePresence>
}

export const RefCards: React.FC<{ cardIds: string[] }> = ({ cardIds }) => {

    return (
        <div className="ref-cards"
            style={{
                overflow: "auto",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridGap: "1.5rem",
                gridTemplateRows: "320px",
                gridAutoRows: "320px"
            }}>
            {cardIds.map(id => (

                <RefCard key={id} id={id} />
            ))}
        </div>
    )
}


const RefCard: React.FC<{ id: string }> = ({ id }) => {

    let card = useSelector((s: AppState) => s.cards.byId[id])

    return (
        <div className="card">
            <p>
                {card.content}
            </p>
        </div>
    )
}

export default References

