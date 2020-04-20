import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Table,
  Button,
  Divider,
  Tooltip,
  Modal,
  Typography,
} from 'antd'
import moment from 'moment'
import {
  PlusCircleOutlined,
  EditOutlined,
  UserOutlined,
  FileExcelOutlined,
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import EventCard from '../components/EventCard'
import EventsPhrases from '../phrases/EventsPhrases'
import {getEventsOfVolunteerAPI} from '../api/EventsAPI'

const { Title, Text, Paragraph } = Typography

const formatDate = (rawString) => {
  if (rawString === null || rawString === "") {
    return ""
  }
  const momentObj = moment(rawString)
  return momentObj.format("YYYY-MM-DD")
}

export default class MyEvents extends React.Component {

  componentDidMount() {
    this.props.getMyEvents()
  }

  render() {
    const {
      myEventsList
    } = this.props.myEvents

    return (
      <SideBar activeTab='events' title="My Events">
        <Row gutter={[12, 12]}>
          {myEventsList.map(evt => (
            <Col key={evt.id} lg={6} sm={8} xs={12}>
              <EventCard
                name={evt.name}
                startDate={formatDate(evt.start_date)}
                endDate={formatDate(evt.end_date)}
              />
            </Col>
          ))}
        </Row>
      </SideBar>
    )
  }
}
