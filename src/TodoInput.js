import React, {Component} from 'react';

export default class TodoInput extends Component {
    render() {
        return (
            <input type="text" defaultValue={this.props.content}
                   onkeypress={this.submit}/>
        )
    }

    submit(event) {
        if (event.key === 'Enter') {
            this.props.onSubmit.call()
        }
    }
}