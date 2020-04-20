import React from 'react'
import {Card} from 'antd'

const EventCard = (props) => {
  return (
    <Card title={props.name}>
      {props.startDate} - {props.endDate}
    </Card>
  )
}

export default EventCard
