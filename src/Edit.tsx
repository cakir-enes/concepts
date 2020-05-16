import * as React from "react"
import { createPortal } from "react-dom"
import { useSelector, useDispatch } from "react-redux"
import { AppState, stopEditing } from "./store/Cards"
import { AnimatePresence, motion } from "framer-motion"


export const Edit: React.FC<{}> = (props) => {

    let editing = useSelector((s: AppState) => s.editing)
    let dispatch = useDispatch()
    let [open, setOpen] = React.useState(false)

    React.useEffect(() => setOpen(editing !== undefined), [editing])

    return (
        <Modal onClose={() => dispatch(stopEditing())} open={open}>
            <motion.div style={{ width: "500px", height: "300px", background: "red", margin: "auto", borderRadius: "1rem" }}>
                <h2>ASDADS</h2>
            </motion.div>
        </Modal >


    )
}

const Modal: React.FC<{ onClose: () => void, open: boolean }> = (props) => (
    createPortal(
        <AnimatePresence>
            {props.open &&
                <motion.div
                    id="modal"
                    className="modal"
                    onClick={evt => { if (evt.target === evt.currentTarget) props.onClose() }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {props.children}
                </motion.div>}
        </AnimatePresence>, document.body
    )
)
