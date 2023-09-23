import { Button } from "@mantine/core"
import { useState } from "react"
import { BasicColors } from "./assets/basic-colors"
import Game from "./Game";
// TODOs
// =o= 1. Create a game state machine
// =o= 2. Display a bunch of colors
// =o= 3. Display one color at a time, and move forward with a button
// =o= 4. Add input field under for guessing name, and check if name is correct
export default function App() {

    const [gameState, setGameState] = useState<'start' | 'play' | 'finish'>('start')
    const colors = Object.entries(BasicColors).map(([name, hex]) => ({ name, hex }));
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
                    <Game
                        colorList={colors} onEndGame={() => setGameState('finish')} />
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