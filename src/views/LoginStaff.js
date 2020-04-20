import React from 'react'
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  notification,
} from 'antd'
import {
  CaretLeftOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import LoginElements from '../components/LoginElements'
import LoginPhrases from '../phrases/LoginPhrases'
import Full_Logo from '../assets/img/syfc-full-logo.png'

const {Title} = Typography

export default class LoginStaff extends React.Component {

  componentDidUpdate() {
    const {growlMessage} = this.props.loginStaff
    if (growlMessage) {
      this.onNotification(growlMessage)
    }
  }

  changeUsername = (e) => this.props.changeUsername(e.target.value)
  changePassword = (e) => this.props.changePassword(e.target.value)
  back = (e) => {
    e.preventDefault()
    this.props.reset()
    this.props.history.push('/login')
  }
  staffLogin = () => {
    const {
      username,
      password,
    } = this.props.loginStaff

    if (username.trim() !== "" && password !== "") {
      const staffLoginObject = {
        username: username.trim(),
        password
      }
      this.props.staffLogin(staffLoginObject)
    }
  }

  onNotification = (growlNotification) => {
    const alerts = {
      success: {
        message: `Staff Login Successful`,
        description: `Successfully logged in!`
      },
      error: {
        message: `Error`,
        description: "Username or password is invalid!"
      }
    }

    const openNotificationWithIcon = type => {
      notification[type](alerts[type]);
    };

    openNotificationWithIcon(growlNotification)

    this.props.resetNotification()

    if (growlNotification === 'success') {
      // this.props.history.push('/volunteers')
      window.location.href = '/events'
    }
  }

  render() {
    const {
      username,
      password,
      submitting,
    } = this.props.loginStaff

    return (
      <LoginElements>
        <Row style={{marginBottom: 20}}>
          <Col span={6}>
            <Button
              href='/login'
              onClick={this.back}
              style={{float: 'left'}}
              icon={
                <CaretLeftOutlined/>
              }>
              Back
            </Button>
          </Col>
          <Col span={12}>
            <Title level={4}>Staff Login</Title>
          </Col>
        </Row>

        <Form>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input
              placeholder={LoginPhrases.INPUT_STAFF_USERNAME_PLACEHOLDER}
              prefix={<UserOutlined />}
              // style={{margin: '8px 0'}}
              onChange={this.changeUsername}
              value={username}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password
              placeholder={LoginPhrases.INPUT_PASSWORD_PLACEHOLDER}
              prefix={<LockOutlined />}
              // style={{margin: '8px 0'}}
              onChange={this.changePassword}
              value={password}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={submitting}
              onClick={this.staffLogin}
              style={{width: '100%', margin: '8px 0'}}>
              {LoginPhrases.BUTTON_LOGIN}
            </Button>
          </Form.Item>
        </Form>
      </LoginElements>
    )
  }
}
