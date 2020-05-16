import * as React from "react"
import { createPortal } from "react-dom"
import { useSelector, useDispatch } from "react-redux"
import { AppState, stopEditing } from "./store/Cards"


export const Edit: React.FC<{}> = (props) => {

    let editing = useSelector((s: AppState) => s.editing)
    let dispatch = useDispatch()
    let [open, setOpen] = React.useState(false)

    React.useEffect(() => setOpen(editing !== undefined), [editing])

    return (open ?
        <Modal onClose={() => dispatch(stopEditing())} open={open}>
            <div>
                ASDASDASD
            </div>
        </Modal >
        : null
    )
}

const Modal: React.FC<{ onClose: () => void, open: boolean }> = (props) => (
    createPortal(
        <div className="modal" style={{ position: "absolute", top: "40%", left: "50%" }}>
            <button onClick={props.onClose}>&times;</button>
            {props.children}
        </div>, document.body
    )

)
