import React from 'react'
import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

function Navbar() {
  
  const {logout} = useLogout()

  const {user} = useAuthContext()

  const handleClick = async()=>{
    logout()
  }
  
  return (
    <header>
      <div className="container">
        <Link to='/'>
          <h1>Progress Pulse</h1>
        </Link>
        <nav>
          {user && (
            <div className='left'>
              <span>{user.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar