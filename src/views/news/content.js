import React, { Component } from 'react';

import $ from 'jquery';
import _ from 'lodash';
import { Card, Icon } from 'antd';
import TimeFormat from '../../util/timeFormat';
import Comment from './comment/index';

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showOpt: true,
            showComment: false,
        }
    }

    componentWillMount(){
        var {content} = this.props;
        if(!content || !content.content){
            this.setState({
                showOpt: false,
            });
        }
    }

    componentWillReceiveProps(props){
        if(!_.isEqual(props.content, this.props.content)){
            this.setState({
                showComment: false,
                show: false,
                showOpt: props.content && props.content.content,
            });
        }
    }

    unInterested(news_id){
        this.props.unInterested && this.props.unInterested(news_id);
    }

    showDetail(show){
        console.log('==show', show);
        this.setState({
            show,
        }, ()=>{
            if(show){
                var {content} = this.props;
                if(content && _.size(content.content)) {
                    var className = "content-detail" + content.news_id;
                    $('.'+className).html(content.content);
                }
            }
        });
    }

    showComment(e){
        e.stopPropagation();
        this.setState({
            showComment: !this.state.showComment,
        });
    }

    render() {
        var {content} = this.props;
        var {show, showOpt, showComment} = this.state;
        var existImage = !!content.text_image0;
        var createTime = '';
        if(content.edit_time && content.edit_time !== '0'){
            createTime += ' ⋅ ' + TimeFormat.format(content.edit_time * 1000);
        }
        return (
            <div className="content">
                <Card>
                    {
                        existImage &&
                            <div className="content-img">
                                <img src={content.text_image0} width={158} height={102} alt="加载失败"/>
                            </div>
                    }
                    <div className={existImage ? 'content-with-img' : ''}>
                        <a className="content-title" href="javascript:void(0)">
                            {content.title}
                        </a>
                        {
                            !show &&
                                <div className="content-opt" onClick={()=> {this.showDetail(!show)}}>
                                    <span style={{fontSize: 13, color: '#777'}}>{content.digest}</span>
                                    {showOpt && ' 展开详情'}
                                </div>
                        }
                        {
                            show && showOpt &&
                                <div className={"content-detail" + content.news_id}/>
                        }
                        {
                            show && showOpt &&
                                <div className="content-opt" onClick={()=> {this.showDetail(!show)}}>
                                    {' 关闭详情'}
                                </div>
                        }
                        <div className="content-sub-title" onClick={()=>{console.log(content)}}>
                            <div>{'来源: ' + content.source + ' ⋅ '}<a href="javascript:void(0)" onClick={(e)=>{this.showComment(e)}}>{content.reply_count + '评论'}</a>{createTime}</div>
                            <div onClick={()=>{this.unInterested(content.news_id)}}><Icon type="close" style={{fontSize: 15}}/></div>
                        </div>
                    </div>
                </Card>
                {
                    showComment &&
                        <Comment/>
                }
            </div>
        );
    }
}

export default Content;
