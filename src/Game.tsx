import { Button, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { Score, Color } from "./types";

export default function App({ colorList, onEndGame }
    : { colorList: Color[], onEndGame: (_score: Score) => void; }) {
    const [colorIndex, setColorIndex] = useState(0);
    const color = colorList[colorIndex];
    const [nameInput, setNameInput] = useState('');
    const [nameError, setNameError] = useState('');
    const endGame = () => {
        onEndGame(score);
    }
    const [score, setScore] = useState<Score>({});

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            guessCorrect ? nextQuestion() : onGuess();
        }
    }
    const [guessCorrect, setGuessCorrect] = useState(false);

    const onGuess = () => {
        if (nameInput === color.name) {
            setNameError(`Korrekt! ${color.name}: ${color.hex}`)
            setGuessCorrect(true);
            setScore((prev) => ({ ...prev, [color.name]: true }));
        } else {
            setNameError("Nej, det är: " + color.name)
            setScore((prev) => ({ ...prev, [color.name]: false }));
        }
    }

    const nextQuestion = () => {
        setColorIndex((i) => i + 1);
        setNameInput('');
        setNameError('');
        setGuessCorrect(false);
    }
    return (
        <>
            {colorIndex < colorList.length &&
                <>
                    <div style={{ backgroundColor: color.hex, width: "200px", height: "100px" }} />
                    <TextInput
                        label="Färgnamn"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.currentTarget.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Text>{nameError}</Text>
                    {guessCorrect
                        ? <Button onClick={nextQuestion}>Next</Button>
                        : <Button onClick={onGuess}>Gissa</Button>
                    }
                </>
            }
            {colorIndex >= colorList.length &&
                <>
                    <Text>Game Over</Text>
                    <Button onClick={endGame}>Avsluta</Button>
                </>
            }
        </>
    )
}