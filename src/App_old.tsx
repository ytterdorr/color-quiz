import { useState } from 'react'
import './App.css'
import {
  BasicColorKey,
  BasicColors,
  ThreeColors
} from './assets/basic-colors'
import { Button, TextInput, Text } from '@mantine/core';

type ColorSet = Color[]

const ColorSets = {
  BasicColors,
  ThreeColors,
}

type SetName = keyof typeof ColorSets;

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

type Guesses = {
  [key in BasicColorKey]: { name: string, hex: string } | null
}

type Color = { name: string, hex: string }
const colors = threeColors;
type ColorKey = keyof typeof colors
type GameStateType = 'start' | 'play' | 'end';

function App() {

  const [gameState, setGameState] = useState<GameStateType>('start');
  const [currentIndex, setCurrentIndex] = useState(0)

  const [colorSet, setColorSet] = useState<ColorSet>(colors)

  const guessesInitialState: Guesses = {} as Guesses
  colorOrder.forEach((color) => {
    guessesInitialState[color] = null
  })
  const [guesses, setGuesses] = useState<Guesses>(guessesInitialState)
  const [score, setScore] = useState<number>(0)

  const name = colorOrder[currentIndex]
  const hex = colors[name];

  const [answer, setAnswer] = useState({ name: '', hex: '' })
  const [errors, setErrors] = useState({ name: '', hex: '' })
  const [allIsWell, setAllIsWell] = useState(false)

  const checkAnswer = () => {
    const firstGuess = guesses[name] === null;
    const correctName = answer.name === name;
    const correctHex = answer.hex === hex || `#${answer.hex}` === hex;

    if (firstGuess) {
      console.log("first guess")
      setGuesses((previous) => ({ ...previous, [name]: { name: answer.name, hex: answer.hex } }))
      // updateScore if correct on first try
      if (correctName && correctHex) {
        setScore((prev) => prev + 1)
        setAllIsWell(true)
        return
      }
    }

    // show errors
    if (!correctName) {
      setErrors((previous) => ({ ...previous, name: name }))
    }
    if (!correctHex) {
      setErrors((previous) => ({ ...previous, hex: hex }))
    }

    // quesition finished when all is well
    if (correctName && correctHex) {
      setAllIsWell(true)
    }
  }

  const nextQuestion = () => {
    setCurrentIndex(currentIndex + 1)
    setAnswer({ name: '', hex: '' })
    setAllIsWell(false)
  }

  function setColors(colorSet: SetName) {
    setColorSet(ColorSets[colorSet])
  }



  return (
    <>
      <div className="App">
        {gameState === 'start' && (
          <>
            <h1>Guess the color</h1>
            <Button onClick={() => setColorSet(ThreeColors)}>BasicColors</Button>
            <Button onClick={() => setColorSet(BasicColors)}>BasicColors</Button>
            <Button onClick={() => setGameState('play')}>Start</Button>
          </>
        )}
        {gameState === 'play' && (
          <>
            <h1>Guess the color</h1>
            <h2>Score: {score}</h2>
            <div className="color-box" style={{ backgroundColor: colorSet[currentIndex].hex }}></div>
            <TextInput
              value={answer.name}
              onChange={(event) => setAnswer({ ...answer, name: event.currentTarget.value })}
              placeholder="Name"
              error={errors.name}
            />
            <TextInput
              value={answer.hex}
              onChange={(event) => setAnswer({ ...answer, hex: event.currentTarget.value })}
              placeholder="#Hex"
              error={errors.hex}
            />
            <Button onClick={checkAnswer}>Check</Button>
            {allIsWell && (
              <Button onClick={nextQuestion}>Next</Button>
            )}
          </>
        )}

      </div >
    </>
  )
}

export default App
