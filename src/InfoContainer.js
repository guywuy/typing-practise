import React from 'react';

const InfoContainer = ({
  remainingCount,
  successCount,
  errorCountCurrent,
  errorCountTotal,
  errorChars,
  timeElapsed
}) => {

  let formattedErrorChars = () => {
    let count = {};
    errorChars.forEach( char => {
      count[char] = (count[char] || 0) + 1;
    } );
    
    let outputString = '';
    
    for ( let charVal in count ){
      outputString += `<li key=${charVal}>${charVal}: ${count[charVal]}</li>`
    }
    
    return {__html: outputString};
  }

  return (
    <div className="InfoContainer">
      <p>Remaining: {remainingCount}</p>
      <p>Correct: {successCount}</p>
      <p>Current Errors: {errorCountCurrent}</p>
      <p>Total Errors: {errorCountTotal}</p>
      <p> Error chars </p>
      <ul dangerouslySetInnerHTML={formattedErrorChars()}></ul>
    </div>
  )
}

export default InfoContainer;