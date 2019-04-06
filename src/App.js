import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from 'firebase';
import config from './config';
import AdminPanel from "./AdminPanel";

class App extends Component {
    constructor(props) {
        super(props);
        firebase.initializeApp(config);

        this.state = {
            users: [],
            admin: Boolean,
        };
    }

    updateUserData = () => {
        firebase.database().ref('/').set(this.state)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
               console.error(error);
            });
    };

    getUserData = () => {
        let ref = firebase.database().ref('/');
        ref.on('value', (snapshot) => {
            const state = snapshot.val();
            this.setState(state);
        });
        console.log("data retrieved (?)");
    };

    componentDidMount() {
        this.setState({
            admin: true
        });
        this.getUserData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState !== this.state) {
            this.updateUserData();
        }
    }

    render() {
        const { users, admin } = this.state;
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
                        <AdminPanel users={users}/>
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

    handleSubmit = (event) => {
        event.preventDefault();
        let name = this.refs.name.value;
        let email = this.refs.email.value;
        let role = this.refs.role.value;
        let uid = this.refs.uid.value;

        if (uid && name && email && role){
            const { users } = this.state;
            const userIndex = users.findIndex(data => {
                return data.uid === uid
            });
            users[userIndex].name = name;
            users[userIndex].email = email;
            users[userIndex].role = role;
            this.setState({ users });
        }
        else if (name && email && role ) {
            const uid = new Date().getTime().toString();
            const { users } = this.state;
            users.push({ uid, name, email, role });
            this.setState({ users });
        }

        this.refs.name.value = '';
        this.refs.email.value = '';
        this.refs.role.value = '';
        this.refs.uid.value = '';
    };

    removeData = (user) => {
        const { users } = this.state;
        const newState = users.filter(data => {
            return data.uid !== user.uid;
        });
        this.setState({ users: newState });
    };

    updateData = (user) => {
        this.refs.uid.value = user.uid;
        this.refs.name.value = user.name;
        this.refs.email.value = user.email;
        this.refs.role.value = user.role;
    };
}

export default App;
