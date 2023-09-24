import { Button, Flex, Group, Stack, Text } from "@mantine/core"
import { useState } from "react"
import { BasicColors, ThreeColors, Reds, yellows } from "./assets/basic-colors"
import Game from "./Game";
import { Score, Color } from "./types";
// =o= 1. Create a game state machine
// =o= 2. Display a bunch of colors
// =o= 3. Display one color at a time, and move forward with a button
// =o= 4. Add input field under for guessing name, and check if name is correct
// => 5. Keep track of scores

const colorSets = {
    'Basic Colors': BasicColors,
    'Three Colors': ThreeColors,
    'Reds': Reds,
    'Yellows': yellows,
}

type ColorSetKey = keyof typeof colorSets;

const shuffle = (array: Color[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export default function App() {
    const [gameState, setGameState] = useState<'start' | 'play' | 'finish'>('start')
    const [score, setScore] = useState<Score>({});
    const [points, setPoints] = useState<number>(0);
    const [colors, setColors] = useState<Record<string, string>>(BasicColors);
    const [colorSetName, setColorSetName] = useState<string>('Basic Colors');
    const colorList = shuffle(Object.entries(colors).map(([name, hex]) => ({ name, hex })));
    console.log("🚀 ~ file: App.tsx:35 ~ App ~ colorList:", colorList)


    const setColorSet = (name: ColorSetKey) => {
        setColorSetName(name);
        setColors(colorSets[name]);
    }

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
                    <Text>ColorSet: {colorSetName} </Text>
                    <Group>
                        {Object.keys(colorSets).map((name) => (
                            <Button key={name} onClick={() => setColorSet(name as ColorSetKey)}>{name}</Button>
                        ))}
                    </Group>
                    <Flex dir="row" maw={'100vw'} wrap={'wrap'}>
                        <>
                            {Object.entries(colors).map(([name, hex]) => (
                                <Stack key={name} spacing={0} mb="md">
                                    <div style={{ backgroundColor: hex, width: "200px", height: "100px" }} />
                                    <Text>{name}, {hex}</Text>
                                </Stack>
                            ))}
                        </>
                    </Flex>
                </>
            )
            }
            {
                gameState === 'play' && (
                    <>
                        <h1>Play</h1>
                        <Game
                            colorList={colorList} onEndGame={onFinish} />
                    </>
                )
            }
            {
                gameState === 'finish' && (
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
                )
            }
        </>
    )
}