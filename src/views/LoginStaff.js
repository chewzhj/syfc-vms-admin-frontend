import React from 'react'
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
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

  render() {
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
            <Title level={4}>Staff Login</Title>
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
              placeholder={LoginPhrases.INPUT_STAFF_USERNAME_PLACEHOLDER}
              prefix={<UserOutlined />}
              // style={{margin: '8px 0'}}
              // onChange={this.onChangeEmail}
              // value={email}
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
              // onChange={this.onChangePassword}
              // value={password}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              onClick={this.onClickLogin}
              style={{width: '100%', margin: '8px 0'}}>
              {LoginPhrases.BUTTON_LOGIN}
            </Button>
          </Form.Item>
        </Form>
      </LoginElements>
    )
  }
}
