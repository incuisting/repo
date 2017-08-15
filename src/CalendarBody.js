import React from 'react';
import ReactAddons from 'react-addons';

class CalendarBody extends React.Component{

    constructor(props){
        super(props);
    }
    renderDay(day, key){ // 渲染每一天
        let toDay = this.props.calendarState.toDay;
        let selectedDay = this.props.currentDay;

        let cx = ReactAddons.classSet;

        let isToday = function(){

            if(toDay.ymd === day.ymd){
                return true;
            }else{
                return false;
            }
        }

        let isSelectedDay = function () {
            if(selectedDay===day.ymd){
                return true
            }else {
                return false
            }
        }

        let dayClass = cx({
            'currentDay':isSelectedDay(),
            'day-item': true,
            'now': isToday()
        })

        return(
            <td className={dayClass} key={key} data-yyyy={day.yyyy} data-mm={day.mm} data-dd={day.dd} data-day={day.day} data-ymd={day.ymd} onClick={this.props.selectedDay.bind(null,day.ymd)}>{day.dd}</td>
        )
    }
    renderWeek(week, key){ // 渲染每一周

        let day = week.map(this.renderDay.bind(this))

        return(
            <tr key={key} className="day-list">
                {day}
            </tr>
        )
    }
    render(){

        let weeksArray = this.props.calendarState.weeksArray;
        let week = weeksArray.map(this.renderWeek.bind(this))

        return(
            <tbody>
                {week}
            </tbody>
        )
    }

};

export default CalendarBody;