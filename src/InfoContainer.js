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

    //Firstly make object, and add properties for each char, incrementing value of each key when it appears
    let count = {};
    errorChars.forEach( char => {
      count[char] = (count[char] || 0) + 1;
    } );
    
    let sortable = [];
    
    //Push each character into array to be able to sort
    for ( let charVal in count ){
      sortable.push([charVal, count[charVal]]);
    }
    // Sort array by values
    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });
    return sortable.map( char => 
      <li key={char[0]}>{char[0]} : {char[1]}</li>
    )
  }

  return (
    <div className="InfoContainer">
      <p>Remaining: <strong>{remainingCount}</strong></p>
      <p>Correct: <strong>{successCount}</strong></p>
      <p>Current Errors: <strong>{errorCountCurrent}</strong></p>
      <p>Total Errors: <strong>{errorCountTotal}</strong></p>
      <p>Time: <strong>{timeElapsed}</strong></p>
      <p> Error chars: </p>
      <ul className="error-chars-container">{formattedErrorChars()}</ul>
    </div>
  )
}

export default InfoContainer;