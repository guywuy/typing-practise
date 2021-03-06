import React, { Component } from 'react';
import TypingContainer from './TypingContainer';
import InfoContainer from './InfoContainer';
import Summary from './Summary';


class App extends Component {
  constructor(){
    super();
    this.state = {
      'stringToType': '',
      'inProgress' : false,
      'finished' : false,
      'currentPosition' : 0,
      'remainingCount' : 0,
      'successCount' : 0,
      'errorCountCurrent' : 0,
      'errorCountTotal' : 0,
      'errorChars' : [],
      'sortedErrorChars' : [],
      'timeElapsed' : 0,
      'overlayCharacters': [],
      'previousInput': '',
      'wordsPerMinute': 0
    }

    this.validateTyping = this.validateTyping.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
    this.startRound = this.startRound.bind(this);
    this.resetRound = this.resetRound.bind(this);
    this.tick = this.tick.bind(this);
    this.sortArray = this.sortArray.bind(this);
    this.getWordsPerMinute = this.getWordsPerMinute.bind(this);

    this.teststring = "Satie was a colourful figure";

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

    if (this.state.currentPosition >= this.state.stringToType.length - 1){
      this.endRound();
      return;
    }

    let length = input.length;
    
    let lastChar = input[this.state.currentPosition];
    let targetChar = this.state.stringToType[this.state.currentPosition];
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

    let sortedErrorChars = this.sortArray(errorChars);
    
    let successCount = this.countInstances(characterLog, 'correct');
    let errorCountCurrent = characterLog.length - successCount - 1;
    let previousInput = input;

    this.setState({
        overlayCharacters: characterLog,
        errorChars,
        sortedErrorChars,
        successCount,
        errorCountCurrent,
        errorCountTotal,
        currentPosition: length,
        remainingCount,
        previousInput,
        "wordsPerMinute" : this.getWordsPerMinute()
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

  // Take an array of characters, count instances of each and return sorted array of [char, count] pairs
  sortArray(arr){
    if (arr.length === 0) return [];

    //Firstly make object, and add properties for each char, incrementing value of each key when it appears
    let count = {};
    arr.forEach( char => {
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

    return sortable;
  }

  getWordsPerMinute(){
    let wordCount = this.state.previousInput.split(' ').length-1;

    if (wordCount === 0) return 0;

    return (wordCount/(this.state.timeElapsed/600)).toFixed(2);
  }

  handleBackspace(){
    if (this.state.currentPosition>0){
      this.setState({
        'overlayCharacters': this.state.overlayCharacters.slice(0, this.state.currentPosition),
        'currentPosition' : this.state.currentPosition - 1
      })
    }
  }


  resetRound() {
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
      'sortedErrorChars' : [],
      'timeElapsed' : 0,
      'overlayCharacters' : [],
      'previousInput' : '',
      'finished' : false,
      'wordsPerMinute': 0
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
    this.setState({
      'inProgress' : false,
      'finished' : true
    });
  }

  generateString(){
    // Return a random string from the strings stored in the App
    return this.strings[Math.floor(Math.random()*this.strings.length)];
    // return this.teststring;
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
          <h1 className="app__title">Typing practise keeps fingers nimble!</h1>
        </header>
        <section className="main-container">
          <div className="container__left">
            <TypingContainer 
            inProgress={this.state.inProgress} 
            finished={this.state.finished} 
            stringToType={this.state.stringToType} 
            validateTyping={this.validateTyping} 
            handleBackspace={this.handleBackspace} 
            overlayCharacters={this.state.overlayCharacters} 
            startRound={this.startRound} 
            />

            {this.state.finished && 
            <Summary 
            successCount={this.state.successCount} 
            errorCountCurrent={this.state.errorCountCurrent} 
            errorCountTotal={this.state.errorCountTotal} 
            errorChars={this.state.sortedErrorChars} 
            totalChars={this.state.stringToType.length}
            timeElapsed={this.state.timeElapsed}
            wordsPerMinute={this.state.wordsPerMinute}
            resetRound={this.resetRound}
            />}
          </div>

          <InfoContainer 
          successCount={this.state.successCount} 
          remainingCount={this.state.remainingCount} 
          errorCountCurrent={this.state.errorCountCurrent} 
          errorCountTotal={this.state.errorCountTotal} 
          errorChars={this.state.sortedErrorChars} 
          timeElapsed={this.state.timeElapsed}
          wordsPerMinute={this.state.wordsPerMinute} 
          finished={this.state.finished} 
          />



        </section>
      </div>
    );
  }
}

export default App;
