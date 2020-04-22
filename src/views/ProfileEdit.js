import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Button,
  Card,
  Input,
  DatePicker,
  Select,
  Radio,
  notification,
} from 'antd'
import { yellow } from '@ant-design/colors'
import {Redirect} from 'react-router-dom'
import VolunteersPhrases from '../phrases/VolunteersPhrases'
import {internalDateFormat, displayDateFormat} from '../variables/DateFormats'

const {Option} = Select

const departments = [
  "Primary",
  "Secondary",
  "JC",
  "Polytechnic",
  "University",
]

export default class ProfileEdit extends React.Component {

  componentDidUpdate() {
    const {growlMessage} = this.props.profileEdit
    if (growlMessage) {
      this.onNotification(growlMessage)
    }
  }

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
  discard = () => {
    this.props.discard()
    this.props.history.push('/profile')
  }

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
    } = this.props.profileEdit

    const checks = (new Array(11)).fill(false)
    if (name.trim() !== '') {
      checks[0] = true
    }
    if (email.trim() !== '') {
      checks[1] = true
    }
    if (password.trim() !== '') {
      checks[2] = true
    }
    if (dob !== null) {
      checks[3] = true
    }
    if (nric.trim() !== '') {
      checks[4] = true
    }
    if (address.trim() !== '') {
      checks[5] = true
    }
    if (postal.trim() !== '') {
      checks[6] = true
    }
    if (church.trim() !== '') {
      checks[7] = true
    }
    if (dept.trim() !== '') {
      checks[8] = true
    }
    if (gender === 'M' || gender === 'F') {
      checks[9] = true
    }
    if (number.trim() !== '') {
      checks[10] = true
    }

    return checks
  }
  clickSubmit = () => {
    const checks = this.checkFields()
    let i = 0
    const outputs = []
    const errorMessages = [
      'Name is empty',
      'Email is empty',
      'Password is empty',
      'Date of Birth is empty',
      'NRIC is empty',
      'Address is empty',
      'Postal is empty',
      'Church is empty',
      'Department is empty',
      'Gender is invalid',
      'Phone Number is empty',
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
      this.submitVolunteer()
    } else {
      notification.warning({
        message: 'Profile Error',
        description: messageNodeBuilder(outputs)
      })
    }
  }
  submitVolunteer = () => {
    const {
      originalVolDetails,
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
    } = this.props.profileEdit

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

    // console.log(JSON.stringify(messageBody));
    this.props.editVolunteer(originalVolDetails.id, messageBody)
  }

  onNotification = (growlNotification) => {
    const alerts = {
      success: {
        message: `Updated Profile`,
        description: `Successfully updated!`
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

    if (growlNotification === 'success') {
      this.props.history.push('/profile')
    }
  }

  render() {
    const {
      originalVolDetails,
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
    } = this.props.profileEdit
    if (!originalVolDetails.id) {
      return <Redirect to='/profile' />
    }
    const nameChanged = name !== originalVolDetails.name
    const emailChanged = email !== originalVolDetails.email
    const passwordChanged = password !== originalVolDetails.password
    const dobChanged = !dob.isSame(originalVolDetails.dob, 'day')
    const nricChanged = nric !== originalVolDetails.nric
    const addressChanged = address !== originalVolDetails.address
    const postalChanged = postal !== originalVolDetails.postal
    const churchChanged = church !== originalVolDetails.church
    const deptChanged = dept !== originalVolDetails.dept
    const genderChanged = gender !== originalVolDetails.gender
    const numberChanged = number !== originalVolDetails.number

    return (
      <SideBar activeTab='profile' title="Update Profile">
        <Card>
          {/* Name Field */}
          <Row gutter={[5, 5]}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_NAME}
            </Col>
            <Col sm={18} xs={22}>
              <Input
                style={nameChanged?{backgroundColor: yellow[1]}:null}
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_NAME}
                value={name}
                onChange={this.changeName}
              />
            </Col>
          </Row>

          {/* Email Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10}}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_EMAIL}
            </Col>
            <Col sm={18} xs={22}>
              <Input
                style={emailChanged?{backgroundColor: yellow[1]}:null}
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_EMAIL}
                value={email}
                onChange={this.changeEmail}
              />
            </Col>
          </Row>

          {/* Password Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10}}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_PW}
            </Col>
            <Col sm={18} xs={22}>
              <Input.Password
                style={passwordChanged?{backgroundColor: yellow[1]}:null}
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_PW}
                value={password}
                onChange={this.changePassword}
              />
            </Col>
          </Row>

          {/* DOB Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10}}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_DOB}
            </Col>
            <Col sm={18} xs={22}>
              <DatePicker
                style={dobChanged?{backgroundColor: yellow[1], width: '100%'} : {width:'100%'}}
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_DOB}
                format={displayDateFormat}
                value={dob}
                onChange={this.changeDob}
              />
            </Col>
          </Row>

          {/* NRIC Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_NRIC}
            </Col>
            <Col sm={18} xs={22}>
              <Input
                style={nricChanged?{backgroundColor: yellow[1]}:null}
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_NRIC}
                value={nric}
                onChange={this.changeNRIC}
              />
            </Col>
          </Row>

          {/* Address Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_ADDRESS}
            </Col>
            <Col sm={18} xs={22}>
              <Input
                style={addressChanged?{backgroundColor: yellow[1]}:null}
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_ADDRESS}
                value={address}
                onChange={this.changeAddress}
              />
            </Col>
          </Row>

          {/* Postal Code Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_POSTAL_CODE}
            </Col>
            <Col sm={18} xs={22}>
              <Input
                style={postalChanged?{backgroundColor: yellow[1]}:null}
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_POSTAL_CODE}
                value={postal}
                onChange={this.changePostal}
              />
            </Col>
          </Row>

          {/* Church Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_CHURCH}
            </Col>
            <Col sm={18} xs={22}>
              <Input
                style={churchChanged?{backgroundColor: yellow[1]}:null}
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_CHURCH}
                value={church}
                onChange={this.changeChurch}
              />
            </Col>
          </Row>

          {/* Department Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_DEPT}
            </Col>
            <Col sm={18} xs={22}>
              <Select
                style={deptChanged?{backgroundColor: yellow[1], width: '100%'} : {width:'100%'}}
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_DEPT}
                value={dept}
                onChange={this.changeDept}>
                {departments.map(dept => (
                  <Option key={dept} value={dept}>
                    {dept}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>

          {/* Gender Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
            <Col sm={6} xs={22} style={{lineHeight: '37px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_GENDER}
            </Col>
            <Col sm={18} xs={22}>
              <Radio.Group
                value={gender}
                onChange={this.changeGender}
                buttonStyle='solid'
                style={{border: `3px solid ${genderChanged?yellow[1]:'white'}`}}>
                <Radio.Button value='M'>Male</Radio.Button>
                <Radio.Button value='F'>Female</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>

          {/* Phone Number Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_NUMBER}
            </Col>
            <Col sm={18} xs={22}>
              <Input
                style={numberChanged?{backgroundColor: yellow[1]}:null}
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_NUMBER}
                value={number}
                onChange={this.changeNumber}
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
              onClick={this.clickSubmit}
              loading={submitting}
              type='primary'
              style={{ float: 'right', marginTop: 10, marginLeft: 10 }}>
              Update Profile
            </Button>
          </Col>
        </Row>
      </SideBar>
    )
  }
}
