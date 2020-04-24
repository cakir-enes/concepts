import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './App';
import "./styles.css";
import { Provider } from 'react-redux';
import store from './store/Cards';

var mountNode = document.getElementById("app");
ReactDOM.render(<Provider store={store}> <App /> </Provider>, mountNode);
