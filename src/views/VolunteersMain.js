import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Table,
  Button,
} from 'antd'
import {
  UserAddOutlined,
  EditOutlined,
} from '@ant-design/icons'
import {Link} from 'react-router-dom'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
  },
  {
    title: 'Edit',
    render: (text, record, index) => {
      return (
        <Button shape='circle' icon={<EditOutlined/>}/>
      )
    }
  }
];

export default class VolunteersMain extends React.Component {

  generateTableData = () => {
    const tableData = []

    for (let i = 0; i < 20; i++) {
      tableData.push({
        key: i,
        name: 'Event '+(i+1),
        description: 'Description for Event '+(i+1),
        startDate: (i+10)+'/05/2020',
        endDate: (i+10)+'/06/2020',
      })
    }

    return tableData
  }

  render() {
    const tableData = this.generateTableData()
    return (
      <SideBar activeTab='volunteers' title="Volunteers" subtitle="Manage SYFC Volunteer Information">
        <Row justify='end' style={{marginBottom: 24}}>
          <Link to='/volunteers/create'>
            <Button type='primary' icon={<UserAddOutlined/>}>
              Create New Volunteer
            </Button>
          </Link>
      </Row>
        <Table
          dataSource={tableData}
          columns={columns}
          bordered
        />
      </SideBar>
    )
  }
}
