import React from 'react';
import create from 'zustand';
import { Card } from '../components';


export const dims = Array.from({length: 8}, () => ({x: 150, y: 0,  w: 250, h: 250}))

export const [useStore] = create(set => ({
    draggingCard: null,
    dragCard: (i) => set({draggingCard: i}),
    maxWidth: 0,
    updateWidth: w => set({maxWidth: w})
}))

export const [useDraggingCard] = create(set => ({
    pos: null,
    size: null,
    index: null
}))


export const [useContent] = create((set, get) => ({
    content: ["ABC", "VIKVIKVIK", "ZXCZCXCXZ"],
    sizesAndPoses: dims,
    addCard: (card) => set({content: [...content, card]}),
    // remCardWithIndex: (i) => set(s => {content: s.content}),
    cardWithIndex: (i) => get().content[i]
}))