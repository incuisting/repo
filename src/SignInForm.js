import React from 'react'

//登陆界面
export default function (props) {
    return(
        <form className="signIn" onSubmit={props.onSubmit}>
            <div className="row">
                <label>用户名</label>
                <input type="text" value={props.formData.username}
                       placeholder="Enter your username"
                       onChange={props.onChange.bind(null, 'username')}/>
            </div>
            <div className="row">
                <label>密码</label>
                <input type="password" value={props.formData.password}
                       placeholder="Your password"
                       onChange={props.onChange.bind(null, 'password')}
                />
            </div>
            <div className="row actions">
                <button type="submit">登入</button>
                <a href="#" onClick={props.onForgotPassword}>忘记密码</a>
            </div>
        </form>
    )
}