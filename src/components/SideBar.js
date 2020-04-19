import React from 'react'
import { Layout, Menu, Avatar, Popover, PageHeader, Button } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  DownOutlined,
} from '@ant-design/icons';
import Full_Logo from '../assets/img/syfc-full-logo.png'
import { Link } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu

export default class SideBar extends React.Component {

  state = {
    visible: false
  }

  onVisibleChange = (visible) => this.setState({ visible })

  render() {
    const { activeTab, title, subtitle } = this.props
    const phtitle = title || "Title"
    const phsubtitle = subtitle || ""
    const bpCallBack = this.props.onBreakpoint || (() => null)
    const insightsOpen = activeTab.substring(0,8)

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          onBreakpoint={bpCallBack}
        >
          <div style={{ height: 40, margin: 24 }}>
            <Link to='/events'>
              <img src={Full_Logo} alt="MiniMetrics" style={{ height: 39, width: 140 }} />
            </Link>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[activeTab]} defaultOpenKeys={[insightsOpen]}>
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
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#fff', boxShadow: '1px 1px 4px 0px #bcbcbc', zIndex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
              <Popover
                content={<Link to='/login'><Button>Logout</Button></Link>}
                trigger='click'
                visible={this.state.visible}
                onVisibleChange={this.onVisibleChange}
              >
                <div style={{ marginRight: 20 }}>
                  <Avatar icon={<UserOutlined />} style={{ marginRight: 12 }} />
                  <span>Admin</span>
                  <DownOutlined style={{ marginLeft: 12 }} />
                </div>
              </Popover>
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
