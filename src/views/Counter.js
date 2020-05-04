import React from 'react'
import {Row, Col, Button, Slider, InputNumber} from 'antd'
import {Link} from 'react-router-dom'
import 'antd/dist/antd.css'
import CounterPhrases from '../phrases/CounterPhrases'

// example class to showcase react-redux
class Counter extends React.Component {

  onIncrementValueChange = value => {
    this.props.changeIncrement(value)
  }

  addOnClick = (e) => {
    e.preventDefault()
    this.props.incrementCounter()
  }

  resetOnClick = (e) => {
    e.preventDefault()
    this.props.resetCounter()
  }

  // this function is triggered when you stop using the component
  // componentWillUnmount() {
  //   this.props.resetCounter()
  // }


  render() {
    const {
      incrementValue,
      counter,
    } = this.props.counter;

    return (
      <div>
        <Row>
          <Col
            span={14}
            offset={5}
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Row>
              <Col span={24}>
                <h1 style={{textAlign: 'center', fontSize: 48}}>{CounterPhrases.COUNTER_TITLE}</h1>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <h4 style={{textAlign: 'center', color: '#999'}}>{CounterPhrases.CHANGE_INCREMENT_HELP}</h4>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div style={{display:'flex'}}>
                  <Slider
                    min={1}
                    max={10}
                    onChange={this.onIncrementValueChange}
                    value={typeof incrementValue === 'number' ? incrementValue : 1}
                    style={{flex: 1}}
                  />
                  <InputNumber
                    min={1}
                    max={10}
                    onChange={this.onIncrementValueChange}
                    value={incrementValue}
                    style={{ marginLeft: 8 }}
                  />
                  <Button
                    type='primary'
                    onClick={this.addOnClick}
                    style={{ marginLeft: 8 }}>
                    {CounterPhrases.ADD_BUTTON_TEXT}
                  </Button>
                  <Button
                    onClick={this.resetOnClick}
                    style={{ marginLeft: 8 }}>
                    {CounterPhrases.RESET_BUTTON_TEXT}
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <h4 style={{textAlign: 'center', color: '#999', marginTop: '1em', marginBottom: 0}}>{CounterPhrases.COUNTER_VALUE_TEXT}</h4>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <h2 style={{textAlign: 'center'}}>{counter}</h2>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={14} offset={5}>
            <Button><Link to="/">Back</Link></Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Counter;
