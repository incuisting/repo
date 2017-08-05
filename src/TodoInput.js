import React from 'react';
import './TodoInput.css'

function submit(props, event) {
    if (event.key === 'Enter') {
        if (event.target.value.trim() !== '') {
            props.onSubmit(event)
        }
    }
}

function changeTitle(props, event) {
    props.onChange(event)
    console.log('changeTitle', this)
}

export default function (props) {

    return (
        <input type="text" className="TodoInput" value={props.content}
               onChange={changeTitle.bind(null, props)}
               onKeyPress={submit.bind(null, props)}/>
    )
}