import  React from 'react'

//忘记密码页界面
export default function (props) {
    return(
        <div className="forgotPassword">
            <h3>
                重置密码
            </h3>
            <form  onSubmit={props.onSubmit}>
                <div className="row">
                    <label>邮箱</label>
                    <input type="text" value={props.formData.email}
                           placeholder="Enter your e-mail"
                           onChange={props.onChange.bind(null, 'email')}
                    />
                </div>
                <div className="row actions">
                    <button type="submit">发送重置邮件</button>
                    <a href="#" onClick={props.onSignIn}>返回</a>
                </div>
            </form>
        </div>
    )
}