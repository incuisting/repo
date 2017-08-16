import React from 'react';
import moment from 'moment';

import CalendarBody from './CalendarBody.js';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDay: {yyyy: '', mm: '', dd: '', ymd: '', md: ''},// 今日的日期对象 yyyy: 年 mm：月，dd：日 ymd：年月日（2016-01-20）md：月日（01-20）
            monthEn: ['January ', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December'],
            weeksArray: [] // 存储当前月份的日期
        }

    }

    componentDidMount() {
        this.getNowDate();
        this.createMonthArray();
    }

    getNowDate() { // 获取当前时间，并更新state
        let toDay = this.state.toDay;

        let year = moment().year();
        let month = moment().month();
        let date = moment().date();

        toDay.yyyy = year;
        toDay.mm = month;
        toDay.dd = date;

        toDay.ymd = moment().format('YYYY-MM-DD');
        toDay.md = moment().format('MM-DD');
        toDay.mmEn = this.state.monthEn[month];

        this.setState({toDay: toDay});
    }

    createMonthArray(year, month) { // 生成当前月份的整个日期排序
        let weekArray = []; // 存放一周的天数
        let weeksArray = []; // 存放一整个月的天数，一个子数组为一周

        let _moment = new moment(); // new moment 才能保证设置年、月等属性时是有效的
        let toDay = this.state.toDay;

        let _year = year ? year : toDay.yyyy;
        let _month = month ? month : toDay.mm;

        _moment.set({'year': _year, 'month': _month}); // 设置年、月

        let days = _moment.daysInMonth(); // 获取当前月份下的天数

        let dayInfo = {}; // 初始一个每天的详情对象

        for (let d = 1; d < days + 1; d++) { // 根据当前月份的天数生成，日期对应星期的数组

            _moment.set('date', d);  // 设置日期

            let day = _moment.day(); // 获取星期

            dayInfo.yyyy = _year; // 年
            dayInfo.mm = _month; // 月
            dayInfo.dd = d; // 日
            dayInfo.day = day; // 星期
            dayInfo.ymd = _moment.format('YYYY-MM-DD'); // 年-月-日

            if (day === 6) { // 判断是否为星期六 为周六则需要结束该子数组
                weekArray[day] = dayInfo;
                weeksArray.push(weekArray.concat());
                weekArray = [];
            } else if (d === days) { // 判断是否为最后一天 最后一天也需要结束该子数组
                weekArray[day] = dayInfo;
                weeksArray.push(weekArray.concat());
            } else {
                weekArray[day] = dayInfo;
            }

            dayInfo = {}

        }

        for (let w in weeksArray) { // 将为空的部分填充上空
            for (let d = 0; d < 7; d++) {
                if (typeof(weeksArray[w][d]) === 'undefined') {
                    weeksArray[w][d] = '';
                }
            }
        }

        this.setState({weeksArray: weeksArray})

    }

    handlePreMonth() { // 选择上一个月
        let toDay = this.state.toDay;
        let _year = toDay.yyyy;
        let _month = toDay.mm;

        if (_month === 0) {
            _year -= 1;
            _month = 11;
        } else {
            _month -= 1;
        }

        toDay.yyyy = _year;
        toDay.mm = _month;
        toDay.mmEn = this.state.monthEn[_month];

        this.setState({toDay: toDay})
        this.createMonthArray()
    }

    handleNextMonth() { // 选择下一个月
        let toDay = this.state.toDay;
        let _year = toDay.yyyy;
        let _month = toDay.mm;

        if (_month === 11) {
            _year += 1;
            _month = 0;
        } else {
            _month += 1;
        }

        toDay.yyyy = _year;
        toDay.mm = _month;
        toDay.mmEn = this.state.monthEn[_month];

        this.setState({toDay: toDay})
        this.createMonthArray()
    }

    render() {
        let toDay = this.state.toDay;
        return (
            <div className="ui-calendar">
                <div className="date">
                    <table className="panel">
                        <thead>
                        <tr>
                            <th className="week-item">日</th>
                            <th className="week-item">一</th>
                            <th className="week-item">二</th>
                            <th className="week-item">三</th>
                            <th className="week-item">四</th>
                            <th className="week-item">五</th>
                            <th className="week-item">六</th>
                        </tr>
                        </thead>
                        <CalendarBody calendarState={this.state}
                                      selectedDay={this.props.selectedDay}
                                      currentDay = {this.props.currentDay}
                                      dateArray = {this.props.dateArray}
                        />
                    </table>
                </div>
                <div className="footer">
                    <span className="pre caret-left" onClick={this.handlePreMonth.bind(this)}>
                        <svg className="icon">
                            <use xlinkHref="#icon-return"></use>
                        </svg>
                    </span>
                    <span
                        className="cur">{toDay.mmEn}{toDay.yyyy}</span>
                    <span className="next caret-right" onClick={this.handleNextMonth.bind(this)}>
                        <svg className="icon">
                            <use xlinkHref="#icon-enter"></use>
                        </svg>
                    </span>
                </div>
            </div>
        )
    }

}

export default Calendar