import React from 'react';
import ReactAddons from 'react-addons';

class CalendarBody extends React.Component{

    constructor(props){
        super(props);
        this.state={
        }
    }


    filterTodoDate(todoList){
        let dateArray=[]
        todoList.filter((item) => !item.deleted)
            .forEach((item)=>{
                if(dateArray.indexOf(item.date)<0){
                    dateArray.push(item.date)
                }
            })
        // this.setState({
        //     dateArray:dateArray
        // })
        // console.log('dateArray',dateArray)
        return dateArray
    }

    renderDay(day, key){ // 渲染每一天
        let toDay = this.props.calendarState.toDay;
        let selectedDay = this.props.currentDay;
        let dateArray=this.filterTodoDate(this.props.todoList);

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

        let isHaveTodo = function () {
            if(dateArray.indexOf(day.ymd)>0){
                return true
            }else {
                return false
            }
        }
        let dayItem = function () {
            if(day===""){
                return false
            }else {
                return true
            }
        }
        let dayClass = cx({
            'currentDay':isSelectedDay(),
            'day-item': dayItem(),
            'now': isToday(),
            'selected': isHaveTodo()
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