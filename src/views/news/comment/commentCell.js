import React, { Component } from 'react';

var _ = require('lodash');
import SendCommend from './sendCommend';
import Cell from './cell';
import BgImage from '../../common/bgImage';
import CommentModel from '../../../model/comment';

var pageNum = 10;

class CommentCell extends Component {

    constructor(props) {
        super(props);
        this.last_start_time = 0;
        var currentUser = global.currentUser || {};
        this.usr_id = currentUser.usr_id || '-1';
        this.state = {
            showReply: false, // 是否显示写评论框
            finished: true, // 子评论是否都已显示
            focus: false, // sendCommend的textarea是否focus
            subComments: [
                // {
                //     comment_id: '40',
                //     content: 'woefeigjei我二哥IE结果IE诶就给个聚少离多带来了噢个哦个股二级钢结构加工价格金额金额咳咳额可根据呱唧呱唧',
                //     parent_objid: 'parent_comment_id',
                //     praise_count: 1,
                //     self_praise: true,
                //     src_objid: 'post_id',
                //     src_type: 1,
                //     tstmp: 1487839009079,
                //     usr_id: '40',
                //     valid: 1,
                //     pic_list: [{pid: '55bf4ba6442aa5f8f2a875e1331859e4-1487841669389'}],
                // },
            ],
        };
    }

    componentWillMount(){
        this.getSubComment(this.props);
    }

    componentWillReceiveProps(props){
        if(!_.isEqual(props.comment, this.props.comment)){
            this.setState({
                showReply: false,
                subComments: [],
            });
            this.getSubComment(props);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
    }

    isSelf(id){
        return id === this.usr_id;
    }

    getSubComment(props, show=false, init=true){ // init为true 首次加载
        var {comment} = props;
        if(comment && comment.child_count && (show || this.isSelf(comment.usr_id))){
            var params = {comment_id: comment.comment_id, batch_start: this.last_start_time, length: pageNum};
            CommentModel.getSubComment(params).then((subComments)=>{
                // console.log('===sub comm', subComments);
                var finished = _.size(subComments) < pageNum;
                var last = _.last(subComments);
                if (last) {
                    this.last_start_time = last.tstmp;
                }
                var allComment = init ? subComments : _.union(this.state.subComments, subComments);
                this.setState({
                    finished,
                    subComments: allComment
                });
            });
        }
    }

    showReply(){
        this.setState({
            showReply: true,
            focus: true,
        });
    }

    succPostComment(comment){
        console.log('===post child comment succ');
        this.setState({
            subComments: _.union([comment, ], this.state.subComments),
        });
    }

    render(){
        var {comment, model} = this.props;
        var {subComments, finished, showReply, focus} = this.state;
        var loadMore;
        if(!finished || (comment.child_count > 0 && !_.size(subComments))){
            loadMore = (
                <div className="comment-sub-load-more" onClick={()=>{this.getSubComment(this.props, true, false)}}>
                    <div className="comment-load-more"/>
                    <BgImage className="comment-more" width={13} height={17}/>
                    <span>查看更多回复</span>
                </div>
            )
        }
        return (
            <div className="comment-cell">
                <Cell comment={comment} showReply={()=>{this.showReply()}}/>
                {!!_.size(subComments) && <SubCommentList comments={subComments} showReply={()=>{this.showReply()}}/>}
                {loadMore}
                {
                    (showReply || !!_.size(subComments)) &&
                    <div className="commend-send-cell">
                        <SendCommend child={true} focus={showReply && focus} comment={comment} model={model}
                                     succPostComment={(result)=>{this.succPostComment(result)}} onBlur={()=>{this.setState({focus: false})}}/>
                    </div>
                }
            </div>
        );
    }
}

export default CommentCell;

class SubCommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(nextProps, this.props);
    }

    showReply(){
        this.props.showReply && this.props.showReply();
    }

    render(){
        console.log('===sub render');
        var content = this.props.comments.map((comment, index)=>{
            return <Cell key={'sub' + index} comment={comment} child={true} showReply={()=>{this.showReply()}}/>
        });
        return (
            <div className="comment-sub-list">
                {content}
            </div>
        );
    }
}