import React, {Component} from 'react';
import {withRouter,Redirect} from 'react-router-dom'


import './Register.css';

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

class Register extends Component {
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      passConfirm:'',
      errorMsg:'',
      isValid:''
    }
    this.setChangeEmail = this.setChangeEmail.bind(this);
    this.setChangePassword = this.setChangePassword.bind(this);
    this.setChangePassConfirm=this.setChangePassConfirm.bind(this);
  }

  setChangeEmail(value){
    this.setState({email:value})
  }
  setChangePassword(value){
    this.setState({password:value})
  }

  setChangePassConfirm(value){
    this.setState({passConfirm:value})
  }

  handleValidateEmail(value) {


      const re = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
      return re.test(value)
  }

  handleValidatePassword(value) {
      const re = /^.{5,10}$/;
      return re.test(value)
  }

  register(){
    const handleLogin=this.props.handleLogin

    if(this.state.email === '' || this.state.password === '' || this.state.passwordConfirm === '') {
            this.setState({isValid: false, errorMsg: 'All fields must be filled'});
            return;
        }
    if(this.state.password !== this.state.passConfirm) {
            this.setState({isValid: false, errorMsg: 'Password must match'});
            return;
            }

    handleLogin()
      }

    render(){
      if (this.props.redirect) {
        return <Redirect to={'/'} />;
      }
        return(
          <div className='login'>
          <Input type='email'
                 placeholder='email..'
                 setChange={this.setChangeEmail}
                 handleValidate={this.handleValidateEmail}
                 errorMsg="Email is not valid"

          />
          <Input type='password'
                 placeholder='password...'
                 setChange={this.setChangePassword}
                 handleValidate={this.handleValidatePassword}
                 errorMsg='Password is not valid,must have at least 5 and max 10 characters.'
          />
          <Input type='password'
                 placeholder='password...'
                 setChange={this.setChangePassConfirm}
                 handleValidate={this.handleValidatePassword}
                 errorMsg='Password is not valid,must have at least 5 and max 10 characters.'
          />
          {!this.state.isValid && <div>{this.state.errorMsg}</div>}
          <Button value='Log In' onClick={()=>{this.register()}}/>
          </div>
        )
    }
}

export default withRouter(Register);
