import React, { useState, useEffect } from "react"

export default function App() {
  const TIME_REMAINING = 5

  const [valueTextArea, setValueTextArea] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(TIME_REMAINING)
  const [wordsCount, setWordsCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    console.log("run")
    if (isPlaying && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      setIsPlaying(false)
    }
  }, [timeRemaining, isPlaying])

  useEffect(() => {
    setWordsCount(countWords(valueTextArea))
  }, [valueTextArea])

  function handleClick(e) {
    e.preventDefault()
    setValueTextArea("")
    setTimeRemaining(TIME_REMAINING)
    setIsPlaying(true)
  }

  function handleChange(e) {
    const { value } = e.target
    setValueTextArea(value)
  }

  function countWords(string) {
    const h = string
      // .trim()
      .split(" ")
      .filter((e) => e !== "").length
    return h
  }

  return (
    <>
      <h1>Speed Typing Challenge</h1>
      <p>Type as many words as you can</p>
      <textarea
        value={valueTextArea}
        onChange={handleChange}
        disabled={!isPlaying}
      />
      <p>Time Remaining: {timeRemaining}</p>
      <button onClick={handleClick} disabled={isPlaying}>
        Start
      </button>
      <p>Words count: {wordsCount}</p>
    </>
  )
}
