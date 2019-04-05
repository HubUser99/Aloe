import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from 'firebase';
import config from './config';

class App extends Component {
    constructor(props) {
        super(props);
        firebase.initializeApp(config);

        this.state = {
            users: []
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
        this.getUserData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState !== this.state) {
            this.updateUserData();
        }
    }

    render() {
        const { users } = this.state;
        return (
            <div className="App">
                <div className="container p-5">
                    <div className="row">
                        <div className='col-xl-12'>
                            <h1>Fellow Readers</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xl-12'>
                            {
                                users
                                    .map(user =>
                                        <div key={user.uid} className="card float-left" style={{width: '18rem', marginRight: '1rem'}}>
                                            <div className="card-body">
                                                <h5 className="card-title">{ user.name }</h5>
                                                <p className="card-text">{ user.role }</p>
                                                <p className="card-text">{ user.email }</p>
                                                <button onClick={ () => this.removeData(user) } className="btn btn-link">Delete</button>
                                                <button onClick={ () => this.updateData(user) } className="btn btn-link">Edit</button>
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                    <div className='row mt-5'>
                        <div className='col-xl-12'>
                            <h1>Add new club member here</h1>
                            <form onSubmit={ this.handleSubmit }>
                                <div className="form-row mt-5">
                                    <input type='hidden' ref='uid' />
                                    <div className="form-group col-md-6">
                                        <label>Name</label>
                                        <input type="text" ref='name' className="form-control" placeholder="Name" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Email</label>
                                        <input type="email" ref='email' className="form-control" placeholder="Email" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Role</label>
                                        <input type="text" ref='role' className="form-control" placeholder="Role" />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
