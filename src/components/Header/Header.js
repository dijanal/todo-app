import React from 'react'
import {Link} from 'react-router-dom'

import './Header.css'

class Header extends React.Component {
  render(){
    return(
      <div className='header'>
        <ul>
        {!this.props.redirect && <div>
          <li>
            <Link to='/login'> Log In </Link>
          </li>
          <li>
            <Link to='/register'> Register </Link>
          </li>
          <hr/>
          </div>}
          {this.props.redirect && <div>
          <li className='signout'> 
            <a onClick={()=> this.props.handleSingOut()}>Sing Out </a>
          </li>
      </div>}
        </ul>
      </div>
    )
  }
}

export default Header;
