import create from 'zustand';

export const poses = Array.from({length: 8}, ()  => ({x: 150, y: 0}))
export const dims = Array.from({length: 8}, () => ({w: 250, h: 250}))

export const [useStore] = create(set => ({
    cards:  [],
    draggingCard: null,
    dragCard: (i) => set({draggingCard: i}),
    maxWidth: 0,
    updateWidth: w => set({maxWidth: w})
}))