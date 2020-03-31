import * as React from "react"
import { useStore, ICard } from "."
import interact from "interactjs"


export const useDragnResize = (ref: React.RefObject<HTMLDivElement>, restrictParent: boolean = false, data: ICard) => {

    let [pos, setPos] = React.useState(data.pos)
    let setMoving = useStore(s => s.setMoving)
    let [dims, setDims] = React.useState(() => {
        let rect = ref.current?.getBoundingClientRect()
        return { w: rect?.width, h: rect?.height }
    })

    React.useEffect(() => {
        ref.current!!.style.boxSizing = 'border-box'
        ref.current!!.style.transform = `translate(${pos.x}px, ${pos.y}px)`
        interact(ref.current as any)
            .draggable({
                // enable inertial throwing
                inertia: false,
                // keep the element within the area of it's parent
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: '#concepts',
                        endOnly: true,
                        enabled: true
                    })
                ],
                autoScroll: true,
                listeners: {
                    // call this function on every dragmove event
                    start: (event: any) => {
                        setMoving(data)
                    },
                    move: (event: Interact.DragEvent) => {
                        setPos(prev => {
                            let x = prev.x + event.dx
                            let y = prev.y + event.dy
                            data.pos = { x, y }
                            setMoving({ ...data, pos: { x, y } })
                            event.target.style.transform = `translate(${x}px, ${y}px)`
                            return { x, y }
                        })
                    },
                }
            })
            .resizable({
                edges: { left: false, right: true, bottom: true, top: false },
                listeners: {
                    move(event: Interact.ResizeEvent) {
                        let { width, height } = event.rect
                        event.target.style.width = width + 'px'
                        event.target.style.height = height + 'px'
                        setDims({ w: width, h: height })
                    }
                },
                modifiers: [
                    interact.modifiers.restrictSize({
                        // min: { width: 200, height: 150 }
                    })
                ],

                inertia: true
            })
        return () => { ref.current && interact(ref.current as any).unset() }
    }, [ref.current])

    return { dims }
}