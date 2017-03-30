import React, { Component } from 'react';

import $ from 'jquery';
import _ from 'lodash';
import NewsModel from '../../model/news';
import Content from './content';
import {Spin} from 'antd';

var pagesize = 10;

class Contents extends Component {

    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {
            contents: [],
            loading: false,
        }
    }

    componentDidMount(){
        this.getNews(this.props.index);
        $(window).on('scroll', ()=>{
            this.onScroll();
        })
    }

    componentWillReceiveProps(props){
        if(props.index !== this.props.index){
            this.getNews(props.index, true, true);
        }
    }

    getNews(tableNum, init=true, scroll=false){
        if(this.state.loading){
            return;
        }
        this.setState({
            loading: true,
        });
        NewsModel.getNewsList({pagesize, page: this.page, tableNum}).then((contents)=>{
            this.page += 1;
            this.loading = false;
            if(scroll){
                $('body').animate({scrollTop: 0}, 20);
            }
            this.setState({
                contents: init ? contents : this.state.contents.concat(contents),
                loading: false,
            });
        }).catch(()=>{
            this.setState({
                loading: false,
            });
            console.log('===hehe error');
        });
    }

    onScroll(){
        if ($(document).scrollTop() >= $(document).height() - $(window).height() - 200) { // 距离底部200px时加载下一页
            console.log("滚动条已经到达底部, load more");
            this.getNews(this.props.index, false);
        }
    }

    unInterested(news_id){
        var {contents} = this.state;
        var remove = _.remove(contents, (content)=>{
            return content.news_id === news_id;
        });
        if(_.size(remove)){
            this.setState({
                contents,
            });
        }
    }

    render() {
        var {contents, loading} = this.state;
        return (
            <div className="contents">
                {
                    contents.map((content, index)=>{
                        return <Content key={index} content={content} unInterested={(news_id)=>{this.unInterested(news_id)}}/>
                    })
                }
                {
                    loading &&
                        <div style={{height: 30, textAlign: 'center'}}>
                            <Spin/>
                        </div>
                }
            </div>
        );
    }
}

export default Contents;
