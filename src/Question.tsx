import { Button, TextInput } from "@mantine/core"
import { useState } from "react";

type Answer = { name: string, hex: string };

export default function Question({ hex, errors, checkAnswer }
    : {
        name: string,
        hex: string,
        errors: { name: string, hex: string },
        checkAnswer: ({ name, hex }: Answer) => void,
    }) {

    const [answer, setAnswer] = useState<Answer>({ name: '', hex: '' })
    return (
        <>
            <div style={{ backgroundColor: hex, width: "200px", height: "100px" }} />

            <TextInput
                label="Color Name"
                error={errors.name}
                value={answer.name}
                onChange={(event) => {
                    setAnswer((prev) => ({ ...prev, name: event.currentTarget.value }))
                }}
            />
            <TextInput
                label="Hex Code"
                error={errors.hex}
                value={answer.hex}
                onChange={(event) => {
                    setAnswer({ ...answer, hex: event.currentTarget.value })
                }}
            />

            <Button onClick={() => checkAnswer(answer)} >
                Check Answer
            </Button>
        </>
    )
}