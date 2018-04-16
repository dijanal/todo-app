import React, {Component} from 'react';
import './Register.css';

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

class Register extends Component {
    render(){
        return(
          <div className='login'>
          <Input type='email'
                 placeholder='email..'
          />
          <Input type='password'
                 placeholder='password...'
          />
          <Input type='password'
                 placeholder='password...'
          />
          <Button value='Log In'/>
          </div>
        )
    }
}

export default Register;
