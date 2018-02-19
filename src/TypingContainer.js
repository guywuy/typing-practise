import React, { Component } from 'react';

class TypingContainer extends Component {
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(ev){
    this.props.validateTyping(ev.target.value);
  }
  handleKeyDown(ev){
    console.log(ev.which)
    if(ev.which===8) {
      this.props.handleBackspace();
    }
  }

  formatOverlayChars(){
    let log = this.props.overlayCharacters;
    let outputString = '';
    log.forEach( (index, i) => {  
      return outputString += `${index==='correct' ?
      this.props.stringToType[i-1] :
      '<span class="red">' + this.props.stringToType[i-1] + '</span>'}`
    })
    return {__html: outputString};
  }

  render() {
    return (
      <div className="TypingContainer">
        <div className="TypingArea" id='background-text-display' disabled>{this.props.stringToType}</div>
        <div className="TypingArea" id='text-overlay' dangerouslySetInnerHTML={this.formatOverlayChars()}></div>
        <textarea className="TypingArea" id='user-text-display' autoFocus onChange={this.handleChange} onKeyDown={this.handleKeyDown}></textarea>
      </div>
    );
  }
}

export default TypingContainer;
