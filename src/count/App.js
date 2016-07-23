import React, {Component} from "react";
import {NICE, SUPER_NICE} from "./colors";

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0};
        this.interval = setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.setState({
            counter: this.state.counter + this.props.increment
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {


        // This is a split point
        require.ensure([], () => {

            console.log("Async");
            // All the code in here, and everything that is imported
            // will be in a separate file
            const library = require('./async_library');

            library();

        });

        return (
            <h1 style={{ color: this.props.color }}>
                Counter ({this.props.increment}): {this.state.counter}
            </h1>
        );
    }
}

export class App extends Component {
    render() {
        return (
            <div>
                <Counter increment={1} color={NICE}/>
                <Counter increment={5} color={SUPER_NICE}/>
            </div>
        );
    }
}


