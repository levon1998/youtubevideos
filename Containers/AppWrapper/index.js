import {connect} from 'react-redux';
import React, {Component} from 'react';

class AuthWrapper extends Component {
    constructor () {
        super();
        this.state = {}
    }

    render () {
        return (
            <Text>Open up App.js to start working on your app!</Text>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => {
    return {
        // seeNotice: (data) => dispatch(seeNotice(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);