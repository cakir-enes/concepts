import React from "react";
import ReactDOM from "react-dom";
import { View } from "./view";
import Moveable from "react-moveable"; // preact

var mountNode = document.getElementById("app");
ReactDOM.render(<View />, mountNode);
