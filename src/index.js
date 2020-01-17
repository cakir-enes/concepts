import React from "react";
import ReactDOM from "react-dom";
import {Concept, Aside} from "./components"
import 'react-virtualized/styles.css';

const App = () => <><Concept /><Aside /></>
var mountNode = document.getElementById("app");
ReactDOM.render(<App />  , mountNode);
