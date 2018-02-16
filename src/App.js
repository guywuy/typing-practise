import React, { Component } from 'react';
import TypingContainer from './TypingContainer';

class App extends Component {
  constructor(){
    super();
    this.state = {
      'stringToType': 'Salvator Mundi is a painting of Christ as Salvator Mundi (Latin: Saviour of The World) by Leonardo da Vinci, dated to c. 1500. The painting shows Jesus, in Renaissance dress, giving a benediction with his raised right hand and crossed fingers while holding a transparent crystal orb in his left hand. Around 20 other versions of the work are known, by students and followers of Leonardo, and some chalk preparatory drawings are held in the Royal Collection.',
      'errorCount' : 0,
      'errorChars' : [],
      'timeTaken' : 0,
      'overlayCharacters': []
    }

    this.validateTyping = this.validateTyping.bind(this);
  }

  validateTyping(input){
    let length = input.length;
    let lastChar = input[length-1];
    let targetChar = this.state.stringToType[length-1];

    if (targetChar === lastChar) {
      console.log('Correct');
      this.setState({
          overlayCharacters: [...this.state.overlayCharacters, [targetChar, 'correct']]
        }
      );
    } else {
      console.log('incorrect')
      this.setState({
        overlayCharacters: [...this.state.overlayCharacters, [targetChar, 'incorrect']],
        errorCount: this.state.errorCount+1,
        errorChars: [...this.state.errorChars, targetChar]
        }
      );
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Practise your typing!</h1>
        </header>
        <TypingContainer stringToType={this.state.stringToType} validateTyping={this.validateTyping} overlayCharacters={this.state.overlayCharacters}/>
      </div>
    );
  }
}

export default App;
