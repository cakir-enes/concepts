import React from 'react';
import create from 'zustand';
import produce from "immer"
import { Card } from '../components';


export const dims = Array.from({ length: 8 }, () => ({ x: 150, y: 0, w: 250, h: 250 }))

// Log every time state is changed
const log = config => (set, get, api) => config(args => {
    // console.log("  applying", args)
    set(args)
    console.log("  new state", get())
}, get, api)

// Turn the set method into an immer proxy
const immer = config => (set, get, api) => config(fn => set(produce(fn)), get, api)

export const [useStore] = create(set => ({
    draggingCard: null,
    dragCard: (i) => set({ draggingCard: i }),
    maxWidth: 0,
    updateWidth: w => set({ maxWidth: w })
}))

export const [useDraggingCard] = create(log(immer(set => ({
    info: {},
    cardDragged: (info) => set(s => ({ info })),
}))))


export const [useConceptStore] = create(log(immer(set => ({
    cards: [{ content: "ABC", type: "text", x: 150, y: 0, w: 250, h: 250 }, { content: "ABC", type: "text", x: 150, y: 0, w: 250, h: 250 }, { content: "ABC", type: "text", x: 150, y: 0, w: 250, h: 250 }],
    addCard: (card) => set({ content: [...content, card] }),
    remCardWithIndex: (i) => set(s => {
        s.cards = s.cards.filter((_, index) => index !== i)
        // s.content.filter(c => c !== null)
        console.log(s)
    }),
    updateCardSize: (index, newSize) => set(s => {
        s.cards[index].w = newSize.w
        s.cards[index].h = newSize.h
    }),
    updateCardPosition: (index, newPos) => set(s => {
        // const sizeAndPose = s.sizesAndPoses[index]
        // s.sizesAndPoses[index] = {...sizeAndPose, x: newPos.x, y: newPos.y}
        s.cards[index].x = newPos.x
        s.cards[index].y = newPos.y
    })
}))))

export const [useAsideStore] = create(log(immer(set => ({
    cards: [],
    aside: (card) => set(s => {
        s.cards.push(card)
    }),
}))))
