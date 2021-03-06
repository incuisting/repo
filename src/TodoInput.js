import React from 'react';
import './TodoInput.css'


//todo输入框逻辑
function submit(props, event) {
    if (event.key === 'Enter') {
        if (event.target.value.trim() !== '') {
            props.onSubmit(event)
        }
    }
}

function changeTitle(props, event) {
    props.onChange(event)
    console.log('changeTitle', event)
}

export default function (props) {

    return (
        <input type="text" className="TodoInput" value={props.content}
               placeholder="YOUR TASKS"
               onChange={changeTitle.bind(null, props)}
               onKeyPress={submit.bind(null, props)}/>
    )
}