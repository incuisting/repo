import React, {Component} from 'react'
import './UserDialog.css'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'
import UserDialogCover from './UserDialogCover'

//登陆或注册弹窗
export default class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'signUp',
            selectedTab: 'signInOrSignUp',
            formData: {
                email: '',
                username: '',
                password: ''
            }
        }
    }



    signUp(e) {
        e.preventDefault()
        let {email, username, password} = this.state.formData
        let isLeagal = this.checkFormData.call(null,email,username,password)
        if(!isLeagal){
            return
        }
        let success = (user) => {
            this.props.onSignUp.call(null, user)
        }
        let error = (error) => {
            switch (error.code) {
                case 200:
                    alert('没有提供用户名，或者用户名为空')
                case 202:
                    alert('用户名已被占用，换个试试？')
                    break
                case 217:
                    alert('用户名不可以有空格！！！！！')
                    break
                case 125:
                    alert('没有@的邮箱地址就是咸鱼！！')
                default:
                    alert(error)
                    break
            }
        }
        signUp(email, username, password, success, error)
    }

    signIn(e) {
        e.preventDefault()
        let {username, password} = this.state.formData
        let success = (user) => {
            this.props.onSignUp.call(null, user)
        }
        let error = (error) => {
            switch (error.code) {
                case 210:
                    alert('用户名与密码不匹配')
                    break
                case 211:
                    alert('用户名打错了')
                    break
                case 219:
                    alert('登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signIn(username, password, success, error)

    }
    //检查用户名，密码，邮箱
    checkFormData(email,username,password){
        let regEmail = new RegExp("^\\w+@[\\w-]+\\.(com)$")
        let regUsername = new RegExp("\\w{3,10}")
        let regPassword = new RegExp("\\w{6,20}")
        if(!regEmail.test(email)){
            alert('邮箱地址至少包含@和.com')
            return false
        }else if(!regUsername.test(username)){
            alert('用户长度为3-10个字符')
            return false
        }else if(!regPassword.test(password)){
            alert('密码长度为6-20个字符')
            return false
        }
        return true
    }

    changeFormData(key, e) {
        let stateCopy = JSON.parse(JSON.stringify(this.state)) //JSON深拷贝
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }

    render() {

        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    <UserDialogCover/>
                    <div className="UserPanes">
                        {this.state.selectedTab === 'signInOrSignUp' ?
                            <SignInOrSignUp
                                formData = {this.state.formData}
                                onSignIn = {this.signIn.bind(this)}
                                onSignUp = {this.signUp.bind(this)}
                                onChange = {this.changeFormData.bind(this)}
                                onForgotPassword = {this.showForgotPassword.bind(this)}
                            /> :
                            <ForgotPasswordForm
                                formData = {this.state.formData}
                                onSubmit = {this.resetPassword.bind(this)}
                                onChange = {this.changeFormData.bind(this)}
                                onSignIn = {this.returnToSignIn.bind(this)}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }

    returnToSignIn() {
        let stateCopy = JSON.parse(JSON.stringify(this.state)) //JSON深拷贝
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }

    showForgotPassword() {
        let stateCopy = JSON.parse(JSON.stringify(this.state)) //JSON深拷贝
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }

    resetPassword(e) {
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)
        console.log(1)
    }
}