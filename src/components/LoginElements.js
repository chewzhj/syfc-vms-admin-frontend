import React from 'react'
import LoginPhrases from '../phrases/LoginPhrases'
import Full_Logo from '../assets/img/syfc-full-logo.png'

// this is the layout page for the pages before logging in
const LoginElements = (props) => {
  return (
    <div style={{width: '100%'}}>
      <div style={{width: 300, margin:'0px auto', textAlign: 'center', display:'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: '7vh'}}>
        <img src={Full_Logo} alt='SYFC' style={{height: 85, width: 298, margin: '20px 0px'}}/>

        <div style={{marginBottom: 50}}>
          <span style={{color: 'rgb(0,0,0,0.45)', fontSize: 30}}>{LoginPhrases.APP_SUBTITLE}</span>
        </div>

        {props.children}

        <div style={{marginTop: 100}}>
          <span style={{color: 'rgb(0,0,0,0.45)'}}>Copyright &copy; 2020 Arride Solutions</span>
        </div>
      </div>
    </div>
  )
}

export default LoginElements
