import React from 'react';

const ErrorCharacterList = ({
  errorChars
}) => {

  let formattedErrorChars =  errorChars.map( char => 
    <li key={char[0]} style={{ fontSize : '1.' + char[1] + 'rem' }}>{char[0]} : {char[1]}</li>
  )
  
  return (
    <div>
      <p> Error characters: </p>    
      <ul className="error-chars-container">{formattedErrorChars}</ul>
    </div>
  )
}

export default ErrorCharacterList;