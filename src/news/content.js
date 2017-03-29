import React, { Component } from 'react';

import { Card, Icon } from 'antd';

class Content extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }

    render() {
        var {content} = this.props;
        var existImage = !!content.text_image0;
        return (
            <div className="content">
                <Card>
                    {
                        existImage &&
                            <div className="content-img">
                                <img src={content.text_image0} width={158} height={102}/>
                            </div>
                    }
                    <div className={'content-with-img'}>
                        <a className="content-title" href="javascript:void(0)">
                            {content.title}
                        </a>
                        <div className="content-sub-title">
                            <div>{'来源: ' + content.source + ' ⋅ ' + content.reply_count + '评论 ⋅ ' + content.edit_time}</div>
                            <div><Icon type="close" style={{fontSize: 15}}/></div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Content;
