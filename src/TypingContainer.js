import React, { Component } from 'react';

class TypingContainer extends Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div className="TypingContainer">
        <textarea name='background-text-display' id='background-text-display' disabled>{this.props.stringToType}</textarea>
        <textarea name='user-text-display' id='user-text-display'>Here's some text.</textarea>
      </div>
    );
  }
}

export default TypingContainer;
