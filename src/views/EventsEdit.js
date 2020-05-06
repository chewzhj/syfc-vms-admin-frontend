import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Button,
  Card,
  Input,
  Select,
  Typography,
  DatePicker,
  Popconfirm,
  Spin,
  Modal,
  notification,
} from 'antd'
import { yellow } from '@ant-design/colors'
import { Redirect } from 'react-router-dom'
import { DropzoneArea } from 'material-ui-dropzone'
import EventsPhrases from '../phrases/EventsPhrases'
import NoImage from '../assets/img/no-image.png'
import {internalDateFormat, displayDateFormat} from '../variables/DateFormats'

const { RangePicker } = DatePicker
const { Text, Paragraph } = Typography

export default class EventsEdit extends React.Component {

  // notifications listener
  componentDidUpdate() {
    const {growlMessage, growlDeleting} = this.props.eventsEdit
    if (growlMessage) {
      this.onNotification(growlMessage, false)
    } else if (growlDeleting) {
      this.onNotification(growlDeleting, true)
    }
  }
  // state change functions
  changeTitle = (e) => this.props.changeTitle(e.target.value)
  changeDates = (m, s) => this.props.changeDates(m)
  changeDesc = (e) => this.props.changeDesc(e.target.value)
  changeRoles = (value) => this.props.changeRoles(value)
  openPictureDialog = () => {
    this.props.openPictureDialog()
    this.props.loadPicture(this.props.eventsEdit.originalEventDetails.id)
  }
  closePictureDialog = () => this.props.closePictureDialog()
  choosePicture = value => this.props.choosePicture(value)
  discard = () => {
    this.props.discard()
    this.props.history.push('/events')
  }
  updatePicture = () => {
    const {originalEventDetails, newPicture} = this.props.eventsEdit
    if (newPicture.length === 1) {
      const formData = new FormData()
      formData.append("file", newPicture[0])
      this.props.updatePicture(originalEventDetails.id, formData)
    }
  }
  deleteEvent = () => {
    const {originalEventDetails} = this.props.eventsEdit
    this.props.deleteEvent(originalEventDetails.id)
  }
  // submission check and process functions
  checkFields = () => {
    const {
      eventTitle,
      eventDates,
      eventDesc,
      eventRoles,
    } = this.props.eventsEdit

    const checks = (new Array(4)).fill(false)
    if (eventTitle.trim() !== '') {
      checks[0] = true
    }
    if (eventDates && eventDates.length === 2) {
      checks[1] = true
    }
    if (eventDesc.trim() !== '') {
      checks[2] = true
    }
    if (eventRoles.length > 0) {
      checks[3] = true
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
    if (!checks[3]) {
      outputs.push(`\n${++i}. Event Roles are empty`)
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
      originalEventDetails,
      eventTitle,
      eventDates,
      eventDesc,
      eventRoles,
    } = this.props.eventsEdit

    const dtf = internalDateFormat

    const messageBody = {
      name: eventTitle.trim(),
      start_date: eventDates[0].format(dtf),
      end_date: eventDates[1].format(dtf),
      description: eventDesc.trim(),
      roles: eventRoles.sort().join(',')
    }

    this.props.editEvent(originalEventDetails.id, messageBody)
  }
  // notification handler
  onNotification = (growlNotification, isDeleting) => {
    const alerts = {
      success: {
        message: `${isDeleting?'Deleted':'Updated'} Event`,
        description: `Your event has been successfully ${isDeleting?"deleted":"updated"}!`
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
      originalEventDetails,
      eventTitle,
      eventDates,
      eventDesc,
      eventRoles,
      pictureDialogOpen,
      oldPicture,
      oldPictureLoading,
      newPicture,
      newPictureLoading,
      submitting,
      deleting,
    } = this.props.eventsEdit
    // check to redirect if user enters this page by url
    if (!originalEventDetails.id) {
      return <Redirect to='/events' />
    }
    // checks for whether each field was changed
    const titleChanged = eventTitle !== originalEventDetails.eventTitle
    const datesChanged = eventDates !== originalEventDetails.eventDates
    const descChanged = eventDesc !== originalEventDetails.eventDesc
    const rolesChanged = JSON.stringify(eventRoles.sort()) !== JSON.stringify(originalEventDetails.eventRoles.sort())

    return (
      <SideBar activeTab='events' title="Edit Event">

        {/* Change Picture Modal */}
        <Modal
          footer={null}
          title='Change Picture'
          onCancel={this.closePictureDialog}
          visible={pictureDialogOpen}>

          <Row>
            <Col span={24}>
              <Text strong>{EventsPhrases.EVENTS_PICTURE}</Text>
            </Col>

            <div style={{margin: '10px auto'}}>
              <Spin spinning={oldPictureLoading}>
                <div style={{height: 260}}>
                  {oldPicture ?
                    <img
                      style={{maxHeight: '100%', maxWidth: '100%'}}
                      src={oldPicture}
                      alt={originalEventDetails.eventTitle}
                    />
                    :
                    <img src={NoImage} alt={originalEventDetails.eventTitle}/>
                  }
                </div>
              </Spin>
            </div>

            <Col span={24}>
              <DropzoneArea
                onChange={this.choosePicture}
                filesLimit={1}
                dropzoneText="Drag and drop an image here or click"
                showAlerts={true}
              />
            </Col>
          </Row>

          <Row justify="end">
            <Col span={24}>
              <Paragraph>
                The picture will be updated even if you choose to discard the overall change to the event.
              </Paragraph>
            </Col>
            <Button
              primary
              onClick={this.updatePicture}
              loading={newPictureLoading}
              disabled={newPicture.length !== 1}>
              Update Picture
            </Button>
          </Row>
        </Modal>

        <Row justify="start">
          {/* Safety Check for Delete */}
          <Popconfirm
            title="Are you sure you want to delete this event?"
            onConfirm={this.deleteEvent}
            okText="Yes"
            okType='danger'
            cancelText="No"
          >
            <Button
              loading={deleting}
              type='danger'
              style={{ float: 'left', marginRight: 10, marginBottom: 10 }}>
              Delete Event
            </Button>
          </Popconfirm>
        </Row>

        <Card>

          {/* Events Title */}
          <Row gutter={[5, 5]}>
            <Col md={20} xs={24}>
              {EventsPhrases.EVENTS_TITLE}
            </Col>
          </Row>
          <Row gutter={[30, 30]}>
            <Col md={16} xs={24}>
              <Input
                style={titleChanged?{backgroundColor: yellow[1]}:null}
                placeholder="Title"
                onChange={this.changeTitle}
                value={eventTitle}
              />
            </Col>
          </Row>

          {/* Events Dates */}
          <Row gutter={[5, 5]}>
            <Col md={20} xs={24}>
              {EventsPhrases.EVENTS_DATES}
            </Col>
          </Row>
          <Row gutter={[30, 30]}>
            <Col md={16} xs={24}>
              <RangePicker
                format={displayDateFormat}
                style={datesChanged?{backgroundColor: yellow[1], width: '100%'} : {width:'100%'}}
                onChange={this.changeDates}
                value={eventDates}
              />
            </Col>
          </Row>

          {/* Events Description */}
          <Row gutter={[5, 5]}>
            <Col md={20} xs={24}>
              {EventsPhrases.EVENTS_DESCRIPTION}
            </Col>
          </Row>
          <Row gutter={[30, 30]}>
            <Col md={16} xs={24}>
              <Input.TextArea
                style={descChanged?{backgroundColor: yellow[1]}:null}
                placeholder={EventsPhrases.EVENTS_DESCRIPTION}
                autoSize={{minRows:2, maxRows: 6}}
                onChange={this.changeDesc}
                value={eventDesc}
              />
            </Col>
          </Row>

          {/* Events Roles */}
          <Row gutter={[5, 5]}>
            <Col md={20} xs={24}>
              {EventsPhrases.SET_EVENTS_ROLES}
            </Col>
          </Row>
          <Row gutter={[30, 30]}>
            <Col md={16} xs={24}>
              <Select
                placeholder={EventsPhrases.EVENTS_ROLES}
                mode='tags'
                open={false}
                // cant make the color work
                style={rolesChanged?{backgroundColor: yellow[1], width: '100%'} : {width:'100%'}}
                tokenSeparators={[","]}
                onChange={this.changeRoles}
                value={eventRoles}
              />
            </Col>
          </Row>

          {/* Event Picture - button to open dialog */}
          <Row gutter={[5, 5]}>
            <Col span={24}>
              {EventsPhrases.EVENTS_PICTURE}
            </Col>
            <Col>
              <Button onClick={this.openPictureDialog}>
                Set Event Picture
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Button Bar */}
        <Row justify="space-between">
          {/* Discard button */}
          <Col lg={6} md={6} sm={24} xs={24} style={{ marginTop: 10 }}>
            <Button onClick={this.discard} style={{ float: 'left', marginRight: 10, marginTop: 10 }}>
              Discard Changes
            </Button>
          </Col>

          {/* Submit Button */}
          <Col lg={18} md={18} sm={24} xs={24} style={{ marginTop: 10 }}>
            <Button
              onClick={this.clickSubmit}
              loading={submitting}
              type='primary'
              style={{ float: 'right', marginTop: 10, marginLeft: 10 }}>
              Update Event
            </Button>
          </Col>
        </Row>
      </SideBar>
    )
  }
}
