import * as React from 'react';
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { move, resize, startEditing, stopEditing } from './store/Cards';
import { AppState } from "./store/Cards"
import interact from "interactjs";
import { Rnd, Props as RndProps } from "react-rnd"
import { motion, MotionStyle, useMotionValue, useInvertedScale, MotionValue, Variants } from 'framer-motion';
import { GrFastForward, GrEdit, GrClearOption, GrClose } from "react-icons/gr"

const btnStyle: MotionStyle = { width: "2em", height: "2em", borderRadius: "50%", padding: "2px", background: "white", textAlign: "center", outline: "none" }
const toolbarVars: Variants = {
    show: {
        translateX: 0,
        scale: 1
    },
    hide: {
        translateX: 50,
        scale: 0
    }
}
export const Card: React.FC<{ id: string }> = (props) => {

    const [card, pos, editing] = useSelector((s: AppState) => [s.cards.byId[props.id], s.positions[props.id], s.editing?.cardId === props.id])
    let motEdit = useMotionValue(false)
    const dispatch = useDispatch()
    const [hover, setHover] = React.useState(false)

    useEffect(() => {
        if (editing) return
        motEdit.set(false)
    }, [motEdit, editing])

    return (<Comp cardId={props.id} editing={motEdit} setHover={setHover} style={{ display: "grid", gridTemplateRows: "1fr 35px", zIndex: motEdit.get() ? 4 : 2 }}>
        <div>
            {props.id}
        </div>
        <div className="drag-handle"
            style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "1fr 24px 24px", alignContent: "center", pointerEvents: "auto" }}>
            <span className="tags" style={{ fontSize: "11px", marginTop: "auto", color: "#D73A49" }}>#programming, clojure, data</span>
            <motion.button style={btnStyle}
                onClick={() => {
                    dispatch(startEditing({ cardId: props.id, conceptId: card.location }))
                    motEdit.set(true)
                }}
                initial="hide"
                animate={(editing || hover) ? "show" : "hide"}
                variants={toolbarVars}>
                <GrEdit style={{ marginTop: "2px" }} />
            </motion.button>
            <motion.button style={btnStyle}
                initial="hide"
                animate={(editing || hover) ? "show" : "hide"}
                variants={toolbarVars}>
                <GrClose style={{ marginTop: "2px" }} />
            </motion.button>
        </div>
    </Comp>
    )
}

// export const Card: React.FC<{ id: string }> = (props) => {
//     const [card, pos, editing] = useSelector((s: AppState) => [s.cards.byId[props.id], s.positions[props.id], s.editing?.cardId === props.id])
//     const dispatch = useDispatch()
//     const [hover, setHover] = React.useState(false)
//     return (
//         <Rnd
//             className="card"
//             position={pos}
//             id={props.id}
//             default={{ height: "200px", width: "200px", x: 0, y: 0 }}
//             onDragStop={(e, d) => {
//                 dispatch(moved({ id: props.id, x: d.x, y: d.y }))
//             }}
//             enableUserSelectHack={false}
//             dragHandleClassName="drag-handle"
//             onMouseEnter={() => setHover(true)}
//             onMouseLeave={() => setHover(false)}
//             style={{
//                 zIndex: 2,
//                 display: "grid", gridTemplateRows: "1fr 35px 4px",
//                 opacity: editing ? 0 : 1,
//                 position: card.location == "aside" ? "fixed" : "absolute"
//             }}
//         >
//             <div>
//                 {props.id}
//             </div>
//             <div className="drag-handle"
//                 style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "1fr 24px 24px", alignContent: "center", pointerEvents: "auto" }}>
//                 <span className="tags" style={{ fontSize: "11px", marginTop: "auto", color: "#D73A49" }}>#programming, clojure, data</span>
//                 <motion.button style={btnStyle}
//                     onClick={() => { dispatch(startEditing({ cardId: props.id, conceptId: card.location })) }}
//                     animate={{ translateX: hover ? 0 : 50, scale: hover ? 1 : 0 }}>
//                     <GrEdit style={{ marginTop: "2px" }} />
//                 </motion.button>
//                 <motion.button style={btnStyle}
//                     animate={{ translateX: hover ? 0 : 55, scale: hover ? 1 : 0 }}>
//                     <GrClose style={{ marginTop: "2px" }} />
//                 </motion.button>
//             </div>
//         </Rnd >
//     )
// }
export const openSpring = { type: "spring", stiffness: 200, damping: 30 }
export const closeSpring = { type: "spring", stiffness: 300, damping: 35 }

const Comp: React.FC<{ editing: MotionValue<boolean>, setHover: (b: boolean) => void, style: React.CSSProperties | undefined, cardId: string }> = ({ cardId, editing, children, setHover, style }) => {
    let ref = useRef<HTMLDivElement>(null);
    let [dragging, setDragging] = useState(true)
    let [pos, dim] = useSelector((s: AppState) => [s.positions[cardId], s.dimensions[cardId]])
    let state = useMotionValue({ pos, dim, prev: { pos, dim } })
    let inverted = useInvertedScale()
    let dispatch = useDispatch()

    useEffect(() => {
        return editing.onChange(newVal => {
            let s = state.get()
            state.set(newVal
                ? { pos: { x: 200, y: 200 }, dim: { w: 200, h: 200 }, prev: { pos: s.pos, dim: s.dim } }
                : { ...s, pos: s.prev.pos, dim: s.prev.dim })
        })
    }, [editing])

    useEffect(() => {
        if (!ref.current) return;
        let inter = interact(ref.current)
            .draggable({
                listeners: {
                    start(event) {
                        setDragging(true)
                    },
                    end(event) {
                        setDragging(false)
                        let pos = state.get().pos
                        dispatch(move({ id: cardId, ...pos }))
                    },
                    move(event) {
                        if (!editing.get()) {
                            let s = state.get()
                            state.set({ ...s, pos: { x: s.pos.x + event.dx, y: s.pos.y + event.dy } })
                        }
                    }
                }
            })
            .resizable({
                // resize from all edges and corners
                edges: { left: false, right: true, bottom: true, top: false },

                listeners: {
                    start(event) {
                        setDragging(true)
                    },
                    end(event) {
                        setDragging(false)
                        let s = state.get()
                        dispatch(resize({ id: cardId, ...s.dim }))
                    },
                    move(event) {
                        let dim = { w: event.rect.width, h: event.rect.height }
                        if (!editing.get())
                            state.set({ ...state.get(), dim })
                    }
                },
                modifiers: [
                    interact.modifiers.restrictEdges({
                        outer: "parent"
                    }),
                    interact.modifiers.restrictSize({
                        min: { width: 100, height: 50 }
                    })
                ],
                inertia: false
            });
        return () => inter.unset()
    }, [ref])

    let [wrap, setWrap] = useState(state.get())

    useEffect(() => {
        state.onChange(w => setWrap(w))
    }, [state])

    return (
        <motion.div
            ref={ref}
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
            className="card"
            layoutTransition={!dragging && true}
            style={{
                ...style,
                ...inverted,
                position: "absolute",
                width: wrap.dim.w,
                height: wrap.dim.h,
                top: wrap.pos.y,
                left: wrap.pos.x,
                boxSizing: "border-box",
                touchAction: "none",
            }}
        >
            {children}
        </motion.div>
    )
}