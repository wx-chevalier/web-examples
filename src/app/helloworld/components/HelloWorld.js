import React, { Component, PropTypes } from 'react'

class HelloWorld extends Component {
    render() {

        const { SayWorld, SayChevalier, SaySomething, text } = this.props
        return (
            <p style={{color:"blue"}}>
                Hello {text}
                {' '}
                <button onClick={SayWorld}>SayWorld</button>
                {' '}
                <button onClick={SayChevalier}>SayChevalier</button>
                {' '}
                <button onClick={()=>{SaySomething("SomeThing")}}>SaySomething</button>
                {' '}
            </p>
        )
    }
}

HelloWorld.propTypes = {
    SayWorld: PropTypes.func.isRequired,
    SayChevalier: PropTypes.func.isRequired,
    SaySomething: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
}

export default HelloWorld
