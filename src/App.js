import React, { useState, useEffect, useRef } from "react"

export default function App() {
  // Variables
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [time, setTime] = useState(15)
  const [valueTextArea, setValueTextArea] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(time)
  const [wordsCount, setWordsCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const inputRef = useRef(null)

  // useEffect

  useEffect(() => {
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

  // Functions declarations

  function handleClick(e) {
    e.preventDefault()
    setValueTextArea("")
    setTimeRemaining(time)
    setIsPlaying(true)
    setIsSettingsOpen(false)
    inputRef.current.disabled = false
    inputRef.current.focus()
  }

  function handleChange(e) {
    const { value } = e.target
    setValueTextArea(value)
  }

  function countWords(string) {
    return string.split(" ").filter((e) => e !== "").length
  }

  // render

  return (
    <>
      <h1>Speed Typing Challenge</h1>
      <p>Type as many words as you can</p>
      <textarea
        ref={inputRef}
        value={valueTextArea}
        onChange={handleChange}
        disabled={!isPlaying}
      />

      <p className="time-container">
        Time Remaining: {timeRemaining}
        <span
          className="time-info"
          onClick={() => setIsSettingsOpen((prev) => !prev)}
        >
          i
        </span>
      </p>

      {isSettingsOpen && (
        <>
          <span className="settings-title">
            Number of seconds available. change below
          </span>
          <div className="settings-btns">
            <button onClick={() => setTime((prevTime) => prevTime - 1)}>
              -
            </button>
            <span>{time}</span>
            <button onClick={() => setTime((prevTime) => prevTime + 1)}>
              +
            </button>
          </div>
        </>
      )}

      <button className="start-btn" onClick={handleClick} disabled={isPlaying}>
        Start
      </button>
      <p>Words count: {wordsCount}</p>
    </>
  )
}
