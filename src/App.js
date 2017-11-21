import React, { Component } from 'react';
import TypingContainer from './TypingContainer';

class App extends Component {
  constructor(){
    super();
    this.state = {
      'stringToType': 'Salvator Mundi is a painting of Christ as Salvator Mundi (Latin: Saviour of The World) by Leonardo da Vinci, dated to c. 1500. The painting shows Jesus, in Renaissance dress, giving a benediction with his raised right hand and crossed fingers while holding a transparent crystal orb in his left hand. Around 20 other versions of the work are known, by students and followers of Leonardo, and some chalk preparatory drawings are held in the Royal Collection.',
      'errorCount' : 0,
      'errorChars' : [],
      'timeTaken' : 0
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Practise your typing!</h1>
        </header>
        <TypingContainer stringToType={this.state.stringToType} />
      </div>
    );
  }
}

export default App;
