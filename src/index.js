import React from "react";
import ReactDOM from "react-dom";
import { View } from "./view";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window"


const Row = ({ index, style }) => (
  <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
    Row {index}
  </div>
);

const Example = () => (
  <AutoSizer>
    {({ height, width }) => (
      <List
        className="List"
        // direction="horizontal"
        // layout="horizontal"
        height={height}
        width={width}
        itemCount={1000}
        itemSize={35}
      >
        {Row}
      </List>
    )}
  </AutoSizer>
);

var mountNode = document.getElementById("app");
ReactDOM.render(<View />, mountNode);
