import React, {Component} from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import './Todo.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import {getCurrentUser, signOut, TodoModel} from './leanCloud';

//主文件
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: getCurrentUser() || {},
            newTodo: '',
            todoList: []
        }

        //从leancloud获取用户信息
        let user = getCurrentUser()
        if (user) {
            TodoModel.getByUser(user, (todos) => {
                let stateCopy = JSON.parse(JSON.stringify(this.state))
                stateCopy.todoList = todos
                this.setState(stateCopy)
            })
        }
    }

    render() {
        let todos = this.state.todoList
            .filter((item) => !item.deleted)
            .map((item, index) => {
                return (
                    <li key={item.id}>
                        <TodoItem todo={item} onToggle={this.toggle.bind(this)}
                                  onDelete={this.delete.bind(this)}
                        />
                    </li>
                )
            })

        return (
            <div className="App">
                <div className="Date">
                    <div>1231231231231111111111111111111111111111111111111111111111</div>
                </div>
                <div className="Todo">
                    <h1>{this.state.user.username || '我'}的待办
                        {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}
                    </h1>
                    <div className="inputWrapper">
                        <TodoInput content={this.state.newTodo}
                                   onChange={this.changeTitle.bind(this)}
                                   onSubmit={this.addTodo.bind(this)}/>
                    </div>
                    <ol className="todoList">
                        {todos}
                    </ol>
                    {this.state.user.id ?
                        null :
                        <UserDialog
                            onSignUp={this.onSignUpOrSignIn.bind(this)}
                            onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
                </div>
            </div>
        )
    }

    //归属todo
    onSignUpOrSignIn(user) {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = user
        this.setState(stateCopy)

    }

    //归属todo
    signOut() {
        signOut()
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = {}
        this.setState(stateCopy)
    }

    //归属todo
    delete(event, todo) {

        TodoModel.destroy(todo.id, () => {
            todo.deleted = true
            this.setState(this.state)
        })
    }

    //归属todo
    toggle(event, todo) {
        let oldStatus = todo.status
        todo.status = todo.status === 'completed' ? '' : 'completed'
        TodoModel.update(todo, () => {
            this.setState(this.state)

        }, (error) => {
            todo.status = oldStatus
            this.setState(this.state)
        })
    }

    //归属todo
    changeTitle(event) {
        this.setState({
            newTodo: event.target.value,
            todoList: this.state.todoList
        })
    }

    //归属todo
    addTodo(event) {
        let newTodo = {
            title: event.target.value,
            status: '',
            deleted: false
        }
        TodoModel.create(newTodo, (id) => {
            console.log('id', id)
            newTodo.id = id
            this.state.todoList.push(newTodo)
            this.setState({
                newTodo: '',
                todoList: this.state.todoList
            })
        }, (error) => {
            console.log(error)
        })
    }
}

export default App;
