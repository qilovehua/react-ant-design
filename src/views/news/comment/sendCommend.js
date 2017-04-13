import React, { Component } from 'react';

import _ from 'lodash';
import BgImage from '../../common/bgImage';

class SendComment extends Component {

    constructor(props) {
        super(props);
        this.scrollHeight = 0;
        var currentUser = global.currentUser || {icon: ''};
        this.icon = currentUser.icon;
        this.usr_id = currentUser.usr_id;
        this.state = {
            height: '18',
        };
    }

    componentDidMount(){
        this.inputFocus(this.props);
    }

    componentWillReceiveProps(props){
        this.inputFocus(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
    }

    inputFocus(props){
        if(props.focus){
            var ref = this.refs.inputRef;
            ref && ref.focus();
        }
    }

    resizeHeight(e){
        console.log('textinput scrollHeight', e.target.scrollHeight);
        var scrollHeight = e.target.scrollHeight;
        this.scrollHeight = scrollHeight;
        var height = '18';
        if(scrollHeight >= 68){
            height = '67';
        }else if(scrollHeight >= 51){
            height = '50';
        }else if(scrollHeight >= 34){
            height = '33';
        }
        this.setState({
            height,
        });
    }

    postComment(e){
        if(e.keyCode !== 13){
            this.resizeHeight(e);
        }else{ // Enter 发布评论
            var value = e.target.value.trim();
            if(!value){
                return;
            }
            this.props.succPostComment && this.props.succPostComment(
                {
                    comment_id: '40',
                    content: value,
                    parent_objid: 'parent_comment_id',
                    praise_count: 0,
                    self_praise: false,
                    src_objid: 'post_id',
                    src_type: 1,
                    tstmp: new Date().getTime(),
                    usr_id: '40',
                    valid: 1,
                }
            );
            setTimeout(()=>{
                var ref = this.refs.inputRef;
                ref && (ref.value = '');
            }, 10);
        }
    }

    render(){
        var {child, onBlur} = this.props;
        var {height} = this.state;
        console.log('render', this.props);
        var style = {
            height: height + 'px',
            'overflowY': this.scrollHeight > 68 ? 'scroll' : 'hidden',
        };
        return (
            <div className={"comment-send " + (child ? 'comment-send-child':'')}>
                <div className="comment-send-avatar">
                    <BgImage className="comment-send-avatar"/>
                </div>
                <div className="comment-input-container">
                    <div className="comment-input">
                        <div>
                            <textarea type="text" ref={'inputRef'} placeholder={'写评论... 评论均是模拟数据'} style={style}
                                      onKeyDown={(e)=>{this.postComment(e)}} onBlur={()=>{onBlur && onBlur()}}/>
                        </div>
                    </div>
                    {!child && <span>{'按Enter键发布'}</span>}
                </div>
            </div>
        );
    }
}

export default SendComment;

SendComment.defaultProps = {
    child: false,
};