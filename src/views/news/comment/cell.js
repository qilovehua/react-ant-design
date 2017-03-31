import React, { Component } from 'react';

import _ from 'lodash';
import BgImage from '../../common/bgImage';
import Image from '../../common/image';
import TimeFormat from '../../../util/timeFormat';
import CommentModel from '../../../model/comment';

class Cell extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
    }

    reply(){
        this.props.showReply && this.props.showReply();
    }

    praise(){
        console.log('===praise', this.props.comment);
        var {comment} = this.props;
        var params = {
            comment_id: comment.comment_id,
            operation: comment.self_praised ? 'delete' : 'add',
        };
        CommentModel.praiseComment(params).then((result)=>{
            if(result){
                var self_praised = comment.self_praised;
                _.assign(comment, {
                    self_praised: !self_praised,
                    praise_count: (comment.praise_count || 0) + (self_praised ? -1 : 1)
                });
                this.forceUpdate();
            }else{
                console.log('点赞失败');
            }
        });
    }

    render(){
        var {comment, child} = this.props;
        var guid;
        if(_.size(comment.pic_list)){
            guid = comment.pic_list[0].pid;
        }
        var timeStr = TimeFormat.format(comment.tstmp);
        var praiseCount = comment.praise_count || 0;
        return (
            <div className={"cell-container" + (child ? ' cell-container-child' : '')}>
                <div className="comment-avatar">
                    <BgImage className="comment-avatar"/>
                </div>
                <div className="comment-content">
                    <div className="cell">
                        <span className="parse-text">{'WhoAmI'}</span>
                        <span>{comment.content}</span>
                    </div>
                    {
                        !!guid &&
                        <div className="cell-media cell">
                            <Image guid={guid} resizeMode="cover"/>
                        </div>
                    }
                    <div className="cell">
                        <span className="parse-text" onClick={()=>{this.praise()}}>{comment.self_praised ? '已赞' : '赞'}</span>
                        <span>・</span>
                        <span className="parse-text" onClick={()=>{this.reply()}}>回复</span>
                        {
                            !!praiseCount && <BgImage style={{width: 13, height: 15, marginLeft: 3}} className="praise"  onClick={()=>{this.praise()}}/>
                        }
                        {
                            !!praiseCount && <span>{praiseCount}</span>
                        }
                        <span className="time-format">{timeStr}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cell;