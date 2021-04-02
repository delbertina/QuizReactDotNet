import React, { Component } from 'react';

interface Props {
    onStartOver: Function,
    isDisplayed: boolean
}
interface State { }

class Restart extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    public render() {
        return this.props.isDisplayed ? (
            <button
                className="start-over-button"
                onClick={() => { this.props.onStartOver() }}>
                Start Over
            </button>
        ) : null;
    }
}
export default Restart;