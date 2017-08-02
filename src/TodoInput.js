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
            console.log('用户按了回车');
        }
    }
}