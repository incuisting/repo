import React from 'react'

export default function (props) {
    return(
        <form className="signIn" onSubmit={this.signIn.bind(this)}>
            <div className="row">
                <label>用户名</label>
                <input type="text" value={this.state.formData.username}
                       onChange={this.changeFormData.bind(this, 'username')}/>
            </div>
            <div className="row">
                <label>密码</label>
                <input type="password" value={this.state.formData.password}
                       onChange={this.changeFormData.bind(this, 'password')}
                />
            </div>
            <div className="row actions">
                <button type="submit">登入</button>
                <a href="#" onClick={this.showForgotPassword.bind(this)}>忘记密码</a>
            </div>
        </form>
    )
}