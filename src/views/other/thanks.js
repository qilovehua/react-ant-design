import React, { Component } from 'react';
import $ from 'jquery';
class Thanks extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        $('body').animate({scrollTop: 0}, 10);
    }

    render() {
        return (
            <div className="thanks">
                <h2>致谢</h2>
                <ul style={{fontSize: 15, color: '#777', marginLeft: 20, listStyleType: 'square'}}>
                    <li>
                        感谢 <a href="http://showdoc.dagoogle.cn/" target="_blank">大谷歌（http://showdoc.dagoogle.cn/）</a> 提供免费、稳定网络新闻接口
                    </li>
                    <li>
                        感谢 <a href="https://ant.design/index-cn" target="_blank">Ant Design（https://ant.design/index-cn）</a> 提供基于React的设计&前端框架
                    </li>
                </ul>
            </div>
        );
    }
}

export default Thanks;
