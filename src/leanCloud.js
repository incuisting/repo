import AV from 'leancloud-storage'

let APP_ID = 'f0B88b8emKpHwXnk69GJw9O9-gzGzoHsz'
let APP_KEY = 'cGr1lluaXyF5n07mLlfQVRgY'
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})
export default AV
export function signUp(email,username,password,successFn,errorFn) {
    let user = new AV.User()

    user.setUsername(username)

    user.setPassword(password)

    user.setEmail(email)

    user.signUp().then((loginedUser)=>{
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null,user)
    },(error)=>{
        errorFn.call(null,error)
    })

    return undefined
}

export function getCurrentUser() {
    let user = AV.User.current()
    if (user){
        return getUserFromAVUser(user)
    }else{
        return null
    }
}

export function signOut() {
    AV.User.logOut()
    return undefined
}
export function signIn(username,password,successFn,errorFn) {
    AV.User.logIn(username,password).then((loginedUser)=>{
      let user = getUserFromAVUser(loginedUser)
        successFn.call(null,user)
    },(error)=>{
        errorFn.call(null,error)
    })
}

function getUserFromAVUser(AVUser) {
    console.log('AVUser',AVUser)
    return{
        id:AVUser.id,
        ...AVUser.attributes
    }
}