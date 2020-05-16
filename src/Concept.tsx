import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import { AppState } from "./store/Cards"
import ScrollContainer from "react-indiana-drag-scroll"
import { motion, useTransform, useElementScroll } from "framer-motion"
import { Card } from './Card';


export const Concept: React.FC<{}> = () => {
    let concept = useSelector((s: AppState) => s.concepts.byId[s.activeConcept])
    let cards = useSelector((s: AppState) => concept.cards.map(id => s.cards.byId[id]))
    let ref = useRef<HTMLElement | null>(null)
    let conceptRef = useRef<HTMLDivElement>(null)
    let { scrollXProgress } = useElementScroll(ref)
    let containerRef = useRef<HTMLDivElement>(null)

    // let ratio = useTransform(scrollXProgress, )
    let [width, setWidth] = useState(window.innerWidth)

    let [ratio, setRatio] = useState(0)
    let scale = useTransform(scrollXProgress, [ratio, 1.0], [0, 1])

    useEffect(() => {
        return scrollXProgress.onChange(p => {
            console.log(p)
            if (p > 0.999) {
                setWidth(w => w + window.innerWidth)
            }
        })
    }, [scrollXProgress])

    // TODO: Fix animation, ratio track
    useEffect(() => {
        if (!containerRef.current || !conceptRef.current) return
        let r = conceptRef.current.getBoundingClientRect().width / containerRef.current.getBoundingClientRect().width
        console.count(`RATIO: ${r}`)
        setRatio(r - 0.3)
    }, [width, containerRef, containerRef.current, conceptRef, conceptRef.current])


    return (
        <>
            <ScrollContainer
                ref={r => { ref.current = r?.getElement() ?? null }}
                className="scrolly"
                ignoreElements={".card"}
                style={{ position: "relative" }}
                hideScrollbars={false}>
                <motion.div style={{ display: "flex", width: "fit-content" }} ref={containerRef} layoutTransition>
                    <div id={concept.id} ref={conceptRef} className="dropzone patterno" style={{ minWidth: width, maxWidth: width, width: "auto", height: "calc(100vh - 35px)", display: "flex" }}>
                        {cards.map(c => (<Card key={c.id} id={c.id} />))}
                    </div>
                    <div className="add-page-container">
                        <motion.div className="add-page">
                            <motion.div className="add-page-filler" style={{ scaleY: scale }} />
                        </motion.div>
                        <motion.div className="add-page" style={{ transform: "translateX(-40px)" }}>
                            <motion.div initial={{ opacity: 0 }} className="add-page-filler" style={{ scaleY: scale, transform: "translateX(-40px)", opacity: scale }} />
                        </motion.div>
                    </div>
                </motion.div>
            </ScrollContainer>

        </>

    )
}