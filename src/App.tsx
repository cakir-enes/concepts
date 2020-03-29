
import * as React from 'react';
import interact from "interactjs"

interface Props {
  name: string
}


const useDraggable = (ref: React.RefObject<HTMLDivElement>, restrictParent: boolean = false) => {
  let [pos, setPos] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
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
    return () => { }
  }, [])
  return pos
}

const Shit = () => {
  const ref = React.createRef<HTMLDivElement>()
  const pos = useDraggable(ref)
  return <div className="ZXC" ref={ref}>
    <h2>ASDASD</h2>
  </div>
}

const App = ({ name }: { name: String }) => {

  return (
    <div><Shit /></div>
  )
}

export default App;
