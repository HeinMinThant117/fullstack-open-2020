import React, { useState } from 'react'



const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const Statistic = ({ data, title }) => {
  return (
    <>
      <td>{title}</td>
      <td>{data}</td>
    </>
  )
}

const Statistics = ({ good, neutral, bad, getTotal, getAverage, getPositive }) => {
  if (getTotal() <= 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr><Statistic title='good' data={good} /></tr>
          <tr><Statistic title='bad' data={bad} /></tr>
          <tr><Statistic title='neutral' data={neutral} /></tr>
          <tr><Statistic title='all' data={getTotal()} /></tr>
          <tr><Statistic title='average' data={getAverage()} /></tr>
          <tr><Statistic title='positive' data={getPositive()} /></tr>
        </tbody>
      </table>
    </div>
  )

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const getTotal = () => good + bad + neutral

  const getAverage = () => (good - bad) / 9

  const getPositive = () => good / 9 * 100


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

      <Statistics good={good} bad={bad} neutral={neutral} getTotal={getTotal} getAverage={getAverage} getPositive={getPositive} />
    </div>
  )
}

export default App