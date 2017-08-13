import React from 'react'
import './DatePicker.css'

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dateArr: [],
            date:new Date()

        }
    }

    render() {
        // this.setData();
        let footer = (
            <div className="footer">
                    <span className="pre caret-left">
                        <svg className="icon">
                            <use xlinkHref="#icon-return"></use>
                        </svg>
                    </span>
                <span className="cur">{this.state.date.getFullYear()+'年'+(this.state.date.getMonth()+1)+'月'}</span>
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
                        <tr>
                            <td className="pre-month">28</td>
                            <td className="pre-month">29</td>
                            <td className="pre-month">30</td>
                            <td className="pre-month">31</td>
                            <td className="cur-month cur-date">1</td>
                            <td className="cur-month">2</td>
                            <td className="cur-month">3</td>
                        </tr>
                        <tr>
                            <td className="cur-month">4</td>
                            <td className="cur-month">5</td>
                            <td className="cur-month">6</td>
                            <td className="cur-month">7</td>
                            <td className="cur-month">8</td>
                            <td className="cur-month">9</td>
                            <td className="cur-month">10</td>
                        </tr>
                        <tr>
                            <td className="cur-month">11</td>
                            <td className="cur-month">12</td>
                            <td className="cur-month">13</td>
                            <td className="cur-month">14</td>
                            <td className="cur-month">15</td>
                            <td className="cur-month">16</td>
                            <td className="cur-month">17</td>
                        </tr>
                        <tr>
                            <td className="cur-month">18</td>
                            <td className="cur-month">19</td>
                            <td className="cur-month">20</td>
                            <td className="cur-month">21</td>
                            <td className="cur-month">22</td>
                            <td className="cur-month">23</td>
                            <td className="cur-month">24</td>
                        </tr>
                        <tr>
                            <td className="cur-month selected-date">25</td>
                            <td className="cur-month">26</td>
                            <td className="cur-month">27</td>
                            <td className="cur-month">28</td>
                            <td className="cur-month">29</td>
                            <td className="cur-month">30</td>
                            <td className="next-month">01</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                {footer}
            </div>
        )
    }

    setData() {

        let firstDay = this.getFirstDay(this.state.date),
            lastDay = this.getLastDay(this.state.date);

        let dateArr = this.state.dateArr;

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
    }


    //获取 date 所在月份的第一天的时间对象
    getFirstDay(date) {
        let year = date.getFullYear(),
            month = date.getMonth();
        console.log('date',year)
        console.log('date',month)
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
}