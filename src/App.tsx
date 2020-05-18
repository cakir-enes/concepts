import * as React from 'react';
import { useSelector, useDispatch } from "react-redux"
import { AppState } from "./store/Cards"
import { Rnd } from "react-rnd"
import { Overlay } from './Overlay';
import ScrollContainer from "react-indiana-drag-scroll"
import { motion, Variants, useTransform, useElementScroll, AnimatePresence } from "framer-motion"
import { Concept } from './Concept';
import { closeSpring } from './Card';



const App: React.FC = () => {

    let [] = useSelector((s: AppState) => [s.concepts, s.cards])

    return (

        <>
            <References />
            <Concept />
            <Overlay />
        </>
    )
}


const References: React.FC<{}> = (props) => {

    let editing = useSelector((s: AppState) => s.editing)

    return <AnimatePresence>
        {
            editing &&
            <motion.div
                id="references"
                initial={{ opacity: 0, translateX: -400 }}
                transition={{ ...closeSpring, delay: 0.2 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: 400 }}
                style={{ position: "absolute", zIndex: 4, right: 0, top: "10%", bottom: "10%", width: "45%", height: "80%", background: "red", display: "grid", gridTemplateRows: "1fr 1fr", gridGap: "50px" }}>
                <IncomingReferences />

                <IncomingReferences />
            </motion.div>
        }
    </AnimatePresence>

}

const IncomingReferences: React.FC<{}> = (props) => {
    return (
        <div style={{ height: "100%", width: "100%", background: "blue" }}></div>
    )
}



// const Card: React.FC<{ id: string }> = (props) => {
//     const [card, pos] = useSelector((s: AppState) => [s.cards.byId[props.id], s.positions[props.id]])
//     const ref = useRef<HTMLDivElement>(null)
//     const dispatch = useDispatch()
//     const position = useRef({ x: 0, y: 0 })

//     useEffect(() => {
//         console.log(card.location)
//     }, [card.location])

//     useEffect(() => {
//         if (!ref.current) return

//         let inter: any = InteractJS.default(ref.current)
//         inter.draggable({
//             listeners: {
//                 move(event: any) {
//                     let pos = position.current
//                     pos.x += event.dx
//                     pos.y += event.dy

//                     event.target.style.transform =
//                         `translate(${pos.x}px, ${pos.y}px)`
//                 },
//                 end(event: any) {
//                     let pos = position.current
//                     console.log(pos.x, pos.y)
//                     if (pos.x < - 100) {
//                         pos.x = -100
//                         pos.y = window.innerHeight / 2 - 150
//                         event.target.style.transform =
//                             `translate(${pos.x}px, ${pos.y}px)`
//                         dispatch(setAside({ srcId: card.location, cardId: card.id }))
//                     } else {
//                         dispatch(moved({ id: props.id, x: position.current.x, y: position.current.y }))
//                     }
//                 }
//             }
//         }
//         )
//     }, [])

//     return (
//         <div
//             ref={ref}
//             className="card"
//             id={props.id}
//             style={{
//                 background: "cyan", zIndex: 2, position: false ? "fixed" : "absolute", height: "200px", width: "400px", touchAction: "none",
//             }}
//         >
//             {/* <button onClick={() => dispatch(startEditing({ cardId: props.id, conceptId: card.location }))}>EDIT</button> */}
//             {/* {props.id} */}
//         </div>
//     )
// }
export default App;

