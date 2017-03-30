import React, { Component } from 'react';

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="about">
                <h2>主要使用知识如下：</h2>
                <ul style={{fontSize: 15, color: '#777', marginLeft: 20, listStyleType: 'square'}}>
                    <li>React</li>
                    <li>React-Router</li>
                    <li>ant-design</li>
                    <li>Jquery</li>
                    <li>CSS(3)</li>
                    <li>HTML(5)</li>
                    <li>Fetch, JSONP 跨域访问API获取数据</li>
                    <li>Lodash</li>
                </ul>
                <br/>
                <h3>获取地址：
                    <a href="https://github.com/qilovehua/react-ant-design" target="_blank">https://github.com/qilovehua/react-ant-design</a>
                </h3>
            </div>
        );
    }
}

export default About;
