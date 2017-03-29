import React, { Component } from 'react';

import { Layout, Menu} from 'antd';
const {Sider, Content} = Layout;

var menus = ['头条', '娱乐', '军事', '汽车', '财经', '笑话', '体育', '科技', ];

class News extends Component {

    seleteMenu(index){
        this.setState({
            index
        });
    }

    render() {
        return (
            <div className="news">
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={120} className="news-menu">
                        <Menu
                            mode="inline"
                            theme="dark"
                            defaultSelectedKeys={['1']}
                            style={{ height: '100%' }}
                        >
                            {
                                menus.map((menu, index)=>{
                                    return (
                                        <Menu.Item key={index}>
                                            <div style={{'text-align': 'center'}} onClick={()=>{this.seleteMenu(index)}}>
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
                            <div style={{height: '100px'}}>eieiei</div>
                            <div style={{height: '100px'}}>eieiei</div>
                            <div style={{height: '100px'}}>eieiei</div>
                            <div style={{height: '100px'}}>eieiei</div>
                            <div style={{height: '100px'}}>eieiei</div>
                            <div style={{height: '100px'}}>eieiei</div>
                            <div style={{height: '100px'}}>eieiei</div>
                            <div style={{height: '100px'}}>eieiei</div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default News;
