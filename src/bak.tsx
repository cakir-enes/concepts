import * as React from "react";
import { useEffect, useRef, useState } from "react";
import "./styles.css";
import interact from "interactjs";
import { motion, useMotionValue } from "framer-motion";

// export function Comp(props) {
//     let ref = useRef();
//     let [pos, setPos] = useState({ x: 0, y: 0 });
//     let [dim, setDim] = useState({ w: 100, h: 200 })
//     let [drag, setDrag] = useState(true);
//     let [open, setOpen] = useState(false);
//     let isOpen = React.useCallback(() => {
//         return open
//     }, [open])
//     let [prev, setPrev] = useState({ pos, dim })

//     useEffect(() => {
//         if (!ref.current) return;
//         console.count("register interactjs")
//         interact(ref.current)
//             .draggable({
//                 listeners: {
//                     start(event) {
//                         setDrag(true)
//                     },
//                     end(event) {
//                         setDrag(false)
//                     },
//                     move(event) {
//                         if (!isOpen())
//                             setPos(prev => ({ x: prev.x + event.dx, y: prev.y + event.dy }))
//                         else
//                             console.count("HERE")
//                     }
//                 }
//             })
//             .resizable({
//                 // resize from all edges and corners
//                 edges: { left: false, right: true, bottom: true, top: false },

//                 listeners: {
//                     start(event) {
//                         console.log("RESIZING")
//                         setDrag(true);
//                     },
//                     end(event) {
//                         setDrag(false);
//                     },
//                     move(event) {
//                         let [w, h] = [event.rect.width, event.rect.height]
//                         // console.log({ w, h })
//                         // dim.set({ w, h })
//                         if (!isOpen())
//                             setDim({ w, h })
//                         // var target = event.target;
//                         // var x = parseFloat(target.getAttribute("data-x")) || 0;
//                         // var y = parseFloat(target.getAttribute("data-y")) || 0;

//                         // // update the element's style
//                         // target.style.width = event.rect.width + "px";
//                         // target.style.height = event.rect.height + "px";
//                         // setDim({ w: event.rect.width, h: event.rect.height })

//                         // // translate when resizing from top or left edges
//                         // x += event.deltaRect.left;
//                         // y += event.deltaRect.top;
//                         // // setPos({ x, y })
//                         // target.style.webkitTransform = target.style.transform =
//                         //     "translate(" + x + "px," + y + "px)";

//                         // target.setAttribute("data-x", x);
//                         // target.setAttribute("data-y", y);
//                     }
//                 },
//                 modifiers: [
//                     // keep the edges inside the parent
//                     interact.modifiers.restrictEdges({
//                         outer: "parent"
//                     }),

//                     // minimum size
//                     interact.modifiers.restrictSize({
//                         min: { width: 100, height: 50 }
//                     })
//                 ],
//                 inertia: false
//             });
//     }, [ref]);

//     const toggle = (o) => {

//         if (o) {
//             setPrev({ pos, dim })
//             setPos({ x: 200, y: 200 })
//             setDim({ w: 200, h: 200 })
//         } else {
//             console.log("RESTOREING")
//             setPos(prev.pos)
//             setDim(prev.dim)
//         }

//     }



//     return (
//         <motion.div
//             ref={ref}
//             className="card"
//             layoutTransition={!drag}
//             style={{
//                 position: "absolute",
//                 width: dim.w,
//                 height: dim.h,
//                 top: pos.y,
//                 left: pos.x,
//                 boxSizing: "border-box",
//                 touchAction: "none",
//                 background: "black"
//             }}
//         >
//             <button onClick={() => {
//                 setOpen(o => {
//                     let newval = !o
//                     toggle(newval)
//                     return newval
//                 });

//             }}>
//                 {open ? "TRUE" : "FALSE"}
//             </button>
//             {props.children}
//         </motion.div>
//     );
// }


