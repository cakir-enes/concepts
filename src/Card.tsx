import * as React from 'react';
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux"
import { moved, startEditing } from './store/Cards';
import { AppState } from "./store/Cards"
import { Rnd } from "react-rnd"


export const Card: React.FC<{ id: string }> = (props) => {
    const [card, pos] = useSelector((s: AppState) => [s.cards.byId[props.id], s.positions[props.id]])
    const ref = useRef<Rnd | null>(null)
    const dispatch = useDispatch()

    return (
        <Rnd
            ref={ref}
            className="card"
            position={pos}
            id={props.id}
            default={{ height: "200px", width: "200px", x: 0, y: 0 }}
            onDragStop={(e, d) => {
                dispatch(moved({ id: props.id, x: d.x, y: d.y }))
            }}
            style={{
                zIndex: 2, position: false ? "fixed" : "absolute"
            }}
        >
            <button onClick={() => dispatch(startEditing({ cardId: props.id, conceptId: card.location }))}>EDIT</button>
            {props.id}

        </Rnd >
    )
}