import React from 'react'
import {
  Form,
  Input,
  Button,
} from 'antd'
import {
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import LoginElements from '../components/LoginElements'
import LoginPhrases from '../phrases/LoginPhrases'
import Full_Logo from '../assets/img/syfc-full-logo.png'

export default class Login extends React.Component {

  render() {
    return (
      <LoginElements>
        <div>

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
        </div>
      </LoginElements>
    )
  }
}
