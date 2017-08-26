import React, {Component} from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';

import UserDialog from './UserDialog';
import {getCurrentUser, signOut, TodoModel} from './leanCloud';
import DatePicker from './DatePicker'
import Todo from './Todo'
import moment from 'moment'
//主文件
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: getCurrentUser() || {},
            newTodo: '',
            todoList: [],
            currentDay:'',
            dateArray:[]
        }

        //从leancloud获取用户信息
        this.initTodoGetByUser();

    }
    componentWillMount(){
        this.getToday() //在挂载之前就获取今天的日期，以便传递给todo里面
    }
    render() {
        return (
            <div className="App">
                <div className="Date">
                    {this.state.user.id?
                        <DatePicker selectedDay={this.selectedDay.bind(this)}
                                    currentDay ={this.state.currentDay}
                                    dateArray ={this.state.dateArray}
                        />:
                        null
                    }
                </div>
                <Todo todoList={this.state.todoList}
                      user={this.state.user}
                      newTodo={this.state.newTodo}
                      currentDay={this.state.currentDay}
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
                        onSignIn={this.onSignUpOrSignIn.bind(this)}
                        todoInit={this.initTodoGetByUser.bind(this)}
                    />}
            </div>
        )
    }

    initTodoGetByUser(){
        let user = getCurrentUser()
        if (user) {
            TodoModel.getByUser(user, (todos) => {
                let stateCopy = JSON.parse(JSON.stringify(this.state))
                stateCopy.todoList = todos
                this.setState(stateCopy)
                this.filterTodoDate(this.state.todoList)
                console.log('从leancloud获取用户信息',this.state)

            })
        }
    }

    filterTodoDate(todoList){
        let dateArray=[]
        todoList.filter((item) => !item.deleted)
            .forEach((item)=>{
                if(dateArray.indexOf(item.date)<0){
                    dateArray.push(item.date)
                }
            })
        this.setState({
            dateArray:dateArray
        })
        // console.log('dateArray',dateArray)
        // return dateArray
    }

    selectedDay(day){
        console.log('selectedDay',day)
        let oldCurrentDay = this.state.currentDay
        if (day===undefined){
            day=oldCurrentDay
        }
        this.setState({
            currentDay:day
        });
        console.log(day)

    }
    getToday(){
        let today = moment().format('YYYY-MM-DD')
        this.setState({
            currentDay:today
        })
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
            this.filterTodoDate(this.state.todoList)
        })
    }

    //归属todo
    toggle(event, todo) {
        let oldStatus = todo.status
        todo.status = todo.status === 'completed' ? '' : 'completed'
        console.log('toggle',todo)
        TodoModel.update(todo, () => {
            this.setState(this.state)
            this.notCompletedItemToTop()
        }, (error) => {
            todo.status = oldStatus
            this.setState(this.state)
        })
    }
    notCompletedItemToTop(){
        //将已经完成todo移动到lsit最后
        let todoList = this.state.todoList
        todoList.sort((a,b)=>{
            return (a.status.length - b.status.length)
        })
        this.setState({
            todoList:todoList
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
            deleted: false,
            date:this.state.currentDay
        }
        TodoModel.create(newTodo, (id) => {
            console.log('id', id)
            newTodo.id = id
            this.state.todoList.push(newTodo)
            this.setState({
                newTodo: '',
                todoList: this.state.todoList
            })
            this.filterTodoDate(this.state.todoList)
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