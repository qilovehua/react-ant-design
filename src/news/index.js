import React, { Component } from 'react';

import { Layout, Menu} from 'antd';
const {Sider, Content} = Layout;
import Contents from './contents';

var menus = ['头条', '娱乐', '军事', '汽车', '财经', '笑话', '体育', '科技', ];

class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
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
                                            <div style={{'text-align': 'center'}} onClick={()=>{this.selectMenu(index)}}>
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
                            <Contents index={this.state.index}/>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default News;
