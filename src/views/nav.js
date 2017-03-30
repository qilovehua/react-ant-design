import React, { Component } from 'react';
import {Link} from 'react-router';
import logo from './../../public/image/logo.svg';
import { Layout, Menu} from 'antd';
const { Header } = Layout;

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: '1',
        }
    }

    componentWillMount(){
        var {location} = this.props;
        if(location.hash){
            var key = location.hash.slice(1);
            this.setState({
                key
            });
        }
    }

    render() {
        return (
            <div>
                <div style={{position: 'fixed', width: '100%', zIndex: 100, top: 0}}>
                    <Layout>
                        <Header className="header nav">
                            <div className="nav-logo">
                                <img src={logo} className="App-logo" alt="logo" />
                            </div>
                            <div className="nav-menu">
                                <Menu
                                    theme="dark"
                                    mode="horizontal"
                                    defaultSelectedKeys={[this.state.key]}
                                    style={{ lineHeight: '64px' }}
                                >
                                    <Menu.Item key="1"><Link to="/#1">首页</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/thanks#2">致谢</Link></Menu.Item>
                                    <Menu.Item key="3"><Link to="/about#3">关于</Link></Menu.Item>
                                </Menu>
                            </div>
                        </Header>
                    </Layout>
                </div>
                <div style={{marginTop: 64}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Nav;
