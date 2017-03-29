import React, { Component } from 'react';

// import { Layout, Menu} from 'antd';
// const {Sider, Content} = Layout;

class Contents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contents: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        }
    }

    componentDidMount(){

    }

    render() {
        var {contents} = this.state;
        return (
            <div className="contents">
                {
                    contents.map((content, index)=>{
                        return <div key={index} style={{height: '100px'}}>{content}</div>
                    })
                }
            </div>
        );
    }
}

export default Contents;
