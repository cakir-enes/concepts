import React, { useState, useLayoutEffect, useEffect, useMemo, useRef, forwardRef } from 'react'
import Moveable from "react-moveable"; // preact-moveable
import { Scroller } from "./components/scroller"
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window"
import create from 'zustand';
import 'react-virtualized/styles.css';
import {Collection} from "react-virtualized"
import { Card } from './components/Card';

export const poses = Array.from({length: 8}, ()  => ({x: 150, y: 0}))
export const dims = Array.from({length: 8}, () => ({w: 250, h: 250}))

const [useStore] = create(set => ({
    cards:  [],
    draggingCard: null,
    dragCard: (i) => set({draggingCard: i}),
    maxWidth: 0,
    updateWidth: w => set({maxWidth: w})
}))


const Box = () => (
    <div
        className="box"
        style={{ background: "blue", margin: 0, height: '100%', padding: '12px' }}
    >
        <textarea style={{ width: "100%", height: "100%" }} defaultValue="ASDASDAS" />
    </div>
);

function handleOnWheel(e) {
    // Your handler goes here ...
    // console.log(e.target)
    // console.log("handleOnWheel()",e.deltaY);
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={e => { handleOnWheel(e) }} {...props} />
));

const Row = ({ index, style }) => (
    <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
        <Card val={index + "0"} />
        <Card val={index + "1"} />
        <Card val={index + "2"} />
    </div>
);

export const Vieww = () => {
    return (

        <AutoSizer>

        </AutoSizer>
    )
}
function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
  
const cellRenderer = ({index, key, style}) => <div key={key} style={style}><Card index={index} val={index} /></div>
const cellSizeAndPositionGetter = ({index}) => ({height: dims[index].h, width: dims[index].w, x: poses[index].x, y: poses[index].y})

export const View = () => {
    const listRef = useRef()
    const [w, _] = useWindowSize()
    const updateWidth = useStore(s => s.updateWidth)
    useEffect(() => {
        console.log("W: " + w)
        updateWidth(w)}
        , [])
    useEffect(() => {
        console.log("WW: " + w)
        updateWidth(w)
    }, [w])
    return (
        <div className="view" ref={listRef}>
            
            <Collection
            className="List"
           cellCount={poses.length}
           cellRenderer={cellRenderer}
           cellSizeAndPositionGetter={cellSizeAndPositionGetter}
           height={800}
           width={3400}
           
           />
            
        </div>
    )
}