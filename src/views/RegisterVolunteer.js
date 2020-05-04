import React from 'react'
import {
  Row,
  Col,
  Button,
  Input,
  DatePicker,
  Select,
  Typography,
  Radio,
  notification,
} from 'antd'
import {
  CaretLeftOutlined,
} from '@ant-design/icons'
import LoginElements from '../components/LoginElements'
import VolunteersPhrases from '../phrases/VolunteersPhrases'
import {internalDateFormat, displayDateFormat} from '../variables/DateFormats'
import {deptOptions} from '../variables/DepartmentOptions'
import {checkVolFields, errorMessages} from '../variables/volunteerCheckFunctions'

const {Option} = Select
const {Title} = Typography

export default class RegisterVolunteer extends React.Component {

  // render the notif after submission
  componentDidUpdate() {
    const {growlMessage} = this.props.registerVolunteer
    if (growlMessage) {
      this.onNotification(growlMessage)
    }
  }

  // functions for changing fields
  changeName = (e) => this.props.changeName(e.target.value)
  changeEmail = (e) => this.props.changeEmail(e.target.value)
  changePassword = (e) => this.props.changePassword(e.target.value)
  changeDob = (m, s) => this.props.changeDob(m)
  changeNRIC = (e) => this.props.changeNRIC(e.target.value)
  changeAddress = (e) => this.props.changeAddress(e.target.value)
  changePostal = (e) => this.props.changePostal(e.target.value)
  changeChurch = (e) => this.props.changeChurch(e.target.value)
  changeDept = (value) => this.props.changeDept(value)
  changeGender = (e) => this.props.changeGender(e.target.value)
  changeNumber = (e) => this.props.changeNumber(e.target.value)
  resetNotification = () => this.props.resetNotification()
  discard = (e) => {
    e.preventDefault()
    this.props.discard()
    this.props.history.push('/login')
  }

