import React from 'react'
import {
  Button,
} from 'antd'
import {Link} from 'react-router-dom'
import LoginElements from '../components/LoginElements'

// main page with 3 redirect buttons
export default class Login extends React.Component {

  render() {
    return (
      <LoginElements>

        <Link to='/login/staff'>
          <Button type='primary' size='large' style={{width: '100%', margin: '15px 0'}}>
            Staff Login
          </Button>
        </Link>

        <Link to='/login/volunteer'>
          <Button type='primary' size='large' style={{width: '100%', margin: '15px 0'}}>
            Volunteer Login
          </Button>
        </Link>

        <Link to='/register'>
          <Button size='large' style={{width: '100%', margin: '15px 0'}}>
            Register as New Volunteer
          </Button>
        </Link>
      </LoginElements>
    )
  }
}
