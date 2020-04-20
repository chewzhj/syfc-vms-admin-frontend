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

export default class LoginVolunteer extends React.Component {

  componentDidUpdate() {
    const {growlMessage} = this.props.loginVolunteer
    if (growlMessage) {
      this.onNotification(growlMessage)
    }
  }

  changeEmail = (e) => this.props.changeEmail(e.target.value)
  changePassword = (e) => this.props.changePassword(e.target.value)
  back = (e) => {
    e.preventDefault()
    this.props.reset()
    this.props.history.push('/login')
  }
  volunteerLogin = () => {
    const {
      email,
      password,
    } = this.props.loginVolunteer

    if (email.trim() !== "" && password !== "") {
      const volunteerLoginObject = {
        email: email.trim(),
        password
      }
      this.props.volunteerLogin(volunteerLoginObject)
    }
  }

  onNotification = (growlNotification) => {
    const alerts = {
      success: {
        message: `Volunteer Login Successful`,
        description: `Successfully logged in!`
      },
      error: {
        message: `Error`,
        description: "Email or password is invalid!"
      }
    }

    const openNotificationWithIcon = type => {
      notification[type](alerts[type]);
    };

    openNotificationWithIcon(growlNotification)

    this.props.resetNotification()

    if (growlNotification === 'success') {
      window.location.href = '/events'
    }
  }

  render() {
    const {
      email,
      password,
      submitting,
    } = this.props.loginVolunteer

    return (
      <LoginElements>
        <Row style={{marginBottom: 20}}>
          <Col span={6}>
            <Link to='/login'>
              <Button
                style={{float: 'left'}}
                icon={
                  <CaretLeftOutlined/>
                }>
                Back
              </Button>
            </Link>
          </Col>
          <Col span={12}>
            <Title level={4}>Volunteer Login</Title>
          </Col>
        </Row>

        <Form>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input
              placeholder={LoginPhrases.INPUT_EMAIL_PLACEHOLDER}
              prefix={<UserOutlined />}
              onChange={this.changeEmail}
              value={email}
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
              onChange={this.changePassword}
              value={password}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              onClick={this.volunteerLogin}
              style={{width: '100%', margin: '8px 0'}}>
              {LoginPhrases.BUTTON_LOGIN}
            </Button>
          </Form.Item>
        </Form>
      </LoginElements>
    )
  }
}
