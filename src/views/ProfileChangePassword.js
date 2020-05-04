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

export default class ProfileChangePassword extends React.Component {

  // listener for notification
  componentDidUpdate() {
    const { growlMessage } = this.props.profileChangePassword
    if (growlMessage) {
      this.onNotification(growlMessage)
    }
  }

  // state changes
  changeOldPassword = (e) => this.props.changeOldPassword(e.target.value)
  changeNewPassword = (e) => this.props.changeNewPassword(e.target.value)
  changeConfirmPassword = (e) => this.props.changeConfirmPassword(e.target.value)
  discard = () => {
    this.props.discard()
    this.props.history.push('/profile')
  }
  // field checks
  checkSubmit = (check) => {
    const {oldPassword} = this.props.profileChangePassword
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
    } = this.props.profileChangePassword

    const messageBody = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmedNewPassword: confirmPassword,
    }

    this.props.postChangePassword(messageBody)
  }
  // notification handler
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
      this.props.history.push('/profile')
    }
  }

  render() {
    const {
      oldPassword,
      newPassword,
      confirmPassword,
      submitting,
    } = this.props.profileChangePassword
    const confirmed = newPassword === confirmPassword

    return (
      <SideBar activeTab='profile' title="Change Password">
        <Card>
          {/* Old Password Field */}
          <Row gutter={[5, 5]}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              Old Password
            </Col>
            <Col sm={18} xs={22}>
              <Input.Password
                placeholder="Old Password"
                value={oldPassword}
                onChange={this.changeOldPassword}
              />
            </Col>
          </Row>

          {/* New Password Field */}
          <Row gutter={[5, 5]}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              New Password
            </Col>
            <Col sm={18} xs={22}>
              <Input.Password
                placeholder="New Password"
                value={newPassword}
                onChange={this.changeNewPassword}
              />
            </Col>
          </Row>

          {/* Confirm New Password Field */}
          <Row gutter={[5, 5]}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              Confirm New Password
            </Col>
            <Col sm={18} xs={22}>
              <Input.Password
                placeholder="Confirm New Password"
                style={!confirmed ? {backgroundColor: red[1]} : null}
                value={confirmPassword}
                onChange={this.changeConfirmPassword}
              />
            </Col>
          </Row>
        </Card>


        {/* Button Bar*/}
        <Row justify="space-between">
          {/* Discard button */}
          <Col lg={6} md={6} sm={12} xs={24} style={{ marginTop: 10 }}>
              <Button onClick={this.discard} style={{ float: 'left', marginRight: 10, marginTop: 10 }}>
                Discard Change
              </Button>
          </Col>

          {/* Submit button */}
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