  // field checking functions, see volunteerCheckFunctions
  checkFields = () => {
    const {
      name,
      email,
      password,
      dob,
      nric,
      address,
      postal,
      church,
      dept,
      gender,
      number,
    } = this.props.registerVolunteer

    return checkVolFields(
      name,
      email,
      password,
      dob,
      nric,
      address,
      postal,
      church,
      dept,
      gender,
      number,
      true
    )
  }
  clickSubmit = () => {
    const checks = this.checkFields()
    let i = 0
    const outputs = []
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
      this.submitVolunteer()
    } else {
      notification.warning({
        message: 'Volunteer Creation Error',
        description: messageNodeBuilder(outputs)
      })
    }
  }
  submitVolunteer = () => {
    const {
      name,
      email,
      password,
      dob,
      nric,
      address,
      postal,
      church,
      dept,
      gender,
      number,
    } = this.props.registerVolunteer

    const dtf = internalDateFormat

    const messageBody = {
      full_name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      dob: dob.format(dtf),
      nric: nric.trim(),
      address: address.trim(),
      postal_code: postal.trim(),
      church: church.trim(),
      department: dept.trim(),
      gender: gender.trim(),
      number: number.trim(),
    }

    this.props.createVolunteer(messageBody)
  }
  // sets behavious for notifs
  onNotification = (growlNotification) => {
    if (growlNotification === 'success') {
      this.props.history.push('/login/volunteer')
      return
    }

    const alerts = {
      success: {
        message: `Created Volunteer`,
        description: `Successfully created!`
      },
      error: {
        message: `Error`,
        description: "There has been an unexpected error!"
      }
    }

    const openNotificationWithIcon = type => {
      notification[type](alerts[type]);
    };

    openNotificationWithIcon(growlNotification)

    this.props.resetNotification()
  }

  render() {
    const {
      name,
      email,
      password,
      dob,
      nric,
      address,
      postal,
      church,
      dept,
      gender,
      number,
      submitting,
    } = this.props.registerVolunteer

    return (
      <LoginElements>
        <Row style={{marginBottom: 20}}>
          <Col span={7}>
            <Button
              href='/login'
              onClick={this.discard}
              style={{float: 'left'}}
              icon={
                <CaretLeftOutlined/>
              }>
              Back
            </Button>
          </Col>
          <Col span={10}>
            <Title level={4}>Register</Title>
          </Col>
        </Row>

        {/* Name Field */}
        <Row gutter={[5, 5]}>
          <Col span={22} push={1} style={{textAlign: 'left'}}>
            {VolunteersPhrases.CREATE_FORM_TITLE_NAME}
          </Col>
          <Col xs={24}>
            <Input
              placeholder={VolunteersPhrases.CREATE_FORM_TITLE_NAME}
              value={name}
              onChange={this.changeName}
            />
          </Col>
        </Row>

        {/* Email Field */}
        <Row gutter={[5, 5]} style={{ marginTop: 10}}>
          <Col span={22} push={1} style={{textAlign: 'left'}}>
            {VolunteersPhrases.CREATE_FORM_TITLE_EMAIL}
          </Col>
          <Col xs={24}>
            <Input
              placeholder={VolunteersPhrases.CREATE_FORM_TITLE_EMAIL}
              value={email}
              onChange={this.changeEmail}
            />
          </Col>
        </Row>

        {/* Password Field */}
        <Row gutter={[5, 5]} style={{ marginTop: 10}}>
          <Col span={22} push={1} style={{textAlign: 'left'}}>
            {VolunteersPhrases.CREATE_FORM_TITLE_PW}
          </Col>
          <Col xs={24}>
            <Input.Password
              placeholder={VolunteersPhrases.CREATE_FORM_TITLE_PW}
              value={password}
              onChange={this.changePassword}
            />
          </Col>
        </Row>

        {/* DOB Field */}
        <Row gutter={[5, 5]} style={{ marginTop: 10}}>
          <Col span={22} push={1} style={{textAlign: 'left'}}>
            {VolunteersPhrases.CREATE_FORM_TITLE_DOB}
          </Col>
          <Col xs={24}>
            <DatePicker
              style={{width: '100%'}}
              placeholder={VolunteersPhrases.CREATE_FORM_TITLE_DOB}
              format={displayDateFormat}
              value={dob}
              onChange={this.changeDob}
            />
          </Col>
        </Row>

        {/* NRIC Field */}
        <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
          <Col span={22} push={1} style={{textAlign: 'left'}}>
            {VolunteersPhrases.CREATE_FORM_TITLE_NRIC}
          </Col>
          <Col xs={24}>
            <Input
              placeholder={VolunteersPhrases.CREATE_FORM_TITLE_NRIC}
              value={nric}
              onChange={this.changeNRIC}
            />
          </Col>
        </Row>

        {/* Address Field */}
        <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
          <Col span={22} push={1} style={{textAlign: 'left'}}>
            {VolunteersPhrases.CREATE_FORM_TITLE_ADDRESS}
          </Col>
          <Col xs={24}>
            <Input.TextArea
              placeholder={VolunteersPhrases.CREATE_FORM_TITLE_ADDRESS}
              autoSize={{minRows: 1, maxRows: 4}}
              value={address}
              onChange={this.changeAddress}
            />
          </Col>
        </Row>

        {/* Postal Code Field */}
        <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
          <Col span={22} push={1} style={{textAlign: 'left'}}>
            {VolunteersPhrases.CREATE_FORM_TITLE_POSTAL_CODE}
          </Col>
          <Col xs={24}>
            <Input
              placeholder={VolunteersPhrases.CREATE_FORM_TITLE_POSTAL_CODE}
              value={postal}
              onChange={this.changePostal}
            />
          </Col>
        </Row>

        {/* Church Field */}
        <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
          <Col span={22} push={1} style={{textAlign: 'left'}}>
            {VolunteersPhrases.CREATE_FORM_TITLE_CHURCH}
          </Col>
          <Col xs={24}>
            <Input
              placeholder={VolunteersPhrases.CREATE_FORM_TITLE_CHURCH}
              value={church}
              onChange={this.changeChurch}
            />
          </Col>
        </Row>

        {/* Department Field */}
        <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
          <Col span={22} push={1} style={{textAlign: 'left'}}>
            {VolunteersPhrases.CREATE_FORM_TITLE_DEPT}
          </Col>
          <Col xs={24}>
            <Select
              style={{width: '100%'}}
              placeholder={VolunteersPhrases.CREATE_FORM_TITLE_DEPT}
              value={dept}
              onChange={this.changeDept}
              >
              {deptOptions.map(dept => (
                <Option key={dept} value={dept}>
                  {dept}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        {/* Gender Field */}
        <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
          <Col span={22} push={1} style={{textAlign: 'left'}}>
            {VolunteersPhrases.CREATE_FORM_TITLE_GENDER}
          </Col>
          <Col xs={24}>
            <Radio.Group value={gender} onChange={this.changeGender} buttonStyle='solid' style={{float: 'left'}}>
              <Radio.Button value='M'>Male</Radio.Button>
              <Radio.Button value='F'>Female</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>

        {/* Phone Number Field */}
        <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
          <Col span={22} push={1} style={{textAlign: 'left'}}>
            {VolunteersPhrases.CREATE_FORM_TITLE_NUMBER}
          </Col>
          <Col xs={24}>
            <Input
              placeholder={VolunteersPhrases.CREATE_FORM_TITLE_NUMBER}
              value={number}
              onChange={this.changeNumber}
            />
          </Col>
        </Row>

        {/* Button Bar */}
        <Row style={{ marginTop: 24 }}>
          {/* Submit Button */}
          <Col xs={24}>
            <Button
              onClick={this.clickSubmit}
              loading={submitting}
              type='primary'
              style={{width: '100%'}}>
              Register
            </Button>
          </Col>
        </Row>
      </LoginElements>
    )
  }
}
