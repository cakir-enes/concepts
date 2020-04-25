import * as React from 'react';
import interact from "interactjs"
import { useEffect, useRef, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux"
import store, { move, setAside, moved } from './store/Cards';
import { AppState } from "./store/Cards"
import { Rnd } from "react-rnd"

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
    let cards = useSelector((s: AppState) => concept.cards.map(id => s.cards.byId[id]).filter(card => card.location !== "aside"))

    return (
        <div id={concept.id} className="dropzone" style={{ width: "100wh", height: "calc(100vh - 35px)", margin: "15px", background: "red" }}>
            {cards.map(c => (<Card key={c.id} id={c.id} />))}
        </div>)
}

const Card: React.FC<{ id: string }> = (props) => {
    const card = useSelector((s: AppState) => s.cards.byId[props.id])
    const pos = useSelector((s: AppState) => s.positions[props.id])
    const ref = useRef<Rnd | null>(null)
    const dispatch = useDispatch()

    return (
        <Rnd
            ref={ref}
            className="card"
            position={pos}
            onDragStop={(e, d) => {
                dispatch(moved({ id: props.id, x: d.x, y: d.y }))
            }}
            style={{
                width: "50px", height: "50px", background: "cyan", zIndex: 2
            }}
        >
            {props.id}
        </Rnd>
    )
}
export default App;
