import { Button } from "@mantine/core"
import { useState } from "react"

export default function App() {
    // TODOs
    // Game state, start, play, finish
    const [gameState, setGameState] = useState<'start' | 'play' | 'finish'>('start')
    return (
        <>
            {gameState === 'start' && (
                <>
                    <h1>Start</h1>
                    <Button onClick={() => setGameState('play')}>Play</Button>
                </>
            )}
            {gameState === 'play' && (
                <>
                    <h1>Play</h1>
                    <Button onClick={() => setGameState('finish')}>Finish</Button>
                </>
            )}
            {gameState === 'finish' && (
                <>
                    <h1>Finish</h1>
                    <Button onClick={() => setGameState('start')}>To Start</Button>
                </>
            )}
        </>
    )
}