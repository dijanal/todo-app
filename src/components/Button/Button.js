import React from 'react';

import './Button.css'

class Button extends React.Component{
  render(){
    return(
      <div>
        <button type='submit'>{this.props.value}</button>
      </div>
    )
  }
}

export default Button;
