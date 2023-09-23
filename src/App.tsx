import { Button, Flex, Text } from "@mantine/core"
import { useState } from "react"
import { BasicColors } from "./assets/basic-colors"
// TODOs
// =o= 1. Create a game state machine
// =o= 2. Display a bunch of colors
// =o= 3. Display one color at a time, and move forward with a button
export default function App() {

    const [gameState, setGameState] = useState<'start' | 'play' | 'finish'>('start')
    const colors = BasicColors;
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
                    <Flex dir="row"></Flex>
                    {Object.entries(colors).map(([name, hex]) => (
                        <>
                            <Text>{name}</Text>
                            <div style={{ backgroundColor: hex, width: "200px", height: "100px" }} />
                        </>
                    ))}
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