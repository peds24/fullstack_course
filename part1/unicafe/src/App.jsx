import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const total = good + bad + neutral
  const avg = (good - bad) / total
  const percentPos = (good / total) * 100
  return (
    <div>
      <h1>Give Feedback</h1>

      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <br />
      
      <p>total: {total}</p>
      <p>average: {avg}</p>
      <p>percent positive: {percentPos} % </p>
    </div>
  )
}

export default App