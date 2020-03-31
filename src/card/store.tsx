import * as React from "react";
import create from "zustand"
import { ICardStore } from "."

export const CardStore = React.createContext<Partial<ICardStore>>({})

export const [useStore] = create<ICardStore>(set => ({
    moving: null,
    setMoving: c => set(s => { return ({ moving: c }) }),
    drop: (to: "aside" | "concept") => set(s => {
        if (!s.moving) return s

        let sameArea = s.moving.location == to
        console.assert(!sameArea, "Moving.")

        if (sameArea)
            return s

        switch (to) {
            case "aside": {
                let i = findIndex(s.cards, (v) => v.id == s.moving?.id)
                console.assert(i != -1, "Somethings wrong")
                return ({ cards: remove(s.cards, i), dropzone: [...s.dropzone, s.moving], moving: null })
            }
            case "concept": {
                let i = findIndex(s.dropzone, (v) => v.id == s.moving?.id)
                console.assert(i != -1, "Somethings wrong")
                return ({ dropzone: remove(s.dropzone, i), cards: [...s.cards, s.moving], moving: null })
            }
            default:
                return s
        }
    }),
    cards: [{ id: "a1", pos: { x: 0, y: 0 }, location: "concept" }, { id: "a2", pos: { x: 25, y: 120 }, location: "concept" }],
    dropzone: []
}))


function remove<T>(arr: Array<T>, i: number): T[] {
    return [...arr.slice(0, i), ...arr.slice(i + 1)]
}

function findIndex<T>(arr: Array<T>, pred: (val: T) => boolean): number {
    for (let i = 0; i < arr.length; i++) {
        if (pred(arr[i]))
            return i
    }
    return -1
}