import { createSlice, PayloadAction, configureStore, createEntityAdapter } from "@reduxjs/toolkit"

export type AppState = {
    activeConcept: string | "default",
    positions: {
        [key: string]: { x: number, y: number }
    },
    aside: {
        id: "aside",
        cards: string[]
    },
    concepts: {
        byId: { [key: string]: { id: string, cards: string[] } },
        allIds: string[]
    },
    cards: {
        byId: { [key: string]: { id: string, location: string, content: string | undefined } },
        allIds: string[]
    }
}

const initialState: AppState = {
    activeConcept: "default",
    aside: {
        id: "aside",
        cards: []
    },
    concepts: {
        byId: {
            default: {
                id: "default",
                cards: ["item1", "item2", "item3"]
            },
            main: {
                id: "main",
                cards: []
            },
            drop1: {
                id: "drop1",
                cards: []
            }
        }, allIds: ["default", "main", "drop1"]
    },
    positions: {
        "item1": { x: 0, y: 0 },
        "item2": { x: 0, y: 0 },
        "item3": { x: 0, y: 0 }
    },
    cards: {
        byId: {
            item1: {
                id: "item1",
                location: "default",
                content: undefined
            },
            item2: {
                id: "item2",
                location: "default",
                content: undefined
            },
            item3: {
                id: "item3",
                location: "default",
                content: undefined
            }
        }, allIds: ["item1", "item2", "item3"]
    }
}

const { actions, reducer } = createSlice({
    name: "state",
    initialState: initialState,
    reducers: {
        move(state, { payload }: PayloadAction<{ destId: string, cardId: string }>) {
            const card = state.cards.byId[payload.cardId]
            const origConcept = card.location === "aside" ? state.aside : state.concepts.byId[card.location]
            const targetConcept = state.concepts.byId[payload.destId]
            if (origConcept.id === targetConcept.id)
                return
            card.location = targetConcept.id
            targetConcept.cards.push(card.id)
            delete origConcept.cards[origConcept.cards.findIndex(id => id === card.id)]
        },
        setAside(state, { payload }: PayloadAction<{ srcId: string, cardId: string }>) {
            const card = state.cards.byId[payload.cardId]
            if (card.location === "aside") return
            const origConcept = state.concepts.byId[card.location]
            card.location = "aside"
            delete origConcept.cards[origConcept.cards.findIndex(id => id === payload.cardId)]
            state.aside.cards.push(card.id)
        },
        moved(state, { payload }: PayloadAction<{ id: string, x: number, y: number }>) {
            const pos = state.positions[payload.id]
            pos.x = payload.x
            pos.y = payload.y

            if (pos.x < -100) {
                if (state.aside.cards.findIndex(id => id === payload.id) < 0)
                    state.aside.cards.push(payload.id)
                pos.x = -100
                pos.y = window.innerHeight / 2 - 150
            } else {
                const idx = state.aside.cards.findIndex(id => id === payload.id)
                if (idx < 0) return
                state.aside.cards.splice(idx, 1)
            }
        }
    }
})

const store = configureStore({ reducer })
export const { move, setAside, moved } = actions

export default store