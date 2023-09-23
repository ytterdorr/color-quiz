import { Button, Text } from "@mantine/core";
import { useState } from "react";

type Color = {
    name: string,
    hex: string,
}

export default function App({ colorList, onEndGame }
    : { colorList: Color[], onEndGame: () => void; }) {

    const [colorIndex, setColorIndex] = useState(0);
    const color = colorList[colorIndex];
    const endGame = () => {
        onEndGame();
    }
    return (
        <>
            {colorIndex < colorList.length &&
                <>
                    <div style={{ backgroundColor: color.hex, width: "200px", height: "100px" }} />
                    <Button onClick={() => setColorIndex((current) => current + 1)}>Next</Button>
                </>
            }
            {colorIndex >= colorList.length &&
                <>
                    <Text>Spelet är över</Text>
                    <Button onClick={() => endGame()}>Starta om</Button>
                </>
            }
        </>
    )
}