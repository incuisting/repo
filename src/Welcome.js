import React from 'react'

class Welcome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            test: '1'
        }
        setInterval(() => {
            this.setState({
                date: new Date(), // 更新 date
                test: 'setInterval'
            })
        }, 5000)
        console.log('我已经在 constructor 里将 props 和 state 初始化好了')
    }

    componentWillMount() {
        this.setState({
            date: new Date(),
            test: 'componentWillMount'
        })
    }

    render() {
        console.log('这里是render')
        return (
            <div>
                <h1>Hello,{this.props.name}</h1>
                <h2>{this.state.date.toString()}</h2>
                <p>{this.state.test}</p>
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            date: new Date(),
            test: 'componentDidMount'
        })
        console.log('已经挂载到页面里了')
    }

    componentWillReceiveProps() {
        this.setState({
            date: new Date(),
            test: 'componentWillReceiveProps'
        })
    }

    shouldComponentUpdate() {
        this.setState({
            date: new Date(),
            test: 'shouldComponentUpdate'
        })
        return true
    }

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
        console.log('要死了')
    }
}

export default Welcome
/*
我们只在这几个钩子里 setState：

componentWillMount
componentDidMount
componentWillReceiveProps
componentDidUpdate
 */