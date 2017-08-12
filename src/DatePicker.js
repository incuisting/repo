import React from 'react'
import './DatePicker.css'

export default class DatePicker extends React.Component{
    render(){
        return (
            <div className="DatePicker">
                <div className="date"></div>
                <div className="footer"></div>
            </div>
        )
    }
}