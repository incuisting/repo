import React from 'react'
import './DatePicker.css'

export default class DatePicker extends React.Component {
    render() {
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
                <div className="footer">
                    <span className="pre caret-left">
                        <svg className="icon">
                            <use xlinkHref="#icon-return"></use>
                        </svg>
                    </span>
                    <span className="cur">2016年7月</span>
                    <span className="next caret-right">
                        <svg className="icon">
                            <use xlinkHref="#icon-enter"></use>
                        </svg>
                    </span>
                </div>
            </div>
        )
    }
}