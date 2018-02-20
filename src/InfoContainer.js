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
    
    let sortable = [];
    let outputString = '';
    
    //Push each character into array to be able to sort
    for ( let charVal in count ){
      sortable.push([charVal, count[charVal]]);
    }
    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });
    for (let char of sortable){
      outputString += `<li key=${char[0]}>${char[0]} : <span class="align-right">${char[1]}</span></li>`
    }
    
    return {__html: outputString};
  }

  return (
    <div className="InfoContainer">
      <p>Remaining: <strong>{remainingCount}</strong></p>
      <p>Correct: <strong>{successCount}</strong></p>
      <p>Current Errors: <strong>{errorCountCurrent}</strong></p>
      <p>Total Errors: <strong>{errorCountTotal}</strong></p>
      <p>Time: <strong>{timeElapsed}</strong></p>
      <p> Error chars: </p>
      <ul className="error-chars-container" dangerouslySetInnerHTML={formattedErrorChars()}></ul>
    </div>
  )
}

export default InfoContainer;