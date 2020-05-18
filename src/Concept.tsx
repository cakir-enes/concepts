import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { AppState, stopEditing } from "./store/Cards"
import ScrollContainer from "react-indiana-drag-scroll"
import { motion, useTransform, useElementScroll, useSpring } from "framer-motion"
import { Card } from './Card';
import { Overlay } from './Overlay';


export const Concept: React.FC<{}> = () => {
    let concept = useSelector((s: AppState) => s.concepts.byId[s.activeConcept])
    let cards = useSelector((s: AppState) => concept.cards.map(id => s.cards.byId[id]))
    let ref = useRef<HTMLElement | null>(null)
    let conceptRef = useRef<HTMLDivElement>(null)
    let dispatch = useDispatch()
    let { scrollXProgress } = useElementScroll(ref)
    let containerRef = useRef<HTMLDivElement>(null)
    const [isComplete, setIsComplete] = useState(false);

    // let ratio = useTransform(scrollXProgress, )
    let [width, setWidth] = useState(window.innerWidth + 120)

    let [ratio, setRatio] = useState(0)
    let scale = useTransform(scrollXProgress, [0.8, 1.0], [0, 1])
    const pathLength = useSpring(scale, { stiffness: 400, damping: 90 });

    useEffect(() => {
        return scrollXProgress.onChange(p => {
            if (p >= 1) {
                setWidth(w => w + window.innerWidth)
            }
        })
    }, [scrollXProgress])
    useEffect(() => scale.onChange(v => setIsComplete(v >= 1)), [scale]);
    return (
        <ScrollContainer
            ref={r => { ref.current = r?.getElement() ?? null }}
            className="scrolly"
            ignoreElements={".card"}
            style={{ position: "relative" }}
            hideScrollbars={false}>
            <motion.div style={{ display: "flex", width: "fit-content" }} ref={containerRef} layoutTransition>
                <div id={concept.id} ref={conceptRef} className="dropzone patterno" style={{ minWidth: width, maxWidth: width, width: "auto", height: "98vh", display: "flex" }}>
                    {cards.map(c => (<Card key={c.id} id={c.id} />))}
                </div>
                <div className="add-page-container">
                    <svg viewBox="0 0 50 50" style={{ width: 36 }}>
                        <motion.path
                            fill="none"
                            strokeWidth="5"
                            stroke="#4bbcff"
                            strokeDasharray="0 1"
                            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                            style={{
                                pathLength,
                                rotate: 90,
                                translateX: 5,
                                translateY: 5,
                                scaleX: -1 // Reverse direction of line animation
                            }}
                        />
                        <motion.path
                            fill="none"
                            strokeWidth="5"
                            stroke="#4bbcff"
                            d="M14,26 L 22,33 L 35,16"
                            initial={false}
                            strokeDasharray="0 1"
                            onAnimationComplete={() => { if (isComplete) setWidth(w => w + window.innerWidth); setIsComplete(false) }}
                            style={{ pathLength }}
                        />
                    </svg>
                    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: isComplete ? 1 : 0 }}>NEW PAGE</motion.h2>
                </div>
            </motion.div>
        </ScrollContainer>
    )
}

