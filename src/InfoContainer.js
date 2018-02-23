import React from 'react';
import ErrorCharacterList from './ErrorCharacterList';

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

return (
  <div className="info-container">
    <p>Remaining: <strong>{remainingCount}</strong></p>
    <p>Correct: <strong>{successCount}</strong></p>
    <p>Current Errors: <strong>{errorCountCurrent}</strong></p>
    <p>Total Errors: <strong>{errorCountTotal}</strong></p>
    <p>Time: <strong>{(timeElapsed/10).toFixed(1)}</strong>s</p>
    <p>WPM: <strong>{wordsPerMinute}</strong></p>
    <ErrorCharacterList errorChars={errorChars} />
  </div>
  )
}

export default InfoContainer;