import React from 'react'
import {Card, Typography} from 'antd'
import event_picture from '../assets/img/event_picture.jpg'

const {Text, Paragraph} = Typography

const EventCard = (props) => {
  return (
    <Card size='small' cover={<EventImage/>} style={{minWidth: 140, boxShadow: '2px 2px #eee'}}>
      <Text strong ellipsis style={{width: '100%'}}>{props.name}</Text><br/>
      <Text style={{fontSize: 11}}>{props.startDate} &rarr; {props.endDate}</Text>
    </Card>
  )
}

const EventImage = () => (
  <img
    src={event_picture}
    alt='Event'
  />
)

export default EventCard
