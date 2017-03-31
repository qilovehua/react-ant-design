import React, { Component } from 'react';

import CommentList from './commentList';

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return (
            <div className="comment-container">
                <CommentList {...this.props}/>
            </div>
        );
    }
}

export default Comment;

Comment.defaultProps = {
    child: false,
};