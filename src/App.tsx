
import * as React from 'react';
import interact from "interactjs"

interface Props {
  name: string
}


const useDragnResize = (ref: React.RefObject<HTMLDivElement>, restrictParent: boolean = false) => {
  
  let [pos, setPos] = React.useState({ x: 0, y: 0 })

  let [dims, setDims] = React.useState(() => {
    let rect = ref.current?.getBoundingClientRect()
    return {w: rect?.width || 0, h: rect?.height || 0}})
  

  React.useEffect(() => {
    ref.current!!.style.boxSizing = 'border-box'
    interact(ref.current as any)
      .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true,
            enabled: restrictParent
          })
        ],
        autoScroll: true,
        listeners: {
          // call this function on every dragmove event
          move: (event: Interact.DragEvent) => {
            setPos(prev => {
              let x = prev.x + event.dx
              let y = prev.y + event.dy
              event.target.style.transform = `translate(${x}px, ${y}px)`
              return { x, y }
            })
          }
        }
      })
      .resizable({
        edges: { left: false, right: true, bottom: true, top: false },
        listeners: {
          move (event: Interact.ResizeEvent) {
            let {width, height} = event.rect
            event.target.style.width = width + 'px'
            event.target.style.height = height + 'px'
            setDims({w: width, h: height})
          }
        },
        modifiers: [
          interact.modifiers.restrictSize({
            min: { width: 200, height: 150 }
          })
        ],
    
        inertia: true
      })
    return () => { }
  }, [ref.current])
  
  return {pos, dims}
}

const Shit = () => {
  const ref = React.createRef<HTMLDivElement>()
  const pos = useDragnResize(ref)
  return <div className="ZXC" ref={ref} style={{background: "red"}}>
    <h2>ASDASD</h2>
  </div>
}

const App = ({ name }: { name: String }) => {

  return (
    <div><Shit /></div>
  )
}

export default App;
