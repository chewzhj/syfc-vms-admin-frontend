import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Button,
  Select,
  Spin,
  Skeleton,
  Modal,
  Typography,
  notification,
} from 'antd'
import moment from 'moment'
import {Link} from 'react-router-dom'
import EventCard from '../components/EventCard'
import EventsPhrases from '../phrases/EventsPhrases'
import {displayDateFormat} from '../variables/DateFormats'

const { Option } = Select
const { Text, Paragraph } = Typography

const formatDate = (rawString) => {
  if (rawString === null || rawString === "") {
    return ""
  }
  const momentObj = moment(rawString)
  return momentObj.format(displayDateFormat)
}

export default class JoinEvents extends React.Component {

  componentDidMount() {
    this.props.getMyEvents()
    this.props.retrieveEvents()
  }
  componentDidUpdate() {
    const {growlMessage} = this.props.joinEvents
    if (growlMessage) {
      this.onNotification(growlMessage)
    }
  }

  viewEvent = (id) => this.props.viewEvent(id)
  changeRole = (value) => this.props.changeRole(value)
  closeView = () => this.props.closeView()
  joinEvent = () => {
    const {viewEvent, role} = this.props.joinEvents

    if (role === '') {
      notification.warning({
        message: 'Event Creation Error',
        description: 'Select a role to join!'
      })
    } else {
      this.props.joinEvent(viewEvent, role)
    }
  }

  onNotification = (growlNotification) => {
    const alerts = {
      success: {
        message: `Joined Event`,
        description: `You have successfully joined the event!`
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
      this.closeView()
      this.props.history.push('/events')
    }
  }
  generateAvailableUnjoinedEvents = () => {
    const {myEventsList} = this.props.myEvents
    const {eventsList} = this.props.eventsMain

    const availableEvents = []
    const dayBefore = moment().subtract(1, 'days').startOf('day')

    for (const event of eventsList) {
      const contains = myEventsList.filter(myEvent => myEvent.id === event.id)
      if (contains.length === 0) {
        const startMoment = moment(event.start_date)
        if (startMoment.isAfter(dayBefore)) {
          availableEvents.push(event)
        }
      }
    }

    return availableEvents
  }
  filterEvent = () => {
    const {eventsList} = this.props.eventsMain
    const {viewEvent} = this.props.joinEvents

    const filtered = eventsList.filter(evt => evt.id === viewEvent)

    if (filtered.length === 1) {
      return filtered[0]
    } else {
      return null
    }
  }

  render() {
    const { myEventsLoading } = this.props.myEvents
    const { eventsLoading } = this.props.eventsMain
    const { viewEventVisible, joining, role } = this.props.joinEvents
    const availableEvents = this.generateAvailableUnjoinedEvents()
    const viewEvent = this.filterEvent()

    return (
      <SideBar activeTab='joinevents' title="Join Events" padding={8}>

        <Modal
          visible={viewEventVisible}
          title='View Event'
          footer={null}
          onCancel={this.closeView}>
          <Skeleton loading={!viewEventVisible}>
            {viewEvent!==null &&
              <Row>
                <Col span={24}>
                  <Text strong>{EventsPhrases.EVENTS_TITLE}</Text>
                </Col>
                <Col span={24}>
                  <Paragraph ellipsis>{viewEvent.name}</Paragraph>
                </Col>
                <Col span={24}>
                  <Text strong>{EventsPhrases.EVENTS_DESCRIPTION}</Text>
                </Col>
                <Col span={24}>
                  <Paragraph ellipsis={{rows: 3}}>{viewEvent.description}</Paragraph>
                </Col>
                <Col span={24}>
                  <Text strong>{EventsPhrases.EVENTS_DATES}</Text>
                </Col>
                <Col span={24}>
                  <Text ellipsis>{formatDate(viewEvent.start_date)} - {formatDate(viewEvent.end_date)}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>{EventsPhrases.CHOOSE_EVENTS_ROLE}</Text>
                </Col>
                <Col span={24}>
                  <Select
                    placeholder={EventsPhrases.CHOOSE_EVENTS_ROLE}
                    value={role}
                    onChange={this.changeRole}
                    style={{width: '100%', margin: '4px 0'}}>
                    {viewEvent.roles.split(",").map(r => (
                      <Option key={r} value={r}>
                        {r}
                      </Option>
                    ))}
                  </Select>
                </Col>

                <Button
                  type='primary'
                  loading={joining}
                  style={{width: '100%', marginTop: 24}}
                  onClick={this.joinEvent}>
                  Join Event
                </Button>
              </Row>
            }
          </Skeleton>
        </Modal>

        {/* Available Events */}
        <Spin spinning={myEventsLoading && eventsLoading}>
          <Row gutter={[12, 12]} style={{minHeight: 100}}>
            <Col span={24} style={{textAlign: 'center'}}>
              {availableEvents.length === 0 &&
                <Text>
                  There are no available events to join.<br/>
                  You can only join events at least 2 days before the event.<br/>
                </Text>
              }
              <Text>View your events at the <Link to='/events'>My Events</Link> page.</Text>
            </Col>
            {availableEvents.map(evt => (
              <Col key={evt.id} lg={6} sm={8} xs={12}>
                <EventCard
                  name={evt.name}
                  startDate={formatDate(evt.start_date)}
                  endDate={formatDate(evt.end_date)}
                  onClick={()=>this.viewEvent(evt.id)}
                />
              </Col>
            ))}
          </Row>
        </Spin>
      </SideBar>
    )
  }
}
