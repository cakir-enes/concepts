import * as React from "react"
import { useSelector } from "react-redux";
import { AppState } from "../store/Cards";
import { motion, AnimatePresence } from "framer-motion";
import { closeSpring, openSpring } from "../Springs";
import { IncomingReferences } from "./IncomingReferences";


const References: React.FC<{}> = (props) => {
    let editing = useSelector((s: AppState) => s.editing);
    let [hover, setHover] = React.useState(false);
    return <AnimatePresence>
        {editing &&
            <motion.div id="references" initial={{ opacity: 0, translateX: -400 }} transition={{ ...closeSpring, delay: 0.2 }} animate={{ opacity: 1, translateX: 0 }} exit={{ opacity: 0, translateX: 400 }} style={{ position: "absolute", zIndex: 4, right: 0, top: "10%", bottom: "10%", width: "45%", height: "80%", background: "red", display: "grid", gridTemplateRows: "1fr 1fr", gridGap: "50px" }}>

                <IncomingReferences />
            </motion.div>}
    </AnimatePresence>;

}

export default References

