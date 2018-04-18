import React from 'react';
import {withRouter,Redirect} from 'react-router-dom'

import './Login.css';

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isValid: false,
            errorMsg: ''
        }

        this.setChangeEmail = this.setChangeEmail.bind(this);
        this.setChangePassword = this.setChangePassword.bind(this);

    }


    setChangeEmail(value){
      this.setState({email:value})
    }
  setChangePassword(value){
      this.setState({password:value})
    }

    login() {
        const handleLogin = this.props.handleLogin;
        const {email, password} = this.state;


        if(email === '' || password === '') {
            this.setState({isValid: false, errorMsg: 'All fields must be filled'});
            return;
        }

        if(!this.handleValidateEmail(email) || !this.handleValidatePassword(password))
            return;


        console.log({email, password});

        handleLogin();
    }

    handleValidateEmail(value) {
        const re = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return re.test(value);
    }

    handleValidatePassword(value) {
        const re = /^.{4,8}$/;
        return re.test(value)
    }

    render() {


      if (this.props.redirect) {
        return <Redirect to={'/'} />;
      }
        return (
            <div className='login'>

              <Input
                  type="text"
                  placeholder="Email"
                  setChange={this.setChangeEmail}
                  handleValidate={this.handleValidateEmail}
                  errorMsg="Email is not valid"
              />
              <Input
                  type="password"
                  placeholder="Password"
                  setChange={this.setChangePassword}
                  handleValidate={this.handleValidatePassword}
                  errorMsg='Password is not valid,must have at least 5 and max 10 characters.'
              />
              {!this.state.isValid && <div >{this.state.errorMsg}</div>}
              <Button
                  value={"Log In"}
                  onClick={() => {this.login()}}
              />
            </div>
        );
    }
}

export default withRouter(Login);
