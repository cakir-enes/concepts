import * as React from 'react';
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { move, resize, startEditing, stopEditing } from './store/Cards';
import { AppState } from "./store/Cards"
import interact from "interactjs";
import { Rnd, Props as RndProps } from "react-rnd"
import { motion, MotionStyle, useMotionValue, useInvertedScale, MotionValue, Variants, useTransform } from 'framer-motion';
import { GrFastForward, GrEdit, GrClearOption, GrClose, GrInfo } from "react-icons/gr"
import { openSpring, closeSpring } from './Springs';

const btnStyle: React.CSSProperties = { width: "2em", height: "2em", borderRadius: "50%", padding: "2px", background: "white", textAlign: "center", outline: "none" }
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
    let inverted = useInvertedScale()
    useEffect(() => {
        if (editing) return
        motEdit.set(false)
    }, [motEdit, editing])

    return (<Comp cardId={props.id} editing={motEdit} setHover={editing ? () => { } : setHover} style={{ display: "grid", gridTemplateRows: "30px 1fr 35px", zIndex: motEdit.get() ? 4 : 2 }}>
        <motion.div style={{ ...inverted, cursor: "auto", overflow: "auto", margin: editing ? "16px" : 0 }} contentEditable={editing}>
            {props.id}
            <p>
                {card.content}
            </p>
        </motion.div>
        <div className="drag-handle"
            style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "1fr 24px 24px", alignContent: "center", pointerEvents: "auto" }}>
            <span className="tags" style={{ fontSize: "11px", marginTop: "auto", color: "#D73A49" }}>#programming, clojure, data</span>
            <motion.button style={btnStyle}
                onClick={() => {
                    dispatch(startEditing({ cardId: props.id, conceptId: card.location }))
                    motEdit.set(true)
                }}>
                <GrEdit style={{ marginTop: "2px" }} />
            </motion.button>
            <motion.button style={btnStyle}>
                <GrClose style={{ marginTop: "2px" }} />
            </motion.button>
        </div>
    </Comp>
    )
}

const Comp: React.FC<{ editing: MotionValue<boolean>, setHover: (b: boolean) => void, style: React.CSSProperties | undefined, cardId: string }> = React.memo(({ cardId, editing, children, setHover, style }) => {
    let ref = useRef<HTMLDivElement>(null);
    let [dragging, setDragging] = useState(false)
    let [resizing, setResizing] = useState(false)
    let [pos, dim] = useSelector((s: AppState) => [s.positions[cardId], s.dimensions[cardId]])
    let state = useMotionValue({ pos, dim, prev: { pos, dim } })
    let inverted = useInvertedScale()
    let dispatch = useDispatch()
    let [edits, setEdits] = useState(editing.get())

    useEffect(() => {
        return editing.onChange(e => {
            let s = state.get()
            setEdits(e)
            state.set(e
                ? { pos: { x: 200, y: 200 }, dim: { w: 200, h: 200 }, prev: { pos: s.pos, dim: s.dim } }
                : { ...s, pos: s.prev.pos, dim: s.prev.dim })
        })
    }, [editing])

    useEffect(() => {
        if (!ref.current) return;
        let inter = interact(ref.current)
            .resizable({
                // resize from all edges and corners
                edges: { left: false, right: true, bottom: true, top: false },

                listeners: {
                    start(event) {
                        // setDragging(true)
                        setResizing(true)
                    },
                    end(event) {
                        // setDragging(false)
                        let s = state.get()
                        setResizing(false)
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
            })
        // .draggable({
        //     listeners: {
        //         start(event) {
        //             setDragging(true)
        //         },
        //         end(event) {
        //             setDragging(false)
        //             let pos = state.get().pos
        //             dispatch(move({ id: cardId, ...pos }))
        //         },
        //         move(event) {
        //             if (!editing.get()) {
        //                 let s = state.get()
        //                 state.set({ ...s, pos: { x: s.pos.x + event.dx, y: s.pos.y + event.dy } })
        //             }
        //         }
        //     }
        // })
        return () => inter.unset()
    }, [ref])

    let [wrap, setWrap] = useState(state.get())

    useEffect(() => {
        state.onChange(w => setWrap(w))
    }, [state])


    return (
        <motion.div
            ref={ref}
            className="card"
            // drag={!dragging}
            // dragOriginX={dragX}
            // dragOriginY={dragY}
            // dragMomentum={false}
            // dragElastic={false}
            layoutTransition={!dragging && !resizing && (edits ? openSpring : closeSpring)}
            style={{
                ...style,
                ...inverted,
                position: edits ? "fixed" : "absolute",
                width: edits ? "42%" : wrap.dim.w,
                height: edits ? "80%" : wrap.dim.h,
                top: edits ? "10%" : wrap.pos.y,
                left: edits ? 90 : wrap.pos.x,
                boxSizing: "border-box",
                touchAction: "none",
            }}
        >
            <motion.div
                style={{ background: "black", height: "30px" }}
                onPanStart={() => setDragging(true)}
                onPanEnd={() => setDragging(false)}
                onPan={(e, info) => {
                    let s = state.get()
                    state.set({ ...s, pos: { x: s.pos.x + info.delta.x, y: s.pos.y + info.delta.y } })
                    // dragX.set(info.point.x)
                    // dragY.set(info.point.y)
                }} />
            {edits ?
                (<motion.div style={{ ...inverted, cursor: "auto", overflow: "auto", margin: editing && "16px" }} initial={{ translateX: 100 }} animate={{ translateX: 0 }}>
                    {cardId}
                    <p>
                        Egestas ipsum eget etiam pulvinar elit nulla. Diam libero tellus elementum sapien enim. Condimentum bibendum turpis felis nibh lobortis odio. Ornare interdum condimentum aliquet massa bibendum id risus. Elementum, ultrices phasellus tellus duis. Aliquam nunc ut cursus scelerisque. Tempus enim, lorem enim vulputate massa ut. Donec pulvinar ut lorem odio ut non. Sit faucibus suscipit nec eget non. Aenean est in sagittis, hendrerit neque risus morbi. Gravida malesuada feugiat amet venenatis pretium eget volutpat et. Arcu volutpat id nulla erat eget ligula.
                        Id etiam in faucibus in. Cursus tempus egestas dui volutpat suspendisse. Sed ultrices gravida in proin. In vel vulputate.
                    </p>
                </motion.div>)
                : children
            }
        </motion.div>
    )
})