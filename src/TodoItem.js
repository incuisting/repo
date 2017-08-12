import React, {Component} from 'react'
import './TodoItem.css'

//单条todo的逻辑
export default class TodoItem extends Component {
    render() {
        return (
            <div className={this.props.todo.status === 'completed' ? 'TodoItem itemCompleted' : 'TodoItem'}>
                <label>
                    <input type="checkbox" checked={this.props.todo.status === 'completed'}
                           onChange={this.toggle.bind(this)}/>
                    {this.props.todo.status === 'completed' ?
                        <svg className="icon">
                            <use xlinkHref="#icon-zhengquewancheng-yuankuang"></use>
                        </svg> :
                        <svg className="icon">
                            <use xlinkHref="#icon-zhengquewancheng-xianxingyuankuang"></use>
                        </svg>
                    }

                </label>
                <span className={this.props.todo.status === 'completed' ? 'isCompleted' : 'title'}>
                {this.props.todo.title}
                </span>
                <label className="itemDelete">
                    <button onClick={this.delete.bind(this)}>删除</button>
                    <svg className="icon">
                        <use xlinkHref="#icon-cuowuguanbiquxiao"></use>
                    </svg>
                </label>
            </div>
        )
    }

    delete(event) {
        console.log(1)
        this.props.onDelete(event, this.props.todo)
    }

    toggle(event) {
        this.props.onToggle(event, this.props.todo)
    }
}