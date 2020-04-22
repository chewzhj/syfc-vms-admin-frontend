import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Button,
  Tooltip,
  Spin,
  Typography,
} from 'antd'
import moment from 'moment'
import {
  EditOutlined,
} from '@ant-design/icons'
import badge3 from '../assets/img/badge_3.png'
import badge5 from '../assets/img/badge_5.png'
import badge10 from '../assets/img/badge_10.png'
import badge20 from '../assets/img/badge_20.png'
import VolunteersPhrases from '../phrases/VolunteersPhrases'
import {displayDateFormat} from '../variables/DateFormats'

const { Title, Text } = Typography

const formatDate = (rawString) => {
  if (!rawString) {
    return ""
  }
  const momentObj = moment(rawString)
  return momentObj.format(displayDateFormat)
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

export default class Profile extends React.Component {

  componentDidMount() {
    this.props.getProfile()
  }

  processValues = (profileObject) => {
    if (profileObject) {
      const values = [
        profileObject.full_name,
        profileObject.email,
        formatDate(profileObject.dob),
        profileObject.nric,
        profileObject.address,
        profileObject.postal_code,
        profileObject.church,
        profileObject.department,
        profileObject.gender,
        profileObject.number,
      ]
      return values
    } else {
      return (new Array(10)).fill("")
    }
  }
  clickEdit = (e) => {
    e.preventDefault()
    const editVol = this.props.profile.profileObject

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

    this.props.history.push('/profile/edit')
  }

  render() {
    const {
      profileLoading,
      profileObject
    } = this.props.profile
    const profileValues = this.processValues(profileObject)

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
          <Tooltip title='Edit Details'>
            <Button onClick={this.clickEdit} href='/profile/edit' shape='circle' icon={<EditOutlined/>} style={{marginLeft: 12}}/>
          </Tooltip>
        </Title>

        <Spin spinning={profileLoading}>
          <Row gutter={[12,12]}>
            {labels.map((text, i) => (
              <DetailLabel
                key={text}
                label={text}
                value={profileValues[i]}
              />
            ))}
          </Row>
        </Spin>
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
