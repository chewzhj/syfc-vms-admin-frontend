import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Card,
  Button,
  Input,
  notification,
} from 'antd'
import { red } from '@ant-design/colors'

export default class StaffChangePassword extends React.Component {

  componentDidUpdate() {
    const { growlMessage } = this.props.staffChangePassword
    if (growlMessage) {
      this.onNotification(growlMessage)
    }
  }

  changeOldPassword = (e) => this.props.changeOldPassword(e.target.value)
  changeNewPassword = (e) => this.props.changeNewPassword(e.target.value)
  changeConfirmPassword = (e) => this.props.changeConfirmPassword(e.target.value)
  discard = () => {
    this.props.discard()
    this.props.history.push('/events')
  }
  checkSubmit = (check) => {
    const {oldPassword} = this.props.staffChangePassword
    const checks = (new Array(2)).fill(false)

    if (oldPassword.trim() !== '') {
      checks[0] = true
    }
    checks[1] = check

    return checks
  }
  clickSubmit = (check) => {
    const checks = this.checkSubmit(check)
    let i = 0
    const outputs = []
    const errorMessages = [
      'Old Password is empty',
      'Passwords do not match',
    ]
    for (const idx in errorMessages) {
      if (!checks[idx]) {
        outputs.push(`${++i}. ${errorMessages[idx]}`)
      }
    }

    const messageNodeBuilder = (errors) => {
      return (
        <div>
          There were errors in the following
          {errors.map((msg, idx) => (
            <div key={idx}>
              {msg}
            </div>
          ))}
        </div>
      )
    }

    if (i === 0) {
      this.submitChangePassword()
    } else {
      notification.warning({
        message: 'Change Password Error',
        description: messageNodeBuilder(outputs)
      })
    }
  }
  submitChangePassword = () => {
    const {
      oldPassword,
      newPassword,
      confirmPassword,
    } = this.props.staffChangePassword

    const messageBody = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmedNewPassword: confirmPassword,
    }

    this.props.postChangePassword(messageBody)
  }

  onNotification = (growlNotification) => {
    const alerts = {
      success: {
        message: `Changed Password`,
        description: `Successfully changed password!`
      },
      error: {
        message: `Error`,
        description: "Your old password is wrong!"
      }
    }

    const openNotificationWithIcon = type => {
      notification[type](alerts[type]);
    };

    openNotificationWithIcon(growlNotification)

    this.props.discard()

    if (growlNotification === 'success') {
      this.props.history.push('/events')
    }
  }

  render() {
    const {
      oldPassword,
      newPassword,
      confirmPassword,
      submitting,
    } = this.props.staffChangePassword
    const confirmed = newPassword === confirmPassword

    return (
      <SideBar activeTab='changePassword' title="Change Password">
        <Card>
          {/* Old Password Field */}
          <Row gutter={[5, 5]}>
            <Col span={24} style={{lineHeight: '31px'}}>
              Old Password
            </Col>
            <Col span={24}>
              <Input.Password
                placeholder="Old Password"
                value={oldPassword}
                onChange={this.changeOldPassword}
              />
            </Col>
          </Row>

          {/* New Password Field */}
          <Row gutter={[5, 5]}>
            <Col span={24} style={{lineHeight: '31px'}}>
              New Password
            </Col>
            <Col span={24}>
              <Input.Password
                placeholder="New Password"
                value={newPassword}
                onChange={this.changeNewPassword}
              />
            </Col>
          </Row>

          {/* Confirm New Password Field */}
          <Row gutter={[5, 5]}>
            <Col span={24} style={{lineHeight: '31px'}}>
              Confirm New Password
            </Col>
            <Col span={24}>
              <Input.Password
                placeholder="Confirm New Password"
                style={!confirmed ? {backgroundColor: red[1]} : null}
                value={confirmPassword}
                onChange={this.changeConfirmPassword}
              />
            </Col>
          </Row>
        </Card>


        {/* Top Row Action Buttons - Discard, Previous, Next */}
        <Row justify="space-between">
          {/* Discard button */}
          <Col lg={6} md={6} sm={12} xs={24} style={{ marginTop: 10 }}>
              <Button onClick={this.discard} style={{ float: 'left', marginRight: 10, marginTop: 10 }}>
                Discard Change
              </Button>
          </Col>

          {/* Previous and Next Buttons for Stepper - Visibility */}
          <Col lg={12} md={12} sm={12} xs={24} style={{ marginTop: 10 }}>
            <Button
              onClick={() => this.clickSubmit(confirmed)}
              loading={submitting}
              type='primary'
              style={{ float: 'right', marginTop: 10, marginLeft: 10 }}>
              Change Password
            </Button>
          </Col>
        </Row>
      </SideBar>
    )
  }
}
