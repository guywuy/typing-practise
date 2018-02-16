import React, { Component } from 'react';

class TypingContainer extends Component {
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ev){    
    this.props.validateTyping(ev.target.value);
  }

  formatOverlayChars(){
    let outputString = '';
    this.props.overlayCharacters.map( char => {  
      return outputString += `${char[1]==='correct' ?
      char[0] :
      '<span class="red">' + char[0] + '</span>'}`
    })
    return {__html: outputString};
  }

  render() {
    return (
      <div className="TypingContainer">
        <div className="TypingArea" id='background-text-display' disabled>{this.props.stringToType}</div>
        <div className="TypingArea" id='text-overlay' dangerouslySetInnerHTML={this.formatOverlayChars()}></div>
        <textarea className="TypingArea" id='user-text-display' autoFocus onChange={this.handleChange}></textarea>
      </div>
    );
  }
}

export default TypingContainer;
