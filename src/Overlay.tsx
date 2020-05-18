import * as React from "react"
import { createPortal } from "react-dom"
import { useSelector, useDispatch } from "react-redux"
import { AppState, stopEditing } from "./store/Cards"
import { AnimatePresence, motion } from "framer-motion"


export const Overlay: React.FC<{}> = (props) =>
    createPortal((() => {
        let open = useSelector((s: AppState) => s.editing)
        let dispatch = useDispatch()

        return (<AnimatePresence>
            {open &&
                <motion.div
                    id="modal"
                    className="modal"
                    onClick={evt => { if (evt.target === evt.currentTarget) dispatch(stopEditing()) }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                </motion.div>}
        </AnimatePresence>)
    })()
        , document.body)
