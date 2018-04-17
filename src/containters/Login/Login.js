import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import './Login.css';

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      errorMsg:'',
      valid:false

    }
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange(key, value) {

      const newState = {};
      newState[key] = value;

      this.setState(newState);
      console.log(this.state.email)
  }

  setValidateEmail(value){
    const re = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return re.test(value);
  }
  setValidatePassword(value) {
    const re = /^.{5,10}$/;
    return re.test(value)

}


    render(){


        return(
            <div className='login'>
            <Input type='email'
                   placeholder='email...'
                   name='email'
                   setValidate={this.setValidateEmail}
                   errorMsg='Email is not valid.'

            />
            <Input type='password'
                   placeholder='password...'
                   name='password'
                   setValidate={this.setValidatePassword}
                   errorMsg='Password is not valid,must have at least 5 and max 10 characters.'

            />
            <Button value='Log In' onClick={this.login}/>
            </div>
        )
    }
}

export default Login;
