import * as React from "react"
import { useSelector } from "react-redux";
import { AppState } from "../store/Cards";
import { motion } from "framer-motion";
import { openSpring } from "../Springs"
import { RefCards, Reference } from "./index"

export const IncomingReferences: React.FC<{}> = (props) => {

    let cardId = useSelector((s: AppState) => s.editing?.cardId)
    let refIds = useSelector((s: AppState) => s.references[cardId ?? ""] ?? {}).incoming || []

    return (
        <Reference position="left">
            <RefCards cardIds={refIds} />
        </Reference>
    )
}