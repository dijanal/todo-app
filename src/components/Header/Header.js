import React from 'react'
import {Link} from 'react-router-dom'

import './Header.css'

class Header extends React.Component {
  render(){
    return(
      <div className='header'>
        <ul>
          <li>
            <Link to='/login'> Log In </Link>
          </li>
          <li>
            <Link to='/register'> Register </Link>
          </li>
        </ul>
        <hr/>
      </div>
    )
  }
}

export default Header;
