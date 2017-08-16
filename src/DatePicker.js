import React from 'react'
import './DatePicker.css'
import Calendar from './Calendar'

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props)
    }

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
                <Calendar selectedDay={this.props.selectedDay}
                          currentDay = {this.props.currentDay}
                          todoList={this.props.todoList}
                />
            </div>
        )
    }

}