// export const Card: React.FC<{ id: string }> = (props) => {
//     const [card, pos, editing] = useSelector((s: AppState) => [s.cards.byId[props.id], s.positions[props.id], s.editing?.cardId === props.id])
//     const dispatch = useDispatch()
//     const [hover, setHover] = React.useState(false)
//     return (
//         <Rnd
//             className="card"
//             position={pos}
//             id={props.id}
//             default={{ height: "200px", width: "200px", x: 0, y: 0 }}
//             onDragStop={(e, d) => {
//                 dispatch(moved({ id: props.id, x: d.x, y: d.y }))
//             }}
//             enableUserSelectHack={false}
//             dragHandleClassName="drag-handle"
//             onMouseEnter={() => setHover(true)}
//             onMouseLeave={() => setHover(false)}
//             style={{
//                 zIndex: 2,
//                 display: "grid", gridTemplateRows: "1fr 35px 4px",
//                 opacity: editing ? 0 : 1,
//                 position: card.location == "aside" ? "fixed" : "absolute"
//             }}
//         >
//             <div>
//                 {props.id}
//             </div>
//             <div className="drag-handle"
//                 style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "1fr 24px 24px", alignContent: "center", pointerEvents: "auto" }}>
//                 <span className="tags" style={{ fontSize: "11px", marginTop: "auto", color: "#D73A49" }}>#programming, clojure, data</span>
//                 <motion.button style={btnStyle}
//                     onClick={() => { dispatch(startEditing({ cardId: props.id, conceptId: card.location })) }}
//                     animate={{ translateX: hover ? 0 : 50, scale: hover ? 1 : 0 }}>
//                     <GrEdit style={{ marginTop: "2px" }} />
//                 </motion.button>
//                 <motion.button style={btnStyle}
//                     animate={{ translateX: hover ? 0 : 55, scale: hover ? 1 : 0 }}>
//                     <GrClose style={{ marginTop: "2px" }} />
//                 </motion.button>
//             </div>
//         </Rnd >
//     )
// }
export const openSpring = { type: "spring", stiffness: 200, damping: 30 };
export const closeSpring = { type: "spring", stiffness: 300, damping: 35 };
