import { useState } from 'react'

const StatisticLine = (props) => {
  const {text, value} = props
  if (text == "positive"){
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  } else{
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
}


const Statistics = (props) => {
  const { good, neutral, bad } = props
  
  const total = good + bad + neutral
  const avg = (good - bad) / total
  const percentPos = (good / total) * 100

  if (total == 0){
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else{
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="total" value={total} />
            <StatisticLine text="average" value={avg} />
            <StatisticLine text="positive" value={percentPos} />
          </tbody>
        </table>
      </div>
    )
  }
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  
  return (
    <div>
      <h1>Give Feedback</h1>

      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App