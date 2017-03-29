import React, { Component } from 'react';
import logo from './../public/image/logo.svg';
import { Layout, Menu} from 'antd';
const { Header } = Layout;

class Nav extends Component {
    render() {
        return (
            <div>
                <div>
                    <Layout style={{position: 'fixed', width: '100%', zIndex: 100}}>
                        <Header className="header nav">
                            <div className="nav-logo">
                                <img src={logo} className="App-logo" alt="logo" />
                            </div>
                            <div className="nav-menu">
                                <Menu
                                    theme="dark"
                                    mode="horizontal"
                                    defaultSelectedKeys={['1']}
                                    style={{ lineHeight: '64px' }}
                                >
                                    <Menu.Item key="1">首页</Menu.Item>
                                    <Menu.Item key="2">致谢</Menu.Item>
                                    <Menu.Item key="3">关于</Menu.Item>
                                </Menu>
                            </div>
                        </Header>
                    </Layout>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Nav;
