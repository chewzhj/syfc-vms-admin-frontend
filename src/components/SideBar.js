import React from 'react'
import { Layout, Menu, Avatar, Popover, PageHeader, Button } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  AppstoreAddOutlined,
  DownOutlined,
} from '@ant-design/icons';
import {logout} from '../api/LoginAPI'
import Full_Logo from '../assets/img/syfc-full-logo.png'
import { Link } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu

export default class SideBar extends React.Component {

  state = {
    visible: false,
    broken: false,
  }

  onVisibleChange = (visible) => this.setState({ visible })
  onBreakpoint = (broken) => this.setState({ broken })

  render() {
    const name = sessionStorage.getItem('name') || "User"
    const loginType = sessionStorage.getItem('loginType')
    const { activeTab, title, subtitle } = this.props
    const phtitle = title || "Title"
    const phsubtitle = subtitle || ""
    const vpWidth = window.innerWidth

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          onBreakpoint={this.onBreakpoint}
        >
          <div style={{ height: 40, margin: 24 }}>
            <Link to='/events'>
              <img src={Full_Logo} alt="SYFC" style={{ height: 39, width: 140 }} />
            </Link>
          </div>
          {loginType === 'volunteer' ?
            <VolunteerMenu activeTab={activeTab} />
          :
            <AdminMenu activeTab={activeTab} />
          }
        </Sider>
        <Layout style={{minWidth: vpWidth}}>
          <Header style={{ padding: 0, background: '#fff', boxShadow: '1px 1px 4px 0px #bcbcbc', zIndex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
              {loginType === 'volunteer' ?
                <VolunteerTopRight
                  name={name}
                  visible={this.state.visible}
                  onVisibleChange={this.onVisibleChange}
                />
                :
                <AdminTopRight
                  name={name}
                  visible={this.state.visible}
                  onVisibleChange={this.onVisibleChange}
                />
              }
            </div>

          </Header>
          <PageHeader
            className="site-page-header"
            title={phtitle}
            subTitle={phsubtitle}
            style= {{ background: '#fff', paddingLeft: 50, zIndex: 0 }}
          />
          <Content style={{ margin: '16px 0' }}>
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Copyright &copy; 2020 Arride Solutions</Footer>
        </Layout>
      </Layout>
    )
  }
}

const AdminTopRight = (props) => {
  return (
    <Popover
      content={<Button onClick={logout}>Logout</Button>}
      trigger='click'
      visible={props.visible}
      onVisibleChange={props.onVisibleChange}
      >
      <div style={{ marginRight: 20 }}>
        <Avatar icon={<UserOutlined />} style={{ marginRight: 12 }} />
        <span>{props.name}</span>
        <DownOutlined style={{ marginLeft: 12 }} />
      </div>
    </Popover>
  )
}
const AdminMenu = (props) => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[props.activeTab]}>
      <Menu.Item key="events">
        <CalendarOutlined />
        <Link to="/events">
          <span className="nav-text">Events</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="volunteers">
        <UserOutlined />
        <Link to="/volunteers">
          <span className="nav-text">Volunteers</span>
        </Link>
      </Menu.Item>
    </Menu>
  )
}
const VolunteerTopRight = (props) => {
  return (
    <div style={{ marginRight: 20 }}>
      <Avatar icon={<UserOutlined />} style={{ marginRight: 12 }} />
      <span>{props.name}</span>
      <Popover
        content={<Button onClick={logout}>Logout</Button>}
        trigger='click'
        placement='bottomRight'
        visible={props.visible}
        onVisibleChange={props.onVisibleChange}
        >
        <DownOutlined style={{ marginLeft: 12 }} />
      </Popover>
    </div>
  )
}
const VolunteerMenu = (props) => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[props.activeTab]}>
      <Menu.Item key="events">
        <CalendarOutlined />
        <Link to="/events">
          <span className="nav-text">My Events</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="joinevents">
        <AppstoreAddOutlined />
        <Link to="/joinevents">
          <span className="nav-text">Join Events</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="profile">
        <UserOutlined />
        <Link to="/profile">
          <span className="nav-text">Profile</span>
        </Link>
      </Menu.Item>
    </Menu>
  )
}
