import AV from 'leancloud-storage'

let APP_ID = 'f0B88b8emKpHwXnk69GJw9O9-gzGzoHsz'
let APP_KEY = 'cGr1lluaXyF5n07mLlfQVRgY'
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})
export default AV

//所有跟 Todo 相关的 LeanCloud 操作都放到这里
export const TodoModel = {
    getByUser(user,successFn,errorFn){
        let query = new AV.Query('Todo')
        query.find().then((response) =>{
            let array = response.may((t)=>{
                return {id:t.id,...t.attributes}
            })
            successFn.call(null,array)
        }, (error)=>{
            errorFn && errorFn.call(null,error)
        })
    },
    create({status, title, deleted}, successFn, errorFn) {
        let Todo = AV.Object.extend('Todo')
        let todo = new Todo()
        todo.set('title', title)
        todo.set('status', status)
        todo.set('deleted', deleted)
        todo.save().then((response) => {
            successFn.call(null, response.id)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    },
    update() {

    },
    destroy() {

    }
}


export function signUp(email, username, password, successFn, errorFn) {
    let user = new AV.User()

    user.setUsername(username)

    user.setPassword(password)

    user.setEmail(email)

    user.signUp().then((loginedUser) => {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, (error) => {
        errorFn.call(null, error)
    })

    return undefined
}

export function getCurrentUser() {
    let user = AV.User.current()
    if (user) {
        return getUserFromAVUser(user)
    } else {
        return null
    }
}

export function signOut() {
    AV.User.logOut()
    return undefined
}

export function signIn(username, password, successFn, errorFn) {
    AV.User.logIn(username, password).then((loginedUser) => {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, (error) => {
        errorFn.call(null, error)
    })
}

export function sendPasswordResetEmail(email, successFn, errorFn) {
    AV.User.requestPasswordReset(email).then((success) => {
        successFn.call()
        alert('邮件已发送')
    }, (error) => {
        errorFn.call(null, error)
    })

}

function getUserFromAVUser(AVUser) {
    console.log('AVUser', AVUser)
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}