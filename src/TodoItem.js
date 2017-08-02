import React, {Component} from 'react'

export default class TodoItem extends Component {
    render() {
        return (
            <div>
                <input type="checkbox" checked={this.props.todo.status === 'completed'}
                onChange={this.toggle.bind(this)}/>
                {this.props.todo.title}
                <button onClick={this.delete.bind(this)}>删除</button>
            </div>
        )
    }
    delete(event){
        console.log(1)
        this.props.onDelete(event,this.props.todo)
    }
    toggle(event){
        this.props.onToggle(event,this.props.todo)
    }
}