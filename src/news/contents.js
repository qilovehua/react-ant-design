import React, { Component } from 'react';

import NewsModel from '../model/news';

var pagesize = 10;

class Contents extends Component {

    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {
            contents: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        }
    }

    componentDidMount(){
        NewsModel.getNewsList({pagesize, page: this.page, tableNum: this.props.index}).then((result)=>{
            console.log('===hehe', result);
        }).catch(()=>{
            console.log('===hehe error');
        });
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
