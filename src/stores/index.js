import React from 'react';
import create from 'zustand';
import produce from "immer"
import { Card } from '../components';


export const dims = Array.from({length: 8}, () => ({x: 150, y: 0,  w: 250, h: 250}))

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
    dragCard: (i) => set({draggingCard: i}),
    maxWidth: 0,
    updateWidth: w => set({maxWidth: w})
}))

export const [useDraggingCard] = create(log(immer(set => ({
    info: {},
    cardDragged: (info) => set(s => ({info})),
}))))


export const [useContent] = create(log(immer(set => ({
    content: ["ABC", "VIKVIKVIK", "ZXCZCXCXZ"],
    sizesAndPoses: dims,
    addCard: (card) => set({content: [...content, card]}),
    remCardWithIndex: (i) => set(s => {
       s.content[i] = null
       s.content.filter(c => c !== null)
    }),
    cardWithIndex: (i) => get().content[i],
    updateCardSize: (index, newSize) => set(s => {
        const sizeAndPose = s.sizesAndPoses[index]
        s.sizesAndPoses[index] = {...sizeAndPose, w: newSize.w, h: newSize.h}
      }),
      updateCardPosition: (index, newPos) => set(s => {
        const sizeAndPose = s.sizesAndPoses[index]
        s.sizesAndPoses[index] = {...sizeAndPose, x: newPos.x, y: newPos.y}
      })      
}))))

export const [useAsideStore] = create(log(immer(set => ({
    cards: [],
    asideCard: (info) => set(s => ({info})),
}))))
