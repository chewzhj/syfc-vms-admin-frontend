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
import badge3 from '../assets/img/badge_3.png'
import badge5 from '../assets/img/badge_5.png'
import badge10 from '../assets/img/badge_10.png'
import badge20 from '../assets/img/badge_20.png'
import VolunteersPhrases from '../phrases/VolunteersPhrases'

const { Title, Text, Paragraph } = Typography

const formatDate = (rawString) => {
  if (rawString === null || rawString === "") {
    return ""
  }
  const momentObj = moment(rawString)
  return momentObj.format("YYYY-MM-DD")
}

const badges = [
  {src: badge3, alt: 'Attended 3 Events'},
  {src: badge5, alt: 'Attended 5 Events'},
  {src: badge10, alt: 'Attended 10 Events'},
  {src: badge20, alt: 'Attended 20 Events'},
]

const labels = [
  VolunteersPhrases.CREATE_FORM_TITLE_NAME,
  VolunteersPhrases.CREATE_FORM_TITLE_EMAIL,
  VolunteersPhrases.CREATE_FORM_TITLE_DOB,
  VolunteersPhrases.CREATE_FORM_TITLE_NRIC,
  VolunteersPhrases.CREATE_FORM_TITLE_ADDRESS,
  VolunteersPhrases.CREATE_FORM_TITLE_POSTAL_CODE,
  VolunteersPhrases.CREATE_FORM_TITLE_CHURCH,
  VolunteersPhrases.CREATE_FORM_TITLE_DEPT,
  VolunteersPhrases.CREATE_FORM_TITLE_GENDER,
  VolunteersPhrases.CREATE_FORM_TITLE_NUMBER,
]
const values = [
  "Joshua Chew",
  "joshua@email.com",
  "1995-06-24",
  "S2134567G",
  "Block 567 Donowear",
  "234567",
  "Donowat",
  "University",
  "M",
  "83456743",
]

export default class Profile extends React.Component {

  render() {

    return (
      <SideBar activeTab='profile' title="My Profile">
        <Title level={4}>
          My Achievements
        </Title>
        <div style={{maxWidth: '100%', overflow: 'scroll hidden', display: 'flex', marginBottom: 12}}>
          {badges.map(badge => (
            <span title={badge.alt} key={badge.alt}>
              <img
                src={badge.src}
                alt={badge.alt}
                style={{width: 103, height: 96, margin: 10}}
              />
            </span>
          ))}
        </div>
        <Title level={4}>
          My Details
        </Title>

        <Row gutter={[12,12]}>
          {labels.map((text, i) => (
            <DetailLabel
              key={text}
              label={text}
              value={values[i]}
            />
          ))}
        </Row>
      </SideBar>
    )
  }
}

const DetailLabel = (props) => {
  return (
    <Col xs={24} sm={12}>
      <Text style={{fontSize: 12, color: '#aaa'}}>{props.label}</Text><br/>
      <Text>{props.value}</Text><br/>
    </Col>
  )
}
