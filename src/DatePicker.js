import React from 'react'
import './DatePicker.css'
import Calendar from './Calendar'

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
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
                <Calendar/>
            </div>
        )
    }

}