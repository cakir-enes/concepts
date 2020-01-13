import React from "react";
import ReactDOM from "react-dom";
import {Concept} from "./components"
import 'react-virtualized/styles.css';

var mountNode = document.getElementById("app");
ReactDOM.render(<Concept />  , mountNode);
