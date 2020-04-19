import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Table,
  Button,
  Divider,
  Tooltip,
} from 'antd'
import moment from 'moment'
import {
  PlusCircleOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {getAllEventsAPI} from '../api/EventsAPI'

const formatDate = (rawString) => {
  if (rawString === null || rawString === "") {
    return ""
  }
  const momentObj = moment(rawString)
  return momentObj.format("YYYY-MM-DD")
}


export default class EventsMain extends React.Component {

  componentDidMount() {
    this.props.retrieveEvents()
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
      width: 100,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
      width: 140,
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      render: (text, record, index) => formatDate(text),
      width: 120,
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      render: (text, record, index) => formatDate(text),
      width: 120,
    },
    {
      title: 'Actions',
      render: (text, record, index) => {
        return (
          <div>
            <Tooltip title='Edit Event'>
              <Button onClick={e => this.clickEdit(e, record.id)} href='/events/edit' shape='circle' icon={<EditOutlined/>}/>
            </Tooltip>
            <Divider type='vertical'/>
            <Tooltip title='View Volunteers'>
              <Button shape='circle' icon={<UserOutlined/>}/>
            </Tooltip>
          </div>
        )
      },
      width: 120,
      align: 'center',
    }
  ];
  clickEdit = (e, eventId) => {
    e.preventDefault()
    const { eventsList } = this.props.eventsMain

    const filtered = eventsList.filter(event => event.id === eventId)
    if (filtered.length === 1) {
      const editEvent = filtered[0]

      const startDateMoment = moment(editEvent.start_date)
      const endDateMoment = moment(editEvent.end_date)

      const editObj = {
        id: editEvent.id,
        eventTitle: editEvent.name,
        eventDates: [startDateMoment, endDateMoment],
        eventDesc: editEvent.description,
      }

      this.props.loadEvent(editObj)

      this.props.history.push('/events/edit')
    }
  }

  render() {
    const {
      eventsList,
      eventsLoading,
    } = this.props.eventsMain

    // const tableData = this.generateTableData()
    return (
      <SideBar activeTab='events' title="Events" subtitle="Manage SYFC Events">
        <Row justify='end' style={{marginBottom: 24}}>
          <Link to='/events/create'>
            <Button type='primary' icon={<PlusCircleOutlined/>}>
              Create New Event
            </Button>
          </Link>
        </Row>
        <Table
          dataSource={eventsList}
          loading={eventsLoading}
          columns={this.columns}
          rowKey='id'
          bordered
        />
      </SideBar>
    )
  }
}
