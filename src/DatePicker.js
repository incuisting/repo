import React from 'react'
import './DatePicker.css'

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dateArr: [],
            date: new Date()

        }
    }

    render() {
        let tpl =this.setTbody()
        console.log('tpl',typeof tpl)
        let footer = (
            <div className="footer">
                    <span className="pre caret-left">
                        <svg className="icon">
                            <use xlinkHref="#icon-return"></use>
                        </svg>
                    </span>
                <span
                    className="cur">{this.state.date.getFullYear() + '年' + (this.state.date.getMonth() + 1) + '月'}</span>
                <span className="next caret-right">
                        <svg className="icon">
                            <use xlinkHref="#icon-enter"></use>
                        </svg>
                    </span>
            </div>

        )
        return (
            <div className="DatePicker">
                <div className="header">
                    <a href="#">
                        <svg className="icon">
                            <use xlinkHref="#icon-pinnedoctocat"></use>
                        </svg>
                    </a>

                </div>
                <div className="date">
                    <table className="panel">
                        <thead>
                        <tr>
                            <th>日</th>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
                {footer}
            </div>
        )
    }

    //设置日期数组
    setDateArr() {

        let firstDay = this.getFirstDay(this.state.date),
            lastDay = this.getLastDay(this.state.date);
debugger
        let dateArr = [];

        for (let i = firstDay.getDay(); i > 0; i--) {
            let d = new Date(firstDay.getTime() - i * 24 * 60 * 60 * 1000);
            dateArr.push({type: 'pre', date: d});
        }

        for (let j = 0; j < lastDay.getDate() - firstDay.getDate() + 1; j++) {
            let d = new Date(firstDay.getTime() + j * 24 * 60 * 60 * 1000);
            dateArr.push({type: 'cur', date: d});
        }

        for (let k = 1; k < 7 - lastDay.getDay(); k++) {
            let d = new Date(lastDay.getTime() + k * 24 * 60 * 60 * 1000);
            dateArr.push({type: 'next', date: d})
        }

        return dateArr;
    }


    setTbody() {
        let tpl = '',
            dateArr = this.setDateArr();
        console.log('dateArr', dateArr)
        for (let i = 0; i < dateArr.length; i++) {
            if (i % 7 === 0) {
                tpl = tpl + '<tr>' ;
            }
            tpl += '<td className="';

            if (dateArr[i].type === 'pre') {
                tpl += 'pre-month';
            } else if (dateArr[i].type === 'cur') {
                tpl += 'cur-month';
            } else {
                tpl += 'next-month'
            }

            if (this.getYYMMDD(this.state.date) === this.getYYMMDD(dateArr[i].date)) {
                tpl += ' cur-date';
            }
            tpl += '"';

            tpl += ' data-date="' + this.getYYMMDD(dateArr[i].date) + '">';
            tpl += ( dateArr[i].date.getDate()) + '</td>';


            if (i % 7 === 6) {
                tpl = tpl + '</tr>'
            }
        }
        return tpl;

    }

    //获取 date 所在月份的第一天的时间对象
    getFirstDay(date) {
        let year = date.getFullYear(),
            month = date.getMonth();
        console.log('date', year);
        console.log('date', month);
        return new Date(year, month, 1);
    }

    //获取 date 所在月份最后一天的时间对象
    getLastDay(date) {
        let year = date.getFullYear(),
            month = date.getMonth();
        month++;

        if (month > 11) {
            month = 0;
            year++;
        }
        let newDate = new Date(year, month, 1);
        return new Date(newDate.getTime() - 1000 * 60 * 60 * 24);
    }

    //获取date 上月1号时间对象
    getPreMonth(date) {
        let year = date.getFullYear(),
            month = date.getMonth();

        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        return new Date(year, month, 1);
    }

    //获取date 下月1号时间对象

    getNextMonth(date) {
        let year = date.getFullYear(),
            month = date.getMonth();

        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        return new Date(year, month, 1);
    }

    getYYMMDD(date) {
        let yy = date.getFullYear(),
            mm = date.getMonth() + 1;
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
    }
}