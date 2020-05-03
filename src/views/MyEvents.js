import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Spin,
  Skeleton,
  Modal,
  Typography,
} from 'antd'
import moment from 'moment'
import {Link} from 'react-router-dom'
import EventCard from '../components/EventCard'
import EventsPhrases from '../phrases/EventsPhrases'
import {displayDateFormat} from '../variables/DateFormats'

const { Text, Paragraph } = Typography

const formatDate = (rawString) => {
  if (rawString === null || rawString === "") {
    return ""
  }
  const momentObj = moment(rawString)
  return momentObj.format(displayDateFormat)
}

export default class MyEvents extends React.Component {

  componentDidMount() {
    this.props.getMyEvents()
  }

  viewEvent = (id) => this.props.viewEvent(id)
  closeView = () => this.props.closeView()

  filterEvent = () => {
    const {myEventsList, viewEvent} = this.props.myEvents

    const filtered = myEventsList.filter(evt => evt.id === viewEvent)

    if (filtered.length === 1) {
      return filtered[0]
    } else {
      return null
    }
  }

  render() {
    const {
      myEventsList,
      myEventsLoading,
      viewEventVisible
    } = this.props.myEvents
    const viewEvent = this.filterEvent()

    return (
      <SideBar activeTab='events' title="My Events" padding={8}>

        <Modal
          visible={viewEventVisible}
          title='View Event'
          footer={null}
          onCancel={this.closeView}>
          <Skeleton loading={!viewEventVisible}>
            {viewEvent!==null &&
              <Row>
                <Col span={24}>
                  <Text strong>{EventsPhrases.EVENTS_PICTURE}</Text>
                </Col>
                <Col span={24}>
                  {viewEvent.picture ?
                    <Row justify='center'>
                      <div style={{height: 260}}>
                        <img
                          style={{maxHeight: '100%', maxWidth: '100%'}}
                          src={viewEvent.picture}
                          alt={viewEvent.name}
                        />
                      </div>
                    </Row>
                    :
                    <Paragraph ellipsis>No Image</Paragraph>
                  }
                </Col>
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
                  <Text strong>{EventsPhrases.EVENTS_ROLES}</Text>
                </Col>
                <Col span={24}>
                  <Paragraph ellipsis={{rows: 3}}>{viewEvent.roles}</Paragraph>
                </Col>
                <Col span={24}>
                  <Text strong>{EventsPhrases.MY_ROLE}</Text>
                </Col>
                <Col span={24}>
                  <Text ellipsis>{viewEvent.volunteer_event.role}</Text>
                </Col>
              </Row>
            }
          </Skeleton>
        </Modal>

        {/* Available Events */}
        <Spin spinning={myEventsLoading}>
          <Row gutter={[12, 12]} style={{minHeight: 100}}>
            <Col span={24}  style={{textAlign: 'center'}}>
              {(!myEventsLoading && myEventsList.length === 0) &&
                <Text>You have not joined any events<br/></Text>
              }
              <Text>Join an event at the <Link to='/joinevents'>Join Events</Link> Page</Text>
            </Col>
            {myEventsList.map(evt => (
              <Col key={evt.id} lg={6} sm={8} xs={12}>
                <EventCard
                  name={evt.name}
                  picture={evt.picture}
                  pictureLoading={evt.pictureLoading}
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
