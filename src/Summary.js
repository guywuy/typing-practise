import React from 'react';
import ErrorCharacterList from './ErrorCharacterList';


const Summary = ({
  successCount,
  totalChars,
  errorCountCurrent,
  errorCountTotal,
  errorChars,
  timeElapsed,
  wordsPerMinute,
  resetRound
}) => {

  let calculateScore = () => {
    // 
    let errorRemainingPenalty = 8;
    let errorCorrectedPenalty = 3;
    return Math.floor((timeElapsed*10 / totalChars) + (errorCountCurrent * errorRemainingPenalty) + (errorCountTotal * errorCorrectedPenalty))
  }

  return (
    <div className="summary-container">
      <h2>SCORE: {calculateScore()}</h2>
      <div className="x-small">
        ((Time x 100) / total characers) + (errors remaining x 8) + (total errors x 3)
      </div>
      <div className="small">
        <p>Total characters: <strong>{totalChars}</strong></p>
        <p>Correct characters: <strong>{successCount}</strong></p>
        <p>Errors remaining: <strong>{errorCountCurrent}</strong></p>
        <p>Total Errors: <strong>{errorCountTotal}</strong></p>
        <p>Time taken: <strong>{(timeElapsed/10).toFixed(1)}</strong>s</p>
        <p>WPM: <strong>{wordsPerMinute}</strong></p>
        <ErrorCharacterList errorChars={errorChars} />
      </div>
      <button className="button button--reset" autoFocus onClick={resetRound} onSubmit={resetRound}>Again!</button>
    </div>
  )
}

export default Summary;