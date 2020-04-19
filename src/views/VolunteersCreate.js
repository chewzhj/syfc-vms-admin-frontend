import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Table,
  Button,
  Card,
  Input,
  DatePicker,
  Popconfirm,
  Select,
} from 'antd'
import {
  PlusCircleOutlined,
  EditOutlined,
} from '@ant-design/icons'
import EventsPhrases from '../phrases/EventsPhrases'
import VolunteersPhrases from '../phrases/VolunteersPhrases'

const {Option} = Select

export default class VolunteersCreate extends React.Component {

  render() {
    // const tableData = this.generateTableData()
    return (
      <SideBar activeTab='volunteers' title="Create New Volunteer">
        <Card>

          {/* Name Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 20, marginLeft: 20 }}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_NAME}
            </Col>
            <Col sm={18} xs={22}>
              <Input placeholder={VolunteersPhrases.CREATE_FORM_TITLE_NAME}/>
            </Col>
          </Row>

          {/* Email Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 20, marginLeft: 20 }}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_EMAIL}
            </Col>
            <Col sm={18} xs={22}>
              <Input placeholder={VolunteersPhrases.CREATE_FORM_TITLE_EMAIL}/>
            </Col>
          </Row>

          {/* NRIC Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 20, marginLeft: 20 }}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_NRIC}
            </Col>
            <Col sm={18} xs={22}>
              <Input placeholder={VolunteersPhrases.CREATE_FORM_TITLE_NRIC}/>
            </Col>
          </Row>

          {/* Gender Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 20, marginLeft: 20 }}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_GENDER}
            </Col>
            <Col sm={18} xs={22}>
              <Select
                style={{width: '100%'}}
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_GENDER}>
                <Option value='male'>Male</Option>
                <Option value='female'>Female</Option>
              </Select>
            </Col>
          </Row>

          {/* DOB Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 20, marginLeft: 20 }}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_DOB}
            </Col>
            <Col sm={18} xs={22}>
              <DatePicker
                style={{width: '100%'}}
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_DOB}
              />
            </Col>
          </Row>

          {/* Department Field */}
          <Row gutter={[5, 5]} style={{ marginTop: 20, marginLeft: 20 }}>
            <Col sm={6} xs={22} style={{lineHeight: '31px'}}>
              {VolunteersPhrases.CREATE_FORM_TITLE_DEPT}
            </Col>
            <Col sm={18} xs={22}>
              <Select
                style={{width: '100%'}}
                placeholder={VolunteersPhrases.CREATE_FORM_TITLE_DEPT}
                >
                <Option value='male'>Male</Option>
                <Option value='female'>Female</Option>
              </Select>
            </Col>
          </Row>

        </Card>

        {/* Top Row Action Buttons - Discard, Previous, Next */}
        <Row justify="space-between">
          {/* Discard button */}
          <Col lg={6} md={6} sm={12} xs={12} style={{ marginTop: 10 }}>
            {/* Safety Check for Discard */}
            <Popconfirm
              title="Are you sure you want to discard?"
              // onConfirm={this.discardQuizCreation}
              okText="Yes"
              okType='danger'
              cancelText="No"
            >
              <Button type='danger' style={{ float: 'left', marginRight: 10, marginTop: 10 }}>
                Discard
              </Button>
            </Popconfirm>
          </Col>

          {/* Previous and Next Buttons for Stepper - Visibility */}
          <Col lg={12} md={12} sm={12} xs={12} style={{ marginTop: 10 }}>
            <Button
              // onClick={this.checkSubmit}
              // disabled={currentStep===0}
              // loading={submitting}
              type='primary'
              style={{ float: 'right', marginTop: 10, marginLeft: 10 }}>
              Create Volunteer
            </Button>
          </Col>
        </Row>
      </SideBar>
    )
  }
}
