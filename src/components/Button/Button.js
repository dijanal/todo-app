import React from 'react';

import './Button.css'

class Button extends React.Component{
  render(){
    return(
      <div className='button'>
        <button type='submit' onClick={this.props.onClick}>{this.props.value}</button>
      </div>
    )
  }
}

export default Button;
