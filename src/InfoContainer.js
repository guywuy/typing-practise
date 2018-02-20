import React from 'react';

const InfoContainer = ({
  remainingCount,
  successCount,
  errorCountCurrent,
  errorCountTotal,
  errorChars,
  timeElapsed,
  wordsPerMinute,
  finished
}) => {

  let formattedErrorChars = () => {
    return errorChars.map( char => 
      <li key={char[0]}>{char[0]} : {char[1]}</li>
    )
  }

  return (
    <div className="info-container">
      <p>Remaining: <strong>{remainingCount}</strong></p>
      <p>Correct: <strong>{successCount}</strong></p>
      <p>Current Errors: <strong>{errorCountCurrent}</strong></p>
      <p>Total Errors: <strong>{errorCountTotal}</strong></p>
      <p>Time: <strong>{(timeElapsed/10).toFixed(1)}</strong>s</p>
      <p>WPM: <strong>{wordsPerMinute}</strong></p>
      <p> Error chars: </p>
      <ul className="error-chars-container">{formattedErrorChars()}</ul>
    </div>
  )
}

export default InfoContainer;