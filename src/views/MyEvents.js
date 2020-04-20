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
    getEventsOfVolunteerAPI()
  }

  render() {
    return (
      <SideBar activeTab='events' title="My Events">
        Joining Events in 2020 KEKW
      </SideBar>
    )
  }
}
