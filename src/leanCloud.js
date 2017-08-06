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
    getByUser(user, successFn, errorFn) {
        console.log('user', user)
        let query = new AV.Query('Todo')
        query.equalTo('deleted',false)
        query.find().then((response) => {
            console.log('response', response)
            let array = response.map((t) => {
                return {id: t.id, ...t.attributes}
            })
            console.log('array', array)
            successFn.call(null, array)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    },
    create({status, title, deleted}, successFn, errorFn) {
        let Todo = AV.Object.extend('Todo')
        let todo = new Todo()
        todo.set('title', title)
        todo.set('status', status)
        todo.set('deleted', deleted)

        //设置用户的ACL 权限，防止读取全部数据

        let acl = new AV.ACL()
        acl.setPublicReadAccess(false) // false的意思为 仅自己可读
        acl.setWriteAccess(AV.User.current(), true) //自己可写
        acl.setReadAccess(AV.User.current(),true) //自己可读

        todo.setACL(acl) //将 ACL 实例赋予 todo 对象

        todo.save().then((response) => {
            successFn.call(null, response.id)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    },
    update({id, title, status, deleted}, successFn, errorFn) {
        let todo = AV.Object.createWithoutData('Todo', id)
        title !== undefined && todo.set('title', title)
        status !== undefined && todo.set('status', status)
        deleted !== undefined && todo.set('deleted', deleted)
        // 为什么我要像上面那样写代码？
        // 考虑如下场景
        // update({id:1, title:'hi'})
        // 调用 update 时，很有可能没有传 status 和 deleted
        // 也就是说，用户只想「局部更新」
        // 所以我们只 set 该 set 的
        // 那么为什么不写成 title && todo.set('title', title) 呢，为什么要多此一举跟 undefined 做对比呢？
        // 考虑如下场景
        // update({id:1, title: '', status: null}}
        // 用户想将 title 和 status 置空，我们要满足
        todo.save().then((response) => {
            successFn && successFn.call(null)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    },
    destroy(todoId, successFn, errorFn) {
        TodoModel.update({id:todoId,deleted:true},successFn,errorFn)
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
        console.log('send')
        alert('邮件已发送')
        successFn.call()
    }, (error) => {
        errorFn.call(null, error)
    })

}

function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}