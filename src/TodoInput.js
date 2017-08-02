import React, {Component} from 'react';
import './TodoInput.css'

export default class TodoInput extends Component {
    render() {
        return (
            <input type="text" className="TodoInput" value={this.props.content}
                   onChange={this.changeTitle.bind(this)}
                   onKeyPress={this.submit.bind(this)}/>
        )
    }

    submit(event) {
        if (event.key === 'Enter') {
            this.props.onSubmit(event)
        }
    }
    changeTitle(event){
        this.props.onChange(event)
        console.log('changeTitle',this)
    }
}