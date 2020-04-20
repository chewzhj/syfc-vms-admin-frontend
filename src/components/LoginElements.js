import React from 'react'
import {
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons'
import LoginPhrases from '../phrases/LoginPhrases'
import Full_Logo from '../assets/img/syfc-full-logo.png'

export default class Login extends React.Component {

  render() {
    return (
      <div style={{width: '100%'}}>
        <div style={{width: 368, margin:'0px auto', textAlign: 'center', display:'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: '7vh'}}>
          <img src={Full_Logo} alt='SYFC' style={{height: 105, width: 368, margin: '20px 0px'}}/>

          <div style={{marginBottom: 50}}>
            <span style={{color: 'rgb(0,0,0,0.45)', fontSize: 30}}>{LoginPhrases.APP_SUBTITLE}</span>
          </div>

          {this.props.children}

          <div style={{marginTop: 100}}>
            <span style={{color: 'rgb(0,0,0,0.45)'}}>Copyright &copy; 2020 Arride Solutions</span>
          </div>
        </div>
      </div>
    )
  }
}
