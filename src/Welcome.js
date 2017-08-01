import React from 'react'

class Welcome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
        setInterval(()=>{
            this.setState({
                date: new Date() //update date
            })
        })
        console.log('我已经在constructor 里将props和state初始化好了')
    }
    componentWillMount(){
        console.log('运行到这里的话，说明马上就要运行render了')
    }
    render() {
        console.log('这里是render')
        return (
            <div>
                <h1>Hello,{this.props.name}</h1>
                <h2>{this.state.date.toString()}</h2>
            </div>
        )
    }
    componentDidMount(){
        console.log('已经挂载到页面里了')
    }
}

export default Welcome