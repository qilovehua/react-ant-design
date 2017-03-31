import React, { Component } from 'react';

var _ = require('lodash');
import SendCommend from './sendCommend';
import CommentCell from'./commentCell';
import CommentModel from '../../../model/comment';

var pageNum = 10;

class CommentList extends Component {

    constructor(props) {
        super(props);
        this.last_start_time = 0;
        this.state = {
            finished: false,
            comments: [
                // {
                //     comment_id: '40',
                //     content: 'woefeigjei我二哥IE结果IE诶就给个聚少离多带来了噢个哦个股二级钢结构加工价格金额金额咳咳额可根据呱唧呱唧',
                //     praise_count: 1,
                //     self_praise: true,
                //     src_objid: 'post_id',
                //     src_type: 1,
                //     tstmp: 1487839009079,
                //     usr_id: '40',
                //     valid: 1,
                //     pic_list: [{pid: '55bf4ba6442aa5f8f2a875e1331859e4-1487841669389'}],
                //     child_count: 1,
                // },
            ],
        };
    }

    componentWillMount(){
        this.getComment();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
    }

    getComment(init=true){ // init未true 首次加载
        var params = {};
        CommentModel.getComments(params).then((result) => {
            if (result) {
                var last = _.last(result);
                var finished = _.size(result) < pageNum;
                if (last) {
                    this.last_start_time = last.tstmp;
                    var allComment = init ? result : _.union(this.state.comments, result);
                    this.setState({
                        comments: allComment,
                        finished
                    });
                } else {
                    this.setState({
                        finished: true,
                    })
                }
            }
        });
    }

    showMore(){
        this.getComment(false);
    }

    succPostComment(comment){
        console.log('===post comment succ');
        this.setState({
            comments: _.union([comment, ], this.state.comments),
        });
    }

    render(){
        var {child, model} = this.props;
        var content = this.state.comments.map((comment, index)=>{
            return <CommentCell key={index} comment={comment} child={child} model={model}/>
        });
        var hasMore = false; //_.size(this.state.comments) < model.comment;
        var showMore;
        if(hasMore){
            showMore = (
                <div className="show-more-comment">
                    <span onClick={()=>{this.showMore()}}>查看更多评论</span>
                    <span>{_.size(this.state.comments) + '/' + model.comment}</span>
                </div>
            )
        }
        return (
            <div>
                <div className="comment-list">
                    {content}
                    {showMore}
                </div>
                <SendCommend {...this.props} succPostComment={(result)=>{this.succPostComment(result)}}/>
            </div>
        );
    }
}

export default CommentList;

CommentList.defaultProps = {
    child: false,
};