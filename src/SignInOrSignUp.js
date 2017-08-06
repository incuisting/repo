import React ,{Component} from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

//登入或注册切换以及面板内容显示
export default class SignInOrSignUp extends Component{
    constructor(props){
        super(props)
        this.state={
            selected:'signUp'
        }
    }

    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }

    render(){
        return(
            <div className="signInOrSignUp">
                <nav>
                    <label>
                        <input type="radio" value='signUp' checked={this.state.selected === 'signUp'}
                               onChange={this.switch.bind(this)}
                        />注册</label>
                    <label>
                        <input type="radio" value='signIn' checked={this.state.selected === 'signIn'}
                               onChange={this.switch.bind(this)}
                        />登入 </label>

                </nav>
                <div className="panes">
                    {this.state.selected === 'signUp' ?
                        <SignUpForm formData={this.props.formData}
                                    onSubmit={this.props.onSignUp}
                                    onChange={this.props.onChange}
                        />
                        : null}
                    {this.state.selected === 'signIn' ?
                        <SignInForm formData={this.props.formData}
                                    onSubmit={this.props.onSignIn}
                                    onChange={this.props.onChange}
                                    onForgotPassword={this.props.onForgotPassword}
                        />
                        : null}
                </div>
            </div>
        )
    }
}