import React from 'react'
import {Card, Typography, Spin} from 'antd'
// could change an image
import NoImage from '../assets/img/no-image.png'

const {Text} = Typography

const EventCard = (props) => {
  return (
    <Card
      size='small'
      onClick={props.onClick}
      cover={<EventImage name={props.name} picture={props.picture} loading={props.pictureLoading}/>}
      style={{minWidth: 140, boxShadow: '2px 2px #eee'}}>
      <Text strong ellipsis style={{width: '100%'}}>{props.name}</Text><br/>
      <Text style={{fontSize: 11}}>{props.startDate} &rarr; {props.endDate}</Text>
    </Card>
  )
}

const EventImage = (props) => (
  <div style={{width: '100%'}}>
    <Spin spinning={props.loading || false}>
      <img
        style={{maxHeight: '100%', maxWidth: '100%'}}
        src={props.picture || NoImage}
        alt={props.name}
      />
    </Spin>
  </div>
)

export default EventCard
