import React from 'react'

class Welcome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            test:'1'
        }
        this.setState({
            date: new Date(),
            test:'constructor'
        })
    }
    componentWillMount(){
        this.setState({
            date: new Date(),
            test:'componentWillMount'
        })
    }
    render() {
        this.setState({
            date: new Date(),
            test:'render'
        })
        return (
            <div>
                <h1>Hello,{this.props.name}</h1>
                <h2>{this.state.date.toString()}</h2>
                <p>{this.state.test}</p>
            </div>
        )
    }
    componentDidMount(){
        this.setState({
            date: new Date(),
            test:'componentDidMount'
        })
    }
    componentWillReceiveProps(){
        this.setState({
            date: new Date(),
            test:'componentWillReceiveProps'
        })
    }
    shouldComponentUpdate(){
        this.setState({
            date: new Date(),
            test:'shouldComponentUpdate'
        })
    }
    componentWillUpdate(){
        this.setState({
            date: new Date(),
            test:'componentWillUpdate'
        })
    }
    componentDidUpdate(){
        this.setState({
            date: new Date(),
            test:'componentDidUpdate'
        })
    }
    componentWillUnmount(){
        console.log('要死了')
    }
}

export default Welcome