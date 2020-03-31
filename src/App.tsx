
import * as React from 'react';
import { Aside } from './aside';
import { Concept } from "./concept"


const App = () => {
  return (
    <div style={{ display: "grid", height: "800px", gridTemplateColumns: "1fr 10fr" }}>
      <Aside />
      <Concept />
    </div>

  )
}

export default App;
