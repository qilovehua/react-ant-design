import React, { Component } from 'react';

import NewsModel from '../model/news';
import Content from './content';

var pagesize = 10;

class Contents extends Component {

    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {
            contents: [],
        }
    }

    componentDidMount(){
        NewsModel.getNewsList({pagesize, page: this.page, tableNum: this.props.index}).then((contents)=>{
            this.setState({
                contents
            });
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
                        return <Content key={index} content={content}/>
                    })
                }
            </div>
        );
    }
}

export default Contents;
