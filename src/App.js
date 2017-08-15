import React, {Component} from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
// import './Todo.css';

import UserDialog from './UserDialog';
import {getCurrentUser, signOut, TodoModel} from './leanCloud';
import DatePicker from './DatePicker'
import Todo from './Todo'
//主文件
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: getCurrentUser() || {},
            newTodo: '',
            todoList: [],
            currentDay:''
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

        return (
            <div className="App">
                <div className="Date">
                    {this.state.user.id?
                        <DatePicker selectedDay={this.selectedDay.bind(this)}
                                    currentDay ={this.state.currentDay}
                        />:
                        null
                    }
                </div>
                <Todo todoList={this.state.todoList}
                      user={this.state.user}
                      newTodo={this.state.newTodo}
                      changeTitle={this.changeTitle.bind(this)}
                      addTodo={this.addTodo.bind(this)}
                      signOut = {this.signOut.bind(this)}
                      toggle = {this.toggle.bind(this)}
                      delete = {this.delete.bind(this)}

                />
                {this.state.user.id ?
                    null :
                    <UserDialog
                        onSignUp={this.onSignUpOrSignIn.bind(this)}
                        onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
            </div>
        )
    }

    selectedDay(day){
        this.setState({
            currentDay:day
        });
        console.log(day)

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
        console.log('toggle',todo)
        TodoModel.update(todo, () => {
            this.setState(this.state)

        }, (error) => {
            todo.status = oldStatus
            this.setState(this.state)
        })
        this.notCompletedItemToTop()
    }
    notCompletedItemToTop(){
        //将已经完成todo移动到lsit最后
        console.log(this.state.todoList)
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

/*
* todo
* item完成后移到列表最下方，取消移动会最顶部
* */