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
  notification,
} from 'antd'
import {
  PlusCircleOutlined,
  EditOutlined,
} from '@ant-design/icons'
import EventsPhrases from '../phrases/EventsPhrases'

const { RangePicker } = DatePicker

export default class EventsCreate extends React.Component {

  componentDidUpdate() {
    const {growlMessage} = this.props.eventsCreate
    if (growlMessage) {
      this.onNotification(growlMessage)
    }
  }

  changeTitle = (e) => this.props.changeTitle(e.target.value)
  changeDates = (m, s) => this.props.changeDates(m)
  changeDesc = (e) => this.props.changeDesc(e.target.value)
  discard = () => {
    this.props.discard()
    this.props.history.push('/events')
  }

  checkFields = () => {
    const {
      eventTitle,
      eventDates,
      eventDesc,
    } = this.props.eventsCreate

    const checks = (new Array(3)).fill(false)
    if (eventTitle.trim() !== '') {
      checks[0] = true
    }
    if (eventDates && eventDates.length === 2) {
      checks[1] = true
    }
    if (eventDesc.trim() !== '') {
      checks[2] = true
    }

    return checks
  }
  clickSubmit = () => {
    const checks = this.checkFields()
    let i = 0
    const outputs = []
    if (!checks[0]) {
      outputs.push(`${++i}. Event Title is empty`)
    }
    if (!checks[1]) {
      outputs.push(`\n${++i}. Event Dates are invalid`)
    }
    if (!checks[2]) {
      outputs.push(`\n${++i}. Event Description is empty`)
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
      this.submitEvent()
    } else {
      notification.warning({
        message: 'Event Creation Error',
        description: messageNodeBuilder(outputs)
      })
    }
  }
  submitEvent = () => {
    const {
      eventTitle,
      eventDates,
      eventDesc,
    } = this.props.eventsCreate

    const dtf = 'YYYY-MM-DD'

    const messageBody = {
      name: eventTitle.trim(),
      start_date: eventDates[0].format(dtf),
      end_date: eventDates[1].format(dtf),
      description: eventDesc.trim(),
    }

    // console.log(JSON.stringify(messageBody));
    this.props.submitEvent(messageBody)
  }

  onNotification = (growlNotification) => {
    const alerts = {
      success: {
        message: `Created Event`,
        description: `Your event has been successfully created!`
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
      this.props.history.push('/events')
    }
  }

  render() {
    const {
      eventTitle,
      eventDates,
      eventDesc,
      submitting,
    } = this.props.eventsCreate

    return (
      <SideBar activeTab='events' title="Create New Event">
        <Card>

          <Row gutter={[5, 5]}>
            <Col md={20} xs={24}>
              {EventsPhrases.EVENTS_TITLE}
            </Col>
          </Row>
          <Row gutter={[30, 30]}>
            <Col md={16} xs={24}>
              <Input
                placeholder="Title"
                onChange={this.changeTitle}
                value={eventTitle}
              />
            </Col>
          </Row>

          <Row gutter={[5, 5]}>
            <Col md={20} xs={24}>
              {EventsPhrases.EVENTS_DATES}
            </Col>
          </Row>
          <Row gutter={[30, 30]}>
            <Col md={16} xs={24}>
              <RangePicker
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
                onChange={this.changeDates}
                value={eventDates}
              />
            </Col>
          </Row>

          <Row gutter={[5, 5]}>
            <Col md={20} xs={24}>
              {EventsPhrases.EVENTS_DESCRIPTION}
            </Col>
          </Row>
          <Row gutter={[30, 30]}>
            <Col md={16} xs={24}>
              <Input.TextArea
                placeholder={EventsPhrases.EVENTS_DESCRIPTION}
                autoSize={{minRows:2, maxRows: 6}}
                onChange={this.changeDesc}
                value={eventDesc}
              />
            </Col>
          </Row>
        </Card>

        {/* Top Row Action Buttons - Discard, Previous, Next */}
        <Row justify="space-between">
          {/* Discard button */}
          <Col lg={6} md={6} sm={24} xs={24} style={{ marginTop: 10 }}>
            {/* Safety Check for Discard */}
            <Popconfirm
              title="Are you sure you want to discard this event?"
              onConfirm={this.discard}
              okText="Yes"
              okType='danger'
              cancelText="No"
            >
              <Button type='danger' style={{ float: 'left', marginRight: 10, marginTop: 10 }}>
                Discard Event
              </Button>
            </Popconfirm>
          </Col>

          {/* Previous and Next Buttons for Stepper - Visibility */}
          <Col lg={18} md={18} sm={24} xs={24} style={{ marginTop: 10 }}>
            <Button
              onClick={this.clickSubmit}
              loading={submitting}
              type='primary'
              style={{ float: 'right', marginTop: 10, marginLeft: 10 }}>
              Create Event
            </Button>
          </Col>
        </Row>
      </SideBar>
    )
  }
}
