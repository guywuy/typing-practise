import React, { Component } from 'react';
import TypingContainer from './TypingContainer';
import InfoContainer from './InfoContainer';

class App extends Component {
  constructor(){
    super();
    this.state = {
      'stringToType': '',
      'inProgress' : false,
      'currentPosition' : 0,
      'remainingCount' : 0,
      'successCount' : 0,
      'errorCountCurrent' : 0,
      'errorCountTotal' : 0,
      'errorChars' : [],
      'timeElapsed' : 0,
      'overlayCharacters': [],
      'previousInput': ''
    }

    this.validateTyping = this.validateTyping.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
    this.startRound = this.startRound.bind(this);
    this.tick = this.tick.bind(this);

    this.strings = [
      "Satie was a colourful figure in the early 20th-century Parisian avant-garde. His work was a precursor to later artistic movements such as minimalism, Surrealism, repetitive music, and the Theatre of the Absurd.",
      'Salvator Mundi is a painting of Christ as Salvator Mundi (Latin: Saviour of The World) by Leonardo da Vinci, dated to c. 1500. The painting shows Jesus, in Renaissance dress, giving a benediction with his raised right hand and crossed fingers while holding a transparent crystal orb in his left hand. Around 20 other versions of the work are known, by students and followers of Leonardo, and some chalk preparatory drawings are held in the Royal Collection.',
      "The Road to Infinity is a collection of seventeen scientific essays by Isaac Asimov. It was the fourteenth of a series of books collecting Asimov's science essays from The Magazine of Fantasy and Science Fiction. It also included a list of all of Asimov's essays in that magazine up to 1979. It was first published by Doubleday & Company in 1979.",
      "Logic is the formal science of using reason and is considered a branch of both philosophy and mathematics. Logic investigates and classifies the structure of statements and arguments, both through the study of formal systems of inference and the study of arguments in natural language. The scope of logic can therefore be very large, ranging from core topics such as the study of fallacies and paradoxes, to specialized analyses of reasoning such as probability, correct reasoning, and arguments involving causality. One of the aims of logic is to identify the correct (or valid) and incorrect (or fallacious) inferences. Logicians study the criteria for the evaluation of arguments.",
      "The Indo-Pacific finless porpoise (Neophocaena phocaenoides), or finless porpoise, is one of seven porpoise species. Most of the population has been found around the Korean peninsula in the Yellow and East China Seas, although a freshwater population is found around Jiuduansha near Shanghai at the mouth of China's Yangtze River. Genetic studies indicate that the finless porpoise is the most basal living member of the porpoise family."
    ]
  }

  validateTyping(input){
    // compare input to previous input - if the same then return
    if (input === this.state.previousInput) return;
    console.log(this.state.currentPosition, 'current position');
    
    let length = input.length;
    
    let lastChar = input[this.state.currentPosition];
    let targetChar = this.state.stringToType[this.state.currentPosition];
    console.log(targetChar, 'targetChar');
    let characterLog = this.state.overlayCharacters;
    let errorChars = this.state.errorChars;
    let errorCountTotal = this.state.errorCountTotal;
    let remainingCount = this.state.stringToType.length - length;

        
    // Ensure we are not revalidating old input if user has deleted characters... by comparing length of input to previous input.
    if (length > this.state.previousInput.length){
      // If the last inputted character matches the corresponding character in the stringToType
      if (targetChar === lastChar) {
        // Assign corresponding position in characterLog with 'correct'
        characterLog[length] = 'correct';
      } else {
        errorCountTotal = this.state.errorCountTotal+1;
        errorChars = [...errorChars, targetChar];
        // Assign corresponding position in characterLog with 'incorrect'
        characterLog[length] = 'incorrect';
      }
    }

    let successCount = this.countInstances(characterLog, 'correct');
    let errorCountCurrent = characterLog.length - successCount - 1;
    let previousInput = input;

    this.setState({
        overlayCharacters: characterLog,
        errorChars,
        successCount,
        errorCountCurrent,
        errorCountTotal,
        currentPosition: length,
        remainingCount,
        previousInput
      }
    );
  }

  tick(){
    this.setState( (prevState) => {
      return {
        timeElapsed: prevState.timeElapsed += 1
      }
    })
  }


  handleBackspace(){
    if (this.state.currentPosition>0){
      this.setState({
        'overlayCharacters': this.state.overlayCharacters.slice(0, this.state.currentPosition),
        'currentPosition' : this.state.currentPosition - 1
      })
    }
  }

  resetState() {
    clearInterval(this.interval);
    
    this.setState({
      'stringToType': '',
      'inProgress' : false,
      'currentPosition' : 0,
      'remainingCount' : 0,
      'successCount' : 0,
      'errorCountCurrent' : 0,
      'errorCountTotal' : 0,
      'errorChars' : [],
      'timeElapsed' : 0,
      'overlayCharacters' : [],
      'previousInput' : ''
    })
  }

  startRound(){
    let stringToType = this.generateString();
    let remainingCount = stringToType.length;
    this.interval = setInterval(this.tick, 100);
    this.setState({
      stringToType,
      remainingCount,
      'inProgress' : true
    });
  }

  endRound(){
    clearInterval(this.interval);
  }

  generateString(){
    // Return a random string from the strings stored in the App
    return this.strings[Math.floor(Math.random()*this.strings.length)];
  }

  // Return the number of times that a target value appears in an array
  countInstances(arr, target){
    if (arr.length===0) return 0;
    return arr.reduce( (acc, currentVal) => {
      if (currentVal === target) {
        return acc += 1;
      } else {
        return acc;
      }
    }, 0)
  }

  render() {
    return (
      <div className="App">
        <header className="app__header">
          <h1 className="app__title">Typing practise makes fingers nimble!</h1>
        </header>
        <section className="main-container">
          <TypingContainer inProgress={this.state.inProgress} stringToType={this.state.stringToType} validateTyping={this.validateTyping} handleBackspace={this.handleBackspace} overlayCharacters={this.state.overlayCharacters} startRound={this.startRound} />
          <InfoContainer successCount={this.state.successCount} 
          remainingCount={this.state.remainingCount} 
          errorCountCurrent={this.state.errorCountCurrent} 
          errorCountTotal={this.state.errorCountTotal} 
          errorChars={this.state.errorChars} 
          timeElapsed={this.state.timeElapsed}
          wordCount={this.state.previousInput.split(' ').length-1} />
        </section>
      </div>
    );
  }
}

export default App;
