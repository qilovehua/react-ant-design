import React, { Component } from 'react';

import {Layout, Menu} from 'antd';
const {Sider, Content} = Layout;
import Contents from './contents';
import Weather from '../weather/index';

var menus = ['头条', '娱乐', '军事', '汽车', '财经', '笑话', '体育', '科技', ];

class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 1,
        }
    }

    selectMenu(index){
        this.setState({
            index
        });
    }

    render() {
        return (
            <div className="news">
                <Layout>
                    <Sider width={130} className="news-menu">
                        <Menu
                            mode="inline"
                            theme="dark"
                            defaultSelectedKeys={['1']}
                            style={{ height: '100%' }}
                        >
                            {
                                menus.map((menu, index)=>{
                                    return (
                                        <Menu.Item key={index + 1}>
                                            <div className="news-menu-item" onClick={()=>{this.selectMenu(index + 1)}}>
                                                {menu}
                                            </div>
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content style={{marginLeft: '150px'}}>
                            <div className="content-container">
                                <Contents index={this.state.index}/>
                                <Weather/>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default News;
