import React, { useState, useCallback, useEffect, useMemo } from 'react'
import Moveable from "react-moveable"; // preact-moveable
import { Rnd } from "react-rnd"
import {Scroller} from "./components/scroller"

const Card = () => {
    const [state, setState] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
    return (
        <div
        // style={{
        //     width: '800px',
        //     height: '400px',
        // }}
        >
            <Rnd
                default={{
                    x: 150,
                    y: 205,
                    width: 500,
                    height: 190,
                }}
                minWidth={500}
                minHeight={190}
                bounds="window"
                enableUserSelectHack={false}
            >
                <Box />
            </Rnd>
        </div>
    )
}

const Box = () => (
    <div
        className="box"
        style={{ margin: 0, height: '100%', padding: '12px' }}
    >
        <textarea style={{ width: "100%", height: "100%" }} defaultValue="ASDASDAS" />
    </div>
);



export const View = () => {
    return (
        <div className="view">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Scroller direction="left" />
            <Scroller direction="right" />
        </div>
    )
}