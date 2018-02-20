import React from 'react';

const Summary = ({
  successCount,
  errorCountCurrent,
  errorCountTotal,
  errorChars,
  timeElapsed,
  wordsPerMinute
}) => {

  let formattedErrorChars = () => {
    return errorChars.map( char => 
      <li key={char[0]}>{char[0]} : {char[1]}</li>
    )
  }

  return (
    <div className="summary-container">
      <p>Correct characters: <strong>{successCount}</strong></p>
      <p>Incorrect characters: <strong>{errorCountCurrent}</strong></p>
      <p>Total Errors: <strong>{errorCountTotal}</strong></p>
      <p>Time taken: <strong>{(timeElapsed/10).toFixed(1)}</strong>s</p>
      <p>WPM: <strong>{wordsPerMinute}</strong></p>
      <p> Error chars: </p>
      <ul className="error-chars-container">{formattedErrorChars()}</ul>

    </div>
  )
}

export default Summary;