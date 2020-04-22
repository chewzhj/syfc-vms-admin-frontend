import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Table,
  Button,
  Tooltip,
} from 'antd'
import {
  UserAddOutlined,
  EditOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {displayDateFormat} from '../variables/DateFormats'

const formatDate = (rawString) => {
  if (rawString === null || rawString === "") {
    return ""
  }
  const momentObj = moment(rawString)
  return momentObj.format(displayDateFormat)
}



export default class VolunteersMain extends React.Component {

  componentDidMount() {
    this.props.retrieveVolunteers()
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      fixed: 'left',
      sorter: (a1, a2) => a1.full_name.localeCompare(a2.full_name)
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      render: (text, record, index) => formatDate(text),
      sorter: (a1, a2) => a1.dob.localeCompare(a2.dob)
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
      sorter: (a1, a2) => a1.department.localeCompare(a2.department)
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: (a1, a2) => a1.gender.localeCompare(a2.gender)
    },
    {
      title: 'Phone No.',
      dataIndex: 'number',
    },
    {
      title: 'Edit',
      render: (text, record, index) => {
        return (

          <Tooltip title='Edit Volunteer'>
            <Button onClick={(e) => this.clickEdit(e, record.id)} href='/volunteers/edit' shape='circle' icon={<EditOutlined/>}/>
          </Tooltip>
        )
      },
      fixed: 'right',
    }
  ]
  clickEdit = (e, volId) => {
    e.preventDefault()
    const { volunteersList } = this.props.volunteersMain

    const filtered = volunteersList.filter(vol => vol.id === volId)
    if (filtered.length === 1) {
      const editVol = filtered[0]

      const dobMoment = moment(editVol.dob)

      const editObj = {
        id: editVol.id,
        name: editVol.full_name,
        email: editVol.email,
        password: editVol.password,
        dob: dobMoment,
        nric: editVol.nric,
        address: editVol.address,
        postal: editVol.postal_code,
        church: editVol.church,
        dept: editVol.department,
        gender: editVol.gender,
        number: editVol.number,
      }

      this.props.loadVolunteer(editObj)

      this.props.history.push('/volunteers/edit')
    }
  }

  render() {
    const {
      volunteersLoading,
      volunteersList
    } = this.props.volunteersMain
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
          columns={this.columns}
          rowKey='id'
          bordered
        />
      </SideBar>
    )
  }
}
