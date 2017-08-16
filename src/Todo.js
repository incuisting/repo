import React ,{Component} from 'react'
import './Todo.css'
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

export default class Todo extends Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props);
        let todos = this.props.todoList
            .filter((item) => !item.deleted)
            .filter((item) => item.date === this.props.currentDay)//选出日期为选中日期的todoItem
            .map((item, index) => {
                return (
                    <li key={item.id}>
                        <TodoItem todo={item} onToggle={this.props.toggle}
                                  onDelete={this.props.delete}
                        />
                    </li>
                )
            })
        return(
            <div className="Todo">
                <div className="logOut">
                    {this.props.user.id ? <button onClick={this.props.signOut}>LogOut</button> : null}
                </div>
                <div className="inputWrapper">
                    <TodoInput content={this.props.newTodo}
                               onChange={this.props.changeTitle}
                               onSubmit={this.props.addTodo}/>
                </div>
                <ol className="todoList">
                    {todos}
                </ol>
            </div>
        )
    }
}