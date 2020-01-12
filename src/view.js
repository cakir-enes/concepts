import React, { useState, useCallback, useEffect, useMemo, useRef, forwardRef } from 'react'
import Moveable from "react-moveable"; // preact-moveable
import { Rnd } from "react-rnd"
import { Scroller } from "./components/scroller"
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window"
import create from 'zustand';

const poses = [{x: 150, y: 0}]

const [useStore] = create(set => ({
    cards:  [],
    positions: [],
}))

const Card = ({ val }) => {
    const [pos, setPos] = useState(poses[0])
    const [size, setSize] = useState({w: 400, h: 190})
    a = [].reduce()
    return (
        <div
        // style={{
        //     zIndex: 4
        // }}
        >
            <Rnd
                default={{
                    x: pos.x,
                    y: pos.y,
                    width: size.w,
                    height: size.h
                }}
                onDragStop={(e,d) => {setPos({x: d.x, y: d.y}); poses[0] = {x: d.x, y: d.y}}}
                minWidth={500}
                minHeight={190}
                bounds="window"
                enableUserSelectHack={false}
            >
                <div
                    className="box"
                    style={{ background: "blue", margin: 0, height: '100%', padding: '12px' }}
                >
                    <textarea style={{ width: "100%", height: "100%" }} defaultValue={val} />
                </div>
            </Rnd>
        </div>
    )
}

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
    console.log(e.target)
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
export const View = () => {
    const listRef = useRef()

    return (
        <div className="view">
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        className="List"
                        // direction="horizontal"
                        layout="horizontal"
                        height={height}
                        itemCount={4}
                        itemSize={width}
                        width={width}
                        // ref={listRef}
                        outerElementType={outerElementType}
                        innerRef={listRef}
                    >
                        {Row}

                    </List>
                )}
            </AutoSizer>
            <Scroller elemSupplier={() => document.getElementsByClassName("List")[0]} direction="left" />
            <Scroller elemSupplier={() => document.getElementsByClassName("List")[0]} direction="right" />
        </div>
    )
}