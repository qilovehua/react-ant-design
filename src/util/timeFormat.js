import moment from 'moment';

class timeFormat {
    static format(date){
        var tempDate = new Date(date);

        // 生成时间
        moment.lang('zh-cn');
        return moment(tempDate).calendar(null, {
            sameDay: '今天 HH:mm:ss',
            nextDay: '明天',
            // sameWeek: 'dd',
            // nextWeek: 'dddd',
            //nextWeek: '['+ I18n.nextWeek +']dd',
            lastDay: '昨天 HH:mm:ss',
            lastWeek: 'dddd',
            sameElse: 'YYYY年MM月DD日 HH:mm:ss'
        });
    }
}

export default timeFormat;
