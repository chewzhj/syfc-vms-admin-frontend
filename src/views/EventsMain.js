import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Table,
  Button,
} from 'antd'
import moment from 'moment'
import {
  PlusCircleOutlined,
  EditOutlined,
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

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    ellipsis: true,
    width: '40%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    ellipsis: true,
    width: '60%',
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
    title: 'Edit',
    render: (text, record, index) => {
      return (
        <Button shape='circle' icon={<EditOutlined/>}/>
      )
    },
    width: 62,
  }
];

export default class EventsMain extends React.Component {

  componentDidMount() {
    this.props.retrieveEvents()
  }

  generateTableData = () => {
    const tableData = []

    for (let i = 0; i < 20; i++) {
      tableData.push({
        key: i,
        name: 'Event '+(i+1),
        description: 'Description for Event '+(i+1),
        start_date: (i+10)+'/05/2020',
        end_date: (i+10)+'/06/2020',
      })
    }

    return tableData
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
          columns={columns}
          rowKey='id'
          bordered
        />
      </SideBar>
    )
  }
}
