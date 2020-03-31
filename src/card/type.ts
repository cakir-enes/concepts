export type ICard = {}
export type ICardStore = { cards: ICard[], dropzone: ICard[], moving: ICard | null, setMoving: (c: ICard) => void, drop: (c: ICard) => void }