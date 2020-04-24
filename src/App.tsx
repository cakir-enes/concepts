import * as React from 'react';
import interact from "interactjs"
import { useEffect, useRef, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux"
import store, { move, setAside, moved } from './store/Cards';
import { AppState } from "./store/Cards"

const dummyCards = {
    item1: { id: "item1" },
    item2: { id: "item2" },
    item3: { id: "item3" },
    item4: { id: "item4" },
}

const dummyLocs = {
    main: ["item1", "item2", "item3", "item4"],
    drop1: [],
    drop2: []
}

const App: React.FC = (props) => {

    let [concepts, cards] = useSelector((s: AppState) => [s.concepts, s.cards])
    let dispatch = useDispatch()

    useEffect(() => {
        const dropzoneCleaner = initDropzones((dropzoneId, itemId) => {
            if (dropzoneId === "aside")
                dispatch(setAside({ cardId: itemId, srcId: "" }))
            else
                dispatch(move({ destId: dropzoneId, cardId: itemId }))
        })
        const dragResizeCleaner = initItemDragResizer((id, x, y) => {
            dispatch(moved({ id, x, y }))
        })

        return () => {
            console.log("Cleaning up")
            dropzoneCleaner()
            dragResizeCleaner()
        }
    }, [])


    return (

        <div>
            <Aside />
            <Concept />
        </div>
    )
}

interface IConcept {
    id: string
    cards: ICard[]
}

interface ICard {
    id: string
}

const Aside: React.FC<{}> = (props) => {
    let cards = useSelector((s: AppState) => s.aside.cards.map(id => s.cards.byId[id]))
    return (
        <div id="aside" className="dropzone" style={{ position: "absolute", width: "200px", height: "500px", top: "25vh", left: "-50px", background: "yellow", zIndex: 2 }}>
            {cards.map(card => (<Card key={card.id} id={card.id} />))}
        </div>
    )
}

const Concept: React.FC<{}> = (props) => {
    let concept = useSelector((s: AppState) => s.concepts.byId[s.activeConcept])
    let cards = useSelector((s: AppState) => concept.cards.map(id => s.cards.byId[id]))

    return (
        <div id={concept.id} className="dropzone" style={{ width: "500px", height: "500px", margin: "15px", background: "red" }}>
            {cards.map(c => (<Card key={c.id} id={c.id} />))}
        </div>)
}

const Card: React.FC<{ id: string }> = (props) => {
    const pos = useSelector((s: AppState) => s.positions[props.id])
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!ref.current) return
        const target = ref.current

        // translate the element
        // target.style.webkitTransform =
        //     target.style.transform =
        //     'translate(' + pos.x + 'px, ' + pos.y + 'px)'

        // update the posiion attributes
        // target.setAttribute('data-x', x + "")
        // target.setAttribute('data-y', y + "")
    }, [ref.current, pos])

    return (<div id={props.id} ref={ref}
        className="item"
        style={{ zIndex: 3, margin: "10px", width: "100px", height: "100px", background: "black", position: "absolute", top: pos.y, left: pos.x }}>
        {props.id}
    </div>)
}

function initDropzones(onDrop: (dropzoneId: string, itemId: string) => void) {
    const inter = interact(".dropzone")
    inter.dropzone({
        accept: ".item",
        ondrop: evt => {
            const zoneId = evt.target.id
            const itemId = evt.relatedTarget.id
            onDrop(zoneId, itemId)
        },
        ondropactivate: evt => {
            const zoneId = evt.target.id
            // console.log(`${zoneId} activated`)
        },
        ondropdeactivate: evt => {
            const zoneId = evt.target.id
            // console.log(`${zoneId} deactivated`)
        }
    })
    return () => inter.unset()
}

function initItemDragResizer(onMoveEnd: (id: string, x: number, y: number) => void) {
    const inter = interact(".item")
        .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true,
                    enabled: false
                })
            ],
            autoScroll: true,
            listeners: {
                end: (evt: Interact.DragEvent) => {
                    const target = evt.target
                    // keep the dragged position in the data-x/data-y attributes
                    const x = (parseFloat(target.getAttribute('data-x') || "0")) + evt.dx
                    const y = (parseFloat(target.getAttribute('data-y') || "0")) + evt.dy
                    // onMoveEnd(target.id, x, y)
                },
                // call this function on every dragmove event
                move: (event: Interact.DragEvent) => {
                    const target = event.target
                    // keep the dragged position in the data-x/data-y attributes
                    // const x = (parseFloat(target.getAttribute('data-x') || "0")) + event.dx
                    // const y = (parseFloat(target.getAttribute('data-y') || "0")) + event.dy
                    onMoveEnd(target.id, event.dx, event.dy)
                    // // translate the element
                    // target.style.webkitTransform =
                    //     target.style.transform =
                    //     'translate(' + x + 'px, ' + y + 'px)'

                    // // update the posiion attributes
                    // target.setAttribute('data-x', x + "")
                    // target.setAttribute('data-y', y + "")
                }
            }
        })
        .resizable({
            edges: { left: false, right: true, bottom: true, top: false },
            listeners: {
                move(event: Interact.ResizeEvent) {
                    let { width, height } = event.rect
                    event.target.style.width = width + 'px'
                    event.target.style.height = height + 'px'
                }
            },
            modifiers: [
                interact.modifiers.restrictSize({
                    min: { width: 50, height: 50 }
                })
            ],
            inertia: true
        })
    return () => inter.unset()
}

export default App;
