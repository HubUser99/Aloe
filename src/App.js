import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from './config';
import AdminPanel from "./AdminPanel";

class App extends Component {
    constructor(props) {
        super(props);
        firebase.initializeApp(config);

        this.state = {
            admin: Boolean,
        };
    }

    componentDidMount() {
        this.setState({
            admin: true
        });
    }

    render() {
        const { admin } = this.state;
        return (
            <div className="App">
                <div className="container p-5">
                    <div className="row">
                        <div className='col-xl-12 text-right'>
                            <button className='btn btn-success' onClick={this.toggleAdmin}>Administer</button>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className='col-xl-4 text-center p-3 mb-5 border border-success'>
                            <h1>Aloe</h1>
                        </div>
                    </div>
                    { admin &&
                        <AdminPanel/>
                    }
                </div>
            </div>
        );
    }

    toggleAdmin = () => {
        this.setState({
            admin: !this.state.admin
        });
    };
}

export default App;
