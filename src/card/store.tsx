import * as React from "react";
import create from "zustand"
import { ICardStore } from "."

export const CardStore = React.createContext<Partial<ICardStore>>({})

export const [useStore] = create<ICardStore>(set => ({
    moving: null,
    setMoving: c => set(s => { console.log("setting shitty"); return ({ moving: c }) }),
    drop: () => set(s => {
        if (!s.moving || (s.moving && s.dropzone.indexOf(s.moving) >= 0)) return s
        let i = s.cards.indexOf(s.moving)
        return ({ cards: [...s.cards.slice(0, i), ...s.cards.slice(i + 1)], dropzone: [...s.dropzone, s.moving], moving: null })
    }),
    cards: [{}, {}],
    dropzone: []
}))