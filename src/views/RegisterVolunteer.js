import React from 'react'
import {
  Row,
  Col,
  Button,
  Card,
  Input,
  DatePicker,
  Popconfirm,
  Select,
  Typography,
  Radio,
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
import VolunteersPhrases from '../phrases/VolunteersPhrases'
import Full_Logo from '../assets/img/syfc-full-logo.png'

const {Option} = Select
const {Title} = Typography

const departments = [
  "Primary",
  "Secondary",
  "JC",
  "Polytechnic",
  "University",
]

export default class RegisterVolunteer extends React.Component {

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
          <Col span={16}>
            <Title level={4}>Register as new Volunteer</Title>
          </Col>
        </Row>
        <Card>
          {/* Name Field */}
          <Row gutter={[5, 5]}>
            <Col span={22} push={1} style={{lineHeight: '31px', textAlign: 'left'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_NAME}
            </Col>
            <Col xs={24}>
              <Input
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_NAME}
                // value={name}
                // onChange={this.changeName}
              />
            </Col>
          </Row>

          {/* Email Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10}}>
            <Col span={22} push={1} style={{lineHeight: '31px', textAlign: 'left'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_EMAIL}
            </Col>
            <Col xs={24}>
              <Input
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_EMAIL}
                // value={email}
                // onChange={this.changeEmail}
              />
            </Col>
          </Row>

          {/* Password Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10}}>
            <Col span={22} push={1} style={{lineHeight: '31px', textAlign: 'left'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_PW}
            </Col>
            <Col xs={24}>
              <Input.Password
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_PW}
                // value={password}
                // onChange={this.changePassword}
              />
            </Col>
          </Row>

          {/* DOB Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10}}>
            <Col span={22} push={1} style={{lineHeight: '31px', textAlign: 'left'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_DOB}
            </Col>
            <Col xs={24}>
              <DatePicker
                style={{width: '100%'}}
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_DOB}
                // value={dob}
                // onChange={this.changeDob}
              />
            </Col>
          </Row>

          {/* NRIC Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
            <Col span={22} push={1} style={{lineHeight: '31px', textAlign: 'left'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_NRIC}
            </Col>
            <Col xs={24}>
              <Input
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_NRIC}
                // value={nric}
                // onChange={this.changeNRIC}
              />
            </Col>
          </Row>

          {/* Address Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
            <Col span={22} push={1} style={{lineHeight: '31px', textAlign: 'left'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_ADDRESS}
            </Col>
            <Col xs={24}>
              <Input
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_ADDRESS}
                // value={address}
                // onChange={this.changeAddress}
              />
            </Col>
          </Row>

          {/* Postal Code Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
            <Col span={22} push={1} style={{lineHeight: '31px', textAlign: 'left'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_POSTAL_CODE}
            </Col>
            <Col xs={24}>
              <Input
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_POSTAL_CODE}
                // value={postal}
                // onChange={this.changePostal}
              />
            </Col>
          </Row>

          {/* Church Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
            <Col span={22} push={1} style={{lineHeight: '31px', textAlign: 'left'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_CHURCH}
            </Col>
            <Col xs={24}>
              <Input
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_CHURCH}
                // value={church}
                // onChange={this.changeChurch}
              />
            </Col>
          </Row>

          {/* Department Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
            <Col span={22} push={1} style={{lineHeight: '31px', textAlign: 'left'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_DEPT}
            </Col>
            <Col xs={24}>
              <Select
                style={{width: '100%'}}
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_DEPT}
                // value={dept}
                // onChange={this.changeDept}
                >
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
            <Col span={22} push={1} style={{lineHeight: '31px', textAlign: 'left'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_GENDER}
            </Col>
            <Col xs={24}>
              <Radio.Group buttonStyle='solid' defaultValue='M' style={{float: 'left'}}>
              {/* <Radio.Group value={gender} onChange={this.changeGender} buttonStyle='solid'> */}
                <Radio.Button value='M'>Male</Radio.Button>
                <Radio.Button value='F'>Female</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>

          {/* Phone Number Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 10 }}>
            <Col span={22} push={1} style={{lineHeight: '31px', textAlign: 'left'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_NUMBER}
            </Col>
            <Col xs={24}>
              <Input
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_NUMBER}
                // value={number}
                // onChange={this.changeNumber}
              />
            </Col>
          </Row>
        </Card>

        {/* Top Row Action Buttons - Discard, Previous, Next */}
        <Row justify="space-between">
          {/* Discard button */}

          {/* Previous and Next Buttons for Stepper - Visibility */}
          <Col lg={12} md={12} sm={12} xs={12} style={{ marginTop: 10 }}>
            <Button
              // onClick={this.clickSubmit}
              // loading={submitting}
              type='primary'
              style={{ float: 'right', marginTop: 10, marginLeft: 10 }}>
              Create Volunteer
            </Button>
          </Col>
        </Row>
      </LoginElements>
    )
  }
}
