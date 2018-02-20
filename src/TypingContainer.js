import React, { Component } from 'react';

class TypingContainer extends Component {
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(ev){
    this.props.validateTyping(ev.target.value);
  }
  handleKeyDown(ev){
    if(ev.which===8) {
      this.props.handleBackspace();
    } else if (ev.which===37 || ev.which===39){
      ev.preventDefault();
    }
  }
  handleClick(ev){
    ev.preventDefault();
  }

  formatOverlayChars(){
    let log = this.props.overlayCharacters;
    let outputString = '';
    log.forEach( (index, i) => {  
      return outputString += `${index==='correct' ?
      this.props.stringToType[i-1] :
      '<span class="red">' + this.props.stringToType[i-1] + '</span>'}`
    })
    if (log.length >= this.props.stringToType.length){
      outputString += "";
    } else if (outputString.length > 0) {
      outputString += `<span class="flashing">${this.props.stringToType[log.length-1]}</span>`;
    } else {
      outputString += `<span class="flashing">${this.props.stringToType[0]}</span>`;      
    }
    return {__html: outputString};
  }

  render() {
    return (
      <div className="TypingContainer">
        <div className="TypingArea" id='background-text-display' disabled>{this.props.stringToType}</div>

        {this.props.inProgress &&
        <div className="TypingArea" id='text-overlay' dangerouslySetInnerHTML={this.formatOverlayChars()}></div>
        }

        {this.props.finished &&
        <div className="TypingArea finished" id='text-overlay' dangerouslySetInnerHTML={this.formatOverlayChars()}></div>
        }
        
        {this.props.inProgress &&
        <textarea className="TypingArea" 
        id='user-text-display' 
        autoFocus 
        autoCorrect="off" 
        autoCapitalize="off"
        spellCheck="false" 
        onChange={this.handleChange} 
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}></textarea>
        }
        {!this.props.inProgress && !this.props.finished && <button className="button--start" onClick={this.props.startRound}>Start!</button>}

      </div>
    );
  }
}

export default TypingContainer;
