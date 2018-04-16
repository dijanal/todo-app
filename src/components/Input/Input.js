import React from 'react'

import './Input.css'

class Input extends React.Component{
  render(){
    return(
      <div className='input'>
        <input type={this.props.type} placeholder={this.props.placeholder}/>
      </div>
    )
  }
}

export default Input;
