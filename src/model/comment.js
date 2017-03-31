
// import Fetch from '../util/fetch';
// import Config from '../config/url';

class Comment {

    static getComments(params) {
        return Promise.resolve([
            {
                comment_id: '40',
                content: '我二哥IE结果IE诶就给个聚少离多带来了噢个哦个股二级钢结构加工价格金额金额咳咳额可根据呱唧呱唧',
                praise_count: 1,
                self_praise: true,
                src_objid: 'post_id',
                src_type: 1,
                tstmp: 1487839009079,
                usr_id: '40',
                valid: 1,
                pic_list: [{pid: '55bf4ba6442aa5f8f2a875e1331859e4-1487841669389'}],
                child_count: 1,
            },
            {
                comment_id: '40',
                content: '我二哥IE结个哦个股二级钢结构加工价格金额金额咳咳额可根据呱唧呱唧',
                praise_count: 1,
                self_praise: true,
                src_objid: 'post_id',
                src_type: 1,
                tstmp: 1487839009079,
                usr_id: '40',
                valid: 1,
                child_count: 1,
            },
        ]);
    }

    static getSubComment(params){
        return Promise.resolve([
            {
                comment_id: '40',
                content: 'subsub',
                praise_count: 1,
                self_praise: true,
                src_objid: 'post_id',
                src_type: 1,
                tstmp: 1487839009079,
                usr_id: '40',
                valid: 1,
                pic_list: [{pid: '55bf4ba6442aa5f8f2a875e1331859e4-1487841669389'}],
                child_count: 1,
            },
            {
                comment_id: '40',
                content: 'subsub',
                praise_count: 1,
                self_praise: true,
                src_objid: 'post_id',
                src_type: 1,
                tstmp: 1487839009079,
                usr_id: '40',
                valid: 1,
                child_count: 1,
            },
        ]);
    }

    static praiseComment(params){
        return Promise.resolve(true);
    }
}

export default Comment;