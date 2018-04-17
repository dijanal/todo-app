import React from 'react'

import './Input.css'

class Input extends React.Component{
  constructor(props){
    super(props)
    this.state={
      valid:true,
    }
    this.onBlur=this.onBlur.bind(this)
  }
  onBlur(event){
    const {setValidate,name}=this.props
    const value=event.target.value
    const valid=setValidate(value)
    this.setState({valid})
    console.log(valid)
}
  render(){
    return(
      <div className='input'>
        <input type={this.props.type} placeholder={this.props.placeholder} onBlur={this.onBlur}/>
        {!this.state.valid && <div>{this.props.errorMsg}</div>}
      </div>
    )
  }
}

export default Input;
