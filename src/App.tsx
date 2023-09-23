import { Button, Text } from "@mantine/core"
import { useState } from "react"
import { BasicColors, ThreeColors } from "./assets/basic-colors"
import Game from "./Game";
import { Score } from "./types";
// TODOs
// =o= 1. Create a game state machine
// =o= 2. Display a bunch of colors
// =o= 3. Display one color at a time, and move forward with a button
// =o= 4. Add input field under for guessing name, and check if name is correct
// => 5. Keep track of scores
export default function App() {

    const [gameState, setGameState] = useState<'start' | 'play' | 'finish'>('start')
    const [score, setScore] = useState<Score>({});
    const [points, setPoints] = useState<number>(0);
    const colors = ThreeColors;
    const colorList = Object.entries(colors).map(([name, hex]) => ({ name, hex }));

    const setStart = () => {
        setScore({});
        setGameState('start');
    }

    const onFinish = (score: Score) => {
        let points = 0;
        Object.values(score).forEach((correct) => {
            if (correct) {
                points++;
            }
        })
        setPoints(points);
        setScore(score);
        setGameState('finish')

    }
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
                        colorList={colorList} onEndGame={onFinish} />
                </>
            )}
            {gameState === 'finish' && (
                <>
                    <h1>Finish</h1>¨
                    <h2>Score: {points} </h2>
                    {Object.entries(score).map(([name, correct]) => (
                        <Text color={correct ? "green" : "red"}>
                            {name}, {colors[name]}: {correct ? 'Correct' : 'Wrong'}
                            <Text bg={colors[name]} color={colors[name]}>"       "</Text>
                        </Text>
                    ))}
                    <Button onClick={setStart}>To start</Button>
                </>
            )}
        </>
    )
}