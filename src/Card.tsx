import * as React from 'react';
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch, useStore } from "react-redux"
import { move, resize, startEditing, stopEditing } from './store/Cards';
import { AppState } from "./store/Cards"
import interact from "interactjs";
import { Rnd, Props as RndProps } from "react-rnd"
import { motion, MotionStyle, useMotionValue, useInvertedScale, MotionValue, Variants, useTransform, HTMLMotionProps } from 'framer-motion';
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
export const Card: React.FC<{ id: string }> = React.memo((props) => {

    const [card, pos, dim] = useSelector((s: AppState) => [s.cards.byId[props.id], s.positions[props.id], s.dimensions[props.id]], (l, r) => {
        let eq = l[0].content === l[0].content
        if (!eq)
            console.count(`DIFF : ${props.id} ${JSON.stringify(l[0])}  ${JSON.stringify(r[0])}`)
        return eq
    })
    let motEdit = useMotionValue(false)
    const dispatch = useDispatch()

    let inverted = useInvertedScale()
    let editing = useSelector((s: AppState) => s.editing, (l, r) => {
        let startedEditingThis = !l && r?.cardId === props.id
        let finishedEditingThis = !r && l?.cardId === props.id
        let sthChanged = startedEditingThis || finishedEditingThis
        return !sthChanged
    })

    useEffect(() => {
        if (editing) return
        motEdit.set(false)
    }, [motEdit, editing])

    useEffect(() => {
        console.count(`CARD RENDER: ${props.id}`)
    })

    return (
        <Comp pos={pos} dim={dim} cardId={props.id} editing={motEdit} style={{ display: "grid", gridTemplateRows: "30px 1fr 35px", zIndex: editing ? 4 : 2 }}>
            <motion.div style={{ ...inverted, cursor: "auto", overflow: "auto", margin: editing ? "16px" : 0 }}>
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
})

const Comp: React.FC<{ editing: MotionValue<boolean>, style: React.CSSProperties | undefined, cardId: string, pos: { x: number, y: number }, dim: { w: number, h: number } }> =
    (({ cardId, editing, children, style, pos, dim }) => {
        let ref = useRef<HTMLDivElement>(null);
        let state = useMotionValue({ pos, dim, prev: { pos, dim } })
        let inverted = useInvertedScale()
        let dispatch = useDispatch()

        let w = useMotionValue(dim.w)
        let h = useMotionValue(dim.h)
        let top = useMotionValue(pos.y)
        let left = useMotionValue(pos.x)
        let prev = useMotionValue({ w: w.get(), h: h.get(), top: top.get(), left: left.get() })
        let [edits, setEdits] = useState(editing.get())

        useEffect(() => {
            return editing.onChange(e => {
                console.log("EDITING: " + e)
                let [iw, ih] = [window.innerWidth, window.innerHeight]
                if (e) {
                    prev.set({ w: w.get(), h: h.get(), top: top.get(), left: left.get() })
                    w.set(iw * 0.42)
                    h.set(ih * 0.8)
                    top.set(ih * 0.1)
                    left.set(90)
                } else {
                    let p = prev.get()
                    w.set(p.w)
                    h.set(p.h)
                    top.set(p.top)
                    left.set(p.left)
                }
                setEdits(e)
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
                        },
                        end(event) {
                            let s = state.get()
                            dispatch(resize({ id: cardId, ...s.dim }))
                        },
                        move(event) {
                            let dim = { w: event.rect.width, h: event.rect.height }
                            if (!editing.get()) {
                                w.set(dim.w)
                                h.set(dim.h)
                            }
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
            return () => inter.unset()
        }, [ref])

        useEffect(() => {
            console.count("RENDER " + cardId)
        })



        return (
            <motion.div
                ref={ref}
                className="card"
                layoutTransition={edits ? openSpring : closeSpring}
                style={{
                    ...style,
                    ...inverted,
                    position: true ? "fixed" : "absolute",
                    width: w,
                    height: h,
                    top: top,
                    left: left,
                    boxSizing: "border-box",
                    touchAction: "none",
                }}
            >
                <DragHandle
                    onPanEnd={() => dispatch(move({ id: cardId, x: left.get(), y: top.get() }))}
                    onPan={(e, info) => {
                        top.set(top.get() + info.delta.y)
                        left.set(left.get() + info.delta.x)
                    }} />
                {edits ?
                    (<motion.div style={{ ...inverted, cursor: "auto", overflow: "auto", margin: editing && "16px" }} initial={{ translateX: 100 }} animate={{ translateX: 0 }}>
                        EDITING{cardId}
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

const DragHandle: React.FC<HTMLMotionProps<"div">> = (props) => {
    return (
        <motion.div onPan={props.onPan} onPanEnd={props.onPanEnd} style={{ display: "flex", cursor: "move", justifyContent: "center" }}>
            <motion.div style={{ background: "gray", height: "4px", width: "80%", marginBottom: "auto", marginTop: "4px" }} />
        </motion.div>
    )
}