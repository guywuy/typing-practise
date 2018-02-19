import React, { Component } from 'react';
import TypingContainer from './TypingContainer';
import InfoContainer from './InfoContainer';

class App extends Component {
  constructor(){
    super();
    this.state = {
      'stringToType': 'Salvator Mundi is a painting of Christ as Salvator Mundi (Latin: Saviour of The World) by Leonardo da Vinci, dated to c. 1500. The painting shows Jesus, in Renaissance dress, giving a benediction with his raised right hand and crossed fingers while holding a transparent crystal orb in his left hand. Around 20 other versions of the work are known, by students and followers of Leonardo, and some chalk preparatory drawings are held in the Royal Collection.',
      'currentPosition' : 0,
      'successCount' : 0,
      'errorCount' : 0,
      'errorChars' : [],
      'timeTaken' : 0,
      'overlayCharacters': []
    }

    this.validateTyping = this.validateTyping.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
  }

  validateTyping(input){
    let length = input.length;
    let lastChar = input[length-1];
    let targetChar = this.state.stringToType[length-1];
    let characterLog = this.state.overlayCharacters;

    if (targetChar === lastChar) {
      console.log('Correct');
      characterLog[length] = 'correct';
      this.setState({
          successCount: this.state.successCount+1,        
          overlayCharacters: characterLog,
          currentPosition: length
        }
      );
    } else {
      console.log('incorrect')
      characterLog[length] = 'incorrect';
      this.setState({
        overlayCharacters: characterLog,
        errorCount: this.state.errorCount+1,
        errorChars: [...this.state.errorChars, targetChar],
        currentPosition: length
        }
      );
    }
  }

  handleBackspace(){
    if (this.state.currentPosition>0){
      this.setState({
        overlayCharacters: this.state.overlayCharacters.slice(0, this.state.currentPosition)
      })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Practise your typing!</h1>
        </header>
        <section className="main-container">
          <TypingContainer stringToType={this.state.stringToType} validateTyping={this.validateTyping} handleBackspace={this.handleBackspace} overlayCharacters={this.state.overlayCharacters}/>
          <InfoContainer successCount={this.state.successCount} errorCount={this.state.errorCount} errorChars={this.state.errorChars} timeElapsed={this.state.timeTaken} />
        </section>
      </div>
    );
  }
}

export default App;
