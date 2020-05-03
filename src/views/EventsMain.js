import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Table,
  Button,
  Divider,
  Tooltip,
  Spin,
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
import ReactExport from 'react-data-export'
import EventsPhrases from '../phrases/EventsPhrases'
import {displayDateFormat} from '../variables/DateFormats'
import NoImage from '../assets/img/no-image.png'

const { Text, Paragraph } = Typography
const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const formatDate = (rawString) => {
  if (rawString === null || rawString === "") {
    return ""
  }
  const momentObj = moment(rawString)
  return momentObj.format(displayDateFormat)
}


export default class EventsMain extends React.Component {

  componentDidMount() {
    this.props.retrieveEvents()
  }

  closeEventVolModal = () => this.props.closeEventVolModal()

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
      width: 100,
      sorter: (a1, a2) => a1.name.localeCompare(a2.name),
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
      sorter: (a1, a2) => a1.start_date.localeCompare(a2.start_date),
      defaultSortOrder: 'ascend',
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      render: (text, record, index) => formatDate(text),
      width: 120,
      sorter: (a1, a2) => a1.end_date.localeCompare(a2.end_date),
    },
    {
      title: 'Actions',
      render: (text, record, index) => {
        return (
          <div>
            <Tooltip title='View Volunteers'>
              <Button onClick={e => this.clickView(e, record.id)} shape='circle' icon={<UserOutlined/>}/>
            </Tooltip>
            <Divider type='vertical'/>
            <Tooltip title='Edit Event'>
              <Button onClick={e => this.clickEdit(e, record.id)} href='/events/edit' shape='circle' icon={<EditOutlined/>}/>
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
        eventRoles: editEvent.roles ? editEvent.roles.split(",") : [],
      }

      this.props.loadEvent(editObj)

      this.props.history.push('/events/edit')
    }
  }
  clickView = (e, eventId) => {
    e.preventDefault()

    this.props.retrieveEventVolunteers(eventId)
  }

  modalTableColumns = [
    {
      title: 'Name',
      dataIndex: 'full_name',
    },
    {
      title: 'NRIC',
      dataIndex: 'nric',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      render: (text, record, index) => formatDate(text),
    },
  ]

  filterEVModal = (eventsList, selectedEvent) => {
    const filtered = eventsList.filter(evt => evt.id === selectedEvent)

    if (filtered.length !== 1) {
      return null
    }

    return filtered[0]
  }

  render() {
    const {
      eventsList,
      eventsLoading,
      eventPicture,
      eventPictureLoading,
      selectedEvent,
      eventVolList,
      eventVolLoading,
      evModalVisible,
    } = this.props.eventsMain
    const selectedEventDetails = this.filterEVModal(eventsList, selectedEvent)
    // const tableData = this.generateTableData()
    return (
      <SideBar activeTab='events' title="Events" subtitle="Manage SYFC Events">

        {/* View Event Volunteers Modal */}
        <Modal
          footer={null}
          title='View Event Volunteers'
          onCancel={this.closeEventVolModal}
          visible={evModalVisible}>
          {evModalVisible &&
            <Row>
              <Col span={24}>
                <Text strong>{EventsPhrases.EVENTS_PICTURE}</Text>
              </Col>

              <Col span={24}>
                <Row justify='center'>
                  <Spin spinning={eventPictureLoading}>
                    <div style={{height: 260}}>
                      {eventPicture ?
                        <img
                          style={{maxHeight: '100%', maxWidth: '100%'}}
                          src={eventPicture}
                          alt={selectedEventDetails.name}
                        />
                        :
                        <img src={NoImage} alt={selectedEventDetails.name}/>
                      }
                    </div>
                  </Spin>
                </Row>
              </Col>

              <Col span={8}>
                <Text strong>{EventsPhrases.EVENTS_TITLE}</Text>
              </Col>
              <Col span={16}>
                <Paragraph ellipsis>{selectedEventDetails.name}</Paragraph>
              </Col>
              <Col span={8}>
                <Text strong>{EventsPhrases.EVENTS_DESCRIPTION}</Text>
              </Col>
              <Col span={16}>
                <Paragraph ellipsis={{rows: 3}}>{selectedEventDetails.description}</Paragraph>
              </Col>
              <Col span={8}>
                <Text strong>{EventsPhrases.EVENTS_DATES}</Text>
              </Col>
              <Col span={16}>
                <Paragraph ellipsis>{formatDate(selectedEventDetails.start_date)} - {formatDate(selectedEventDetails.end_date)}</Paragraph>
              </Col>
              <Col span={8}>
                <Text strong>{EventsPhrases.EVENTS_ROLES}</Text>
              </Col>
              <Col span={16}>
                <Text>{selectedEventDetails.roles}</Text>
              </Col>

              <Col span={24}>
                <ExcelExport eventVolList={eventVolList} name={selectedEventDetails.name}/>
                <Table
                  bordered
                  loading={eventVolLoading}
                  size='small'
                  rowKey='id'
                  dataSource={eventVolList}
                  columns={this.modalTableColumns}
                />
              </Col>
            </Row>
          }
        </Modal>

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
          showSorterTooltip
          bordered
        />
      </SideBar>
    )
  }
}

const ExcelExport = (props) => {
  const exportDataset = props.eventVolList.map(vol => ({
    name: vol.full_name,
    nric: vol.nric,
    dob: formatDate(vol.dob)
  }))
  const filename = props.name.replace(/\s/g, "_") + '_volunteers'

  return (
    <ExcelFile
      filename={filename}
      element={
        <Button
          style={{margin: '10px 0px'}}
          type='primary'
          icon={
            <FileExcelOutlined/>
          }>
          Export Volunteer Info
        </Button>
      }>
      <ExcelSheet data={exportDataset} name="Volunteers">
        <ExcelColumn label="Name" value="name"/>
        <ExcelColumn label="NRIC" value="nric"/>
        <ExcelColumn label="Date of Birth" value="dob"/>
      </ExcelSheet>
    </ExcelFile>
  )
}
