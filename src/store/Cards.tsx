import { createSlice, PayloadAction, configureStore, createEntityAdapter } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

export interface AppState {
    activeConcept: string | "default",
    positions: {
        [key: string]: { x: number, y: number }
    },
    dimensions: {
        [key: string]: { w: number, h: number }
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
    },
    references: {
        [cardId: string]: { incoming: string[], outgoing: string[] }
    },
    lastTouched: string[],
    editing: {
        cardId: string,
    } | undefined,
}




const initialState: AppState = {
    activeConcept: "default",
    editing: undefined,
    aside: {
        id: "aside",
        cards: []
    },
    lastTouched: [],
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
    references: {
        "item1": { incoming: ["item2", "item3"], outgoing: [] },
        "item2": { incoming: [], outgoing: [] },
        "item3": { incoming: [], outgoing: [] },
    },
    positions: {
        "item1": { x: 0, y: 0 },
        "item2": { x: 0, y: 0 },
        "item3": { x: 0, y: 0 }
    },
    dimensions: {
        "item1": { w: 200, h: 200 },
        "item2": { w: 200, h: 200 },
        "item3": { w: 200, h: 200 }
    },
    cards: {
        byId: {
            item1: {
                id: "item1",
                location: "default",
                content: `Egestas ipsum eget etiam pulvinar elit nulla. Diam libero tellus elementum sapien enim. Condimentum bibendum turpis felis nibh lobortis odio. Ornare interdum condimentum aliquet massa bibendum id risus. Elementum, ultrices phasellus tellus duis. Aliquam nunc ut cursus scelerisque. Tempus enim, lorem enim vulputate massa ut. Donec pulvinar ut lorem odio ut non. Sit faucibus suscipit nec eget non. Aenean est in sagittis, hendrerit neque risus morbi. Gravida malesuada feugiat amet venenatis pretium eget volutpat et. Arcu volutpat id nulla erat eget ligula.
                Id etiam in faucibus in. Cursus tempus egestas dui volutpat suspendisse. Sed ultrices gravida in proin. In vel vulputate.`
            },
            item2: {
                id: "item2",
                location: "default",
                content: `Egestas ipsum eget etiam pulvinar elit nulla. Diam libero tellus elementum sapien enim. Condimentum bibendum turpis felis nibh lobortis odio. Ornare interdum condimentum aliquet massa bibendum id risus. Elementum, ultrices phasellus tellus duis. Aliquam nunc ut cursus scelerisque. Tempus enim, lorem enim vulputate massa ut. Donec pulvinar ut lorem odio ut non. Sit faucibus suscipit nec eget non. Aenean est in sagittis, hendrerit neque risus morbi. Gravida malesuada feugiat amet venenatis pretium eget volutpat et. Arcu volutpat id nulla erat eget ligula.
                Id etiam in faucibus in. Cursus tempus egestas dui volutpat suspendisse. Sed ultrices gravida in proin. In vel vulputate.`
            },
            item3: {
                id: "item3",
                location: "default",
                content: `Egestas ipsum eget etiam pulvinar elit nulla. Diam libero tellus elementum sapien enim. Condimentum bibendum turpis felis nibh lobortis odio. Ornare interdum condimentum aliquet massa bibendum id risus. Elementum, ultrices phasellus tellus duis. Aliquam nunc ut cursus scelerisque. Tempus enim, lorem enim vulputate massa ut. Donec pulvinar ut lorem odio ut non. Sit faucibus suscipit nec eget non. Aenean est in sagittis, hendrerit neque risus morbi. Gravida malesuada feugiat amet venenatis pretium eget volutpat et. Arcu volutpat id nulla erat eget ligula.
                Id etiam in faucibus in. Cursus tempus egestas dui volutpat suspendisse. Sed ultrices gravida in proin. In vel vulputate.`
            }
        }, allIds: ["item1", "item2", "item3"]
    }
}

const { actions, reducer } = createSlice({
    name: "state",
    initialState: initialState,
    reducers: {
        // move(state, { payload }: PayloadAction<{ destId: string, cardId: string }>) {
        //     const card = state.cards.byId[payload.cardId]
        //     const origConcept = card.location === "aside" ? state.aside : state.concepts.byId[card.location]
        //     const targetConcept = state.concepts.byId[payload.destId]
        //     if (origConcept.id === targetConcept.id)
        //         return
        //     card.location = targetConcept.id
        //     targetConcept.cards.push(card.id)
        //     delete origConcept.cards[origConcept.cards.findIndex(id => id === card.id)]
        // },
        setAside(state, { payload }: PayloadAction<{ srcId: string, cardId: string }>) {
            const card = state.cards.byId[payload.cardId]
            if (card.location === "aside") return
            // const origConcept = state.concepts.byId[card.location]
            card.location = "aside"
            // delete origConcept.cards[origConcept.cards.findIndex(id => id === payload.cardId)]
            state.aside.cards.push(card.id)
        },
        move(state, { payload }: PayloadAction<{ id: string, x: number, y: number }>) {
            const pos = state.positions[payload.id]
            const card = state.cards.byId[payload.id]
            pos.x = payload.x
            pos.y = payload.y

            if (pos.y < -100) {
                if (state.aside.cards.findIndex(id => id === payload.id) < 0) {
                    card.location = "aside"
                    state.aside.cards.push(payload.id)
                }
                pos.y = -100
                pos.x = window.innerWidth / 4
            } else {
                const idx = state.aside.cards.findIndex(id => id === payload.id)
                if (idx < 0) return
                state.aside.cards.splice(idx, 1)
                card.location = state.activeConcept
            }
        },
        resize(state, { payload }: PayloadAction<{ id: string, w: number, h: number }>) {
            const dim = state.dimensions[payload.id]
            dim.w = payload.w
            dim.h = payload.h
        },
        startEditing(state, { payload }: PayloadAction<{ cardId: string, conceptId: string }>) {
            state.editing = { cardId: payload.cardId }
        },
        stopEditing(state, _: PayloadAction<null | undefined>) {
            state.editing = undefined
        }

    }
})

const store = configureStore({ reducer })
export const { move, resize, setAside, startEditing, stopEditing } = actions

export default store