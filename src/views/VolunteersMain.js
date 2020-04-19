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
import moment from 'moment'
import {Link} from 'react-router-dom'
import {getAllVolunteersAPI} from '../api/VolunteersAPI'

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
    dataIndex: 'full_name',
    fixed: 'left',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dob',
    render: (text, record, index) => formatDate(text),
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Postal Code',
    dataIndex: 'postal_code',
  },
  {
    title: 'Church',
    dataIndex: 'church',
  },
  {
    title: 'Department',
    dataIndex: 'department',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
  },
  {
    title: 'Phone No.',
    dataIndex: 'number',
  },
  {
    title: 'Edit',
    render: (text, record, index) => {
      return (
        <Button shape='circle' icon={<EditOutlined/>}/>
      )
    },
    fixed: 'right',
  }
];

export default class VolunteersMain extends React.Component {

  componentDidMount() {
    this.props.retrieveVolunteers()
  }


  render() {
    const {
      volunteersLoading,
      volunteersList
    } = this.props.volunteersMain
    // const tableData = this.generateTableData()
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
          dataSource={volunteersList}
          loading={volunteersLoading}
          columns={columns}
          rowKey='id'
          bordered
        />
      </SideBar>
    )
  }
}
