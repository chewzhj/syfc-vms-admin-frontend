import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Table,
  Button,
  Tooltip,
  Divider,
  Modal,
  Typography,
} from 'antd'
import {
  UserAddOutlined,
  SolutionOutlined,
  EditOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import {Link} from 'react-router-dom'
import VolunteersPhrases from '../phrases/VolunteersPhrases'
import {displayDateFormat} from '../variables/DateFormats'
import {deptOptions} from '../variables/DepartmentOptions'

const { Text, Paragraph } = Typography

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

  closeVEModal = () => this.props.closeVEModal()
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
      filters: deptOptions.map(dept => ({text: dept, value: dept})),
      onFilter: (value, record) => record.department.indexOf(value) === 0,

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
      title: 'Actions',
      render: (text, record, index) => {
        return (
          <div>
            <Tooltip title='View Events'>
              <Button onClick={e => this.clickView(e, record.id)} shape='circle' icon={<SolutionOutlined/>}/>
            </Tooltip>
            <Divider type='vertical'/>
            <Tooltip title='Edit Volunteer'>
              <Button onClick={(e) => this.clickEdit(e, record.id)} href='/volunteers/edit' shape='circle' icon={<EditOutlined/>}/>
            </Tooltip>
          </div>
        )
      },
      width: 120,
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
  clickView = (e, volId) => {
    e.preventDefault()

    this.props.getVolEvents(volId)
  }

  filterEVModal = (volunteersList, viewVolunteerId) => {
    const filtered = volunteersList.filter(vol => vol.id === viewVolunteerId)

    if (filtered.length !== 1) {
      return null
    }

    return filtered[0]
  }
  veTableColumns = [
    {
      title: 'Event',
      dataIndex: 'name',
      sorter: (a1, a2) => a1.name.localeCompare(a2.name)
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      render: (text, record, index) => formatDate(text),
      sorter: (a1, a2) => a1.start_date.localeCompare(a2.start_date)
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      render: (text, record, index) => formatDate(text),
      sorter: (a1, a2) => a1.end_date.localeCompare(a2.end_date)
    },
    {
      title: 'Role',
      dataIndex: 'role'
    },
  ]
  generateVETableData = (viewVolunteerEvents) => {
    return viewVolunteerEvents.map(evt => ({
      key: evt.id,
      name: evt.name,
      start_date: evt.start_date,
      end_date: evt.end_date,
      role: evt.volunteer_event.role,
    }))
  }

  render() {
    const {
      volunteersLoading,
      volunteersList,
      volEventsLoading,
      viewVolunteerEvents,
      viewVolunteerId,
      veModalVisible,
    } = this.props.volunteersMain
    const viewVolunteer = this.filterEVModal(volunteersList, viewVolunteerId)
    const veTableData = this.generateVETableData(viewVolunteerEvents)

    return (
      <SideBar activeTab='volunteers' title="Volunteers" subtitle="Manage SYFC Volunteer Information">

        {/* View Event Volunteers Modal */}
        <Modal
          footer={null}
          title='View Events of Volunteer'
          onCancel={this.closeVEModal}
          visible={veModalVisible}>
          {veModalVisible &&
            <Row>
              <Col span={8}>
                <Text strong>{VolunteersPhrases.CREATE_FORM_TITLE_NAME}</Text>
              </Col>
              <Col span={16}>
                <Paragraph ellipsis>{viewVolunteer.full_name}</Paragraph>
              </Col>
              <Col span={8}>
                <Text strong>{VolunteersPhrases.CREATE_FORM_TITLE_EMAIL}</Text>
              </Col>
              <Col span={16}>
                <Paragraph ellipsis>{viewVolunteer.email}</Paragraph>
              </Col>
              <Col span={8}>
                <Text strong>{VolunteersPhrases.CREATE_FORM_TITLE_DOB}</Text>
              </Col>
              <Col span={16}>
                <Paragraph ellipsis>{formatDate(viewVolunteer.dob)}</Paragraph>
              </Col>

              <Col span={24}>
                <Table
                  bordered
                  loading={volEventsLoading}
                  size='small'
                  dataSource={veTableData}
                  columns={this.veTableColumns}
                />
              </Col>
            </Row>
          }
        </Modal>

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
