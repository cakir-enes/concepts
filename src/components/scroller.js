import React, { useState, useCallback, useEffect, useMemo } from 'react'

export const Scroller = ({direction}) => {

    const [inertia, setInertia] = useState(0)

    const style = useMemo(() => {
        switch (direction) {
            case "right":
                return {width: "50px", height: "100vh", background: "red", position: "fixed", right: 0, top: 0}
            case "left":
                return {width: "50px", height: "100vh", background: "red", position: "fixed", left: 0, top: 0}
                
        }
    }, [direction])

    const scroll = useCallback(() => {
        const speed = Math.floor(Math.pow(2, inertia / 12))
        console.log("Scrolling " + speed)
        switch (direction) {
            case "right":
                window.scrollBy(speed, 0)
                break
            case "left":
                window.scrollBy(-speed, 0)
                break
            case "up":
                window.scrollBy(0, speed)
                break
            case "down":
                window.scrollBy(0, -speed)
                break
            default:
                console.error("Invalid Direction")
        }
    }, [inertia])

    const mouseMoved = useCallback((e) => {
        switch(direction) {
            case "right":
                setInertia(e.clientX - e.target.getBoundingClientRect().left)
                break
            case "left":
                setInertia(Math.abs(e.clientX - e.target.getBoundingClientRect().right))
                break
        }
    }, []) 

    const [token, setToken] = useState()
    const [hovering, setHovering] = useState(false)

    useEffect(() => {
        
        if (!hovering) {
            clearInterval(token)
            setToken(null)
        } else {
            clearInterval(token)
            setToken(setInterval(scroll, 10))
        }

    }, [hovering, inertia])

    return <div onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)} 
                onMouseMove={mouseMoved}
                style={style}
                className="dragger" />
}